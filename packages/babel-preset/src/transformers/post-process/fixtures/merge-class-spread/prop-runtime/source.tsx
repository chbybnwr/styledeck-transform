export { Component }

function Component(props: object) {
  return (
    <div
      data-styledeck-spread
      {...props}
      data-styledeck
      {...stylexProps(textSize.xl)}
    />
  )
}

import { props as stylexProps } from '@stylexjs/stylex'
import { textSize } from 'solarwindcss'
//
