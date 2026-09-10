export { vitestConfig as default }

/** @type {import("vitest/config").ViteUserConfig} */
const vitestConfig = {
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('src', import.meta.url)),
    },
  },

  test: {
    coverage: {
      exclude: ['src/test/**/*'],
    },
    passWithNoTests: true,
  },
}

import { fileURLToPath } from 'node:url'
//
