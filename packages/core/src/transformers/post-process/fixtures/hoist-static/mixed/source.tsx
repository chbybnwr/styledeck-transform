export { Example }

function Example() {
  return (
    <Component
      styleDeck={textSize.xl}
      labelStyleDeck={[textSize.xl, font.mono, antialiased]}
    />
  )
}

import { antialiased } from 'solarwindcss'
import { Component } from '#/test/fixtures/component'
import { font } from 'solarwindcss'
import { textSize } from 'solarwindcss'
//
