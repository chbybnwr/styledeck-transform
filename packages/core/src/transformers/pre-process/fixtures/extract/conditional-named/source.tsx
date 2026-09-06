export { SaveButton }

function SaveButton({ isEnabled }: { isEnabled: boolean }) {
  return <button styleDeck={isEnabled && antialiased}>Save changes</button>
}

import { antialiased } from 'solarwindcss'
//
