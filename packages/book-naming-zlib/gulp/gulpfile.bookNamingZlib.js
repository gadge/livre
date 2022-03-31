import { says }       from '@palett/says'
import { Xr }         from '@spare/logger'
import { time }       from '@valjoux/timestamp-pretty'
import del            from 'del'
import gulp           from 'gulp'
import rename     from 'gulp-rename'
import { rename } from '../src/alpha/rename'

const SRC = 'static/books'
const DEST = 'static/books/target'

const clean = function () { return del([ DEST ]) }

let index = 0

// export const gulpTemp =  () => through.obj(async (file, enc, callback) => {
//   const { base, ext } = parsePath(file.relative)
//   gulpUtil.log(ros(base), ext)
// })

export const task = function () {
  const ext = this?.ext ?? 'pdf'
  return gulp
    .src(SRC + '/*.' + ext)
    .pipe(rename((path, file) => {
      const newName = rename(path.basename)
      index++
      Xr(time()).br(path.basename) |> says['#'].br(index)
      Xr(time()).br(newName) |> says['#'].br(index)
      return {
        dirname: path.dirname,
        basename: rename(path.basename),
        extname: '.' + ext
      }
    }))
    .pipe(gulp.dest(DEST))
}

export const bookNamingZlib = gulp.series(
  clean,
  task.bind({ ext: 'pdf' }),
  task.bind({ ext: 'epub' })
)