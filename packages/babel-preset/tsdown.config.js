export { tsdownConfig as default }

/** @type {import('tsdown').UserConfig} */
const tsdownConfig = {
  entry: {
    index: 'src/index.ts',
  },

  alias: {
    '#': fileURLToPath(new URL('src', import.meta.url)),
  },

  dts: {
    tsconfig: 'tsconfig.build.json',
  },

  deps: {
    alwaysBundle: [
      '@styledeck/transform',
      //
    ],
    neverBundle: Object.keys(corePackageJson.dependencies),
    //
  },

  minify: true,
  fixedExtension: false,
  format: ['esm', 'cjs'],
}

import corePackageJson from '../core/package.json' with { type: 'json' }
import { fileURLToPath } from 'node:url'
//
