import { ros }                from '@palett/ros'
import { says }               from '@palett/says'
import { Xr }                 from '@spare/logger'
import { tapDot }             from '@spare/tap'
import { time }               from '@valjoux/timestamp-pretty'
import del                    from 'del'
import gulp                   from 'gulp'
import rename                 from 'gulp-rename'
import { determineBookName }  from './functions/determineBookName'
import { extractAuthorTitle } from './functions/extractAuthorTitle'

const SRC = 'static/source'
const DEST = 'static/target'
const clean = function () { return del([DEST]) }

let index = 0

export const task = function () {
  return gulp
    .src(SRC + '/*.txt')
    .pipe(rename(function (path, file) {
      const { author, title } = file.contents |> extractAuthorTitle |> determineBookName
      Xr(time()).br(path.basename).p('->')[ros(author)](ros(title)) |> says['#'].br(index++)
      return {
        dirname: path.dirname,
        basename: tapDot(author, title),
        extname: '.txt'
      }
    }))
    .pipe(gulp.dest(DEST))
}

export const renameBooks = gulp.series(
  clean,
  task
)