import { SP }     from '@spare/enum-chars'
import { tapDot } from '@spare/tap'

const formatFirstAuthor = (author) => {
  const names = author.split(SP)
  if (names.length === 1) { return author }
  if (names.length === 2) { return names.reverse().join('.') }
  {
    let lastName = names.pop(), firstName = names.shift()
    if (firstName.endsWith('.')) firstName = firstName.replace(/.$/, '')
    return tapDot(lastName, firstName, ...names.map(x => x[0]))
  }
}

const formatSecondAuthor = (author) => {
  const names = author.split(SP)
  if (names.length === 1) { return author }
  if (names.length === 2) {
    const firstName = names[0], lastName = names[1]
    return tapDot(firstName[0], lastName)
  }
  {
    const lastName = names.pop()
    return tapDot(...names.map(x => x[0]), lastName)
  }
}

export const formatBookAuthor = (authorContent) => {
  const authors = authorContent.split(/,\s+and\s+|,\s+|\s+and\s+/g)
  if (authors.length === 1) { return formatFirstAuthor(authors[0]) }
  if (authors.length >= 2) {
    const topTwoAuthors = tapDot(formatFirstAuthor(authors[0]), formatSecondAuthor(authors[1]))
    return authors.length === 2 ? topTwoAuthors : topTwoAuthors + '.et.al'
  }
}