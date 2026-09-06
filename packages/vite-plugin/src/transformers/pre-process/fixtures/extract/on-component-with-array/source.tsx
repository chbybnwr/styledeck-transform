export { Example }

function Example() {
  return (
    <Component
      styleDeck={{
        color: 'blue',
        backgroundColor: () => 'green',
      }}
    />
  )
}

import { Component } from '#/test/fixtures/component'
//
