export { nuxtModule as default }
export type { ModuleOptions }

/* eslint-disable @typescript-eslint/no-empty-object-type */

interface ModuleOptions extends Options {
  //
}

const vitePlugin = createVitePlugin(createPlugin)

const nuxtModule: NuxtModule<ModuleOptions, ModuleOptions> =
  defineNuxtModule<ModuleOptions>({
    meta: {
      name: pluginName,
      configKey: pluginName,
    },
    defaults: {
      // ...default options
    },
    setup(options: ModuleOptions, _nuxt) {
      addVitePlugin(() => vitePlugin(options))
      addWebpackPlugin(() => webpackPlugin(options))
    },
  })

import { addVitePlugin } from '@nuxt/kit'
import { addWebpackPlugin } from '@nuxt/kit'
import { createPlugin } from '#/plugins/index.js'
import { createVitePlugin } from 'unplugin'
import { defineNuxtModule } from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'
import type { Options } from '#/options'
import { pluginName } from '#/shared/config'
import webpackPlugin from '#/adapters/webpack'
//
