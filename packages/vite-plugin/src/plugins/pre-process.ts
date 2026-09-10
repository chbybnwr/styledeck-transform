export { createPlugin as default }

const createPlugin = (options?: Options): Plugin => {
  const preProcess = createPreProcessFn(options)

  return {
    name: `${pluginName}:pre-stylex`,
    enforce: 'pre',

    transform: {
      filter: {
        id: {
          include: /\.(t|j)sx?$/u,
          exclude: /node_modules/,
        },
        code: {
          include: /styledeck/i,
        },
      },

      handler: (code) => preProcess(code),
    },
  }
}

import { createPreProcessFn } from '@styledeck/transform'
import type { Options } from '@styledeck/transform'
import type { Plugin } from 'vite'
import { pluginName } from '#/shared/config'
//
