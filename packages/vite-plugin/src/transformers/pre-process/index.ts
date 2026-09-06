/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

export { createPreProcessFn }

const indentSize = 2
const contextualClosureBaseLevel = 3

const ancestryMacroList = [
  'ancestor',
  'anySibling',
  'descendant',
  'siblingAfter',
  'siblingBefore',
] as const

const macroList = [
  'defineStyleDeck',
  'selector',
  ...ancestryMacroList,
  //
] as const

type Macro = typeof macroList extends readonly (infer U)[] ? U : never

const macroSet = new Set<string>(macroList)

function isMacro(name: string): name is Macro {
  return macroSet.has(name)
}

const stylexFnList = ['defaultMarker'] as const

type StylexFn = typeof stylexFnList extends readonly (infer U)[] ? U : never

const stylexFnSet = new Set<string>(stylexFnList)

function isStylexFn(name: string): name is StylexFn {
  return stylexFnSet.has(name)
}

const createPreProcessFn = (options: Options | undefined = {}) => {
  const {
    jsxAttributeSchema = getJSXAttributeSchema(),
    unstyledComponentModules = [],
  } = options
  const htmlClass =
    jsxAttributeSchema === 'dom-properties' ? 'className' : 'class'
  const unstyledComponentModuleGlobList = unstyledComponentModules.map(
    (glob) => ({
      match: createGlobMatcher(glob),
    }),
  )
  const stylexMacro =
    jsxAttributeSchema === 'dom-properties' ? 'props' : 'attrs'

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

    const macroAlias: Partial<Record<Macro, string>> = {}
    const stylexFnAlias: Partial<Record<StylexFn, string>> = {}

    const importDeclarationList = ast.program.body.filter((statement) =>
      isImportDeclaration(statement),
    )

    const macroImportDeclarationList: ImportDeclaration[] = []

    for (const declaration of importDeclarationList) {
      for (const specifier of declaration.specifiers) {
        if (!(
          isImportSpecifier(specifier) && isIdentifier(specifier.imported)
        )) {
          // eslint-disable-next-line unicorn/no-break-in-nested-loop
          continue
        }

        const { imported, local } = specifier

        if (declaration.source.value === pluginName && isMacro(imported.name)) {
          macroAlias[imported.name] = local.name
          macroImportDeclarationList.push(declaration)
        }

        if (
          declaration.source.value === '@stylexjs/stylex' &&
          isStylexFn(imported.name)
        ) {
          stylexFnAlias[imported.name] = local.name
        }
      }
    }

    const stylexImports = new Set<string>()

    return main()

    function main(): Exclude<TransformResult, string> {
      const editor = new MagicString(code)
      const hoistedStyles = new Set<string>()

      const unstyledComponentNameSet = new Set<string>(
        importDeclarationList.flatMap((declaration) => {
          if (
            unstyledComponentModuleGlobList.some((glob) =>
              glob.match(declaration.source.value),
            )
          ) {
            return declaration.specifiers.map(
              (specifier) => specifier.local.name,
            )
          }

          return []
        }),
      )

      traverse(ast, {
        JSXOpeningElement: (path) => {
          const element = path.node

          function getBinding() {
            if (
              isJSXIdentifier(element.name) &&
              unstyledComponentNameSet.has(element.name.name)
            ) {
              return path.scope.getBinding(element.name.name)
            }

            const rootIdentifier = isJSXMemberExpression(element.name)
              ? getJSXMemberExpressionRootIdentifier(element.name)
              : null

            if (
              rootIdentifier != null &&
              unstyledComponentNameSet.has(rootIdentifier.name)
            ) {
              return path.scope.getBinding(rootIdentifier.name)
            }

            return
          }

          const isComponent =
            (isJSXIdentifier(element.name) &&
              /^[A-Z]/u.test(element.name.name)) ||
            isJSXMemberExpression(element.name)

          const isUnstyledComponent =
            isComponent && isImportedBinding(getBinding())

          let styleDeckAttr: JSXAttribute | null = null
          let classAttr: JSXAttribute | null = null
          let hasSpreadAttr = false

          for (const attr of element.attributes) {
            if (!isJSXAttribute(attr)) {
              hasSpreadAttr = true

              continue
            }

            if (!isJSXIdentifier(attr.name)) {
              continue
            }

            const attrIdentifier = attr.name

            if (attrIdentifier.name === htmlClass) {
              classAttr = attr

              continue
            }

            if (!(
              attrIdentifier.name === 'styleDeck' ||
              attrIdentifier.name.endsWith('StyleDeck')
            )) {
              continue
            }

            if (!isJSXExpressionContainer(attr.value)) {
              throw new Error('Invalid styleDeck value')
            }

            const argList = isArrayExpression(attr.value.expression)
              ? attr.value.expression.elements
              : [attr.value.expression]

            const compiledArgs = argList.map((arg) =>
              compileStyleDeckArg(arg, { path }),
            )
            const finalArgs = compiledArgs.flatMap(({ keys }) => keys)
            const styleEntryList = compiledArgs.flatMap(({ map }) => [...map])

            for (const [key, value] of styleEntryList) {
              hoistedStyles.add(
                [
                  `const ${key} = __stylex_create({`,
                  `  _: ${value}`,
                  `})`,
                ].join('\n'),
              )
            }

            const joined = finalArgs.join(',')

            if (isComponent && !isUnstyledComponent) {
              editor.overwrite(
                attr.value.expression.start!,
                attr.value.expression.end!,
                finalArgs.length === 1 ? joined : `[${joined}]`,
              )

              continue
            }

            styleDeckAttr = attr

            editor.overwrite(
              attr.start!,
              attr.end!,
              `{...__stylex_${stylexMacro}(${joined})}`,
            )

            stylexImports.add(
              `import { ${stylexMacro} as __stylex_${stylexMacro} } from '@stylexjs/stylex'`,
            )
          }

          if (
            styleDeckAttr != null &&
            (hasSpreadAttr || classAttr != null) &&
            (!isComponent || isUnstyledComponent)
          ) {
            if (hasSpreadAttr) {
              editor.appendLeft(
                element.attributes[0]!.start!,
                'data-styledeck-spread ',
              )
            } else if (classAttr != null) {
              editor.overwrite(
                classAttr.name.start!,
                classAttr.name.end!,
                'data-styledeck-class',
              )
            }

            editor.appendLeft(styleDeckAttr.start!, 'data-styledeck ')
          }

          path.skip()
        },

        CallExpression: (path) => {
          const { node } = path

          if (!(
            isIdentifier(node.callee) && node.callee.name === 'defineStyleDeck'
          )) {
            return
          }

          const compiledArgs = node.arguments.map((arg) => {
            if (isTSSatisfiesExpression(arg)) {
              return compileStyleDeckArg(arg.expression, { path })
            }

            return compileStyleDeckArg(arg, { path })
          })
          const finalArgs = compiledArgs.flatMap(({ keys }) => keys)
          const hoistedStyles = compiledArgs
            .flatMap(({ map }) => [...map])
            .map(([key, value]) => {
              return [
                `const ${key} = __stylex_create({`,
                `  _: ${value}`,
                `})`,
                //
              ].join('\n')
            })

          const joined = finalArgs.join(',')

          editor.overwrite(
            node.start!,
            node.end!,
            [
              '(() => {',
              hoistedStyles.join('\n\n'),
              '',
              `  return ${finalArgs.length === 1 ? joined : `[${joined}]`}`,
              '})()',
              //
            ].join('\n'),
          )

          if (hoistedStyles.length > 0) {
            stylexImports.add(
              `import { create as __stylex_create } from '@stylexjs/stylex'`,
            )
          }
        },
      })

      if (hoistedStyles.size > 0) {
        stylexImports.add(
          `import { create as __stylex_create } from '@stylexjs/stylex'`,
        )
      }

      const appendices = [
        ...hoistedStyles,
        ...(stylexImports.size > 0
          ? [
              [...stylexImports]
                .toSorted((a, b) => a.localeCompare(b))
                .join('\n'),
            ]
          : []),
      ]

      if (appendices.length > 0) {
        editor.append(`\n${appendices.join('\n\n')}\n`)
      }

      for (const declaration of macroImportDeclarationList) {
        editor.remove(declaration.start!, declaration.end!)
      }

      if (editor.hasChanged()) {
        return {
          code: editor.toString(),
          map: editor.generateMap(),
        }
      }

      return null
    }

    function shred(
      node: Node,
      sheetPrefix: string,
      propertyKey: string,
      context: { path: NodePath },
    ): { key: string; map: Map<string, string> } {
      if (isConditionalExpression(node)) {
        const { test } = node
        const condition = code.slice(test.start!, test.end!)
        const consequent = shred(
          node.consequent,
          sheetPrefix,
          propertyKey,
          context,
        )
        const alternate = shred(
          node.alternate,
          sheetPrefix,
          propertyKey,
          context,
        )

        return {
          key: `${condition} ? ${consequent.key} : ${alternate.key}`,
          map: new Map(
            [consequent.map, alternate.map].flatMap((map) => [...map]),
          ),
        }
      }

      if (isLogicalExpression(node) && node.operator === '&&') {
        const { left, right } = node

        const condition = code.slice(left.start!, left.end!)
        const consequent = shred(right, sheetPrefix, propertyKey, context)

        return {
          key: `${condition} && ${consequent.key}`,
          map: consequent.map,
        }
      }

      const location = node.loc!
      const sheetName = `${sheetPrefix}_x_${location.start.line}_${location.start.column + 1}`
      const contextual = extractContextualClosures(
        node,
        contextualClosureBaseLevel,
        propertyKey,
        context,
      )
      const staticObjectValue =
        contextual?.paramList.length === 0 ? contextual.source : null

      return {
        key: `${sheetName}._`,
        map: new Map([
          [
            sheetName,
            [
              '{',
              `  ${propertyKey}: ${staticObjectValue ?? code.slice(node.start!, node.end!)}`,
              '}',
            ].join('\n'),
          ],
        ]),
      }
    }

    function extractFunctionValue(
      node: ArrowFunctionExpression | FunctionExpression,
    ) {
      const { body, loc: location } = node

      if (isBlockStatement(body)) {
        throw new Error(
          `[${pluginName}] Dynamic style function body must be an expression.`,
        )
      }

      const bodySource = code.slice(body.start!, body.end!)

      const paramName = `value_${location!.start.line}_${location!.start.column + 1}`

      return {
        bodySource,
        paramName,
      }
    }

    function extractContextualClosures(
      node: Node,
      level: number,
      sourceLocation: string,
      context: { path: NodePath },
    ): {
      source: string
      valueArgList: string[]
      paramList: string[]
    } | null {
      if (!isObjectExpression(node)) {
        return null
      }

      const chunkList = ['{']
      const valueArgList: string[] = []
      const paramList: string[] = []

      for (const property of node.properties) {
        if (isSpreadElement(property)) {
          throw new Error(
            `[${pluginName}] Spread elements in style objects are not supported at ${sourceLocation}`,
          )
        }

        const { key, computed } = property

        if (isObjectMethod(property)) {
          throw new Error(
            `[${pluginName}] Dynamic style function body must be an expression.`,
          )
        }

        const { value } = property

        if (isFunctionExpression(value)) {
          throw new Error(
            `[${pluginName}] Dynamic style function body must be an expression.`,
          )
        }

        let propertyKey = code.slice(key.start!, key.end!)

        if (computed) {
          if (isCallExpression(key) && isIdentifier(key.callee)) {
            const { callee } = key

            if (
              isImportSpecifier(
                context.path.scope.getBinding(key.callee.name)?.path.node,
              )
            ) {
              if (key.callee.name === macroAlias.selector) {
                if (key.arguments.every((arg) => isStringLiteral(arg))) {
                  const selector = key.arguments
                    .map((arg) => arg.value)
                    .join('')

                  propertyKey = `'${selector}'`
                }
              } else {
                const ancestryMacro = ancestryMacroList.find(
                  (macro) => macroAlias[macro] === callee.name,
                )

                const [marker, ...restArgumentList] = key.arguments

                if (
                  ancestryMacro != null &&
                  restArgumentList.every((arg) => isStringLiteral(arg))
                ) {
                  const selector =
                    restArgumentList.length === 0
                      ? ':is(*)'
                      : restArgumentList.map((arg) => arg.value).join('')

                  propertyKey =
                    isCallExpression(marker) &&
                    isIdentifier(marker.callee) &&
                    marker.callee.name === stylexFnAlias.defaultMarker &&
                    isImportSpecifier(
                      context.path.scope.getBinding(marker.callee.name)?.path
                        .node,
                    )
                      ? `[__stylex_when.${ancestryMacro}('${selector}')]`
                      : `[__stylex_when.${ancestryMacro}('${selector}', ${code.slice(
                          marker!.start!,
                          marker!.end!,
                        )})]`

                  stylexImports.add(
                    `import { when as __stylex_when } from '@stylexjs/stylex'`,
                  )
                }
              }
            }
          } else {
            propertyKey = `[${propertyKey}]`
          }
        }

        const nestedSourceLocation = `${sourceLocation}.${propertyKey}`

        if (isArrowFunctionExpression(value)) {
          const extracted = extractFunctionValue(value)
          paramList.push(extracted.paramName)
          valueArgList.push(extracted.bodySource)
          chunkList.push(
            `${indent(level)}${propertyKey}: ${extracted.paramName},`,
          )

          continue
        }

        const nested = extractContextualClosures(
          value,
          level + 1,
          nestedSourceLocation,
          context,
        )

        if (nested != null) {
          paramList.push(...nested.paramList)
          valueArgList.push(...nested.valueArgList)
          chunkList.push(`${indent(level)}${propertyKey}: ${nested.source},`)

          continue
        }

        chunkList.push(
          `${indent(level)}${propertyKey}: ${code.slice(value.start!, value.end!)},`,
        )
      }

      chunkList.push(`${indent(level - 1)}}`)

      return {
        source: chunkList.join('\n'),
        valueArgList,
        paramList,
      }
    }

    function shredWithinPseudo(
      node: Node,
      sheetPrefix: string,
      pseudoElementKey: string,
      propertyKey: string,
    ): { key: string; map: Map<string, string> } {
      if (isConditionalExpression(node)) {
        const { test } = node

        const condition = code.slice(test.start!, test.end!)
        const consequent = shredWithinPseudo(
          node.consequent,
          sheetPrefix,
          pseudoElementKey,
          propertyKey,
        )
        const alternate = shredWithinPseudo(
          node.alternate,
          sheetPrefix,
          pseudoElementKey,
          propertyKey,
        )

        return {
          key: `${condition} ? ${consequent.key} : ${alternate.key}`,
          map: new Map(
            [consequent.map, alternate.map].flatMap((map) => [...map]),
          ),
        }
      }

      if (isLogicalExpression(node) && node.operator === '&&') {
        const { left, right } = node

        const condition = code.slice(left.start!, left.end!)
        const consequent = shredWithinPseudo(
          right,
          sheetPrefix,
          pseudoElementKey,
          propertyKey,
        )

        return {
          key: `${condition} && ${consequent.key}`,
          map: consequent.map,
        }
      }

      const location = node.loc!

      const finalSheetName = `${sheetPrefix}_x_${location.start.line}_${location.start.column + 1}`

      return {
        key: `${finalSheetName}._`,
        map: new Map([
          [
            finalSheetName,
            [
              `{`,
              `  ${pseudoElementKey}: {`,
              `    ${propertyKey}: ${code.slice(node.start!, node.end!)}`,
              `  }`,
              `}`,
            ].join('\n'),
          ],
        ]),
      }
    }

    function compileStyleDeckArg(
      arg: Node | null,
      context: { path: NodePath },
    ): {
      keys: string[]
      map: Map<string, string>
    } {
      if (arg == null) {
        return { keys: [], map: new Map() }
      }

      if (
        isLogicalExpression(arg) &&
        arg.operator === '&&' &&
        isArrayExpression(arg.right)
      ) {
        const compiledArgs = arg.right.elements.map((element) =>
          compileStyleDeckArg(element, context),
        )
        const keys = compiledArgs.flatMap(({ keys }) => keys)

        return {
          keys: [
            `${code.slice(arg.left.start!, arg.left.end!)} && [${keys.join(',')}]`,
          ],
          map: new Map(compiledArgs.flatMap(({ map }) => [...map])),
        }
      }

      if (isArrayExpression(arg)) {
        const compiledArgs = arg.elements.map((element) =>
          compileStyleDeckArg(element, context),
        )
        const keys = compiledArgs.flatMap(({ keys }) => keys)

        return {
          keys: [`[${keys.join(',')}]`],
          map: new Map(compiledArgs.flatMap(({ map }) => [...map])),
        }
      }

      const isShortCircuited = isLogicalExpression(arg) && arg.operator === '&&'

      const style = isShortCircuited ? arg.right : arg

      if (!isObjectExpression(style)) {
        validateArg(arg)

        return {
          keys: [code.slice(arg.start!, arg.end!)],
          map: new Map(),
        }
      }

      const staticProps = []
      const extraArgs = []
      const styleMap = new Map<string, string>()

      for (const property of style.properties) {
        if (isSpreadElement(property)) {
          throw new Error(
            `[${pluginName}] Spread elements in style objects are not supported`,
          )
        }

        const { key } = property
        const value = isObjectMethod(property) ? property : property.value
        const { computed } = property

        const rawKeySource = code.slice(key.start!, key.end!)
        const propertyKey = computed ? `[${rawKeySource}]` : rawKeySource

        const location = key.loc!

        const sheetName = `style_${location.start.line}_${location.start.column + 1}`

        // Handle pseudo-elements by processing their inner properties
        if (
          isObjectProperty(property) &&
          isObjectExpression(value) &&
          propertyKey.includes('::')
        ) {
          const pseudoValueLocation = value.loc!

          const pseudoValueSheetName = `style_${pseudoValueLocation.start.line}_${pseudoValueLocation.start.column + 1}`
          let hasPseudoConditional = false

          for (const pseudoProp of value.properties) {
            if (isSpreadElement(pseudoProp)) {
              throw new Error(
                `[${pluginName}] Spread elements in style objects are not supported`,
              )
            }

            if (isObjectMethod(pseudoProp)) {
              throw new Error(
                `[${pluginName}] Dynamic style function body must be an expression.`,
              )
            }

            const pseudoValue = pseudoProp.value

            if (
              isConditionalExpression(pseudoValue) ||
              (isLogicalExpression(pseudoValue) &&
                pseudoValue.operator === '&&')
            ) {
              hasPseudoConditional = true
            }
          }

          if (!hasPseudoConditional) {
            const pseudoContextual = extractContextualClosures(
              value,
              contextualClosureBaseLevel,
              propertyKey,
              context,
            )

            if (pseudoContextual == null) {
              staticProps.push(
                `${indent(indentSize)}${propertyKey}: ${code.slice(value.start!, value.end!)}`,
              )
            } else if (pseudoContextual.paramList.length > 0) {
              styleMap.set(
                sheetName,
                [
                  `(${pseudoContextual.paramList.join(',')}) => ({`,
                  `  ${propertyKey}: ${pseudoContextual.source}`,
                  `})`,
                ].join('\n'),
              )

              extraArgs.push(
                `${sheetName}._(${pseudoContextual.valueArgList.join(',')})`,
              )
            } else {
              staticProps.push(
                `${indent(indentSize)}${propertyKey}: ${pseudoContextual.source}`,
              )
            }

            continue
          }

          const pseudoStaticPropertyList: string[] = []

          for (const pseudoProp of value.properties) {
            if (isSpreadElement(pseudoProp)) {
              throw new Error(
                `[${pluginName}] Spread elements in style objects are not supported`,
              )
            }

            if (isObjectMethod(pseudoProp)) {
              throw new Error(
                `[${pluginName}] Dynamic style function body must be an expression.`,
              )
            }

            const pseudoValue = pseudoProp.value
            const { computed: pseudoComputed, key: pseudoKey } = pseudoProp

            const pseudoRawKey = code.slice(pseudoKey.start!, pseudoKey.end!)
            const pseudoPropertyKey = pseudoComputed
              ? `[${pseudoRawKey}]`
              : pseudoRawKey

            const pseudoLocation = pseudoKey.loc!

            const pseudoSheetName = `style_${pseudoLocation.start.line}_${pseudoLocation.start.column + 1}`

            if (
              isConditionalExpression(pseudoValue) ||
              (isLogicalExpression(pseudoValue) &&
                pseudoValue.operator === '&&')
            ) {
              const compiledArg = shredWithinPseudo(
                pseudoValue,
                pseudoSheetName,
                propertyKey,
                pseudoPropertyKey,
              )

              for (const [key, value] of compiledArg.map) {
                styleMap.set(key, value)
              }

              extraArgs.push(compiledArg.key)
            } else if (isArrowFunctionExpression(pseudoValue)) {
              const { bodySource, paramName: coordinateParam } =
                extractFunctionValue(pseudoValue)

              const isSimpleIdentifier =
                isIdentifier(pseudoKey) && !pseudoComputed
              const paramName = isSimpleIdentifier
                ? pseudoRawKey
                : coordinateParam

              const objectBody = isSimpleIdentifier
                ? paramName
                : `${pseudoPropertyKey}: ${paramName}`

              styleMap.set(
                pseudoSheetName,

                [
                  `(${paramName}) => ({`,
                  `  ${propertyKey}: {`,
                  `    ${objectBody}`,
                  `  }`,
                  `})`,
                ].join('\n'),
              )

              extraArgs.push(`${pseudoSheetName}._(${bodySource})`)
            } else {
              if (isFunctionExpression(pseudoValue)) {
                throw new Error(
                  `[${pluginName}] Dynamic style function body must be an expression.`,
                )
              }

              const pseudoContextual = extractContextualClosures(
                pseudoValue,
                contextualClosureBaseLevel + 1,
                pseudoPropertyKey,
                context,
              )

              if (pseudoContextual?.paramList.length === 0) {
                pseudoStaticPropertyList.push(
                  `      ${pseudoPropertyKey}: ${pseudoContextual.source},`,
                )
                extraArgs.push(`${pseudoValueSheetName}._`)
              } else if (pseudoContextual == null) {
                pseudoStaticPropertyList.push(
                  `      ${pseudoPropertyKey}: ${code.slice(pseudoValue.start!, pseudoValue.end!)},`,
                )
                extraArgs.push(`${pseudoValueSheetName}._`)
              } else {
                styleMap.set(
                  pseudoSheetName,
                  [
                    `(${pseudoContextual.paramList.join(',')}) => ({`,
                    `  ${propertyKey}: {`,
                    `    ${pseudoPropertyKey}: ${pseudoContextual.source}`,
                    `  }`,
                    `})`,
                  ].join('\n'),
                )

                extraArgs.push(
                  `${pseudoSheetName}._(${pseudoContextual.valueArgList.join(',')})`,
                )
              }
            }
          }

          if (pseudoStaticPropertyList.length > 0) {
            styleMap.set(
              pseudoValueSheetName,
              [
                `{`,
                `  ${propertyKey}: {`,
                ...pseudoStaticPropertyList,
                `  }`,
                `}`,
              ].join('\n'),
            )
          }

          continue
        }

        if (
          (isObjectProperty(property) && isConditionalExpression(value)) ||
          (isObjectProperty(property) &&
            isLogicalExpression(value) &&
            value.operator === '&&')
        ) {
          const compiledArg = shred(value, sheetName, propertyKey, context)

          for (const [key, value] of compiledArg.map) {
            styleMap.set(key, value)
          }

          extraArgs.push(compiledArg.key)

          continue
        }

        if (isObjectMethod(property)) {
          throw new Error(
            `[${pluginName}] Dynamic style function body must be an expression.`,
          )
        }

        if (isFunctionExpression(value)) {
          throw new Error(
            `[${pluginName}] Dynamic style function body must be an expression.`,
          )
        }

        if (isArrowFunctionExpression(value)) {
          const { bodySource, paramName: coordinateParam } =
            extractFunctionValue(value)

          const isSimpleIdentifier = isIdentifier(key) && !computed
          const paramName = isSimpleIdentifier ? rawKeySource : coordinateParam

          const objectBody = isSimpleIdentifier
            ? paramName
            : `${propertyKey}: ${paramName}`

          styleMap.set(
            sheetName,
            [
              `(${paramName}) => ({`,
              `  ${objectBody}`,
              `})`,
              //
            ].join('\n'),
          )

          extraArgs.push(`${sheetName}._(${bodySource})`)

          continue
        }

        const contextual = extractContextualClosures(
          value,
          contextualClosureBaseLevel,
          propertyKey,
          context,
        )

        if (contextual != null) {
          if (contextual.paramList.length > 0) {
            styleMap.set(
              sheetName,
              [
                `(${contextual.paramList.join(',')}) => ({`,
                `  ${propertyKey}: ${contextual.source}`,
                `})`,
              ].join('\n'),
            )

            extraArgs.push(
              `${sheetName}._(${contextual.valueArgList.join(',')})`,
            )
          } else {
            staticProps.push(
              `${indent(indentSize)}${propertyKey}: ${contextual.source}`,
            )
          }

          continue
        }

        staticProps.push(
          `${indent(indentSize)}${propertyKey}: ${code.slice(value.start!, value.end!)}`,
        )
      }

      if (staticProps.length > 0) {
        const location = style.loc!
        const baseVariableName = `style_${location.start.line}_${location.start.column + 1}`

        styleMap.set(
          baseVariableName,
          [`{`, staticProps.join(',\n'), `}`].join('\n'),
        )

        extraArgs.unshift(`${baseVariableName}._`)
      }

      if (isShortCircuited) {
        return {
          keys: extraArgs.map(
            (value) =>
              `${code.slice(arg.left.start!, arg.left.end!)} && ${value}`,
          ),
          map: styleMap,
        }
      }

      return {
        keys: extraArgs,
        map: styleMap,
      }
    }
  }
}

