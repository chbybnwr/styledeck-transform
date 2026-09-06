export { Hero }

function Hero() {
  return (
    <h1
      styleDeck={{
        fontSize: {
          default: '1.5rem',
          '@media (min-width: 768px)': '2.25rem',
        },
      }}
    >
      Welcome back
    </h1>
  )
}
