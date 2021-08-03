import { parsePath }             from '@acq/parse-path'
import { RN }                    from '@spare/enum-chars'
import { logger, ros, says, Xr } from '@spare/logger'
import { time }                  from '@valjoux/timestamp-pretty'
import { promises }              from 'fs'
import prompts                   from 'prompts'
import { bookNaming }            from './bookNaming'

const SRC = process.cwd()
says['livre'].attach(time)
export const cli = async () => {
  let live = true
  let id = 0
  while (live) {
    ros(SRC) |> says['livre']
    const ENTIRE_FILEINFOS = await promises
      .readdir(process.cwd(), { withFileTypes: true })
      .then(list => list
        .filter(dirent => !dirent.isDirectory())
        .map((dirent) => {
          const fileInfo = parsePath(dirent.name)
          fileInfo.id = id++
          delete ( fileInfo.dir )
          return fileInfo
        })
      )
    const CANDIDATE_EXTS = [ ...new Set(ENTIRE_FILEINFOS.map(({ ext }) => ext)) ]

    const { value: SELECTED_EXTS } = await prompts({
      type: 'multiselect',
      name: 'value',
      message: 'Select extend(s)',
      choices: CANDIDATE_EXTS.map(value => ( { value } )),
      hint: '- Space to select. Return to submit'
    })
    Xr()['selected extend'](SELECTED_EXTS) |> says['livre']

    const CANDIDATE_FILEINFOS = ENTIRE_FILEINFOS.filter(x => SELECTED_EXTS.includes(x.ext))

    const TALE = {
      succeed: 0,
      failure: 0,
      unchanged: 0,
      get total() { return this.succeed + this.failure + this.unchanged }
    }
    for (let { base, ext } of CANDIDATE_FILEINFOS) {
      const target = bookNaming(base)
      if (target === base) {
        ++TALE.unchanged
        ros(base) |> says['livre'].br('unchanged')
        continue
      }
      const ready = await prompts({
        type: 'confirm',
        name: 'value',
        message: Xr().br(ros(base)).p('renamed to').br(says[base].render(target)).p('?'),
        initial: true,
      })
      if (ready.value) await promises
        .rename(SRC + '/' + base + ext, SRC + '/' + target + ext)
        .then(() => ++TALE.succeed)
        .catch(e => console.error(++TALE.failure, e))
    }
    Xr()
      ['total'](TALE.total)
      ['succeed'](TALE.succeed)
      ['failure'](TALE.failure)
      ['unchanged'](TALE.unchanged)
      |> says['livre']
    RN |> logger
    live = false
  }
}

// cli().then()