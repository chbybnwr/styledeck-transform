export { createPlugin as default }

const createPlugin: UnpluginFactory<Options | undefined, false> = (options) => {
  const postProcess = createPostProcessFn(options)

  return {
    name: `${pluginName}:post-stylex`,
    enforce: 'pre',

    transform: {
      filter: {
        id: {
          include: /\.(t|j)sx$/u,
          exclude: /node_modules/,
        },
        code: {
          include: [
            /styledeck/i,
            /__stylex_attrs/,
            //
          ],
        },
      },

      handler: (code: string) => postProcess(code),
    },
  }
}

import { createPostProcessFn } from '#/transformers/post-process'
import type { Options } from '#/options'
import { pluginName } from '#/shared/config'
import type { UnpluginFactory } from 'unplugin'
//
