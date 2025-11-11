import { test, expect } from 'vitest';

import {
  InterfaceNode,
  ArrayNode,
  PropertyNode,
} from '@/node';

test('test InterfaceNode', () => {
  const node = new InterfaceNode('interface', 'UserInfo');
  node.addChild(new PropertyNode('age', 'string'));
  expect(node.toString()).toBe('interface UserInfo {\n    age: string;\n}\n\n');
});

test('test InterfaceNode with invalid name', () => {
  const node = new InterfaceNode('interface', 'UserInfo');
  node.addChild(new PropertyNode('@', 'string'));
  expect(node.toString()).toBe(`interface UserInfo {\n    '@': string;\n}\n\n`);
});


test('test ArrayNode', () => {
  const node = new ArrayNode('array', 'List');
  node.addChild(new PropertyNode('age', 'string'));
  node.addChild(new PropertyNode('age', 'string'));
  expect(node.toString()).toBe('type List = (string)[];\n\n');
});

test('test ArrayNode empty', () => {
  const node = new ArrayNode('array', 'List');

  expect(node.toString()).toBe('type List = (unknown)[];\n\n');
});

test('test InterfaceNode equal', () => {
  const node1 = new InterfaceNode('interface', 'UserInfo');
  node1.addChild(new PropertyNode('age', 'number'));
  node1.addChild(new PropertyNode('name', 'string'));

  const node2 = new InterfaceNode('interface', 'UserInfo_2');
  node2.addChild(new PropertyNode('name', 'string'));
  node2.addChild(new PropertyNode('age', 'number'));

  expect(node1.equal(node2)).toBe(true);

  const arrayNode = new ArrayNode('array', 'List');
  expect(node1.equal(arrayNode)).toBe(false);

  const node3 = new InterfaceNode('interface', 'UserInfo_3');
  expect(node1.equal(node3)).toBe(false);

  const node4 = new InterfaceNode('interface', 'UserInfo_4');
  node4.addChild(new PropertyNode('age', 'string'));
  node4.addChild(new PropertyNode('name', 'string'));
  expect(node1.equal(node4)).toBe(false);
});

test('test ArrayNode equal', () => {
  const node1 = new ArrayNode('list1', 'List');
  node1.addChild(new PropertyNode('age', 'number'));
  node1.addChild(new PropertyNode('name', 'string'));

  const node2 = new ArrayNode('list2', 'List');
  node2.addChild(new PropertyNode('name', 'string'));
  node2.addChild(new PropertyNode('age', 'number'));
  expect(node1.equal(node2)).toBe(true);

  const node3 = new InterfaceNode('interface', 'UserInfo_3');
  expect(node1.equal(node3)).toBe(false);

  const node4 = new ArrayNode('array', 'List');
  expect(node1.equal(node4)).toBe(false);

  const node5 = new ArrayNode('list2', 'List');
  node5.addChild(new PropertyNode('name', 'string'));
  node5.addChild(new PropertyNode('age', 'string'));
  expect(node1.equal(node5)).toBe(false);
});

test('test PropertyNode equal', () => {
  const node1 = new PropertyNode('age', 'number');
  const node2 = new PropertyNode('age', 'number');
  expect(node1.equal(node2)).toBe(true);

  const node3 = new ArrayNode('age', 'string');
  expect(node1.equal(node3)).toBe(false);
});
