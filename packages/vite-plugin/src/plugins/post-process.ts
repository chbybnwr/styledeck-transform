export { createPlugin as default }

const createPlugin = (options?: Options): Plugin => {
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

import { createPostProcessFn } from '@styledeck/transform'
import type { Options } from '@styledeck/transform'
import type { Plugin } from 'vite'
import { pluginName } from '#/shared/config'
//
