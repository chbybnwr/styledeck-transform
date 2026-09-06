export { styleDeck }

const styleDeck = defineStyleDeck({
  color: 'red',
  backgroundColor: {
    default: null,
    ':hover': 'red',
  },
} satisfies StyleDeck)

import { defineStyleDeck } from 'styledeck'
import type { StyleDeck } from 'styledeck'
//
