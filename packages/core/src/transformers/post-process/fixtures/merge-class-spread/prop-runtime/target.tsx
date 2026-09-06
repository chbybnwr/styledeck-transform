export { Component }

function Component(props: object) {
  return (
    <div
      {...__styledeck_mergeProps(
        {
          ...props,
        },
        stylexProps(textSize.xl),
      )}
    />
  )
}

import { props as stylexProps } from '@stylexjs/stylex'
import { textSize } from 'solarwindcss'
//

import { '~mergeProps' as __styledeck_mergeProps } from 'styledeck'
