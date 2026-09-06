export { preset as default }

function preset(
  api: PresetAPI,
  options: Options & Partial<StyleXOptions>,
): InputOptions {
  const { jsxAttributeSchema, unstyledComponentModules, ...stylexOptions } =
    options
  const styledeckOptions = { jsxAttributeSchema, unstyledComponentModules }

  return {
    presets: [
      () => ({
        overrides: [
          {
            test: /\.(t|j)s$/u,
            exclude: /node_modules/u,
            plugins: [[postStylex, styledeckOptions]],
          },
        ],
      }),

      () => ({
        plugins: [
          stylex.withOptions({
            classNamePrefix: 's',
            enableInlinedConditionalMerge: true,
            treeshakeCompensation: true,
            unstable_moduleResolution: {
              type: 'commonJS',
            },
            ...stylexOptions,
          }),
        ],
      }),

      () => ({
        overrides: [
          {
            test: /\.(t|j)sx$/u,
            exclude: /node_modules/u,
            plugins: [[preStylex, styledeckOptions]],
          },
        ],
      }),
    ],
  }
}

import type { InputOptions } from '@babel/core'
import type { Options } from '#/options'
import postStylex from '#/adapters/babel-post'
import type { PresetAPI } from '@babel/core'
import preStylex from '#/adapters/babel-pre'
import stylex from '@stylexjs/babel-plugin'
import type { StyleXOptions } from '@stylexjs/babel-plugin/lib/utils/state-manager'
//
