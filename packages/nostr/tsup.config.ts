import { defineConfig } from 'tsup'

import { dependencies, name } from './package.json'

export default defineConfig({
  name,
  splitting: true,
  sourcemap: true,
  clean: true,
  bundle: true,
  dts: true,
  target: 'es2021',
  format: ['esm', 'cjs'],
  entry: ['src/index.ts'],
  external: [...Object.keys(dependencies)],
  platform: 'browser',
})