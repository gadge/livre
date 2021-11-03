import { parsePath }                  from '@acq/parse-path'
import { LF }                         from '@spare/enum-chars'
import { decoEntries, ros, says, Xr } from '@spare/logger'
import { time }                       from '@valjoux/timestamp-pretty'
import { promises }                   from 'fs'
import prompts                        from 'prompts'
import { Dezeen }                     from './Dezeen'
import { cleanDezeenImage }           from './Dezeen/clean'

const SRC = process.cwd()
const LIVRE = 'livre'
says[LIVRE].attach(time)

class LocalSaveService {
  static async saveListAsTxt(list, log = false) {
    if (list?.length <= 0) return
    const [ url ] = list
    const { dir, base, ext } = parsePath(cleanDezeenImage(url))
    const entries = list.map(origin => {
      return [ origin, cleanDezeenImage(origin) ]
    })
    entries |> decoEntries |> says[LIVRE].p('>> saving')
    const body = list.join(LF)
    const raw = SRC + '/' + base + '.raw.txt'
    await promises.writeFile(raw, entries.map(([ k, v ]) => k).join(LF))
    if (log) Xr().file(ros(raw)) |> says[LIVRE].p('>> saved')
    const dev = SRC + '/' + base + '.dev.txt'
    await promises.writeFile(dev, entries.map(([ k, v ]) => v).join(LF))
    if (log) Xr().file(ros(dev)) |> says[LIVRE].p('>> saved')
    return body.length / 1048576
  }

}
export const cli = async () => {
  const dezeen = await Dezeen.build()
  const { approach } = await prompts({
    type: 'select',
    name: 'approach',
    message: 'Select approach.',
    choices: [
      { title: 'identify image-urls, save as txt', value: 'txt' },
      { title: 'download image-urls, save as jpg', value: 'img' }
    ]
  })

  let live = true
  while (live) {
    ros(SRC) |> says[LIVRE].p('>> working directory')
    const { url } = await prompts({
      type: 'text',
      name: 'url',
      message: 'Type in url.',
    })

    const images = await dezeen.imageUrl(url, true)
    switch (approach) {
      case 'txt':
        await LocalSaveService.saveListAsTxt(images, true)
        break
      case 'img':
        'img fn in dev' |> says[LIVRE]
        break
    }

    const { keep } = await prompts({
        type: 'select',
        name: 'keep',
        message: 'what next?',
        choices: [
          { title: 'next', value: true },
          { title: 'exit', value: false }
        ]
      }
    )
    live = keep
  }

  await dezeen.close()
}