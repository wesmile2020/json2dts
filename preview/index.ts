import { editor } from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JSONWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import typescriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

import { JSON2Dts } from '@/index';

import './index.css';

self.MonacoEnvironment = {
  getWorker(_moduleId: string, label: string) {
    if (label === 'json') {
      return new JSONWorker();
    }
    if (label === 'typescript') {
      return new typescriptWorker();
    }
    return new EditorWorker();
  }
};

const codeDom = document.getElementById('code')!;
const jsonEditor = editor.create(codeDom, {
  language: 'json',
  fontFamily: `'cascadia code', monospace`,
  minimap: {
    enabled: false,
  },
  automaticLayout: true,
  placeholder: 'Type your JSON here',
});

const outputDom = document.getElementById('output')!;
const outputEditor = editor.create(outputDom, {
  readOnly: true,
  language: 'typescript',
  fontFamily: `'cascadia code', monospace`,
  minimap: {
    enabled: false,
  },
  automaticLayout: true,
  placeholder: 'Generated TypeScript interface code will appear here',
});

const json2Dts = new JSON2Dts();

jsonEditor.onDidChangeModelContent(() => {
  const jsonCode = jsonEditor.getValue();
  if (jsonCode === '') {
    outputEditor.setValue('');
    return;
  }
  try {
    const json = JSON.parse(jsonCode);
    const tsCode = json2Dts.transformByJSON(json);
    outputEditor.setValue(tsCode);
  } catch (error) {

  }
});
