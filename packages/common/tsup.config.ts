import { defineConfig } from 'tsup'

import { dependencies, name } from './package.json'

export default defineConfig({
  name,
  splitting: true,
  clean: true,
  bundle: true,
  dts: true,
  target: 'es2021',
  sourcemap: true,
  format: ['esm', 'cjs'],
  entry: ['src/index.ts'],
  external: [...Object.keys(dependencies)],
  platform: 'browser',
})