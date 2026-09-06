export { Component }

function Component(props: object) {
  return (
    <div
      {...__styledeck_mergeProps(
        {
          ...props,
        },
        {
          className: 'alpha bravo',
        },
      )}
    />
  )
}

import { '~mergeProps' as __styledeck_mergeProps } from 'styledeck'
