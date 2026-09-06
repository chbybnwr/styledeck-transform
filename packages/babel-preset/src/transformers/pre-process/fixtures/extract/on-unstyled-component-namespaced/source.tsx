export { Parent }

function Parent() {
  return (
    <Unstyled.Component
      styleDeck={{
        color: 'red',
      }}
    />
  )
}

import * as Unstyled from '#/test/fixtures/unstyled'
//
