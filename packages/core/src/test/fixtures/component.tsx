export { Component }

function Component({
  styleDeck,
  labelStyleDeck,
}: {
  styleDeck?: StyleDeck
  labelStyleDeck?: StyleDeck
}) {
  return (
    <div
      styleDeck={[
        {
          color: 'black',
        },
        styleDeck,
      ]}
    >
      Lorem ipsum
      <div styleDeck={labelStyleDeck}>label</div>
    </div>
  )
}

import type { StyleDeck } from 'styledeck'
//
