import { ros }         from '@palett/ros'
import { says }        from '@palett/says'
import { decoEntries } from '@spare/logger'
import { tapBy }       from '@spare/tap'
import gulp            from 'gulp'
import gulpUtil        from 'gulp-util'
import through         from 'through2'
import { parsePath }   from './functions/parsePath'


const consolidated = {}

// 插件级别函数 (处理文件)
export const gulpWordAnalyse = () => through.obj(async (file, enc, callback) => {
  const { base } = parsePath(file.relative)
  await gulpUtil.log(ros(base))
  const { counts } = await import(tapBy('/', process.cwd(), 'logs', base) + '.js')
  for (let [word, count] of counts) {
    if (word in consolidated) { consolidated[word] += +count } else { consolidated[word] = +count }
  }
  return void callback(null, file)
})


export const task = function () {
  return gulp.src('./logs/*.js')
    .pipe(gulpWordAnalyse())
}


const logger = async () => {
  const entries = await Object.entries(consolidated)
  entries.sort(([, a], [, b]) => b - a)
  await decoEntries(entries) |> says['result']
}

export const analyseLog = gulp.series(
  task,
  logger
)