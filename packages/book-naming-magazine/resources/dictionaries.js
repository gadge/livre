import { makeReplaceable } from '@spare/translator'

export const LEX_BRANDS = [
  [ /BBC/gi, 'BBC' ],
  [ /FHM/gi, 'FHM' ],
  [ /FT|Financial Times/gi, 'FT' ],
  [ /Harper[’'\s]?s\b/gi, 'Harpers' ],
  [ /Natgeo|National Geographic/gi, 'Nat Geo' ]
] |> makeReplaceable

export const LEX_LOCATIONS = [
  [ /USA/gi, 'USA' ],
  [ /UK|British/gi, 'UK' ],
  [ /HK|Hong Kong/gi, 'HK' ],
] |> makeReplaceable

export const LEX_GENERIC = [
  [ /Volume/gi, 'Vol' ],
  [ /And/gi, 'and' ],
  [ /The/gi, 'the' ],
  [ /[–\-\s]+/gi, ' ' ],
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

  [ /Jan(?:vier)?/gi, '01' ],
  [ /F[eé]v(?:rier)?/gi, '02' ],
  [ /Mars?/gi, '03' ],
  [ /Avr(?:il)?/gi, '04' ],
  [ /Mai/gi, '05' ],
  [ /Juin?/gi, '06' ],
  [ /Jui(?:llet)?/gi, '07' ],
  [ /Ao[uû]t?/gi, '08' ],
  [ /Sep(?:tembre)?/gi, '09' ],
  [ /Oct(?:obre)?/gi, '10' ],
  [ /Nov(?:embre)?/gi, '11' ],
  [ /D[eé]c(?:embre)?/gi, '12' ],

  [ /Gen(?:naio)?/gi, '01' ],
  [ /Feb(?:braio)?/gi, '02' ],
  [ /Mar(?:zo)?/gi, '03' ],
  [ /Apr(?:ile)?/gi, '04' ],
  [ /Mag(?:gio)?/gi, '05' ],
  [ /Giu(?:gno)?/gi, '06' ],
  [ /Lug(?:lio)?/gi, '07' ],
  [ /Ago(?:sto)?/gi, '08' ],
  [ /Set(?:tembre)?/gi, '09' ],
  [ /Ott(?:obre)?/gi, '10' ],
  [ /Nov(?:embre)?/gi, '11' ],
  [ /Dic(?:embre)?/gi, '12' ],
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