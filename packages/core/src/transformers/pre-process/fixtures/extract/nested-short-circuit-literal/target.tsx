export { Example }

function Example({ isEnabled }: { isEnabled: boolean }) {
  return (
    <div
      {...__stylex_props(
        isEnabled && [lineClamp.base, style_9_11._],
        style_13_9._,
      )}
    />
  )
}

import { lineClamp } from 'solarwindcss'
//

const style_9_11 = __stylex_create({
  _: {
    WebkitLineClamp: 3,
  },
})

const style_13_9 = __stylex_create({
  _: {
    color: 'red',
  },
})

import { create as __stylex_create } from '@stylexjs/stylex'
import { props as __stylex_props } from '@stylexjs/stylex'
