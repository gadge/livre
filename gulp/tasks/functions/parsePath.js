import { basename, dirname, extname } from 'path'

export function parsePath(path) {
  const ext = this?.multiExt
    ? basename(path).slice(basename(path).indexOf('.'))
    : extname(path)
  return {
    dir: dirname(path),
    base: basename(path, ext),
    ext: ext
  }
}