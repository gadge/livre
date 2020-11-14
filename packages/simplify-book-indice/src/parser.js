import { romanToDecimal }      from '@aryth/roman'
import { DA, DOT, RT }         from '@spare/enum-chars'
import { nullish }             from '@typen/nullish'
import { isNumeric, parseNum } from '@typen/num-strict'

export const parseIndice = indice => {
  if (nullish(indice)) return ''
  if (/^ch/gi.test(indice)) return indice.slice(0, 2)
  if (/^vol/gi.test(indice)) return indice.slice(0, 3)
  return indice[0]
}

export const parseNumeral = num => {
  return String(isNumeric(num)
    ? parseNum(num)
    : romanToDecimal(num)
  )
}

export const parseTrail = trail => {
  if (trail) {
    if (trail.startsWith(DOT)) return trail.trim()
    if (trail.endsWith(RT)) return RT
    if (trail.endsWith(DA)) return DA
  }
  return ''
}

export const parseIndicedNumeral = (match, indice, numeral, trail) => {
  return parseIndice(indice) + parseNumeral(numeral) + parseTrail(trail)
}
// ({ match, indice, numeral, trail: '(' + trail + ')' }) |> delogger
