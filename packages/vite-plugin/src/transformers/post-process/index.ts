/* eslint-disable @typescript-eslint/no-non-null-assertion */

export { createPostProcessFn }

const createPostProcessFn = (
  options:
    | (Options & {
        isHoistingStaticStyles?: boolean
      })
    | undefined = {},
) => {
  const {
    jsxAttributeSchema = getJSXAttributeSchema(),
    isHoistingStaticStyles = false,
  } = options
  const htmlClass =
    jsxAttributeSchema === 'dom-properties' ? 'className' : 'class'
  const mergeClassFnName =
    jsxAttributeSchema === 'dom-properties' ? `mergeClassName` : `mergeClass`
  const mergePropsFnName =
    jsxAttributeSchema === 'dom-properties' ? 'mergeProps' : 'mergeAttrs'

  return (
    code: string,
    context?: {
      ast?: ParseResult
    },
  ): Exclude<TransformResult, string> => {
    const ast =
      context?.ast ??
      parse(code, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
      })

    const editor = new MagicString(code)
    const helperImports = new Set<string>()

    traverse(ast, {
      JSXOpeningElement: (path) => {
        const { node } = path

        let reservedClassAttribute: JSXAttribute | undefined
        let markerAttributeIndex: number | undefined

        for (const [index, attribute] of node.attributes.entries()) {
          if (isJSXSpreadAttribute(attribute)) {
            continue
          }

          if (!isJSXIdentifier(attribute.name)) {
            continue
          }

          const attributeIdentifier = attribute.name

          if (attributeIdentifier.name === 'data-styledeck-class') {
            reservedClassAttribute = attribute
          } else if (attributeIdentifier.name === 'data-styledeck') {
            markerAttributeIndex = index
          }

          if (
            isHoistingStaticStyles &&
            (attributeIdentifier.name === 'styleDeck' ||
              attributeIdentifier.name.endsWith('StyleDeck')) &&
            isJSXExpressionContainer(attribute.value)
          ) {
            if (!isArrayExpression(attribute.value.expression)) {
              continue
            }

            const arrayExpression = attribute.value.expression

            if (
              arrayExpression.elements.some(
                (element) =>
                  !(isIdentifier(element) || isMemberExpression(element)),
              )
            ) {
              continue
            }

            const styleDeckIdentifier = [
              `styleDeck`,
              arrayExpression.loc!.start.line,
              arrayExpression.loc!.start.column + 1,
            ].join('_')

            editor.overwrite(
              arrayExpression.start!,
              arrayExpression.end!,
              styleDeckIdentifier,
            )

            editor.append(
              [
                '\n',
                `const ${styleDeckIdentifier} = ${code.slice(arrayExpression.start!, arrayExpression.end!)}`,
                '\n',
              ].join(''),
            )
          }
        }

        if (markerAttributeIndex == null) {
          return
        }

        const compiledAttribute = node.attributes[markerAttributeIndex + 1]!
        const firstAttr = node.attributes[0]

        const hasSpreadAttr =
          isJSXAttribute(firstAttr) &&
          isJSXIdentifier(firstAttr.name) &&
          firstAttr.name.name === 'data-styledeck-spread'

        if (hasSpreadAttr) {
          const skippedIndexList = new Set([
            0,
            markerAttributeIndex,
            markerAttributeIndex + 1,
          ])

          const combinedAttrs = node.attributes.flatMap((attribute, index) => {
            if (skippedIndexList.has(index)) {
              return []
            }

            if (isJSXSpreadAttribute(attribute)) {
              return [
                `...${code.slice(attribute.argument.start!, attribute.argument.end!)}`,
              ]
            }

            const value =
              attribute.value == null
                ? 'true'
                : isJSXExpressionContainer(attribute.value)
                  ? code.slice(
                      attribute.value.expression.start!,
                      attribute.value.expression.end!,
                    )
                  : code.slice(attribute.value.start!, attribute.value.end!)

            return [
              `'${code.slice(
                attribute.name.start!,
                attribute.name.end!,
              )}': ${value}`,
            ]
          })

          const compiledValue = isJSXAttribute(compiledAttribute)
            ? [
                '{',
                `${code.slice(
                  compiledAttribute.name.start!,
                  compiledAttribute.name.end!,
                )}: ${code.slice(compiledAttribute.value!.start!, compiledAttribute.value!.end!)}`,
                '}',
              ].join('\n')
            : code.slice(
                compiledAttribute.argument.start!,
                compiledAttribute.argument.end!,
              )

          editor.overwrite(
            firstAttr.start!,
            node.attributes.at(-1)!.end!,
            [
              `{...__styledeck_${mergePropsFnName}(`,
              '  {',
              `    ${combinedAttrs.join(',')}`,
              '  },',
              `  ${compiledValue}`,
              ')}',
            ].join('\n'),
          )

          helperImports.add(
            `import { '~${mergePropsFnName}' as __styledeck_${mergePropsFnName} } from 'styledeck'`,
          )

          return
        }

        if (reservedClassAttribute?.value == null) {
          return
        }

        const markerAttribute = node.attributes[markerAttributeIndex]!

        if (isJSXAttribute(compiledAttribute)) {
          if (isStringLiteral(reservedClassAttribute.value)) {
            editor.overwrite(
              reservedClassAttribute.start!,
              reservedClassAttribute.end!,
              `${htmlClass}='${[
                reservedClassAttribute.value.value,
                (compiledAttribute.value! as StringLiteral).value,
              ].join(' ')}'`,
            )
          } else if (isJSXExpressionContainer(reservedClassAttribute.value)) {
            editor.overwrite(
              reservedClassAttribute.start!,
              reservedClassAttribute.end!,
              `{...__styledeck_${mergeClassFnName}(${[
                code.slice(
                  reservedClassAttribute.value.expression.start!,
                  reservedClassAttribute.value.expression.end!,
                ),

                [
                  '{',
                  `  ${htmlClass}: ${code.slice(
                    compiledAttribute.value!.start!,
                    compiledAttribute.value!.end!,
                  )}`,
                  '}',
                ].join(''),
              ].join(',')})}`,
            )

            helperImports.add(
              `import { '~${mergeClassFnName}' as __styledeck_${mergeClassFnName} } from '${pluginName}'`,
            )
          }
        } else {
          const originalClass = isJSXExpressionContainer(
            reservedClassAttribute.value,
          )
            ? code.slice(
                reservedClassAttribute.value.expression.start!,
                reservedClassAttribute.value.expression.end!,
              )
            : code.slice(
                reservedClassAttribute.value.start!,
                reservedClassAttribute.value.end!,
              )

          editor.overwrite(
            reservedClassAttribute.start!,
            reservedClassAttribute.end!,
            `{...__styledeck_${mergeClassFnName}(${[
              originalClass,
              code.slice(
                compiledAttribute.argument.start!,
                compiledAttribute.argument.end!,
              ),
            ].join(',')})}`,
          )

          helperImports.add(
            `import { '~${mergeClassFnName}' as __styledeck_${mergeClassFnName} } from '${pluginName}'`,
          )
        }

        editor.remove(markerAttribute.start!, compiledAttribute.end!)
      },
    })

    if (jsxAttributeSchema === 'html-attributes') {
      editor.replaceAll(
        `import { attrs as __stylex_attrs } from '@stylexjs/stylex'`,
        `import { '~toAttrs' as __stylex_attrs } from '${pluginName}'`,
      )
    }

    if (helperImports.size > 0) {
      editor.append('\n' + [...helperImports].join('\n'))
    }

    if (!editor.hasChanged()) {
      return null
    }

    return {
      code: editor.toString(),
      map: editor.generateMap(),
    }
  }
}

import { getJSXAttributeSchema } from '#/jsx-attribute-schema.js'
import { isArrayExpression } from '@babel/types'
import { isIdentifier } from '@babel/types'
import { isJSXAttribute } from '@babel/types'
import { isJSXExpressionContainer } from '@babel/types'
import { isJSXIdentifier } from '@babel/types'
import { isJSXSpreadAttribute } from '@babel/types'
import { isMemberExpression } from '@babel/types'
import { isStringLiteral } from '@babel/types'
import type { JSXAttribute } from '@babel/types'
import { MagicString } from 'magic-string'
import type { Options } from '#/options'
import { parse } from '@babel/parser'
import type { ParseResult } from '@babel/parser'
import { pluginName } from '#/shared/config'
import type { StringLiteral } from '@babel/types'
import type { TransformResult } from 'unplugin'
import { traverse } from '#/shared/traverse'
//
