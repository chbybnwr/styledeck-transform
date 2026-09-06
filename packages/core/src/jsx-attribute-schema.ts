export { getJSXAttributeSchema }
export type { JSXAttributeSchema }

const cache: {
  jsxAttributeSchema: JSXAttributeSchema | null
} = {
  jsxAttributeSchema: null,
}

const defaultJSXAttributeSchema: JSXAttributeSchema = 'dom-properties'

function getJSXAttributeSchema(): JSXAttributeSchema {
  if (cache.jsxAttributeSchema != null) {
    return cache.jsxAttributeSchema
  }

  const rootConfigPath = ts.findConfigFile('./', (fileName) =>
    ts.sys.fileExists(fileName),
  )

  if (typeof rootConfigPath !== 'string') {
    console.info(
      `[styledeck] tsconfig not found, jsxAttributeSchema is set to ${defaultJSXAttributeSchema}`,
    )

    return defaultJSXAttributeSchema
  }

  const rootConfig = ts.getParsedCommandLineOfConfigFile(
    rootConfigPath,
    {},
    // @ts-expect-error let me in pls
    ts.sys,
  )

  const configPathList = [
    rootConfigPath,
    ...(rootConfig?.projectReferences ?? []).map((reference) =>
      ts.resolveProjectReferencePath(reference),
    ),
  ]

  const jsxExtensionList = ['.jsx', '.tsx']

  const jsxAttributeSchemaSet = new Set(
    configPathList.flatMap((configPath) => {
      const config = (() => {
        try {
          return ts.getParsedCommandLineOfConfigFile(
            configPath,
            {},
            // @ts-expect-error let me in pls
            ts.sys,
          )
        } catch {
          console.warn(`[styledeck] File not found. Skipping ${configPath}`)

          return
        }
      })()

      if (config == null) {
        return []
      }

      const { jsxImportSource } = config.options

      if (jsxImportSource == null) {
        return []
      }

      const isIncludingJsxFiles = config.fileNames.some((fileName) =>
        jsxExtensionList.some((extension) => fileName.endsWith(extension)),
      )

      if (!isIncludingJsxFiles) {
        return []
      }

      return [jsxAttributeSchemaByImportSource.get(jsxImportSource)]
    }),
  )

  if (jsxAttributeSchemaSet.size > 1) {
    throw new Error(
      '[styledeck] Unable to determine jsxAttributeSchema. Set it manually in config!',
    )
  }

  cache.jsxAttributeSchema = (() => {
    const jsxAttributeSchema = jsxAttributeSchemaSet.values().next().value

    if (jsxAttributeSchema == null) {
      console.warn(
        `[styledeck] Unable to determine jsxAttributeSchema, falling back to ${defaultJSXAttributeSchema}`,
      )

      return defaultJSXAttributeSchema
    }

    console.info(
      `[styledeck] jsxAttributeSchema is set to ${jsxAttributeSchema}`,
    )

    return jsxAttributeSchema
  })()

  return cache.jsxAttributeSchema
}

type JSXAttributeSchema = 'dom-properties' | 'html-attributes'

const jsxAttributeSchemaByImportSource = new Map<string, JSXAttributeSchema>([
  ['@builder.io/qwik', 'html-attributes'],
  ['@emotion/react', 'dom-properties'],
  ['@hono/hono/jsx', 'html-attributes'],
  ['@stencil/core', 'html-attributes'],
  ['hono/jsx', 'html-attributes'],
  ['preact', 'html-attributes'],
  ['react', 'dom-properties'],
  ['solid-js', 'html-attributes'],
  ['theme-ui', 'dom-properties'],
  ['vue', 'html-attributes'],
])

import ts from '@typescript/typescript6'
//
