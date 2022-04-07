import { SP } from '@spare/enum-chars'
import {
  LEX_BRANDS, LEX_GENERIC, LEX_LOCATIONS, LEX_MONTHS
}             from '../resources/dictionaries'
import {
  DD_MONTH_YYYY_END, MONTH_MONTH_YYYY_END, MONTH_YYYY_END, START_NATIONS, START_YYYY_MM_DD
}             from '../resources/regexes'


export function rename(text) {
  let ms
  function putBack(text, regex) {
    let matches, phrase, body
    if ((matches = regex.exec(text)) && ([ phrase, body ] = matches)) {
      const title = text.slice(0, matches.index) + text.slice(matches.index + phrase.length)
      // Xr().msIndex(matches.index).phLength(phrase.length).bdLength(body.length).rgLastIndex(regex.lastIndex) |> logger
      // Xr().title(title).body(body) |> logger
      return title + SP + body
    }
    return text
  }
  function renameBook(text,) {
    text = putBack(text, START_NATIONS)
    return text
      .replace(LEX_GENERIC)
      .replace(LEX_BRANDS)
      .replace(LEX_LOCATIONS)
      .trim()
  }
  if ((ms = START_YYYY_MM_DD.exec(text))) {
    const [ ph, yyyy, mm, dd ] = ms
    const title = text.slice(ph.length)
    return renameBook(title) + SP + yyyy + mm
  }
  if ((ms = MONTH_MONTH_YYYY_END.exec(text))) {
    const [ , monthLo, monthHi, yyyy ] = ms
    const title = text.slice(0, ms.index)
    // const yyyy2 = +monthLo <= +monthHi ? '' : (+yyyy + 1).toString()
    const month = monthLo.replace(LEX_MONTHS) + '-' + monthHi.replace(LEX_MONTHS)
    return renameBook(title) + SP + yyyy + month
  }
  if ((ms = DD_MONTH_YYYY_END.exec(text))) {
    let [ , dd, month, yyyy ] = ms
    const title = text.slice(0, ms.index)
    month = month.replace(LEX_MONTHS)
    return renameBook(title) + SP + yyyy + month
  }
  if ((ms = MONTH_YYYY_END.exec(text))) {
    let [ , month, yyyy ] = ms
    const title = text.slice(0, ms.index)
    month = month.replace(LEX_MONTHS)
    return renameBook(title) + SP + yyyy + month
  }
  return text
}
