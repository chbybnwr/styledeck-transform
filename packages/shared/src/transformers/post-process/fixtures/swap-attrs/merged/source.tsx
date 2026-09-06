export { Example }

function Example(props: IntrinsicElementAttributes['div']) {
  return (
    <div
      data-styledeck-spread
      {...props}
      data-styledeck
      {...__stylex_attrs()}
    />
  )
}

import { attrs as __stylex_attrs } from '@stylexjs/stylex'
import type { IntrinsicElementAttributes } from 'vue'
//
