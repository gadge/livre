import { INDICE, NUMERAL, TRAIL } from './regex.components'

export const INDICED_NUMERAL = new RegExp(`\\b(${ INDICE })[\\b\\s](${ NUMERAL })(${ TRAIL })`, 'g')