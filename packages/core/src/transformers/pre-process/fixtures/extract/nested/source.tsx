export { Example }

function Example() {
  return (
    <div
      styleDeck={[
        [
          lineClamp.base,
          {
            WebkitLineClamp: 3,
          },
        ],
        {
          color: 'red',
        },
      ]}
    />
  )
}

import { lineClamp } from 'solarwindcss'
//
