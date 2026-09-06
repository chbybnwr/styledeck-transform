export { ProgressBar }

function ProgressBar() {
  return (
    <div
      styleDeck={{
        opacity: {
          default: function () {
            return 0
          },
        },
      }}
    />
  )
}
