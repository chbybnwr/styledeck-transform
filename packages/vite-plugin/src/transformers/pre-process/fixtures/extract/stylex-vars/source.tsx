export { Container }

function Container({
  secondary,
  children,
}: {
  secondary: string
  children: VNode
}) {
  return (
    <div
      styleDeck={{
        [color.primary]: 'blue',
        [color.secondary]: () => secondary,
      }}
    >
      {children}
    </div>
  )
}

const color = stylex.defineVars({
  primary: null,
  secondary: null,
})

import * as stylex from '@stylexjs/stylex'
import type { VNode } from 'vue'
//
