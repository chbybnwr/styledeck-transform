export { Component }

function Component(props: object) {
  return (
    <div
      data-styledeck-spread
      {...props}
      data-styledeck
      className='alpha bravo'
    />
  )
}
