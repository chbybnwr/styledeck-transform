export { Component }

function Component(className: string) {
  return (
    <div
      {...__styledeck_mergeClassName(className, { className: 'alpha bravo' })}
    />
  )
}

import { '~mergeClassName' as __styledeck_mergeClassName } from 'styledeck'
