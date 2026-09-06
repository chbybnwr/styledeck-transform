# @vicinage/unplugin &middot; [![npm version](https://img.shields.io/npm/v/@vicinage/unplugin.svg?style=flat-square)](https://www.npmjs.com/package/@vicinage/unplugin) [![build](https://img.shields.io/github/actions/workflow/status/chbybnwr/vicinage-unplugin/publish.yml?label=build&style=flat-square)](https://github.com/chbybnwr/vicinage-unplugin/actions/workflows/publish.yml) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/chbybnwr/vicinage-unplugin/blob/prototype/LICENSE)

Universal bundler plugin for [Vicinage](https://github.com/chbybnwr/vicinage).

## Setup

```bash
npm install --save-dev @vicinage/unplugin @stylexjs/unplugin
```

Put Vicinage before StyleX.

```ts
import { defineConfig } from 'vite'
import vicinage from '@vicinage/unplugin'
import stylex from '@stylexjs/unplugin'

export default defineConfig({
  plugins: [vicinage.vite(), stylex.vite()],
})
```
