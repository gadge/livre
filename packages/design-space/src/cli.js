import { ros, says }     from '@spare/logger'
import { time }          from '@valjoux/timestamp-pretty'
import prompts           from 'prompts'
import { LIVRE }         from '../resources/constants'
import { DezeenBrowser } from './DezeenBrowser'
import { DezeenPorter }  from './DezeenPorter'

const SRC = process.cwd() + '/dezeen'
says[LIVRE].attach(time)
const LOG = true

export const cli = async () => {
  const dezeenBrowser = await DezeenBrowser.build(LOG)
  const dezeenPorter = DezeenPorter.build(SRC, true)
  const { approach } = await prompts({
    type: 'multiselect',
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
    if (!url?.startsWith('https://')) continue
    if (!approach?.length) continue

    const urls = await dezeenBrowser.selectImageUrls(url)
    dezeenPorter.loadUrls(urls)

    if (approach.includes('txt')) await dezeenPorter.saveAsText()
    if (approach.includes('img')) await dezeenPorter.saveAsImage()

    dezeenPorter.reset()

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

  await dezeenBrowser.close()
}