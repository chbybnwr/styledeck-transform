export { Example }

function Example() {
  return <Component styleDeck={[textSize.xl, styles.foo('red')]} />
}

const styles = create({
  foo: (color: string) => ({
    color,
  }),
})

import { Component } from '#/test/fixtures/component'
import { create } from '@stylexjs/stylex'
import { textSize } from 'solarwindcss'
//
