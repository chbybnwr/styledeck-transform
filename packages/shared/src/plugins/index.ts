export { createPlugin }

const createPlugin: UnpluginFactory<Options | undefined, true> = (
  options,
  context,
) => {
  return [
    preProcess,
    postProcess,
    //
  ].map((createPlugin) => createPlugin(options, context))
}

import type { Options } from '#/options'
import postProcess from '#/plugins/post-process'
import preProcess from '#/plugins/pre-process'
import type { UnpluginFactory } from 'unplugin'
//
