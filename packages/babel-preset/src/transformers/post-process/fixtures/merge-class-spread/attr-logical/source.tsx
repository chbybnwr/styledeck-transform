export { Component }

function Component(props: object) {
  return (
    <div
      data-styledeck-spread
      {...props}
      data-styledeck
      {...{ 0: {}, 1: {} }[Math.random() > 0.8 ? 0 : 1]}
    />
  )
}
