import { parsePath }                 from '@acq/parse-path'
import checkbox                      from '@inquirer/checkbox'
import confirm                       from '@inquirer/confirm'
import { RN }                        from '@spare/enum-chars'
import { logger, ros, says, Xr, xr } from '@spare/logger'
import { time }                      from '@valjoux/timestamp-pretty'
import { promises }                  from 'fs'
import { bookNaming }                from './bookNaming'

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

    const SELECTED_EXTS = await checkbox({
      message: 'Select extend(s)',
      choices: CANDIDATE_EXTS.map(value => ( { value } )),
    })
    xr()['selected extend'](SELECTED_EXTS) |> says['livre']

    const CANDIDATE_FILEINFOS = ENTIRE_FILEINFOS.filter(x => SELECTED_EXTS.includes(x.ext))

    const CONTAINER = {
      succeed: 0,
      failure: 0,
      unchanged: 0,
      get total() { return this.succeed + this.failure + this.unchanged }
    }
    for (let { base, ext } of CANDIDATE_FILEINFOS) {
      const target = bookNaming(base)
      if (target === base) {
        ros(base) |> says['livre'].br('unchanged')
        continue
      }
      const ready = await confirm({ message: Xr().br(ros(base)).p('renamed to').br(says[base].render(target)).p('?') })
      if (ready) {
        await promises.rename(SRC + '/' + base + ext, SRC + '/' + target + ext)
          .then(() => ++CONTAINER.succeed)
          .catch(e => console.error(++CONTAINER.failure, e))
      }
    }
    xr()
      ['total'](CONTAINER.total)
      ['succeed'](CONTAINER.succeed)
      ['failure'](CONTAINER.failure)
      ['unchanged'](CONTAINER.unchanged)
      |> says['livre']
    RN |> logger
    live = false
  }
}

// cli().then()