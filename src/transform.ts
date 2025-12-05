import { type JSON2Dts as JSON2DtsType } from '~/public/index.d';

import {
  isNumber,
  isObject,
  isString,
  isBoolean,
  firstLetterUpperCase,
  isNull,
  isValidVariableName,
} from './utils';
import {
  InterfaceNode,
  ArrayNode,
  PropertyNode,
  TreeNode,
} from './node';

export class JSON2Dts implements JSON2DtsType {
  private _nameIndices: Map<string, number> = new Map();

  private _getUniqueName(key: string): string {
    let name = firstLetterUpperCase(key);
    if (!isValidVariableName(name)) {
      name = 'UnVariable';
    }
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
        const child = this._createNode(name, itemTypeName, json[i]);
        node.addChild(child);
      }
      return node;
    } else if (isNumber(json)) {
      return new PropertyNode(name, 'number');
    } else if (isString(json)) {
      return new PropertyNode(name, 'string');
    } else if (isBoolean(json)) {
      return new PropertyNode(name, 'boolean');
    } else if (isNull(json)) {
      return new PropertyNode(name, 'null');
    }
    console.error('json has unknown type');
    return new PropertyNode(name, 'unknown');
  }

  transformByJSON(data: unknown): string {
    this._nameIndices.clear();
    const node = this._createNode('Root', 'RootType', data);
    return node.toString();
  }

  transformByJSONString(code: string): string {
    const json = JSON.parse(code);
    return this.transformByJSON(json);
  }

  convertJSONToDts(data: unknown): string {
    let interfaces = this.transformByJSON(data);
    const codes = [];
    codes.push('declare const root: RootType;')
    codes.push('export default root;');
    if (isObject(data)) {
      const keys = Object.keys(data);
      for (let i = 0; i < keys.length; i += 1) {
        if (isValidVariableName(keys[i])) {
          codes.push(`export declare const ${keys[i]}: RootType['${keys[i]}'];`)
        } else {
          codes.push(`declare const unVariable_${i}: RootType['${keys[i]}'];`);
          codes.push(`export { unVariable_${i} as '${keys[i]}' }`);
        }
      }
    }
    interfaces += codes.join('\n');

    return interfaces;
  }

  convertJSONStringToDts(code: string): string {
    const json = JSON.parse(code);
    return this.convertJSONToDts(json);
  }
}
