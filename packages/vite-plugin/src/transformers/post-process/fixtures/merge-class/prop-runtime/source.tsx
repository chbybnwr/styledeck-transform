export { Component }

function Component() {
  return (
    <div
      data-styledeck-class='foo bar'
      data-styledeck
      {...stylexProps(textSize.xl)}
    />
  )
}

import { props as stylexProps } from '@stylexjs/stylex'
import { textSize } from 'solarwindcss'
//
