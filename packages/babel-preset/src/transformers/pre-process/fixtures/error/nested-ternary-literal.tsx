export { Example }

function Example({ isEnabled }: { isEnabled: boolean }) {
  return (
    <div
      styleDeck={[
        isEnabled
          ? [
              lineClamped,
              {
                WebkitLineClamp: 3,
              },
            ]
          : notLineClamped,
        {
          color: 'red',
        },
      ]}
    />
  )
}

import { lineClamped } from 'solarwindcss'
import { notLineClamped } from 'solarwindcss'
//
