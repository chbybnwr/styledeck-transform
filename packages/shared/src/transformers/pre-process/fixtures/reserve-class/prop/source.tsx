export { Component }

function Component() {
  return (
    <>
      <div
        className='foo bar'
        styleDeck={{
          color: 'red',
        }}
      />
      <div className='foo bar' />
    </>
  )
}
