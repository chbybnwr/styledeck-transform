export { SaveButton }

function SaveButton({ isEnabled }: { isEnabled: boolean }) {
  return (
    <button
      styleDeck={
        isEnabled && {
          fontWeight: 'bold',
        }
      }
    >
      Save changes
    </button>
  )
}
