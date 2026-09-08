export { createPlugin as default }

const createPlugin = (options?: Options): Plugin => {
  const preProcess = createPreProcessFn(options)

  return {
    name: `${pluginName}:pre-stylex`,
    enforce: 'pre',

    transform: {
      filter: {
        id: {
          include: /\.(t|j)s$/u,
          exclude: /node_modules/,
        },
        code: {
          include: /styledeck/i,
        },
      },

      handler: (code: string) => preProcess(code),
    },
  }
}

import { createPreProcessFn } from '@styledeck/core'
import type { Options } from '@styledeck/core'
import type { Plugin } from 'vite'
import { pluginName } from '#/shared/config'
//
