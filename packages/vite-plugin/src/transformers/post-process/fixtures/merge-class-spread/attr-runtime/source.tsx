export { Component }

function Component(props: object) {
  return (
    <div
      data-styledeck-spread
      {...props}
      data-styledeck
      {...stylexAttrs(textSize.xl)}
    />
  )
}

import { attrs as stylexAttrs } from '@stylexjs/stylex'
import { textSize } from 'solarwindcss'
//
