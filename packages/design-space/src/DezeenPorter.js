import { Gallery }                                from '@acq/gallery'
import { humanScale, parsePath }                  from '@acq/path'
import { distinct }                               from '@aryth/distinct-vector'
import { FRESH }                                  from '@palett/presets'
import { ProjectorFactory }                       from '@palett/projector-factory'
import { LF }                                     from '@spare/enum-chars'
import { decoEntries, ros, says, Xr }             from '@spare/logger'
import { wind }                                   from '@vect/entries-init'
import { maxBy }                                  from '@vect/vector-indicator'
import { init }                                   from '@vect/vector-init'
import { merge }                                  from '@vect/vector-merge'
import { Baro, CHARSET_SHADE, Spin }              from 'baro'
import { promises }                               from 'fs'
import { CONTENT_TYPE, LIVRE }                    from '../resources/constants'
import { DICT_DEZEEN_FOLDER, DICT_DEZEEN_REVIVE } from '../resources/namingCollection'

const REG_INDEX = /(?<=dezeen_\d+_col_)(\d+)(?=.jpg)/
const dezeenUrlToIndex = (url) => {
  let ms, ph
  return ( ms = REG_INDEX.exec(url) ) && ( [ ph ] = ms ) ? +ph : 0
}

const projectorFactory = ProjectorFactory.fromHEX({ min: 0, max: 2 << 20 }, FRESH)
export const DEZEEN_BARO_CONFIG = {
  autoClear: false,
  hideCursor: true,
  stream: process.stdout,
  fps: 8,
}
export const DEZEEN_BARO_LAYOUT = {
  char: CHARSET_SHADE,
  size: 12,
  autoZero: true,
  bar(notation) {
    notation.spin = !notation.spin ? Spin.build(12, 4, 2) : notation.spin.next()
    return notation.spin.renderBar(this.chars)
  },
  format(notation) {
    const { timestamp, agent, path, url, stage, stageStamp } = notation
    const dye = projectorFactory.make(notation.value)
    const bar =
            stage === 'saved' ? `${this.fullBar}`
              : stage === 'error' ? `${this.zeroBar}` :
                `${this.bar(notation)}`
    return `${timestamp} [${ros(agent)}] ${dye(stageStamp + ' ' + bar)} | ${humanScale(notation.value)} | ${path ?? url}`
  }
}
export const DEZEEN_REQUEST_HEADERS = {
  'accept': 'image/webp,image/apng,image/jpeg',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,fr;q=0.6',
  'user-agent': 'Mozilla/5.0 Chrome/95.0.4638.69 Safari/537.36',
}

export class DezeenPorter {

  constructor(src, log) {
    this.src = src
    this.log = log

    this.gallery = Gallery.build({
      population: 3,
      headers: DEZEEN_REQUEST_HEADERS,
      path: this.makeImagePath.bind(this),
      barFab: Baro.build(DEZEEN_BARO_CONFIG, DEZEEN_BARO_LAYOUT)
    })

    this.origins = null
    this.revives = null
    this.spreads = null
    this.folder = null
  }

  static build(src, log) { return new DezeenPorter(src, log) }

  reset() {
    this.origins = null
    this.revives = null
    this.spreads = null
    this.folder = null
  }

  loadUrls(urls) {
    this.origins = urls.slice()
    this.revives = this.origins.map(url => url.replace(DICT_DEZEEN_REVIVE))
    this.spreads = this.spreadUrls(this.revives)
    this.folder = this.makeFolderName(this.origins)
    return this
  }

  get originToRevives() { return wind(this.origins, this.revives) }

  async saveAsText() {
    if (this.origins?.length <= 0) {
      if (this.log) Xr().file('empty url collection') |> says[LIVRE].p('>> error')
      return this
    }
    else {
      if (this.log) this.originToRevives |> decoEntries |> says[LIVRE].p('>> saving')
    }

    // save origins
    {
      await promises.mkdir(this.src + '/origin', { recursive: true })
      const dest = this.src + '/origin/' + this.folder + '.origin.txt'
      await promises.writeFile(dest, this.origins.join(LF))
      if (this.log) Xr().file(ros(dest)) |> says[LIVRE].p('>> saved')
    }
    // save revives
    {
      await promises.mkdir(this.src + '/revive', { recursive: true })
      const dest = this.src + '/revive/' + this.folder + '.revive.txt'
      await promises.writeFile(dest, this.revives.join(LF))
      if (this.log) Xr().file(ros(dest)) |> says[LIVRE].p('>> saved')
    }
    // save spreads
    {
      await promises.mkdir(this.src + '/spread', { recursive: true })
      const dest = this.src + '/spread/' + this.folder + '.spread.txt'
      await promises.writeFile(dest, this.spreads.join(LF))
      if (this.log) Xr().file(ros(dest)) |> says[LIVRE].p('>> saved')
    }
    return this

  }
  async saveAsImage() {
    await promises.mkdir(`${this.src}/image/${this.folder}`, { recursive: true })
    await this.gallery.saveImages(this.spreads)
    return this
  }

  spreadUrls(urls) {
    const filtered = urls.filter(url => REG_INDEX.test(url))
    if (!filtered?.length) return []
    const [ url ] = filtered
    const indexMax = maxBy(filtered, dezeenUrlToIndex)
    const indexed = init(indexMax, i => url.replace(REG_INDEX, i))
    return distinct(merge(urls, indexed))
  }

  makeFolderName(urls) {
    const REG = /(?<=\/)[\w\d-]+(?=[_-]+dezeen_\d+_col_\d+)/
    const url = urls.find(x => REG.test(x)) ?? urls[0]
    let ms, title
    if (( ms = url.match(REG) ) && ( [ title ] = ms )) {
      return title
    }
    return url.replace(DICT_DEZEEN_FOLDER, x => x.trim())
  }

  makeImagePath(url, headers) {
    let { dir, base, ext } = parsePath(url)
    let ms, ph
    if (( ms = headers[CONTENT_TYPE].match(/(?<=image\/)\w+/) ) && ( [ ph ] = ms )) { ext = '.' + ph } // 'image/webp'
    return `${this.src}/image/${this.folder}/${base}${ext}`
  }
}


