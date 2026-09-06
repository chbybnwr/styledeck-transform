export { ProgressBar }

function ProgressBar() {
  return (
    <div
      styleDeck={{
        color: {
          default() {
            return 'red'
          },
        },
      }}
    />
  )
}
