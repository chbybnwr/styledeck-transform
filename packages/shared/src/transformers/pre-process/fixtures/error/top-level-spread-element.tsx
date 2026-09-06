export { App }

const baseStyles = {
  color: 'red',
}

function App() {
  return (
    <div
      styleDeck={{
        ...baseStyles,
        fontSize: '1rem',
      }}
    />
  )
}
