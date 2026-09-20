export { vitestConfig as default }

/** @type {import("vitest/config").ViteUserConfig} */
const vitestConfig = {
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('src', import.meta.url)),
    },
  },

  test: {
    name: 'core',
    coverage: {
      exclude: ['src/test/**/*'],
    },
  },
}

import { fileURLToPath } from 'node:url'
//
