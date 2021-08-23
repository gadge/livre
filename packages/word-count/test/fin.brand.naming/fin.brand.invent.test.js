import { finiteFlopper } from '@aryth/flopper'
import { says }          from '@palett/says'
import { decoVector }    from '@spare/logger'

const CANDIDATES = [
  'mor',
  'rey',
  'witt',
  'tre',
  'hast',
  'chase',
  'nord',
  'pel',
]

const PREFIXES = [
  'dyna',
  'chae',
  'cre',
  'gulf',
  'nah',
  'dar',
  'ecsta'
]
const SUFFIXES = [
  'pont',
  'dent',
  'zam',
  'lott',
]

// noinspection SpellCheckingInspection
function* dualPermutator(vec) {
  const flopA = vec.slice() |> finiteFlopper
  let a, b
  while ((a = flopA.next()) && !a.done) {
    const flopB = vec.slice() |> finiteFlopper
    while ((b = flopB.next()) && !b.done) {
      if (a.value.substring(0, 2) !== b.value.substring(0, 2)) {
        yield a.value + b.value
      }
    }
  }
}

function* dualCombiners(vecA, vecB) {
  const flopA = vecA.slice() |> finiteFlopper
  let a, b
  while ((a = flopA.next()) && !a.done) {
    const flopB = vecB.slice() |> finiteFlopper
    while ((b = flopB.next()) && !b.done) {
      if (a.value.substring(0, 2) !== b.value.substring(0, 2)) {
        yield a.value + b.value
      }
    }
  }
}
const createNamesDual = () => {
  // const list = []
  const listA = [ ...dualPermutator(CANDIDATES) ]
  const listB = [ ...dualCombiners(PREFIXES, CANDIDATES) ]
  const listC = [ ...dualCombiners(CANDIDATES, SUFFIXES) ]
  const listD = [ ...dualCombiners(PREFIXES, SUFFIXES) ]
  listA |> decoVector |> says['list A']
  listB |> decoVector |> says['list B']
  listC |> decoVector |> says['list C']
  listD |> decoVector |> says['list D']
  return [ ...listA, ...listB, ...listC, ...listD ]
}


createNamesDual()


