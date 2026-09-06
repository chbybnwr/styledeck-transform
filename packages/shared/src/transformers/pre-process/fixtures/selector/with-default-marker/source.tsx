export { App }

function App() {
  return (
    <div
      styleDeck={{
        color: {
          default: null,
          [ancestor(defaultMarker(), ':hover', ':focus')]: 'red',
        },
      }}
    />
  )
}

import { ancestor } from 'styledeck'
import { defaultMarker } from '@stylexjs/stylex'
//
