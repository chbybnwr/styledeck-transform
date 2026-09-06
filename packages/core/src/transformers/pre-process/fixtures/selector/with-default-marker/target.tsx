export { App }

function App() {
  return <div {...__stylex_props(style_6_18._)} />
}

import { defaultMarker } from '@stylexjs/stylex'
//

const style_6_18 = __stylex_create({
  _: {
    color: {
      default: null,
      [__stylex_when.ancestor(':hover:focus')]: 'red',
    },
  },
})

import { create as __stylex_create } from '@stylexjs/stylex'
import { props as __stylex_props } from '@stylexjs/stylex'
import { when as __stylex_when } from '@stylexjs/stylex'
