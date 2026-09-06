test.each([
  { label: 'merge-class/attr' },
  { label: 'merge-class/attr-logical' },
  { label: 'merge-class/attr-runtime' },
  //
])('$label', async ({ label }) => {
  const transform = createPostProcessFn({
    jsxAttributeSchema: 'html-attributes',
  })
  const { source, target } = await fixtureLoader.load(label)
  const result = transform(source)

  expect.assert(result != null)
  expect(await format(result.code)).toBe(target)
})

test.each([
  { label: 'merge-class-spread/attr' },
  { label: 'merge-class-spread/attr-logical' },
  { label: 'merge-class-spread/attr-runtime' },
  //
])('$label', async ({ label }) => {
  const transform = createPostProcessFn({
    jsxAttributeSchema: 'html-attributes',
  })
  const { source, target } = await fixtureLoader.load(label)
  const result = transform(source)

  expect.assert(result != null)
  expect(await format(result.code)).toBe(target)
})

test.each([
  { label: 'merge-class/prop' },
  { label: 'merge-class/prop-logical' },
  { label: 'merge-class/prop-runtime' },
  { label: 'merge-class/prop-with-dynamic-class' },
  { label: 'merge-class/prop-runtime-with-dynamic-class' },
  //
])('$label', async ({ label }) => {
  const transform = createPostProcessFn({
    jsxAttributeSchema: 'dom-properties',
  })
  const { source, target } = await fixtureLoader.load(label)
  const result = transform(source)

  expect.assert(result != null)
  expect(await format(result.code)).toBe(target)
})

test.each([
  { label: 'merge-class-spread/prop' },
  { label: 'merge-class-spread/prop-logical' },
  // { label: 'merge-class-spread/prop-runtime' },
  //
])('$label', async ({ label }) => {
  const transform = createPostProcessFn({
    jsxAttributeSchema: 'dom-properties',
  })
  const { source, target } = await fixtureLoader.load(label)
  const result = transform(source)

  expect.assert(result != null)
  expect(await format(result.code)).toBe(target)
})

test.each([
  { label: 'merge-class/skip/no-relevant-props' },
  //
])('$label', async ({ label }) => {
  const transform = createPostProcessFn()
  const id = new URL(`fixtures/${label}.tsx`, import.meta.url).pathname
  const code = await readFile(id, { encoding: 'utf8' })
  const result = transform(code)

  expect(result).toBeNull()
})

test.fails.each([
  { label: 'hoist-static/single' },
  { label: 'hoist-static/multiple' },
  { label: 'hoist-static/mixed' },
  //
])('$label', async ({ label }) => {
  const transform = createPostProcessFn()
  const { source, target } = await fixtureLoader.load(label)
  const result = transform(source)

  expect.assert(result != null)
  expect(await format(result.code)).toBe(target)
})

test.each([
  { label: 'hoist-static/skip/logical' },
  { label: 'hoist-static/skip/dynamic' },
  //
])('$label', async ({ label }) => {
  const transform = createPostProcessFn()
  const id = new URL(`fixtures/${label}.tsx`, import.meta.url).pathname
  const code = await readFile(id, { encoding: 'utf8' })
  const result = transform(code)

  expect(result).toBeNull()
})

test.each([
  { label: 'swap-attrs/standalone' },
  { label: 'swap-attrs/merged' },
  //
])('$label', async ({ label }) => {
  const transform = createPostProcessFn({
    jsxAttributeSchema: 'html-attributes',
  })
  const { source, target } = await fixtureLoader.load(label)
  const result = transform(source)

  expect.assert(result != null)
  expect(await format(result.code)).toBe(target)
})

const fixtureLoader = createFixtureLoader({
  baseUrl: import.meta.url,
})

import { createFixtureLoader } from '#/test/utils/fixture-loader'
import { createPostProcessFn } from '#/transformers/post-process'
import { expect } from 'vitest'
import { format } from '#/test/utils/formatter'
import { readFile } from 'node:fs/promises'
import { test } from 'vitest'
//
