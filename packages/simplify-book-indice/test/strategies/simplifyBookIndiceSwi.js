import { DOT, SP }             from '@spare/enum-chars'
import { INDICED_NUMERAL }     from '../../resources/INDICED_NUMERAL'
import { INDICE, NUMERAL }     from '../../resources/regex.components'
import { parseIndicedNumeral } from '../../src/parser'

const BETA = new RegExp(`(${ INDICE })[\\b\\s](${ NUMERAL })`, 'g')

export const simplifyBookIndiceSwi = function (text) {
  const reg = INDICED_NUMERAL
  let ms, l = 0, r = 0, bond, beta
  let res = ''
  while ((ms = reg.exec(text))) { // ({ match: ms[0], index: { prev: l, curr: ms.index } }) |> delogger
    r = ms.index
    if ((bond = text.slice(l, r))) res += bond
    if (
      (BETA.lastIndex = reg.lastIndex) &&
      (beta = BETA.exec(text)) &&
      beta.index !== reg.lastIndex
    ) res += DOT + SP
    res += parseIndicedNumeral(...ms)
    // ({
    //   sp: bond, match: ms[0], next: BETA.exec(text)?.index,
    //   index: { prev: l, curr: ms.index, next: reg.lastIndex }
    // }) |> decoFlat |> logger
    l = reg.lastIndex
  } //
  if ((bond = text.slice(l))) res += bond
  return res
}
