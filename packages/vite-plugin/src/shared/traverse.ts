export { traverse }

const traverse =
  (traversal as { default?: typeof traversal }).default ?? traversal

import traversal from '@babel/traverse'
//
