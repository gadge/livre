import { makeReplaceable } from '@spare/translator'
import { merges }          from '@vect/vector-merge'

const GUTEN_HEADERS = [
  [/^The Project Gutenberg eBook\s*(,|of)\s*/i, ''],
  [/^Project Gutenberg['’]s\s*/i, '']
]

const TITLE_REPLACEMENTS = [
  ['slightly abridged', ''],
  [/^\W+|\W+$|'/g, ''],
  [/\W+/g, '_'],
]

const REPLACEMENTS = merges(GUTEN_HEADERS, TITLE_REPLACEMENTS) |> makeReplaceable

export const formatBookTitle = (title) => title.replace(REPLACEMENTS, x => x.trim())