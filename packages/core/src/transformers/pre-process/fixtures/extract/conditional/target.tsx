export { SaveButton }

function SaveButton({ isEnabled }: { isEnabled: boolean }) {
  return (
    <button
      {...__stylex_props(
        isEnabled ? style_7_9_x_7_38._ : style_7_9_x_7_47._,
        isEnabled && style_8_9_x_8_29._,
        isEnabled ? style_9_9_x_10_13._ : style_9_9_x_14_13._,
      )}
    >
      Save changes
    </button>
  )
}

const style_7_9_x_7_38 = __stylex_create({
  _: {
    backgroundColor: 'blue',
  },
})

const style_7_9_x_7_47 = __stylex_create({
  _: {
    backgroundColor: 'gray',
  },
})

const style_8_9_x_8_29 = __stylex_create({
  _: {
    color: 'black',
  },
})

const style_9_9_x_10_13 = __stylex_create({
  _: {
    borderColor: {
      default: 'blue',
      ':hover': 'green',
    },
  },
})

const style_9_9_x_14_13 = __stylex_create({
  _: {
    borderColor: 'gray',
  },
})

import { create as __stylex_create } from '@stylexjs/stylex'
import { props as __stylex_props } from '@stylexjs/stylex'
