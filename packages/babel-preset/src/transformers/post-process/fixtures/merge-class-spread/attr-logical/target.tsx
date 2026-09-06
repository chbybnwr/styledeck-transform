export { Component }

function Component(props: object) {
  return (
    <div
      {...__styledeck_mergeAttrs(
        {
          ...props,
        },
        { 0: {}, 1: {} }[Math.random() > 0.8 ? 0 : 1],
      )}
    />
  )
}

import { '~mergeAttrs' as __styledeck_mergeAttrs } from 'styledeck'
