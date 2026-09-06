export { Component }

function Component(props: object) {
  return (
    <div
      {...__styledeck_mergeProps(
        {
          ...props,
        },
        { 0: {}, 1: {} }[Math.random() > 0.8 ? 0 : 1],
      )}
    />
  )
}

import { '~mergeProps' as __styledeck_mergeProps } from 'styledeck'
