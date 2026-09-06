export { Component }

function Component() {
  return (
    <div
      data-styledeck-class='foo bar'
      data-styledeck
      {...stylexAttrs(textSize.xl)}
    />
  )
}

import { attrs as stylexAttrs } from '@stylexjs/stylex'
import { textSize } from 'solarwindcss'
//