function indent(level: number) {
  return ' '.repeat(level * indentSize)
}

function validateArg(node: Node) {
  if (isObjectExpression(node)) {
    throw new Error(
      `[${pluginName}] Conditional ternary arguments can not be object literals.`,
    )
  }

  if (isConditionalExpression(node)) {
    if (
      isArrayExpression(node.consequent) ||
      isArrayExpression(node.alternate)
    ) {
      throw new Error(
        `[${pluginName}] Conditional ternary arguments can not be object literals.`,
      )
    }

    validateArg(node.consequent)
    validateArg(node.alternate)

    return
  }

  if (isLogicalExpression(node) && node.operator === '&&') {
    const { right } = node

    validateArg(right)
  }
}

function isImportedBinding(binding: Binding | undefined): boolean {
  if (binding == null) {
    return false
  }

  return (
    isImportSpecifier(binding.path.node) ||
    isImportNamespaceSpecifier(binding.path.node) ||
    isImportDefaultSpecifier(binding.path.node)
  )
}

function getJSXMemberExpressionRootIdentifier(
  expression: JSXMemberExpression,
): JSXIdentifier | null {
  const { object } = expression

  if (isJSXIdentifier(object)) {
    return object
  }

  if (isJSXMemberExpression(object)) {
    // eslint-disable-next-line unicorn/no-useless-recursion
    return getJSXMemberExpressionRootIdentifier(object)
  }

  return null
}

