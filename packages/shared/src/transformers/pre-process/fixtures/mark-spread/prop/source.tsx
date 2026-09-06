export { Component }

function Component(props: object) {
  return (
    <>
      <div
        {...props}
        styleDeck={{
          color: 'red',
        }}
        class='foo'
      />
      <div {...props} />
    </>
  )
}
