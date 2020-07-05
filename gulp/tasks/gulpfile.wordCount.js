import del               from 'del'
import gulp              from 'gulp'
import rename            from 'gulp-rename'
import { gulpWordCount } from './plugins/gulpWordCountDev'

const clean = function () { return del(['./logs']) }

export const task = function () {
  return gulp.src('./static/target/*.txt')
    .pipe(gulpWordCount())
    .pipe(rename((path) => path.extname = '.js'))
    .pipe(gulp.dest('./logs'))
}

export const wordCount = gulp.series(
  clean,
  task
)