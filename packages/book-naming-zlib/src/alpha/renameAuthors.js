import { sepByLast }     from '@texting/sep'
import { COSP, DOT, SP } from '@spare/enum-chars'
// import { deco, logger }  from '@spare/logger'

const REGEX_PREFIX_TITLES = /(?:Dr|Md).\s*/
const REGEX_SUFFIX_TITLES = /(?:\s*(?:PhD|MD|JD|MS|MPH|MBA|FACS|FAAP|MMHC|CNM))*/g
const sepName = (name) => {
  name = name
    .replace(REGEX_PREFIX_TITLES, '')
    .replace(REGEX_SUFFIX_TITLES, '')
  return sepByLast.call(/\s+/g, name)
}

const REGEX_BRACKET_CONTENT = /\s?\[([\w\s-.,]*)\]/g
const REGEX_PARENTH_CONTENT = /\s?\(([\w\s-.,]*)\)/g
const REGEX_ETC_MARK = /\s+etc\./
export const renameAuthors = authors => {
  {
    authors = authors.replace(REGEX_BRACKET_CONTENT, '')
  }

  let parenthMark = ''
  {
    authors = authors.replace(REGEX_PARENTH_CONTENT, (_, parenthContent) => {
      parenthMark = parenthContent
      return ''
    })
    // logger(parenthMark)
    if (/firm/gi.test(parenthMark)) return authors
  }

  let etcMark = false
  {
    if (REGEX_ETC_MARK.test(authors)) {
      etcMark = true
      authors = authors.replace(REGEX_ETC_MARK, '')
    }
  }

  let [primaryAuthor, ...restAuthors] = authors.split(/,\s*/)
  if (/\s/.test(primaryAuthor)) {
    // logger(deco([primaryAuthor, restAuthors]))
    {
      const [givenNames, familyName] = sepName(primaryAuthor)
      primaryAuthor = familyName + COSP + givenNames
    }
    {
      restAuthors = restAuthors
          ?.map(author => {
            const [givenNames, familyName] = sepName(author)
            const initials = givenNames.split(/\s+/g).map(([char]) => char + DOT).join('')
            return initials.replaceAll('..', '.') + SP + familyName
          })
        ?? []
    }
    if (restAuthors.length > 2) {
      etcMark = true
      restAuthors = restAuthors.slice(0, 2)
    }
    authors = [primaryAuthor, ...restAuthors].join(COSP)
  }
  if (etcMark) authors += ', et al.'
  return authors
}