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

  minify: true,
  fixedExtension: false,

  deps: {
    alwaysBundle: [
      '@styledeck/transform',
      //
    ],
    neverBundle: Object.keys(corePackageConfig.dependencies),
    //
  },
}

import corePackageConfig from '../core/package.json' with { type: 'json' }
import { fileURLToPath } from 'node:url'
//
