import { makeReplaceable } from '@spare/translator'

export const LEX_LOCATIONS = [
  [ /USA/gi, 'USA' ],
  [ /UK|British/gi, 'UK' ]
] |> makeReplaceable

export const LEX_GENERIC = [
  [ /Volume/gi, 'Vol' ],
  [ /[–\-\s]+/gi, ' ' ]
] |> makeReplaceable


export const LEX_MONTHS = [
  [ /Jan(?:nuary)?/g, '01' ],
  [ /Feb(?:uary)?/g, '02' ],
  [ /Mar(?:ch)?/g, '03' ],
  [ /Apr(?:il)?/g, '04' ],
  [ /May/g, '05' ],
  [ /June?/g, '06' ],
  [ /July?/g, '07' ],
  [ /Aug(?:ust)?/g, '08' ],
  [ /Sep(?:tember)?/g, '09' ],
  [ /Oct(?:ober)?/g, '10' ],
  [ /Nov(?:ember)?/g, '11' ],
  [ /Dec(?:ember)?/g, '12' ],
] |> makeReplaceable

// const candidates = [
//   '2021 05 01 British Vogue',
//   'Elle Uk April 2021',
//   'Men’s Health Usa – March 2020'
// ]
//
// for (let candidate of candidates) {
//   Xr().original(candidate).replaced(candidate.replace(LEX_LOCATIONS)) |> logger
// }