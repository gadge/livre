import { INDICED_NUMERAL }     from '../../resources/INDICED_NUMERAL'
import { parseIndicedNumeral } from '../../src/parser'

export const simplifyBookIndiceArc = text => {
  return text.replace(INDICED_NUMERAL, parseIndicedNumeral)
}