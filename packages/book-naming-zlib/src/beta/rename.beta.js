import { sepByLast }                from '@texting/sep'
import { PREPOSITION_REPLACE_DICT } from '../../resources/prepositions'
import { renameAuthors }            from '../alpha/renameAuthors'

const REGEX_AUTHORS = /\((.*)\)\s?(?=\(z-lib.org\))/
const REGEX_INNER_PARENTH = /\)\s+\(/g

export const rename = (input = '') => {
  let matches = undefined, authors = '', output = input
  if ((matches = REGEX_AUTHORS.exec(input)) && ([ , authors ] = matches)) { //
    let bookName = input.slice(0, matches.index)
    if (REGEX_INNER_PARENTH.test(authors)) [ , authors ] = sepByLast.call(/\)\s+\(/g, authors) // remove annotations like (**) before (author(s))
    authors = renameAuthors(authors)
    output = authors + ' - ' + bookName.replace(PREPOSITION_REPLACE_DICT)
    output = output.replace(/\s+/g, ' ')  // console.log(decoString(input), '\n', decoString(bookName, { presets: FRESH }))
  }
  return output.trim()
}

