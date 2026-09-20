const corePackageJson = JSON.parse(
  await readFile(
    path.join(import.meta.dirname, '../packages/core/package.json'),
    {
      encoding: 'utf-8',
    },
  ),
)

const adapterPackageJsonPath = path.join(process.cwd(), 'package.json')

const adapterPackageJson = JSON.parse(
  await readFile(adapterPackageJsonPath, {
    encoding: 'utf-8',
  }),
)

const publishedPackageJson = (() => {
  let x

  x = Object.entries(adapterPackageJson.dependencies)

  x = x.flatMap<[string, string]>(([key, value]) => {
    if (key === corePackageJson.name) {
      return []
    }

    return [[key, value]]
  })

  x = Object.fromEntries(x)

  x = {
    ...x,
    ...corePackageJson.dependencies,
  }

  x = {
    ...adapterPackageJson,
    dependencies: x,
  }

  return x
})()

await writeFile(
  adapterPackageJsonPath,
  JSON.stringify(publishedPackageJson, null, 2),
)

import { readFile } from 'node:fs/promises'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
//
