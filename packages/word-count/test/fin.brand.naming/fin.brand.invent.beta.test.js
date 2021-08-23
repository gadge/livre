import { finiteFlopper }          from '@aryth/flopper'
import { combinator, permutator } from '@aryth/subset'
import { says }                   from '@palett/says'
import { LF }                     from '@spare/enum-chars'
import { DecoVector, logger }     from '@spare/logger'
import { promises }               from 'fs'

const decoVector = DecoVector({ indexed: true, full: true })
const PREFIXES = [
  '中',
  '国',
  '华',
  '摩',
  '汇',
  '联',
  '博',
]

const SUFFIXES = [
  '信',
  '富',
  '代',
  '时',
  '泰',
  '煦',
  '沃',
]

const test = () => {
  const list = []
  for (let prefix of finiteFlopper(PREFIXES)) {
    for (let suffix of finiteFlopper(SUFFIXES)) {
      list.push(prefix + suffix)
    }
  }
  list.sort() |> decoVector |> logger
}

const testBy = async (n) => {
  const list = []
  const CANDIDATES = [ ...PREFIXES, ...SUFFIXES ]
  for (let some of combinator(CANDIDATES, n)) {
    for (let phrase of permutator(some)) {
      list.push(phrase.join(''))
    }
  }
  list.sort() |> decoVector |> says['testBy-' + n]
  await promises.writeFile(process.cwd() + '/static/brand-names/fin.names.csv', list.join(LF))
}

// testBy(2)
// testBy(3)
testBy(4).then()