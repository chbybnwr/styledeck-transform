export { Example }

function Example(props: IntrinsicElementAttributes['div']) {
  return (
    <div
      {...__styledeck_mergeAttrs(
        {
          ...props,
        },
        __stylex_attrs(),
      )}
    />
  )
}

import { '~toAttrs' as __stylex_attrs } from 'styledeck'
import type { IntrinsicElementAttributes } from 'vue'
//

import { '~mergeAttrs' as __styledeck_mergeAttrs } from 'styledeck'
