import { parsePath }             from '@acq/parse-path'
import checkbox                  from '@inquirer/checkbox'
import { RN }                    from '@spare/enum-chars'
import { logger, ros, says, Xr } from '@spare/logger'
import { bracket }               from '@texting/bracket'
import { time }                  from '@valjoux/timestamp-pretty'
import { promises }              from 'fs'
import { bookNaming }            from './bookNaming'

const SRC = process.cwd()
says['livre'].attach(time)
export const cli = async () => {
  let live = true
  let id = 0
  while (live) {
    ros(SRC) |> says['livre']
    const entireFiles = await promises
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

    const candidateExtends = [ ...new Set(entireFiles.map(({ ext }) => ext)) ]
    const selectedExtends = await checkbox({
      message: 'Select extend(s)',
      choices: candidateExtends.map(value => ( { value } )),
    })
    console.log('Selected extend(s):', selectedExtends)

    const candidateFiles = entireFiles.filter(x => selectedExtends.includes(x.ext))
    for (let fileInfo of candidateFiles) {
      fileInfo.to = fileInfo.base |> bookNaming
    }
    const selectedIDs = await checkbox({
      message: 'Select files to handle',
      pageSize: candidateFiles.length * 4,
      // showHelpTip: true,
      choices: candidateFiles
        .map(({ base, ext, to, id }) => ( {
          value: id,
          name: ros(base + ext) + RN + '   ' + ( to + ext )
        } ))
    })

    let succeed = 0, failure = 0, unchanged = 0
    for (let fileInfo of candidateFiles) if (selectedIDs.includes(fileInfo.id)) {
      await promises.rename(
        SRC + '/' + fileInfo.base + fileInfo.ext,
        SRC + '/' + fileInfo.to + fileInfo.ext
      ).then(() => {
          const same = fileInfo.base === fileInfo.to
          same ? unchanged++ : succeed++
          bracket(ros(fileInfo.base)) + RN + bracket(fileInfo.to) |> says['livre'].br(same ? 'unchanged' : 'renamed')
        }
      ).catch((e) => {
          failure++
          console.error(e)
        }
      )
    }
    Xr().succeed(succeed).failure(failure).unchanged(unchanged) |> says['livre']
    RN |> logger
    live = false
  }
}

// cli().then()