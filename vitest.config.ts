import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '@zylmo/shared': resolve(__dirname, 'packages/shared/index.ts'),
      '@zylmo/core': resolve(__dirname, 'packages/core/index.ts'),
    },
  },
});
