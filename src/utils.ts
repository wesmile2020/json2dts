export function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function getWhitespace(length: number): string {
  return ' '.repeat(length);
}

export function firstLetterUpperCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
