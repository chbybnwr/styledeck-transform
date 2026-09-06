export { Parent }

function Parent() {
  return (
    <ComponentAlias
      styleDeck={{
        color: 'red',
      }}
    />
  )
}

import { Component as ComponentAlias } from '#/test/fixtures/unstyled'
//
