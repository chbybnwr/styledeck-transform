export { Hero }

function Hero({ isEnabled }: { isEnabled: boolean }) {
  return (
    <h1
      {...__stylex_props(
        style_6_18._,
        isEnabled ? style_8_11_x_8_35._ : style_8_11_x_8_46._,
        style_7_21._,
        style_10_11._('black'),
        isEnabled && style_11_11_x_11_31._,
        style_12_12._('blue', 'red'),
        style_7_21._,
        style_22_9._('blue'),
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

const style_8_11_x_8_35 = __stylex_create({
  _: {
    '::before': {
      fontWeight: 'normal',
    },
  },
})

const style_8_11_x_8_46 = __stylex_create({
  _: {
    '::before': {
      fontWeight: 'bold',
    },
  },
})

const style_10_11 = __stylex_create({
  _: (backgroundColor) => ({
    '::before': {
      backgroundColor,
    },
  }),
})

const style_11_11_x_11_31 = __stylex_create({
  _: {
    '::before': {
      color: 'black',
    },
  },
})

const style_12_12 = __stylex_create({
  _: (value_13_22, value_16_25) => ({
    '::before': {
      [color.primary]: {
        default: value_13_22,
        '@container (width > 1440px)': {
          default: 'green',
          ':hover': value_16_25,
        },
      },
    },
  }),
})

const style_7_21 = __stylex_create({
  _: {
    '::before': {
      fontSize: '1rem',
      display: 'flex',
    },
  },
})

const style_22_9 = __stylex_create({
  _: (backgroundColor) => ({
    backgroundColor,
  }),
})

const style_6_18 = __stylex_create({
  _: {
    color: 'red',
  },
})

import { create as __stylex_create } from '@stylexjs/stylex'
import { props as __stylex_props } from '@stylexjs/stylex'
