import { flop }                 from '@aryth/rand'
import { delogger }             from '@spare/deco'
import { says }                 from '@spare/logger'
import { Eta }                  from '@valjoux/eta'
import { promises }             from 'fs'
import { WordCount, wordCount } from '../src/wordCount'

const SRC = 'static/samples-gutenberg/resources'
const eta = Eta.buildPretty()

const test = async () => {
  const files = await promises.readdir(SRC)
  const file = files |> flop
  const buffer = await promises.readFile(SRC + '/' + file)
  eta.ini(`start reading ${ file }`) |> says['wordCount']
  buffer.toString() |> WordCount({ top: 25 }) |> delogger
  eta.end(`done reading ${ file }`) |> says['wordCount']
}

test()
