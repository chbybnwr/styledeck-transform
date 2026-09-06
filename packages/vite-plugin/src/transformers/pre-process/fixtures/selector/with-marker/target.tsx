export { App }

const marker = defineMarker()

function App() {
  return <div {...__stylex_props(style_8_18._)} />
}

import { defineMarker } from '@stylexjs/stylex'
//

const style_8_18 = __stylex_create({
  _: {
    color: {
      default: null,
      [__stylex_when.ancestor(':hover:focus', marker)]: 'red',
    },
  },
})

import { create as __stylex_create } from '@stylexjs/stylex'
import { props as __stylex_props } from '@stylexjs/stylex'
import { when as __stylex_when } from '@stylexjs/stylex'
