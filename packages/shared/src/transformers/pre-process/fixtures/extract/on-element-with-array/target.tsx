export { Timestamp }

function Timestamp() {
  return (
    <time {...__stylex_props(style_7_9._, typography.caption)}>
      2 minutes ago
    </time>
  )
}

const typography = stylex.create({
  caption: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    fontStyle: 'italic',
  },
})

import * as stylex from '@stylexjs/stylex'
//

const style_7_9 = __stylex_create({
  _: {
    color: 'black',
  },
})

import { create as __stylex_create } from '@stylexjs/stylex'
import { props as __stylex_props } from '@stylexjs/stylex'
