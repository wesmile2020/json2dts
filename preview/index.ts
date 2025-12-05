import '@shoelace-style/shoelace/dist/shoelace.js';
import '@shoelace-style/shoelace/dist/themes/light.css';

import { editor } from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JSONWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import typescriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

import { JSON2Dts, version } from '@/index';

import './index.css';

const versionDom = document.getElementById('version_name');
if (versionDom) {
  versionDom.textContent = version;
}

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
  readOnly: process.env.NODE_ENV === 'production',
  language: 'typescript',
  fontFamily: `'cascadia code', monospace`,
  minimap: {
    enabled: false,
  },
  automaticLayout: true,
  placeholder: 'Generated TypeScript interface code will appear here',
});

const modeDom = document.getElementById('mode') as HTMLSelectElement;

const json2Dts = new JSON2Dts();

function runTransform() {
  const jsonCode = jsonEditor.getValue();
  if (jsonCode === '') {
    outputEditor.setValue('');
    return;
  }
  try {
    const json = JSON.parse(jsonCode);
    const mode = modeDom.value;
    if (mode === 'interfaces') {
      const tsCode = json2Dts.transformByJSON(json);
      outputEditor.setValue(tsCode);
    } else {
      const tsCode = json2Dts.convertJSONToDts(json);
      outputEditor.setValue(tsCode);
    }

  } catch (error) {

  }
}

let runTimer: number | null = null;
jsonEditor.onDidChangeModelContent(() => {
  if (runTimer !== null) {
    clearTimeout(runTimer);
    runTimer = null;
  }
  runTimer = window.setTimeout(runTransform, 100);
});

modeDom.addEventListener('sl-change', runTransform);
