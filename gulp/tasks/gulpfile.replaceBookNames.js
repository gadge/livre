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

const clean = function () { return del(['static/booksRenamed']) }

let index = 0

export const task = function () {
  return gulp
    .src('static/booksSource/*.txt')
    .pipe(rename(function (path, file) {
      const { author, title } = file.contents |> extractAuthorTitle |> determineBookName
      Xr(time())[ros(author)](ros(title)) |> says['#'].br(index++)
      return {
        dirname: path.dirname,
        basename: tapDot(author, title),
        extname: '.txt'
      }
    }))
    .pipe(gulp.dest('static/booksRenamed'))
}

export const replaceBookNames = gulp.series(
  clean,
  task
)