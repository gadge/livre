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

  [ /Jan(?:vier)?/g, '01' ],
  [ /F[eé]v(?:rier)?/g, '02' ],
  [ /Mars?/g, '03' ],
  [ /Avr(?:il)?/g, '04' ],
  [ /Mai/g, '05' ],
  [ /Juin?/g, '06' ],
  [ /Jui(?:llet)?/g, '07' ],
  [ /Ao[uû]t?/g, '08' ],
  [ /Sep(?:tembre)?/g, '09' ],
  [ /Oct(?:obre)?/g, '10' ],
  [ /Nov(?:embre)?/g, '11' ],
  [ /D[eé]c(?:embre)?/g, '12' ],

  [ /Gen(?:naio)?/g, '01' ],
  [ /Feb(?:braio)?/g, '02' ],
  [ /Mar(?:zo)?/g, '03' ],
  [ /Apr(?:ile)?/g, '04' ],
  [ /Mag(?:gio)?/g, '05' ],
  [ /Giu(?:gno)?/g, '06' ],
  [ /Lug(?:lio)?/g, '07' ],
  [ /Ago(?:sto)?/g, '08' ],
  [ /Set(?:tembre)?/g, '09' ],
  [ /Ott(?:obre)?/g, '10' ],
  [ /Nov(?:embre)?/g, '11' ],
  [ /Dic(?:embre)?/g, '12' ],
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