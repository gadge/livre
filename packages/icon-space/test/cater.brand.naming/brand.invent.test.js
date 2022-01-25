import { distinct }                                   from '@aryth/distinct-vector'
import { finiteFlopper }                              from '@aryth/flopper'
import { combinator, permutator }                     from '@aryth/subset'
import { deco, DecoString, DecoVector, logger, says } from '@spare/logger'
import { difference, mapper }                         from '@vect/vector'

const GUANG_HONG = {
  Ewo: '怡和',
  Kwonglei: '广利',
  Tungfoo: '同孚',
  Tunghing: '东兴',
  Tienpow: '天宝',
  Hingtae: '兴泰',
  Chungwo: '中和',
  Shuntai: '顺泰',
  Yanwo: '仁和',
  Tungshun: '同顺',
  Futai: '孚泰',
  Tungchang: '东昌',
  Anchang: '安昌',
}

const CHINA_HONG = {
  Jardine_Matheson: '怡和',
  Tait_n_Company: '德记',
  Jebsen_Group: '捷成',
  Wheelock: '会德丰',
  Butterfield_n_Swire: '太古',
  Carlowitz_n_Co: '礼和',
  Union_Insurance_Society_Co: '于仁',
  Arnhold_n_Karberg_n_Co: '瑞记',
  Russell_n_Co: '旗昌',
  Dent_n_Company: '颠地',
  Elles_n_Company: '怡记',
  Boyd_n_Company: '和记',
  Siemssen_n_Co: '禅臣',
  Case_n_Company: '嘉士',
  Reuter_Brockelmann_n_Co: '鲁麟',
}

const UNLISTED = {
  Wright_n_Company: '唻记',
  Julius_Mannich_n_Company: '东兴',
  Milisch_n_Company: '美利士',
  Lessler_n_Company: '勒士拉',
  Brown_n_Company: '水陆',
  MacPhail_n_Company: '天利',
  Hong_Kong_China_Gas: '香港中华煤气',
  Field_Hastis_n_Company: '费尔哈士迪',
  Augustine_Heard_n_Company: '琼记',
  Robinet_n_Company: '罗宾内',
  Douglas_Lapraik_n_Co: '得忌利士',
}

const PRONOUNCIATIONS = {
  '怡': { read: 'yi', tone: 2 },
  '和': { read: 'he', tone: 2 },
  '广': { read: 'guang', tone: 3 },
  '利': { read: 'li', tone: 4 },
  '同': { read: 'tong', tone: 2 },
  '孚': { read: 'fu', tone: 2 },
  '东': { read: 'dong', tone: 1 },
  '兴': { read: 'xing', tone: 1 },
  '天': { read: 'tian', tone: 1 },
  '宝': { read: 'bao', tone: 3 },
  '泰': { read: 'tai', tone: 4 },
  '中': { read: 'zhong', tone: 1 },
  '顺': { read: 'shun', tone: 4 },
  '仁': { read: 'ren', tone: 2 },
  '昌': { read: 'chang', tone: 1 },
  '安': { read: 'an', tone: 1 },
  '德': { read: 'de', tone: 2 },
  '捷': { read: 'jie', tone: 2 },
  '成': { read: 'cheng', tone: 2 },
  '会': { read: 'quan', tone: 4 },
  '丰': { read: 'feng', tone: 1 },
  '太': { read: 'tai', tone: 4 },
  '古': { read: 'gu', tone: 3 },
  '礼': { read: 'li', tone: 3 },
  '于': { read: 'yu', tone: 2 },
  '瑞': { read: 'rui', tone: 4 },
  '禅': { read: 'chan', tone: 2 },
  '臣': { read: 'chen', tone: 2 },
  '嘉': { read: 'jia', tone: 1 },
  '士': { read: 'shi', tone: 4 },
  '麟': { read: 'lin', tone: 2 },
  '丽': { read: 'li', tone: 4 },
  '辰': { read: 'chen', tone: 2 },
}

const UNWANTED = [
  '记',
  '鲁',
  '旗',
  '颠',
  '地',
]

const LOCAL = [
  '丽',
  '辰',
]

const decoString = DecoString({ full: true })
const decoVector = DecoVector({ indexed: true, full: true })
const checker = word => {
  if (/[丽辰]{2}/.test(word)) return false
  const list = [ ...word ]
  const reads = mapper(word, ch => PRONOUNCIATIONS[ch].read.slice(0, 3))
  if (distinct(reads).length < list.length) return false
  return true
}

let candidates =
  [ ...Object.values(GUANG_HONG), ...Object.values(CHINA_HONG) ]
    .map(word => [ ...word ])
    .flat()
candidates = candidates |> distinct
candidates = difference(candidates, UNWANTED)
candidates |> deco |> says['candidates']


const createNamesDual = () => {
  const list = []
  const genAlpha = LOCAL.slice() |> finiteFlopper
  let x, y
  while (x = genAlpha.next().value) {
    const genBeta = candidates.slice() |> finiteFlopper
    while (y = genBeta.next().value) {
      const genPerm = [ x, y ] |> permutator
      let vec, ph
      while (vec = genPerm.next().value) {
        if ((ph = vec.join(''))|> checker) list.push(ph)
      }
    }
  }
  list.sort() |> decoVector |> logger
  return list
}

const createNamesQuad = () => {
  const list = []
  let [ a, b ] = LOCAL
  let o
  const pairs = [ ...combinator(candidates, 2) ]
  pairs |> deco |> logger
  const candidatesFlopper = pairs |> finiteFlopper
  while ((o = candidatesFlopper.next()) && !o.done) {
    let word = o.value
    const genPerm = [ word[0], word[1], a, b ] |> permutator
    let vec, ph
    while (vec = genPerm.next().value) {
      if ((ph = vec.join(''))|> checker) list.push(ph)
    }
  }
  list.sort() |> decoVector |> logger
  return list
}
// const test4 = () => {
//   let container = new Set()
//   for (let i in range(0, 32)) {
//     const genAlpha = candidates |> flopGenerator
//     const a = genAlpha.next().value
//     const b = genAlpha.next().value
//     const selected = [a, b, ...LOCAL]
//     const word = (selected |> shuffle).join('')
//     if (word |> checker) container.add(word)
//   }
//   [...container] |> decoVector |> logger
// }

createNamesDual()
createNamesQuad()


