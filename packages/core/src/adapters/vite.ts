export { createPlugin as default }

function createPlugin(options: Options & Partial<UserOptions> = {}) {
  const { jsxAttributeSchema, unstyledComponentModules, ...stylexOptions } =
    options
  const { lightningcssOptions } = stylexOptions
  const styledeckOptions = { jsxAttributeSchema, unstyledComponentModules }

  return [
    preProcess(styledeckOptions, null),
    stylex({
      classNamePrefix: 's',
      useCSSLayers: true,
      lightningcssOptions: {
        minify:
          lightningcssOptions?.minify ??
          process.env['NODE_ENV'] !== 'development',
        ...lightningcssOptions,
      },
      ...stylexOptions,
    }) as Plugin,
    postProcess(styledeckOptions, null),
  ]
}

import type { Options } from '#/options.js'
import type { Plugin } from 'vite'
import postProcess from '#/plugins/post-process'
import preProcess from '#/plugins/pre-process'
import stylex from '@stylexjs/unplugin/vite'
import type { UserOptions } from '@stylexjs/unplugin'
//
