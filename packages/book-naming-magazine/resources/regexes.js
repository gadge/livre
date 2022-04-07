const D2 = new RegExp(`(\\d{2})`)
const D4 = new RegExp(`(\\d{4})`)
const MONTHS = new RegExp(`(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|D[eé]c|F[eé]v|Avr|Mai|Jui|Ao[uû]|Gen|Mag|Giu|Lug|Ago|Set|Ott|Dic)[a-z]*`)

export const START_YYYY_MM_DD = new RegExp(`^${D4.source}\\W+${D2.source}\\W+${D2.source}`)
export const START_YYYY_MM = new RegExp(`^${D4.source}\\W+${D2.source}`)
export const MONTH_YYYY_END = new RegExp(`\\W*${MONTHS.source}\\W*${D4.source}$`)
export const DD_MONTH_YYYY_END = new RegExp(`\\W*${D2.source}\\W*${MONTHS.source}\\W*${D4.source}$`)
export const MONTH_MONTH_YYYY_END = new RegExp(`\\W*${MONTHS.source}\\W*${MONTHS.source}\\W*${D4.source}$`)

export const START_NATIONS = /^(British|Hong Kong|Singapore|Malaysia|Philippines)\s+/

