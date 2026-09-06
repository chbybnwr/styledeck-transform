export { App }

function App() {
  return (
    <div
      styleDeck={{
        color: {
          default: null,
          [selector(':hover', ':focus')]: 'red',
        },
      }}
    />
  )
}

import { selector } from 'styledeck'
//
