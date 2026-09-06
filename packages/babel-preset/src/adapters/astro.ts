export { astroPlugin as default }

function astroPlugin(options: Options): unknown {
  return {
    name: pluginName,
    hooks: {
      'astro:config:setup': (astro: AstroContext) => {
        astro.config.vite.plugins ??= []
        astro.config.vite.plugins.push(unplugin.vite(options))
      },
    },
  }
}

interface AstroContext {
  config: {
    vite: {
      plugins?: unknown[]
    }
  }
}

import type { Options } from '#/options'
import { pluginName } from '#/shared/config'
import { unplugin } from '#/adapters/unplugin'
//
