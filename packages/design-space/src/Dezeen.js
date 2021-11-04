import { Chrome, pageId }       from '@acq/chrome'
import { decoString, says, Xr } from '@spare/logger'
import { time }                 from '@valjoux/timestamp-pretty'
import { mutate }               from '@vect/vector-mapper'
import { acquire }              from '@vect/vector-merge'
import { checkTagName }         from '../util/checkers'

export const PUPPETEER = 'puppeteer'
says[PUPPETEER].attach(time)

export class Dezeen {
  chrome
  constructor(chrome) {
    this.chrome = chrome
  }
  static async build() {
    const chrome = await Chrome.build()
    return new Dezeen(chrome)
  }
  async close() {
    return await this.chrome.closeBrowser()
  }
  async imageUrls(urls) {
    const limit = Math.min(urls.length, 2)
    const options = { waitUntil: 'load', timeout: 300000 }
    return this.chrome.evalPages({ urls, limit, selector, options, log: true })
  }
  async imageUrl(url, log) {
    let spin, pretty

    if (log) pretty = decoString(url)
    if (log) Xr().url(pretty) |> says[PUPPETEER].p('>> opening')
    // if (log) spin = ora(`>> opening page`).start()

    const page = await this.chrome.browser.newPage()
    await page.goto(url)

    // if (log) spin.stopAndPersist({ text: `>> page ${ pageId(page) } is evaluating ${ pretty }` })
    if (log) Xr().page(pageId(page)).for(pretty) |> says[PUPPETEER].p('>> created')

    const result = await selector(page)
    // if (log) spin.succeed(`>> closing page ${ pageId(page) }`)
    if (log) Xr().page(pageId(page)) |> says[PUPPETEER].p('>> closing')
    await page.close()
    return result
  }
}

async function selector(page) {
  const vec = []
  Xr().page(pageId(page)).title(decoString(await page.title())) |> says[PUPPETEER].p('>> reading')
  /** @type {[ElementHandle]} */
  const sections = await page.$$('.page-wrap > .container > .left-column > article > header,section,footer')
  // sections.length |> says[PUPPETEER]
  for (let section of sections) {
    /** @type {string} */
    const tagName = ( await section.evaluate(checkTagName) )
    const images = await section.$$eval('figure', list => list.map(x => x.getAttribute('data-lightboximage')))
    mutate(images, url => url.trim())
    acquire(vec, images)
    Xr().page(pageId(page)).section(tagName.toLowerCase()) |> says[PUPPETEER].p('>> evaluated') // .images(images |> decoVector)
  }
  return [ ...new Set(vec) ]
}



