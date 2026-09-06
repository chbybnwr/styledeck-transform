export { Component }

function Component() {
  return (
    <div
      {...__styledeck_mergeClassName(
        'foo bar',
        { 0: {}, 1: {} }[Math.random() > 0.8 ? 0 : 1],
      )}
    />
  )
}

import { '~mergeClassName' as __styledeck_mergeClassName } from 'styledeck'
