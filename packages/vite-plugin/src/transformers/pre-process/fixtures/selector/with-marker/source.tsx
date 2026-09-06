export { App }

const marker = defineMarker()

function App() {
  return (
    <div
      styleDeck={{
        color: {
          default: null,
          [ancestor(marker, ':hover', ':focus')]: 'red',
        },
      }}
    />
  )
}

import { ancestor } from 'styledeck'
import { defineMarker } from '@stylexjs/stylex'
//
