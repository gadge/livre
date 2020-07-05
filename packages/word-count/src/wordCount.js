import { NUM, WORD } from '../../enum-regexes'

export const WordCount = ({ excludes, top }) => wordCount.bind({ excludes, top })

export const wordCount = function (contents) {
  const excludes = this?.excludes ?? []
  const top = this?.top
  const counter = {}
  let ms, wd
  while ((ms = WORD.exec(contents)) && ([wd] = ms)) {
    if (excludes.includes(wd = wd.toLowerCase())) { continue }
    if (NUM.test(wd)) { continue }
    if (wd in counter) { counter[wd]++ } else { counter[wd] = 1 }
  }
  const entries = Object.entries(counter).sort(([, a], [, b]) => b - a)
  return top ? entries.slice(0, top) : entries
}