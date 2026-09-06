export { preProcessPlugin as default }

const preProcessPlugin = declare(function (
  api: PluginAPI,
  options: Options | undefined,
) {
  const preProcess = createPreProcessFn(options)

  return {
    name: pluginName,

    pre(file) {
      if (!/styledeck/i.test(file.code)) {
        return
      }

      const result = preProcess(file.code, {
        // @ts-expect-error outdated type packages?
        ast: file.ast,
      })

      if (result == null) {
        return
      }

      file.code = result.code

      const ast = parse(result.code, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
      })

      for (const [key, value] of Object.entries(ast.program)) {
        file.ast.program[key as never] = value as never
      }
    },

    visitor: {},
  }
})

import { createPreProcessFn } from '#/transformers/pre-process'
import { declare } from '@babel/helper-plugin-utils'
import type { Options } from '#/options'
import { parse } from '@babel/parser'
import type { PluginAPI } from '@babel/core'
import { pluginName } from '#/shared/config'
//
