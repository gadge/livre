import { delogger }                          from '@spare/deco'
import { NUMERAL }                           from '../../resources/regex.components'
import { INDICED_NUMERAL }                       from '../../resources/regex.produced'
import { parseIndice, parseNumeral, parseTrail } from '../../src/parser'


export const simplifyBookIndices = [
  [
    /\s*through\s+(\d+)/g,
    (_, num) => `-${ num }`
  ], [
    new RegExp(`\\b[Ss]eason\\s(${ NUMERAL })[.,]?\\s[Ee]pisode\\s(${ NUMERAL })`, 'g'),
    (_, episode, season) => 'S' + parseNumeral(episode).padStart(2, '0') + 'E' + parseNumeral(season).padStart(2, '0')
  ], [
    INDICED_NUMERAL,
    (_, indice, num, trail, next) => {
      ({ match: _, indice, num, trail: '(' + trail + ')', next }) |> delogger
      return parseIndice(indice) + parseNumeral(num) + parseTrail(trail)
    } //  ({ indice, num, trail:'(' + trail + ')' }) |> delogger
  ], [
    /\b(p{1,2}|[Pp]ages?)\.?\s*(\d+)/g,
    (_, page, num) => 'p' + num
  ], [
    /\bIntroduction\b/g,
    'Intro'
  ],
]