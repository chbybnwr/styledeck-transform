export { Component }

function Component(props: object) {
  return (
    <>
      <div
        data-styledeck-spread
        {...props}
        data-styledeck
        {...__stylex_attrs(style_8_20._)}
        class='foo'
      />
      <div {...props} />
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
