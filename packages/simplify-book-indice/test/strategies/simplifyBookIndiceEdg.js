import { INDICED_NUMERAL }     from '../../resources/INDICED_NUMERAL'
import { parseIndicedNumeral } from '../../src/parser'

export const simplifyBookIndiceEdg = function (text) {
  const reg = INDICED_NUMERAL
  let ms, l = 0, r = 0, bond = '', prev = '', curr = ''
  let res = ''
  while ((ms = reg.exec(text))) { // ({ match: ms[0], index: { prev: l, curr: ms.index } }) |> delogger
    r = ms.index
    curr = parseIndicedNumeral(...ms)
    res += prev
    if ((bond = text.slice(l, r))) curr = bond + curr
    l = reg.lastIndex
    prev = curr
  }
  if ((bond = text.slice(l))) prev = prev + bond
  res += prev
  return res
}
