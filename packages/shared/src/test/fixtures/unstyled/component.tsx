export { Component }

function Component(props: IntrinsicElementAttributes['div']) {
  return <div {...props}>Lorem ipsum</div>
}

import type { IntrinsicElementAttributes } from 'vue'
