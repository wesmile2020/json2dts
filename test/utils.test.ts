import { test, expect } from 'vitest';

import {
  isObject,
  isNumber,
  isString,
  isBoolean,
  isNull,
  getWhitespace,
  firstLetterUpperCase,
  isValidVariableName,
} from '@/utils';

test('test isObject', () => {
  expect(isObject({})).toBe(true);
  expect(isObject([])).toBe(false);
  expect(isObject(null)).toBe(false);
});

test('test isNumber', () => {
  expect(isNumber(1)).toBe(true);
  expect(isNumber('1')).toBe(false);
  expect(isNumber(null)).toBe(false);
});

test('test isString', () => {
  expect(isString('')).toBe(true);
  expect(isString(1)).toBe(false);
  expect(isString(null)).toBe(false);
});

test('test isBoolean', () => {
  expect(isBoolean(true)).toBe(true);
  expect(isBoolean(false)).toBe(true);
  expect(isBoolean(null)).toBe(false);
});

test('test isNull', () => {
  expect(isNull(null)).toBe(true);
  expect(isNull(1)).toBe(false);
  expect(isNull('')).toBe(false);
});

test('test getWhitespace', () => {
  expect(getWhitespace(2)).toBe('  ');
  expect(getWhitespace(0)).toBe('');
  expect(getWhitespace(-1)).toBe('');
});

test('test firstLetterUpperCase', () => {
  expect(firstLetterUpperCase('hello')).toBe('Hello');
  expect(firstLetterUpperCase('')).toBe('');
});

test('test isValidVariableName', () => {
  expect(isValidVariableName('hello')).toBe(true);
  expect(isValidVariableName('1hello')).toBe(false);
  expect(isValidVariableName('hello world')).toBe(false);
  expect(isValidVariableName('true')).toBe(false);
});
