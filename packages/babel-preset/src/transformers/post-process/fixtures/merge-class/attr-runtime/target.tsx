export { Component }

function Component() {
  return (
    <div {...__styledeck_mergeClass('foo bar', stylexAttrs(textSize.xl))} />
  )
}

import { attrs as stylexAttrs } from '@stylexjs/stylex'
import { textSize } from 'solarwindcss'
//

import { '~mergeClass' as __styledeck_mergeClass } from 'styledeck'
