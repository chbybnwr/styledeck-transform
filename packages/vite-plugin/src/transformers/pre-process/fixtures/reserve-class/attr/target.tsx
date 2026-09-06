export { Component }

function Component() {
  return (
    <>
      <div
        data-styledeck-class='foo bar'
        data-styledeck
        {...__stylex_attrs(style_8_20._)}
      />
      <div class='foo bar' />
    </>
  )
}

const style_8_20 = __stylex_create({
  _: {
    color: 'red',
  },
})

import { attrs as __stylex_attrs } from '@stylexjs/stylex'
import { create as __stylex_create } from '@stylexjs/stylex'
