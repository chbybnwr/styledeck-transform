export { Example }

function Example({ isEnabled }: { isEnabled: boolean }) {
  return (
    <div
      styleDeck={[
        isEnabled
          ? [
              lineClamp.base,
              {
                WebkitLineClamp: 3,
              },
            ]
          : lineClamp.none,
        {
          color: 'red',
        },
      ]}
    />
  )
}

import { lineClamp } from 'solarwindcss'
//
