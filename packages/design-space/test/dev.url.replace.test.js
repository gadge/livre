import { bound }      from '@aryth/bound-vector'
import { deco, says } from '@spare/logger'
import { range }      from '@vect/vector-init'

const list = [
  'https://static.dezeen.com/uploads/2021/01/clayworks-interior-finishes_dezeen_hero1.jpg',
  'https://static.dezeen.com/uploads/2021/01/clayworks-interior-finishes_dezeen_2364_col_13.jpg',
  'https://static.dezeen.com/uploads/2021/01/clayworks-interior-finishes_dezeen_2364_sq.jpg',
  'https://static.dezeen.com/uploads/2021/01/clayworks-interior-finishes_dezeen_2364_col_14.jpg',
  'https://static.dezeen.com/uploads/2021/01/clayworks-interior-finishes_dezeen_2364_col_5.jpg',
  'https://static.dezeen.com/uploads/2021/01/clayworks-interior-finishes_dezeen_2364_col_4.jpg',
  'https://static.dezeen.com/uploads/2021/01/clayworks-interior-finishes_dezeen_2364_col_0.jpg',
]

const populate = (list) => {
  const REG_DEZEEN = /(?<=dezeen_\d+_col_)(\d+)(?=.jpg)/
  const filtered = list.filter(tx => REG_DEZEEN.test(tx))
  const indexes = filtered.map(tx => {
    let ms, ph
    return ( ms = REG_DEZEEN.exec(tx) ) && ( [ ph ] = ms ) ? +ph : 0
  })
  const { min, max } = bound(indexes)

  filtered |> deco |> says['filtered']
  indexes |> deco |> says['indexes'];
  ( { min, max } ) |> deco |> says['bound']
  const numbers = range(0, max)
  const [ baseUrl ] = filtered
  const indexed = numbers.map(i => baseUrl.replace(REG_DEZEEN, i))
  return [ ...new Set([ ...indexed, ...list ]) ]
}

const result = populate(list)

result |> deco |> says['result']