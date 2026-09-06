export { Component }

function Component() {
  return (
    <>
      <div
        class='foo bar'
        styleDeck={{
          color: 'red',
        }}
      />
      <div class='foo bar' />
    </>
  )
}
