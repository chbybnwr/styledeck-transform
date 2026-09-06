export { Component }

function Component() {
  return (
    <div {...__styledeck_mergeClassName('foo bar', stylexProps(textSize.xl))} />
  )
}

import { props as stylexProps } from '@stylexjs/stylex'
import { textSize } from 'solarwindcss'
//

import { '~mergeClassName' as __styledeck_mergeClassName } from 'styledeck'
