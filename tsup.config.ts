import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['packages/core/src/index.ts'],
    format: ['cjs', 'esm', 'iife'],
    outDir: 'packages/core/dist',
    dts: true,
    metafile: true,
    minify: true,
    splitting: false,
    sourcemap: true,
    clean: true,
  },
  {
    entry: ['packages/shared/index.ts'],
    format: ['cjs', 'esm', 'iife'],
    outDir: 'packages/shared/dist',
    dts: true,
    metafile: true,
    minify: true,
    splitting: false,
    sourcemap: true,
    clean: true, // 先清除打包的目录!
  },
]);

function outExtensionFn({ format }) {
  if (format === 'esm') return { js: `.${format}.js` };
  if (format === 'iife') return { js: `.mjs` };
  return { js: `.js` };
}
