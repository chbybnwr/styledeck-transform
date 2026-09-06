export { Component }

function Component() {
  return (
    <div
      {...__styledeck_mergeClass(
        'foo bar',
        { 0: {}, 1: {} }[Math.random() > 0.8 ? 0 : 1],
      )}
    />
  )
}

import { '~mergeClass' as __styledeck_mergeClass } from 'styledeck'
