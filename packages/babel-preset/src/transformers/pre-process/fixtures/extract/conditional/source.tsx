export { SaveButton }

function SaveButton({ isEnabled }: { isEnabled: boolean }) {
  return (
    <button
      styleDeck={{
        backgroundColor: isEnabled ? 'blue' : 'gray',
        color: isEnabled && 'black',
        borderColor: isEnabled
          ? {
              default: 'blue',
              ':hover': 'green',
            }
          : 'gray',
      }}
    >
      Save changes
    </button>
  )
}
