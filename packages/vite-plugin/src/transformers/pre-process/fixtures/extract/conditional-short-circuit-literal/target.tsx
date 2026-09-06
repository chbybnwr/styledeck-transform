export { SaveButton }

function SaveButton({ isEnabled }: { isEnabled: boolean }) {
  return (
    <button {...__stylex_props(isEnabled && style_7_22._)}>Save changes</button>
  )
}

const style_7_22 = __stylex_create({
  _: {
    fontWeight: 'bold',
  },
})

import { create as __stylex_create } from '@stylexjs/stylex'
import { props as __stylex_props } from '@stylexjs/stylex'
