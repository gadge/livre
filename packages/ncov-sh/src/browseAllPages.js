import { distinct }                           from '@aryth/distinct-vector'
import { deco, decoString, logger, says, Xr } from '@spare/logger'
import puppeteer                              from 'puppeteer'
import { promises }                           from 'fs'
import { time }                               from '@valjoux/timestamp-pretty'


export const PUPPETEER = 'puppeteer'

says[PUPPETEER].attach(time)

const DEST = process.cwd() + '/packages/ncov-sh/output'

const test = async (url, browserOption, pageOption) => {
  'started' |> says[PUPPETEER]
  const browser = await puppeteer.launch(browserOption)

  Xr().browser(await browser.version()) |> says[PUPPETEER]

  const page = await browser.newPage()

  Xr().page(pageId(page)) |> says[PUPPETEER].p('>> opening')

  await page.goto(url, pageOption)

  Xr().page(pageId(page)).title(decoString(await page.title())) |> says[PUPPETEER].p('>> reading')

  // Xr().pageContent(deco(await page.content())) |> says[PUPPETEER]

  /** @type {Array<ElementHandle>} */
  const sectionCollection = await page.$$('.container > ul')
  // sectionCollection |> deco |> logger
  for (let section of sectionCollection) {
    /** @type {string} */
    const tagName = await section.evaluate(({ tagName }) => tagName)
    const list = await section.$$eval('li > a',
      list => list.map(x => [ x.getAttribute('title'), x.getAttribute('href') ])
    )
    tagName |> deco |> logger
    list |> deco |> logger
    Xr().page(pageId(page)).section(tagName.toLowerCase()) |> says[PUPPETEER].p('>> evaluated') // .images(images |> decoVector)
  }

  await page.close()
  await browser.close()
  return browser?.isConnected() ?? false
}

export const pageId = page => {
  const id = page.mainFrame()._id
  return decoString(id.slice(0, 2) + '-' + id.slice(-4))
}

// const URL = 'http://wsjkw.sh.gov.cn/yqtb/index.html'
const URL = 'file://' + process.cwd() + '/packages/ncov-sh/test/sh.gov.html'
URL |> logger
const BROWSER_OPTION = { headless: false, defaultViewport: { height: 1440, width: 720 } }
const PAGE_OPTION = { waitUntil: 'networkidle0', timeout: 300000 }
test(URL, BROWSER_OPTION, PAGE_OPTION).then(console.log)