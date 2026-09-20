# @styledeck/vite-plugin

[![npm version](https://img.shields.io/npm/v/@styledeck/vite-plugin.svg?style=flat-square)](https://www.npmjs.com/package/@styledeck/vite-plugin)
[![build](https://img.shields.io/github/actions/workflow/status/chbybnwr/styledeck-transform/vite-plugin/publish.yml?label=build&style=flat-square)](https://github.com/chbybnwr/styledeck-transform/actions/workflows/publish-vite-plugin.yml)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/chbybnwr/styledeck-transform/blob/main/LICENSE)

Vite plugin for [StyleDeck](https://github.com/chbybnwr/styledeck)

## Setup

```bash
npm install --save-dev @styledeck/vite-plugin
```

Add it to Vite config.

```ts
import { defineConfig } from 'vite'
import styleDeck from '@styledeck/vite-plugin'

export default defineConfig({
  plugins: [
    styleDeck({
      // ...options
    }),
    // ...other plugins
  ],
})
```

## Options

### `jsxAttributeSchema`

`'dom-properties' | 'html-attributes'`

Controls the JSX attribute names used for compiled styles and whether the
style attribute value is compiled to a string or an object. The plugin detects this
from the project's `jsxImportSource` by default. Set it explicitly when the
project uses a custom JSX runtime or when multiple JSX conventions are in use.

### `unstyledComponentModules`

`string[]`

Glob patterns for modules whose imported components should be treated like
native JSX elements when transforming StyleDeck. Their StyleDeck value is
compiled into the normal `className` or `class` props rather than being passed
through a component-specific style prop. This is useful for component
libraries whose components accept native styling props.

Example:

```ts
styleDeck({
  unstyledComponentModules: ['@base-ui/react/*'],
})
```
