import { parsePath }                  from '@acq/parse-path'
import { bound }                      from '@aryth/bound-vector'
import { LF }                         from '@spare/enum-chars'
import { decoEntries, ros, says, Xr } from '@spare/logger'
import { time }                       from '@valjoux/timestamp-pretty'
import { range }                      from '@vect/vector-init'
import { promises }                   from 'fs'
import prompts                        from 'prompts'
import { Dezeen }                     from './Dezeen'
import { ImageNaming }                from './Dezeen/naming'

const SRC = process.cwd() + '/dezeen'
const LIVRE = 'livre'
says[LIVRE].attach(time)


class LocalSaveService {
  static populate(list) {
    const REG_INDEX = /(?<=dezeen_\d+_col_)(\d+)(?=.jpg)/
    const filtered = list.filter(tx => REG_INDEX.test(tx))
    if (!filtered?.length) return list
    const indexes = filtered.map(tx => {
      let ms, ph
      return ( ms = REG_INDEX.exec(tx) ) && ( [ ph ] = ms ) ? +ph : 0
    })
    const { min, max } = bound(indexes)
    // filtered |> deco |> says['filtered']
    // indexes |> deco |> says['indexes'];
    // ( { min, max } ) |> deco |> says['bound']
    const numbers = range(0, max)
    const [ baseUrl ] = filtered
    const indexed = numbers.map(i => baseUrl.replace(REG_INDEX, i))
    return [ ...new Set([ ...indexed, ...list ]) ]
  }
  static async saveListAsTxt(list, log = false) {
    if (list?.length <= 0) return
    const [ url ] = list
    const { dir, base, ext } = parsePath(ImageNaming.makeFolderName(url))
    const entries = list.map(origin => {
      return [ origin, ImageNaming.reviveUrl(origin) ]
    })
    entries |> decoEntries |> says[LIVRE].p('>> saving')
    const body = list.join(LF)

    await promises.mkdir(SRC + '/raw', { recursive: true })
    await promises.mkdir(SRC + '/dev', { recursive: true })

    // save raw
    {
      const dest = SRC + '/raw/' + base + '.raw.txt'
      const urls = entries.map(([ k, v ]) => k)
      await promises.writeFile(dest, urls.join(LF))
      if (log) Xr().file(ros(dest)) |> says[LIVRE].p('>> saved')
    }
    // save dev
    {
      const dest = SRC + '/dev/' + base + '.dev.txt'
      const urls = entries.map(([ k, v ]) => v)
      await promises.writeFile(dest, LocalSaveService.populate(urls).join(LF))
      if (log) Xr().file(ros(dest)) |> says[LIVRE].p('>> saved')
    }

    return body.length / 1048576
  }
  static async saveListAsImg(list, log = true) {

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