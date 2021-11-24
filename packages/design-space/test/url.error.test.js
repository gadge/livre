import puppeteer from 'puppeteer'

const test = async () => {
  const browser = await puppeteer.launch()

  const page = await this.browser.newPage()
  if (url) await page.goto(url, options)
  return page


  await browser.close()
  return !browser?.isConnected()
}