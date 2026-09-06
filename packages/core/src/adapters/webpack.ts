export { webpackPlugin as default }

const webpackPlugin: (options?: Options) => WebpackPluginInstance =
  createWebpackPlugin(createPlugin)

import { createPlugin } from '#/plugins'
import { createWebpackPlugin } from 'unplugin'
import type { Options } from '#/options'
import type { WebpackPluginInstance } from 'unplugin'
//
