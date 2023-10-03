import { subFileInfos } from '@acq/path'
import { distinct } from '@aryth/distinct-vector'
import { ros, says, Xr } from '@spare/logger'
import { parenth } from '@texting/bracket'
import { time } from '@valjoux/timestamp-pretty'
import { promises } from 'fs'
import prompts from 'prompts'
import { rename } from './rename'
import { Summary } from './Summary'
import { $ } from "@spare/xr";

const SRC = process.cwd()
const LIVRE = 'livre'
const CLASS = 'BookNaming'
says[LIVRE].attach(time)

export async function cli(folder = SRC) {
  $.source(folder) |> says[LIVRE].br(CLASS)
  ros(folder) |> says[LIVRE]
  const FILE_INFOS = await subFileInfos(folder);
  const RAW_EXTENSIONS = FILE_INFOS.map(({ ext }) => ext)|> distinct;
  const EXTENSIONS_ANSWER = await prompts({
    type: 'multiselect',
    name: 'value',
    message: 'select extension',
    choices: RAW_EXTENSIONS.map(extension => ({ value: extension }))
  })
  const SELECTED_EXTENSIONS = EXTENSIONS_ANSWER.value
  Xr()['selected extensions'](SELECTED_EXTENSIONS) |> says[LIVRE]

  const SUMMARY = new Summary()
  for (let { base, ext } of FILE_INFOS.filter(fileInfo => SELECTED_EXTENSIONS.includes(fileInfo.ext))) {
    try {
      const renamed = rename(base) // introduce renaming function here
      if (renamed === base) {
        ros(base) |> says[LIVRE].br('unchanged')
        SUMMARY.unchanged++
        continue
      }
      const USER_CONFIRM_ANSWER = await prompts({
        type: 'confirm',
        name: 'value',
        message: parenth(ros(base)) + ' => ' + parenth(says[base].render(renamed)),
        initial: true,
      })
      if (USER_CONFIRM_ANSWER.value) {
        await promises.rename(folder + '/' + base + ext, folder + '/' + renamed + ext)
        SUMMARY.succeed++
      } else {
        SUMMARY.unchanged++
      }
    } catch (e) {
      SUMMARY.failure++
      console.error(SUMMARY.failure, e)
    }
  }

  SUMMARY.toString() |> says[LIVRE]
}

// cli().then()