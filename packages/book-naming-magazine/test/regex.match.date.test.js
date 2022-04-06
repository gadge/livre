import { deco }                                        from '@spare/deco'
import { says, Xr }                                    from '@spare/logger'
import { DD_MONTH_YYYY, MONTH_MONTH_YYYY, MONTH_YYYY } from '../resources/date.regex'
import { rename }                                      from '../src/rename'


const candidates = [
  '2021 01 01 Vogue Living Netherlands',
  '2021 05 01 British Vogue',
  '2021 07 01 Vogue Japan',
  'a+u 建築と都市　 – May 2020',
  'BDM’s Independent Manual Series Black & White Photography Guidebook 2019',
  'Esquire UK – May 2021',
  'Vogue Living Australia – May-June 2020',
  'YourKentWeddingIssue95MarchApril2021',
  'Harvard Business Review USA – July-August 2021',
  'Fortune Usa June July 2021',
  'HBR Usa January February 2021',
  'The New York Times Magazine – 30 May 2021',
  'MIT Technology Review Volume 124 Issue 3 MayJune 2021',
  'The Economist 26 June 2021',
  'Nyt 0107',
  'GQ_-_December_2016',
  'GQ, India, 2016.01'
]

const testAlpha = () => {
  for (let text of candidates) {
    let ms, ph, yyyy, mm, dd
    const [ date, rest ] = ( ms = YYYY_MM_DD.exec(text) ) && ( [ ph, yyyy, mm, dd ] = ms )
      ? ( [ text.slice(0, ph.length), text.slice(ph.length) ] )
      : ( [ text, '' ] )
    Xr().original(text).date(date).rest(rest) |> says['yyyy-mm-dd']
  }
}
const testBeta = () => {
  for (let text of candidates) {
    let ms
    if (( ms = MONTH_MONTH_YYYY.exec(text) )) {
      let [ , monthLo, monthHi, yyyy ] = ms
      const [ initial, date ] = [ text.slice(0, ms.index), text.slice(ms.index) ]
      Xr().original(text).initial(initial).date([ monthLo, monthHi, yyyy ] |> deco) |> says['month-month-yyyy']
    }
    else if (( ms = DD_MONTH_YYYY.exec(text) )) {
      let [ , dd, month, yyyy ] = ms
      const [ initial, date ] = [ text.slice(0, ms.index), text.slice(ms.index) ]
      Xr().original(text).initial(initial).date([ dd, month, yyyy ] |> deco) |> says['dd-month-yyyy']
    }
    else if (( ms = MONTH_YYYY.exec(text) )) {
      let [ , month, yyyy ] = ms
      const [ initial, date ] = [ text.slice(0, ms.index), text.slice(ms.index) ]
      Xr().original(text).initial(initial).date([ month, yyyy ] |> deco) |> says['month-yyyy']
    }
    else {
      Xr().original(text) |> says['unmatched']
    }

  }
}
const test = () => {
  for (let text of candidates) {
    // Xr().original(text) |> says[te]
    rename(text) |>  says[text]
  }
}

// testAlpha()
// testBeta()
test()