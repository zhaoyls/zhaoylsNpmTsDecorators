import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '@zyl/shared': resolve(__dirname, 'packages/shared/index.ts'),
      '@zyl/core': resolve(__dirname, 'packages/core/index.ts'),
    },
  },
});
