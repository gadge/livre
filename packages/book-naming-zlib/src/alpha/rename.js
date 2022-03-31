import { COSP }            from '@spare/enum-chars'
import { makeReplaceable } from '@spare/translator'
import { sepByLast }       from '@texting/sep'
import { renameAuthors }   from './renameAuthors.js'

const BY = /\s+by\s+/g


export const BOOK_REPLACE_DICT = makeReplaceable([
  [/\s+/g, ' '],
  [/\bThe\b/g, 'the'],
  [/\bA\b/g, 'a'],
  [/\bAn\b/g, 'an'],
])

export const rename = base => {
  base = base.replace(/\s?\(z-lib.org\)\s?/, '')
  if (!BY.test(base)) return base
  BY.lastIndex = 0
  const [book, authors] = sepByLast.call(BY, base)
  const { primary, rest } = renameAuthors(authors)
  const author = rest?.length ? primary + COSP + rest.join(COSP) : primary
  const refinedBookName = book.replace(BOOK_REPLACE_DICT)
  return author + ' - ' + refinedBookName
}
