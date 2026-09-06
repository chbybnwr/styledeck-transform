export { Hero }

function Hero({ fontSize }: { fontSize: string }) {
  return (
    <h1
      styleDeck={{
        fontSize: {
          default: () => fontSize,
          '@media (min-width: 768px)': {
            default: () => fontSize,
            ':hover': '2.25rem',
          },
        },
        '::before': {
          color: () => 'black',
          [color.primary]: {
            default: () => 'blue',
            '@container (width > 1440px)': {
              default: 'green',
              ':hover': () => 'red',
            },
          },
        },
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
