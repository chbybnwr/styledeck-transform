export { App }

const nestedHoverStyles = {
  default: 'blue',
}

function App() {
  return (
    <div
      styleDeck={{
        fontSize: {
          default: '1rem',
          ':hover': {
            ...nestedHoverStyles,
          },
        },
      }}
    />
  )
}
