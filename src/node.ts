import { getWhitespace } from './utils';

export abstract class TreeNode {
  protected _children: TreeNode[] = [];
  name: string;
  type: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }

  addChild(child: TreeNode): void {
    this._children.push(child);
  }

  abstract toString(): string;
}

export class InterfaceNode extends TreeNode {
  constructor(name: string, type: string) {
    super(name, type);
  }

  toString(): string {
    let output: string = '';
    const contents: string[] = [];
    for (let i = 0; i < this._children.length; i += 1) {
      const node = this._children[i]!;
      output += node.toString();

      contents.push(`${getWhitespace(4)}${node.name}: ${node.type};`);
    }
    return output + `interface ${this.type} {\n${contents.join('\n')}\n}\n\n`;
  }
}

export class ArrayNode extends TreeNode {
  constructor(name: string, type: string) {
    super(name, type);
  }

  toString(): string {
    const contents: string[] = [];
    let output: string = '';
    for (let i = 0; i < this._children.length; i += 1) {
      const node = this._children[i]!;
      output += node.toString();

      contents.push(node.type);
    }
    return output + `type ${this.type} = [${contents.join(', ')}];\n\n`;
  }
}

export class PropertyNode extends TreeNode {
  constructor(name: string, type: string) {
    super(name, type);
  }

  toString(): string {
    return '';
  }
}
