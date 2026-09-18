export type { Options }

/**
 * @public
 */
interface Options {
  /**
   * JSX attribute schema to use when compiling styles. This determines the
   * generated class attribute name and whether the style attribute value is
   * compiled to a string or an object. Defaults to the convention detected
   * from the project's JSX import source.
   */
  jsxAttributeSchema?: JSXAttributeSchema | undefined

  /**
   * Glob patterns for module names whose imported components should be treated
   * like native JSX elements when transforming StyleDeck. Their StyleDeck
   * value is compiled into the normal `className` or `class` props rather than
   * being passed through a component-specific style prop.
   * Example: `['@base-ui/react/*']`.
   */
  unstyledComponentModules?: string[] | undefined
}

import type { JSXAttributeSchema } from '#/jsx-attribute-schema.js'
//
