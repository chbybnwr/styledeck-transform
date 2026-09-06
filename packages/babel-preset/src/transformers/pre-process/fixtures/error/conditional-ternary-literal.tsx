export { SaveButton }

function SaveButton({ isEnabled }: { isEnabled: boolean }) {
  return (
    <button
      styleDeck={
        isEnabled
          ? {
              fontStyle: 'italic',
            }
          : {
              fontStyle: 'normal',
            }
      }
    >
      Save changes
    </button>
  )
}
