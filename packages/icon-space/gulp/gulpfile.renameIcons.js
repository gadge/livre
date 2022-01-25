import del                 from 'del'
import gulp                from 'gulp'
import rename              from 'gulp-rename'
import { ros, says, Xr }   from '@spare/logger'
import { time }            from '@valjoux/timestamp-pretty'
import { makeReplaceable } from '@spare/translator'

const SRC = 'static/icons/resources'
const DEST = 'static/icons/target'
const clean = function () { return del([DEST]) }

let index = 0

const dictionary = [
  [/--v\d-/g, '-'],
  [/^external-/, ''],
  [/vitaliy-gorbachev-lineal-color-vitaly-gorbachev/, 'vit-gorbachev'],
  [/-justicon-\d-/, '-']
] |> makeReplaceable

says['#'].attach(time)

export const task = function () {
  return gulp
    .src(SRC + '/*.svg')
    .pipe(rename((path, file) => {
      const { dirname, basename, extname } = path
      const newBasename = basename.replace(dictionary)
      Xr(extname).br(basename).p('->').br(ros(newBasename)) |> says['#'].br(index++)
      return {
        dirname: dirname,
        basename: newBasename,
        extname: extname
      }
    }))
    .pipe(gulp.dest(DEST))
}

export const renameIcons = gulp.series(
  clean,
  task
)