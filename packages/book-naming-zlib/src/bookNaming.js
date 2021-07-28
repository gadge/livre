import { COSP, DOT, SP } from '@spare/enum-chars'
import { sepByLast }     from '@texting/sep'

const BY = /\s+by\s+/g

const parsePrimaryAuthor = author => {
  const [ firstNames, lastName ] = sepByLast.call(/\s+/g, author)
  return lastName + COSP + firstNames
}
const parseRestAuthor = author => {
  const [ fores, last ] = sepByLast.call(/\s+/g, author)
  const first = fores.split(/\s+/g).map(text => text[0]).join(DOT)
  return ( first.endsWith(DOT) ? first : first + DOT ) + SP + last
}
const parseAuthors = authors => {
  const [ primary, ...rest ] = authors.split(/,\s+/)
  return { primary: parsePrimaryAuthor(primary), rest: rest.map(parseRestAuthor) }
}

export const bookNaming = base => {
  base = base.replace(/\s?\(z-lib.org\)\s?/, '')
  if (!BY.test(base)) return base
  const [ book, authors ] = sepByLast.call(BY, base)
  const { primary, rest } = parseAuthors(authors)
  const author = rest?.length ? primary + COSP + rest.join(COSP) : primary
  return author + ' - ' + book
}
