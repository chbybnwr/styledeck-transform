export { styleDeck }

const styleDeck = defineStyleDeck([
  textSize.xl,
  {
    color: 'red',
  },
] satisfies StyleDeck)

import { defineStyleDeck } from 'styledeck'
import type { StyleDeck } from 'styledeck'
import { textSize } from 'solarwindcss'
//
