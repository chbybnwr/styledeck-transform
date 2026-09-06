export { Example }

function Example() {
  return (
    <Component styleDeck={[textSize.xl, Math.random() > 0.8 && font.mono]} />
  )
}

import { Component } from '#/test/fixtures/component'
import { font } from 'solarwindcss'
import { textSize } from 'solarwindcss'
//
