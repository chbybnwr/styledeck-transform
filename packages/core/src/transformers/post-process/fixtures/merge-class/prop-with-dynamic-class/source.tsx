export { Component }

function Component(className: string) {
  return (
    <div
      data-styledeck-class={className}
      data-styledeck
      className='alpha bravo'
    />
  )
}
