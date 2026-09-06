export { Component }

function Component(props: object) {
  return (
    <div
      {...__styledeck_mergeAttrs(
        {
          'data-literal': 'text',
          'data-expression': null,
          'data-boolean': true,
          ...props,
        },
        {
          class: 'alpha bravo',
        },
      )}
    />
  )
}

import { '~mergeAttrs' as __styledeck_mergeAttrs } from 'styledeck'
