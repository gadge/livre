import { by }             from '@geia/by'
import { MESSAGE }        from '@geia/enum-events'
import { MASTER, WORKER } from '@geia/enum-roles'
import { says }           from '@palett/says'
import { deco }           from '@spare/deco'
import { decoString }     from '@spare/logger'
import { Eta }            from '@valjoux/eta'
import cluster            from 'cluster'
import fs                 from 'fs'
import { ProcessPool }    from './ProcessPool'

if (cluster.isMaster) {
  const SRC = 'static/samples-gutenberg/resources'
  const eta = Eta.buildPretty()
  const WORD_COUNT = 'wordCount'

  const M = by(process, MASTER)
  const pool = new ProcessPool('packages/icon-space/test/strategies/clusterPool/wordCountWorker.js', 16, 8)
  const files = fs.readdirSync(SRC)
  for (let file of files) {
    pool.enqueue({ from: M, to: WORKER, code: 'icon-space', data: { src: SRC, file } })
  }
  console.time('multi-core')
  let size = files.length
  cluster.on(MESSAGE, (worker, { from, to, code, data }) => {
    const W = by(worker, WORKER)
    // `${ M } received ${ deco({ from: W, to: M, code }) }` |> says[M]
    pool.release(worker)
    const { src, file, res } = data
    eta.lap(`done reading ${ decoString(file) }, ${ deco(res[0]) },${ deco(res[1]) }`) |> says[WORD_COUNT]
    if (--size <= 0) console.timeEnd('multi-core')
  })
}