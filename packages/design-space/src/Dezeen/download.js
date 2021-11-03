import { parsePath } from '@acq/path'
import { says, Xr }  from '@spare/logger'
import axios         from 'axios'
import fs            from 'fs'
import { PUPPETEER } from '../Dezeen'

export async function download({ src, dest }) {
  const { dir, base, ext } = parsePath(src)
  return await axios({
    method: 'get',
    url: src,
    responseType: 'stream'
  }).then(response => {
    const trimmed = base.replace(/[_-]*dezeen_(?=\d+_col|hero)[_-]*/, '-')
    response.data.pipe(fs.createWriteStream(dest + trimmed + ext))
    Xr().file(base + ext) |> says[PUPPETEER].br('downloaded')
  })
}