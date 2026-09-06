export { createFixtureLoader }

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const fixtureNameList = ['source.tsx', 'target.tsx']

function createFixtureLoader({ baseUrl }: { baseUrl: string }) {
  async function load(label: string) {
    const [source, target] = await Promise.all(
      fixtureNameList.map(
        async (fixtureFileName) =>
          await readFile(
            new URL(`fixtures/${label}/${fixtureFileName}`, baseUrl),
            {
              encoding: 'utf8',
            },
          ),
      ),
    )

    return {
      id: new URL(`fixtures/${label}/source.tsx`, baseUrl).pathname,
      source: source!,
      target: target!,
    }
  }

  return {
    load,
  }
}

import { readFile } from 'node:fs/promises'
//
