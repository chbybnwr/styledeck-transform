export { Component }

function Component() {
  return (
    <div
      data-styledeck-class='foo bar'
      data-styledeck
      {...{ 0: {}, 1: {} }[Math.random() > 0.8 ? 0 : 1]}
    />
  )
}
