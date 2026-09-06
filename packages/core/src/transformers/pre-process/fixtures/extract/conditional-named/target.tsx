export { SaveButton }

function SaveButton({ isEnabled }: { isEnabled: boolean }) {
  return (
    <button {...__stylex_props(isEnabled && antialiased)}>Save changes</button>
  )
}

import { antialiased } from 'solarwindcss'
//

import { props as __stylex_props } from '@stylexjs/stylex'
