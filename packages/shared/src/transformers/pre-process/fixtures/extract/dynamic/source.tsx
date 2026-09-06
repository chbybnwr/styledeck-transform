export { ProgressBar }

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div
      styleDeck={{
        width: () => `${percent.toString()}%`,
      }}
    />
  )
}
