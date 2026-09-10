const config = (() => {
  let x

  x = Object.entries(packageConfig.dependencies).flatMap<[string, string]>(
    ([key, value]) => {
      if (key === '@styledeck/transform') {
        return []
      }

      return [[key, value]]
    },
  )

  x = Object.fromEntries(x)

  x = {
    ...x,
    ...corePackageConfig.dependencies,
  }

  x = {
    ...packageConfig,
    dependencies: x,
  }

  return x
})()

await writeFile(
  new URL('../package.json', import.meta.url),
  JSON.stringify(config, null, 2),
)

import corePackageConfig from '@styledeck/transform/package.json' with { type: 'json' }
import packageConfig from '../package.json' with { type: 'json' }
import { writeFile } from 'node:fs/promises'
//
