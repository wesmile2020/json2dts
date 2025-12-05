import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: './docs'
  },
  resolve: {
    alias: {
      '~': __dirname,
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    coverage: {
      enabled: true,
      provider: 'v8',
    }
  }
});
