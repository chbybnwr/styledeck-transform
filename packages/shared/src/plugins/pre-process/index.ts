export { createPlugin as default }

const createPlugin: UnpluginFactory<Options | undefined, false> = (options) => {
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

import { createPreProcessFn } from '#/transformers/pre-process'
import type { Options } from '#/options'
import { pluginName } from '#/shared/config'
import type { UnpluginFactory } from 'unplugin'
//
