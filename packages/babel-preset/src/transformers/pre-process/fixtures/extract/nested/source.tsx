export { Example }

function Example() {
  return (
    <div
      styleDeck={[
        [
          lineClamped,
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

import { lineClamped } from 'solarwindcss'
//
