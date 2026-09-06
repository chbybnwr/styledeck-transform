export { Component }

function Component() {
  // @ts-expect-error for test purpose
  return <div {...{}} namespaced:prop />
}
