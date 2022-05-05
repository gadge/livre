import { subFileInfos } from '@acq/path'
import { distinct }     from '@aryth/distinct-vector'
import { $, says }      from '@spare/xr'
import { time }         from '@valjoux/timestamp-pretty'
import { promises }     from 'fs'
import prompts          from 'prompts'
import { DecoFab }      from './DecoFab'
import { rename }       from './rename.beta'
import { Summary }      from './Summary'

const SRC = process.cwd()
const LIVRE = 'Livre'
const CLASS = 'BookNaming'
says.attach(time)

export async function cli() {
  $.source(SRC) |> says[LIVRE].br(CLASS)
  let FILE_INFOS = await subFileInfos(process.cwd())
  const { extensions } = await prompts({
    type: 'multiselect',
    name: 'extensions',
    message: 'select extension',
    choices: (FILE_INFOS.map(({ ext }) => ext)|> distinct).map(value => ({ value }))
  })
  $.extensions(extensions) |> says[LIVRE].br(CLASS)

  const summary = new Summary()
  for (let { base, ext } of FILE_INFOS.filter(({ ext }) => extensions.includes(ext))) {
    try {
      const deco = DecoFab.next(), next = rename(base) // introduce renaming function here
      if (next === base) {
        deco(base) |> says[LIVRE].br(CLASS).br('unchanged')
        summary.unchanged++
        continue
      }
      const { confirm } = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: `[${deco(base)}] =>\n  [${deco(next)}]`,
        initial: true,
      })
      if (confirm) {
        await promises.rename(SRC + '/' + base + ext, SRC + '/' + next + ext)
        summary.succeed++
      }
      else {
        summary.unchanged++
      }
    } catch (e) {
      summary.failure++
      console.error(summary.failure, e)
    }
  }

  $.summary(summary.toString()) |> says[LIVRE].br(CLASS)
}