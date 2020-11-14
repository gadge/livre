import { tapBy } from '@spare/tap'

export const INDICE = tapBy('|',
  '-',
  '[Aa]ct',
  '[Aa]rticle',
  '[Cc]h(?:\\.|apter)?',
  '[Ee]pisode',
  '[Ll]ines?',
  '[Pp]aragraph',
  '[Pp]art',
  '[Pp]ages?',
  '[Ss]cene',
  '[Ss]eason',
  '[Vv]ol(?:\\.|ume)?'
)
export const NUMERAL = '\\d+|[IVXLC]+|[ivxlc]+'
export const TRAIL = '[.,]*\\s?:?(?:\\s+|$)?'