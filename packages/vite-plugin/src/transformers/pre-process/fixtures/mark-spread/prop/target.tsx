export { Component }

function Component(props: object) {
  return (
    <>
      <div
        data-styledeck-spread
        {...props}
        data-styledeck
        {...__stylex_props(style_8_20._)}
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

import { create as __stylex_create } from '@stylexjs/stylex'
import { props as __stylex_props } from '@stylexjs/stylex'
