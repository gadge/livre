import { parsePath }                     from '@acq/path'
import { decoEntries, decoString, says } from '@spare/logger'
import { makeReplaceable }               from '@spare/translator'
import { mapEntries }                    from '@vect/object-mapper'


const URLS = {
  col_n: 'https://static.dezeen.com/uploads/2021/11/ground-floor-agua-210-hemaa-architecture-mexico-city-drawings_dezeen_2364_col_0.jpg',
  col_n_n: 'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_1-1.jpg',
  col_n_mx: 'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_5-852x568.jpg',
  col_n_n_mx: 'https://static.dezeen.com/uploads/2021/05/leckie-studio-penthouse-big-skyscraper-vancouver_dezeen_2364_col_4-1-852x1065.jpg',
  col_scale: 'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_13-scaled.jpg',
  col_n_scale: 'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_0-1-scaled.jpg',
  hero_mx: 'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city-hero-852x479.jpg',
  hero_n_mx: 'https://static.dezeen.com/uploads/2021/04/reception-room-alcove-nanometer-architecture_dezeen_2364_hero_1-852x479.jpg',
  hero_n2_mx: 'https://static.dezeen.com/uploads/2021/01/clayworks-interior-finishes_dezeen_hero1-852x479.jpg',
  sq_n_mx: 'https://static.dezeen.com/uploads/2021/01/clayworks-interior-finishes_dezeen_2364_sq-1-852x852.jpg',
}

const REG_DEZEEN_REVIVE = /(?<=[_-]col_\d+|hero\d?|sq\d?)([_-]\d+|x\d+|-scaled){1,3}\.jpg$/
const REG_DEZEEN_NAMING = /[_-]*dezeen_\d+_col[_-]*/
const REG_DEZEEN_FOLDER = /([_-]*dezeen_\d+)?[_-](col_\d+|hero\d?|sq\d?)([_-]\d+|x\d+|-scaled){0,3}\.jpg$/

const test = ({ dict, theme }) => {
  const curr_to_next = mapEntries(URLS, ([ key, url ]) => {
    const curr = parsePath(url)
    const nextUrl = url.replace(dict)
    const next = parsePath(nextUrl)
    return [ decoString(curr.base + curr.ext), decoString(next.base + next.ext) ]
  })
  decoEntries(Object.entries(curr_to_next)) |> says[theme]
}

test({ dict: [ [ REG_DEZEEN_REVIVE, '.jpg' ] ] |> makeReplaceable, theme: 'revive' })
test({ dict: [ [ REG_DEZEEN_REVIVE, '.jpg' ], [ REG_DEZEEN_NAMING, '-' ] ] |> makeReplaceable, theme: 'naming' })
test({ dict: [ [ REG_DEZEEN_FOLDER, '' ] ] |> makeReplaceable, theme: 'folder' })

