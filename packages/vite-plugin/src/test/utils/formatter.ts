export { format }

const configFilePath = await prettier.resolveConfigFile()

if (configFilePath == null) {
  throw new Error('prettier config not found')
}

const options = await prettier.resolveConfig(configFilePath)

async function format(_: string): Promise<string> {
  return await prettier.format(_, {
    ...options,
    parser: 'typescript',
  })
}

import * as prettier from 'prettier'
//
