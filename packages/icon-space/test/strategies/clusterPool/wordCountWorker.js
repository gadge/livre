import { by }             from '@geia/by'
import { MESSAGE }        from '@geia/enum-events'
import { MASTER, WORKER } from '@geia/enum-roles'
import { says }           from '@palett/says'
import { dateTime }       from '@valjoux/timestamp-pretty'
import cluster            from 'cluster'
import fs                 from 'fs'
import { WordCount }      from '../../../src/wordCount'

if (cluster.isWorker) {
  const W = by(process, WORKER);
  `${ W } online, standing-by` |> says[W].p(dateTime())
  process.on(MESSAGE, async ({ from, to, code, data }) => {
    // `${ W } received ${ decoFlat({ from, to: W, code, data }) }` |> says[W].p(dateTime())
    if (code === 'icon-space') {
      const { src, file } = data
      if (!fs.existsSync(src + '/' + file))
        process.send({ from: W, to: MASTER, code: 'pending', data: 'file doesn\'t exit' })
      const res = fs.readFileSync(src + '/' + file).toString() |> WordCount({ top: 25 })
      process.send({ from: W, to: MASTER, code: 'done', data: { src, file, res } })
    }
  })
}