import { Chrome, pageId }       from '@acq/chrome'
import { distinct }             from '@aryth/distinct-vector'
import { decoString, says, Xr } from '@spare/logger'
import { time }                 from '@valjoux/timestamp-pretty'
import { mutate }               from '@vect/vector-mapper'
import { acquire }              from '@vect/vector-merge'
import { PUPPETEER }            from '../resources/constants'


says[PUPPETEER].attach(time)

export class DezeenBrowser {
  constructor(chrome, log) {
    this.chrome = chrome
    this.pageOptions = { waitUntil: 'load', timeout: 300000 }
    this.log = log
  }
  static async build(log) {
    const chrome = await Chrome.build()
    return new DezeenBrowser(chrome, log)
  }
  async close() {
    await this.chrome.close()
    return void 0
  }

  async selectImageUrls(url) {
    let pretty

    if (this.log) Xr().url(pretty = decoString(url)) |> says[PUPPETEER].p('>> opening')

    const page = await this.chrome.openPage(url, this.pageOptions)

    if (this.log) Xr().page(pageId(page)).for(pretty) |> says[PUPPETEER].p('>> created')

    const list = await this.#selectImagesFromPage(page)

    if (this.log) Xr().page(pageId(page)) |> says[PUPPETEER].p('>> closing')

    await page.close()
    return list
  }

  async #selectImagesFromPage(page) {
    const list = []

    if (this.log) Xr().page(pageId(page)).title(decoString(await page.title())) |> says[PUPPETEER].p('>> reading')

    /** @type {Array<ElementHandle>} */
    const sectionCollection = await page.$$('.page-wrap > .container > .left-column > article > header,section,footer')

    for (let section of sectionCollection) {
      /** @type {string} */
      const tagName = await section.evaluate(({ tagName }) => tagName)
      const images = await section.$$eval('figure',
        list => list.map(x => x.getAttribute('data-lightboximage'))
      )
      mutate(images, url => url.trim())
      acquire(list, images)
      if (this.log) Xr().page(pageId(page)).section(tagName.toLowerCase()) |> says[PUPPETEER].p('>> evaluated') // .images(images |> decoVector)
    }

    return distinct(list)
  }
}


// async imageUrls(urls) {
//   return this.chrome.evalPages({
//     urls: urls,
//     limit: Math.min(urls.length, 2),
//     selector: selector,
//     options: this.pageOptions,
//     log: true
//   })
// }





