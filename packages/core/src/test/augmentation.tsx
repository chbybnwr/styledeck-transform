export {}

declare module 'vue' {
  interface HTMLAttributes {
    styleDeck?: StyleDeck | undefined
    className?: ClassValue | undefined
  }

  interface SVGAttributes {
    styleDeck?: StyleDeck | undefined
    className?: ClassValue | undefined
  }
}

import type { ClassValue } from 'vue'
import type { StyleDeck } from 'styledeck'
//
