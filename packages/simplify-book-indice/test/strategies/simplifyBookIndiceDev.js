import { DOT, SP }             from '@spare/enum-chars'
import { Differentiator }      from '@vect/vector-differentiator'
import { INDICED_NUMERAL }     from '../../resources/INDICED_NUMERAL'
import { parseIndicedNumeral } from '../../src/parser'

export const simplifyBookIndiceDev = text => {
  const vec = text |> textToVector, l = vec.length
  let res = '', p, prev, c, curr
  if (l === 0) return res
  if (l === 1) return ([[c, prev]] = vec, prev)
  {
    for ([[p, prev], [c, curr]] of Differentiator.build(vec))
      res += prev + ((p && !c) ? (DOT + SP) : '')
    return res + curr
  }
}

export const textToVector = function (text) {
  const reg = INDICED_NUMERAL
  let ms, l = 0, r = 0, bond
  const vec = []
  while ((ms = reg.exec(text))) { // ({ match: ms[0], index: { prev: l, curr: ms.index } }) |> delogger
    r = ms.index
    if ((bond = text.slice(l, r))) vec.push([0, bond])
    vec.push([1, parseIndicedNumeral(...ms)])
    l = reg.lastIndex
  }
  if ((bond = text.slice(l))) vec.push([0, bond])
  return vec
}
