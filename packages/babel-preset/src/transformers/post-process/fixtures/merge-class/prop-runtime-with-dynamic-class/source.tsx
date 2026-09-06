export { Component }

function Component(className: string) {
  return (
    <div
      data-styledeck-class={className}
      data-styledeck
      {...stylexProps(textSize.xl)}
    />
  )
}

import { props as stylexProps } from '@stylexjs/stylex'
import { textSize } from 'solarwindcss'
//
