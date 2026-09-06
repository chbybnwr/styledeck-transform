export { Component }

function Component() {
  return (
    <>
      <div
        data-styledeck-class='foo bar'
        data-styledeck
        {...__stylex_props(style_8_20._)}
      />
      <div className='foo bar' />
    </>
  )
}

const style_8_20 = __stylex_create({
  _: {
    color: 'red',
  },
})

import { create as __stylex_create } from '@stylexjs/stylex'
import { props as __stylex_props } from '@stylexjs/stylex'
