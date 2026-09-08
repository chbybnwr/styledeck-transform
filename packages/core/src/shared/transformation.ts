export type { TransformResult }

interface TransformResult {
  code: string
  map?: SourceMap
}

import type { SourceMap } from 'magic-string'
//
