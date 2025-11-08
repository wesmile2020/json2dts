import {
  isNumber,
  isObject,
  isString,
  isBoolean,
  firstLetterUpperCase,
} from './utils';
import {
  InterfaceNode,
  ArrayNode,
  PropertyNode,
  TreeNode,
} from './node';

export class JSON2Dts {
  private _nameIndices: Map<string, number> = new Map();

  private _getUniqueName(key: string): string {
    let name = firstLetterUpperCase(key);
    let count = 0;
    if (this._nameIndices.has(name)) {
      count = this._nameIndices.get(name)!;
      name = `${name}_${count + 1}`;
    }
    this._nameIndices.set(name, count + 1);
    return name;
  }

  private _createNode(name: string, typeName: string, json: unknown): TreeNode {
    if (isObject(json)) {
      const node = new InterfaceNode(name, typeName);
      const keys = Object.keys(json);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i]!;
        const typeName = this._getUniqueName(key);
        const child = this._createNode(key, typeName, json[key]);
        node.addChild(child);
      }
      return node;
    } else if (Array.isArray(json)) {
      const node = new ArrayNode(name, typeName);
      for (let i = 0; i < json.length; i += 1) {
        const itemTypeName = this._getUniqueName(`${typeName}_element_${i}`);
        const child = this._createNode(`${name}_${i}`, itemTypeName, json[i]);
        node.addChild(child);
      }
      return node;
    } else if (isNumber(json)) {
      return new PropertyNode(name, 'number');
    } else if (isString(json)) {
      return new PropertyNode(name, 'string');
    } else if (isBoolean(json)) {
      return new PropertyNode(name, 'boolean');
    }

    return new PropertyNode(name, 'null');
  }

  transformByJSONString(code: string): string {
    const json = JSON.parse(code);
    const node = this._createNode('Root', 'RootType', json);
    return node.toString();
  }

  transformByJSON(data: unknown): string {
    const node = this._createNode('Root', 'RootType', data);
    return node.toString();
  }
}
