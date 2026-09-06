export { rspackPlugin as default }

const rspackPlugin: (options?: Options) => RspackPluginInstance =
  createRspackPlugin(createPlugin)

import { createPlugin } from '#/plugins'
import { createRspackPlugin } from 'unplugin'
import type { Options } from '#/options'
import type { RspackPluginInstance } from 'unplugin'
//
