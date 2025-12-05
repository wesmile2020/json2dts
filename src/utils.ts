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

export function isNull(value: unknown): value is null {
  return value === null;
}

export function getWhitespace(length: number): string {
  if (length < 0) {
    return '';
  }
  return ' '.repeat(length);
}

export function firstLetterUpperCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const RESERVED_KEYWORDS = new Set([
    // JavaScript关键字
    'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
    'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function',
    'if', 'import', 'in', 'instanceof', 'new', 'return', 'super', 'switch',
    'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield',

    // 未来保留字
    'enum', 'implements', 'interface', 'let', 'package', 'private', 'protected',
    'public', 'static', 'await',

    // 严格模式保留字
    'arguments', 'eval',

    // 字面量（虽然不是关键字，但不应作为变量名）
    'true', 'false', 'null', 'undefined', 'NaN', 'Infinity',

    // TypeScript特定关键字
    'type', 'interface', 'namespace', 'module', 'declare', 'as', 'is', 'keyof',
    'readonly', 'required', 'partial', 'pick', 'omit', 'extends', 'implements'
]);

export function isValidVariableName(name: string): boolean {
  if (RESERVED_KEYWORDS.has(name)) {
    return false;
  }
  return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
}
