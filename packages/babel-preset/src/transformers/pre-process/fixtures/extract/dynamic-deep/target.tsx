export { Hero }

function Hero({ fontSize }: { fontSize: string }) {
  return (
    <h1
      {...__stylex_props(
        style_7_9._(fontSize, fontSize),
        style_14_9._('black', 'blue', 'red'),
      )}
    >
      Welcome back
    </h1>
  )
}

const color = stylex.defineVars({
  primary: null,
})

import * as stylex from '@stylexjs/stylex'
//

const style_7_9 = __stylex_create({
  _: (value_8_20, value_10_22) => ({
    fontSize: {
      default: value_8_20,
      '@media (min-width: 768px)': {
        default: value_10_22,
        ':hover': '2.25rem',
      },
    },
  }),
})

const style_14_9 = __stylex_create({
  _: (value_15_18, value_17_22, value_20_25) => ({
    '::before': {
      color: value_15_18,
      [color.primary]: {
        default: value_17_22,
        '@container (width > 1440px)': {
          default: 'green',
          ':hover': value_20_25,
        },
      },
    },
  }),
})

import { create as __stylex_create } from '@stylexjs/stylex'
import { props as __stylex_props } from '@stylexjs/stylex'
