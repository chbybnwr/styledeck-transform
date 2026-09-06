export { Timestamp }

function Timestamp() {
  return (
    <time
      styleDeck={[
        {
          color: 'black',
        },
        typography.caption,
      ]}
    >
      2 minutes ago
    </time>
  )
}

const typography = stylex.create({
  caption: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    fontStyle: 'italic',
  },
})

import * as stylex from '@stylexjs/stylex'
//
