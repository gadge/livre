import { SP }       from '@spare/enum-chars'
import { delogger } from '@spare/logger'


const TITLE_SPLITTER = /,?\s+by\s+/

export const extractAuthorTitleHard = function (text) {
  const vec = [], reg = this ?? /\n/g
  let ms, l = 0, r = 0, sp, ph
  while ((ms = reg.exec(text)) && ([ph] = ms)) {
    r = ms.index
    sp = text.slice(l, r).toString().trim()
    if (sp.length) { vec.push(sp) }
    else if (vec.length) { break }
    l = reg.lastIndex
  }
  vec |> delogger
  const header = vec.join(SP)
  const [title, author] = header.split(TITLE_SPLITTER)
  return { title, author }
}


export const extractAuthorTitle = function (text) {
  let matches, author, title
  if ((matches = /Author:\s?(.+)/.exec(text))) {[, author] = matches}
  if ((matches = /Title:\s?(.+)/.exec(text))) {[, title] = matches}
  return {
    author: author?.trim() ?? '',
    title: title?.trim() ?? ''
  }
}

