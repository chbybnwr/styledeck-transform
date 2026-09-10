export { createPlugin as default }

/**
 * @public
 */
function createPlugin(options: Options & Partial<UserOptions> = {}): Plugin[] {
  const { jsxAttributeSchema, unstyledComponentModules, ...stylexOptions } =
    options
  const { lightningcssOptions } = stylexOptions
  const styledeckOptions = { jsxAttributeSchema, unstyledComponentModules }

  return [
    preProcess(styledeckOptions),
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
    postProcess(styledeckOptions),
  ]
}

import type { Options } from '@styledeck/transform'
import type { Plugin } from 'vite'
import postProcess from './plugins/post-process'
import preProcess from './plugins/pre-process'
import stylex from '@stylexjs/unplugin/vite'
import type { UserOptions } from '@stylexjs/unplugin'
//
