export { farmPlugin as default }

const farmPlugin: (options?: Options) => JsPlugin =
  createFarmPlugin(createPlugin)

import { createFarmPlugin } from 'unplugin'
import { createPlugin } from '#/plugins'
import type { JsPlugin } from '@farmfe/core'
import type { Options } from '#/options'
//
