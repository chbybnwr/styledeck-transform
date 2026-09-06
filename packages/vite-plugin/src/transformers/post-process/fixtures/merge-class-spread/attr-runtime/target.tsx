export { Component }

function Component(props: object) {
  return (
    <div
      {...__styledeck_mergeAttrs(
        {
          ...props,
        },
        stylexAttrs(textSize.xl),
      )}
    />
  )
}

import { attrs as stylexAttrs } from '@stylexjs/stylex'
import { textSize } from 'solarwindcss'
//

import { '~mergeAttrs' as __styledeck_mergeAttrs } from 'styledeck'