import type { ArrowFunctionExpression } from '@babel/types'
import type { Binding } from '@babel/traverse'
import createGlobMatcher from 'picomatch'
import type { FunctionExpression } from '@babel/types'
import { getJSXAttributeSchema } from '#/jsx-attribute-schema.js'
import type { ImportDeclaration } from '@babel/types'
import { isArrayExpression } from '@babel/types'
import { isArrowFunctionExpression } from '@babel/types'
import { isBlockStatement } from '@babel/types'
import { isCallExpression } from '@babel/types'
import { isConditionalExpression } from '@babel/types'
import { isFunctionExpression } from '@babel/types'
import { isIdentifier } from '@babel/types'
import { isImportDeclaration } from '@babel/types'
import { isImportDefaultSpecifier } from '@babel/types'
import { isImportNamespaceSpecifier } from '@babel/types'
import { isImportSpecifier } from '@babel/types'
import { isJSXAttribute } from '@babel/types'
import { isJSXExpressionContainer } from '@babel/types'
import { isJSXIdentifier } from '@babel/types'
import { isJSXMemberExpression } from '@babel/types'
import { isLogicalExpression } from '@babel/types'
import { isObjectExpression } from '@babel/types'
import { isObjectMethod } from '@babel/types'
import { isObjectProperty } from '@babel/types'
import { isSpreadElement } from '@babel/types'
import { isStringLiteral } from '@babel/types'
import { isTSSatisfiesExpression } from '@babel/types'
import type { JSXAttribute } from '@babel/types'
import type { JSXIdentifier } from '@babel/types'
import type { JSXMemberExpression } from '@babel/types'
import { MagicString } from 'magic-string'
import type { Node } from '@babel/types'
import type { NodePath } from '@babel/core'
import type { Options } from '#/options'
import { parse } from '@babel/parser'
import type { ParseResult } from '@babel/parser'
import { pluginName } from '#/shared/config'
import type { TransformResult } from 'unplugin'
import { traverse } from '#/shared/traverse'
//
