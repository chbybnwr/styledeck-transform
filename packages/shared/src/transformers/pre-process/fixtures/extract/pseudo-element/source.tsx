export { Hero }

function Hero({ isEnabled }: { isEnabled: boolean }) {
  return (
    <h1
      styleDeck={{
        '::before': {
          fontWeight: isEnabled ? 'normal' : 'bold',
          fontSize: '1rem',
          backgroundColor: () => 'black',
          color: isEnabled && 'black',
          [color.primary]: {
            default: () => 'blue',
            '@container (width > 1440px)': {
              default: 'green',
              ':hover': () => 'red',
            },
          },
          display: 'flex',
        },
        color: 'red',
        backgroundColor: () => 'blue',
      }}
    >
      Welcome back
    </h1>
  )
}

const color = stylex.defineVars({
  primary: null,
})

import * as stylex from '@stylexjs/stylex'
//
