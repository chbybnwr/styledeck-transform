export { SaveButton }

function SaveButton({ isEnabled }: { isEnabled: boolean }) {
  return (
    <button
      {...__stylex_props(
        isEnabled && antialiased,
        isEnabled ? style_9_11_x_9_40._ : style_9_11_x_9_49._,
        isEnabled && style_10_11_x_10_31._,
        isEnabled ? style_11_11_x_12_15._ : style_11_11_x_16_15._,
      )}
    >
      Save changes
    </button>
  )
}

import { antialiased } from 'solarwindcss'
//

const style_9_11_x_9_40 = __stylex_create({
  _: {
    backgroundColor: 'blue',
  },
})

const style_9_11_x_9_49 = __stylex_create({
  _: {
    backgroundColor: 'gray',
  },
})

const style_10_11_x_10_31 = __stylex_create({
  _: {
    color: 'black',
  },
})

const style_11_11_x_12_15 = __stylex_create({
  _: {
    borderColor: {
      default: 'blue',
      ':hover': 'green',
    },
  },
})

const style_11_11_x_16_15 = __stylex_create({
  _: {
    borderColor: 'gray',
  },
})

import { create as __stylex_create } from '@stylexjs/stylex'
import { props as __stylex_props } from '@stylexjs/stylex'
