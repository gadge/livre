import { subFileInfos }  from '@acq/path'
import { ros, says, Xr } from '@spare/logger'
import { time }          from '@valjoux/timestamp-pretty'
import { promises }      from 'fs'
import prompts           from 'prompts'
import { Summary }       from './Summary'
import { bookNaming }    from './bookNaming'
import { distinct }      from '@aryth/distinct-vector'
import { parenth }       from '@texting/bracket'

const SRC = process.cwd()
const LIVRE = 'livre'
says[LIVRE].attach(time)

export async function cli() {
  ros(SRC) |> says[LIVRE]
  let FILE_INFOS = await subFileInfos(process.cwd())
  let EXTENSIONS = FILE_INFOS.map(({ ext }) => ext)|> distinct
  const promptForExtension = await prompts({
    type: 'multiselect',
    name: 'value',
    message: 'select extension',
    choices: EXTENSIONS.map(extension => ({ value: extension }))
  })
  EXTENSIONS = promptForExtension.value
  Xr()['selected extensions'](EXTENSIONS) |> says[LIVRE]

  const summary = new Summary()
  for (let { base: rawName, ext } of FILE_INFOS.filter(fileInfo => EXTENSIONS.includes(fileInfo.ext))) {
    try {
      const renamed = bookNaming(rawName) // introduce renaming function here
      if (renamed === rawName) {
        ros(rawName) |> says[LIVRE].br('unchanged')
        summary.unchanged++
        continue
      }
      const promptForConfirm = await prompts({
        type: 'confirm',
        name: 'value',
        message: parenth(ros(rawName)) + ' => ' + parenth(says[rawName].render(renamed)),
        initial: true,
      })
      if (promptForConfirm.value) {
        await promises.rename(SRC + '/' + rawName + ext, SRC + '/' + renamed + ext)
        summary.succeed++
      } else {
        summary.unchanged++
      }
    } catch (e) {
      summary.failure++
      console.error(summary.failure, e)
    }
  }

  summary.toString() |> says[LIVRE]
}

// cli().then()