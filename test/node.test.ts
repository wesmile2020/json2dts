import { test, expect } from 'vitest';

import {
  InterfaceNode,
  ArrayNode,
  PropertyNode,
} from '@/node';

test('test InterfaceNode', () => {
  const node = new InterfaceNode('interface', 'UserInfo');
  const child = new PropertyNode('age', 'string');
  node.addChild(child);
  expect(node.toString()).toBe('interface UserInfo {\n    age: string;\n}\n\n');
});

test('test InterfaceNode with invalid name', () => {
  const node = new InterfaceNode('interface', 'UserInfo');
  const child = new PropertyNode('@', 'string');
  node.addChild(child);
  expect(node.toString()).toBe(`interface UserInfo {\n    '@': string;\n}\n\n`);
});


test('test ArrayNode', () => {
  const node = new ArrayNode('array', 'List');
  const child = new PropertyNode('age', 'string');
  node.addChild(child);
  expect(node.toString()).toBe('type List = (string)[];\n\n');
});

test('test ArrayNode empty', () => {
  const node = new ArrayNode('array', 'List');

  expect(node.toString()).toBe('type List = (unknown)[];\n\n');
});
