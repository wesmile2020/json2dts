import { getWhitespace, isValidVariableName } from './utils';

export abstract class TreeNode {
  name: string;
  type: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }

  abstract equal(other: TreeNode): boolean;

  abstract toString(): string;
}

export class InterfaceNode extends TreeNode {
  protected _children: TreeNode[] = [];

  constructor(name: string, type: string) {
    super(name, type);
  }

  addChild(child: TreeNode): void {
    this._children.push(child);
  }

  equal(other: TreeNode): boolean {
    if (!(other instanceof InterfaceNode)) {
      return false;
    }
    const children = [...this._children].sort((a, b) => a.name.localeCompare(b.name));
    const otherChildren = [...other._children].sort((a, b) => a.name.localeCompare(b.name));
    if (children.length !== otherChildren.length) {
      return false;
    }

    for (let i = 0; i < children.length; i += 1) {
      if (!children[i].equal(otherChildren[i])) {
        return false;
      }
    }

    return true;
  }

  toString(): string {
    let output: string = '';
    const contents: string[] = [];
    for (let i = 0; i < this._children.length; i += 1) {
      output += this._children[i].toString();
      let name = this._children[i].name;
      if (!isValidVariableName(this._children[i].name)) {
        name = `'${this._children[i].name}'`;
      }
      contents.push(`${getWhitespace(4)}${name}: ${this._children[i].type};`);
    }
    return output + `interface ${this.type} {\n${contents.join('\n')}\n}\n\n`;
  }
}

export class ArrayNode extends TreeNode {
  private _children: TreeNode[] = [];

  constructor(name: string, type: string) {
    super(name, type);
  }

  addChild(child: TreeNode): void {
    this._children.push(child);
  }

  equal(other: TreeNode): boolean {
    if (!(other instanceof ArrayNode)) {
      return false;
    }
    const children = [...this._children];
    const otherChildren = [...other._children];
    if (children.length !== otherChildren.length) {
      return false;
    }
    while (children.length > 0) {
      const item = children.pop()!;
      const index = otherChildren.findIndex(child => child.equal(item));
      if (index === -1) {
        return false;
      }
      otherChildren.splice(index, 1);
    }

    return children.length === 0 && otherChildren.length === 0;
  }

  toString(): string {
    const contents: string[] = [];
    let output: string = '';
    const uniqueChildren: TreeNode[] = [];

    for (let i = 0; i < this._children.length; i += 1) {
      const index = uniqueChildren.findIndex(child => child.equal(this._children[i]!));
      if (index === -1) {
        uniqueChildren.push(this._children[i]!);
        output += this._children[i].toString();
        contents.push(this._children[i].type);
      }
    }
    return output + `type ${this.type} = (${contents.join(' | ') || 'unknown'})[];\n\n`;
  }
}

export class PropertyNode extends TreeNode {
  constructor(name: string, type: string) {
    super(name, type);
  }

  equal(other: TreeNode): boolean {
    if (!(other instanceof PropertyNode)) {
      return false;
    }

    return this.name === other.name && this.type === other.type;
  }

  toString(): string {
    return '';
  }
}
