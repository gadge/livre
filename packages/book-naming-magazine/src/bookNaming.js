import { SP }                                                      from '@spare/enum-chars'
import { DD_MONTH_YYYY, MONTH_MONTH_YYYY, MONTH_YYYY, YYYY_MM_DD } from '../resources/date.regex'
import { LEX_GENERIC, LEX_LOCATIONS, LEX_MONTHS }                  from '../resources/dictionaries'


const processBookName = text => {
  return text
    .replace(LEX_GENERIC)
    .replace(LEX_LOCATIONS)
    .trim()
}

export const bookNaming = text => {
  let ms
  if (( ms = YYYY_MM_DD.exec(text) )) {
    const [ ph, yyyy, mm, dd ] = ms
    return processBookName(text.slice(ph.length)) + SP + yyyy + mm
  }
  else if (( ms = MONTH_MONTH_YYYY.exec(text) )) {
    const [ , monthLo, monthHi, yyyy ] = ms
    return processBookName(text.slice(0, ms.index)) + SP + yyyy + monthLo.replace(LEX_MONTHS) + '-' + monthHi.replace(LEX_MONTHS)
  }
  else if (( ms = DD_MONTH_YYYY.exec(text) )) {
    const [ , dd, month, yyyy ] = ms
    return processBookName(text.slice(0, ms.index)) + SP + yyyy + month.replace(LEX_MONTHS)
  }
  else if (( ms = MONTH_YYYY.exec(text) )) {
    const [ , month, yyyy ] = ms
    return processBookName(text.slice(0, ms.index)) + SP + yyyy + month.replace(LEX_MONTHS)
  }
  else {
    return text
  }
}
