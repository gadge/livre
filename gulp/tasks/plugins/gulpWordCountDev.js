// through2 是一个对 node 的 transform streams 简单封装
import { esvar }         from '@flua/utils'
import { WordCount }     from '@livre/word-count'
import { ros }           from '@palett/ros'
import { SP }            from '@spare/enum-chars'
import { delogger }      from '@spare/logger'
import { tenseQuote }    from '@spare/quote'
import { Verse }         from '@spare/verse'
import gulpUtil          from 'gulp-util'
import through           from 'through2'
import { frequentWords } from '../assets/frequent'
import { parsePath }     from '../functions/parsePath'

const PluginError = gulpUtil.PluginError

// 常量
const PLUGIN_NAME = 'gulp-word-count-dev'

// 插件级别函数 (处理文件)
export function gulpWordCount(options = {}) {
  if (!options) { throw new PluginError(PLUGIN_NAME, 'missing excludes.') }
  options.excludes = options.excludes || frequentWords
  options.top = options.top ?? 64
  // 创建一个让每个文件通过的 stream 通道
  return through.obj(function (file, enc, callback) {
    gulpUtil.log(ros(parsePath(file.relative).base))
    // file.relative |> delogger
    if (file.isNull()) { return void callback(null, file) }
    if (file.isBuffer()) {
      const counts = file.contents.toString() |> WordCount(options)
      file.contents = Buffer.from(esvar('counts') + SP + Verse.entries(counts, { keyRead: x => String(x)|> tenseQuote }))
    }
    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME, 'stream not ready yet')
      // file.contents.pipe(wordCounterStream(excludes))
    }
    return void callback(null, file)
  })
}

function wordCounterStream(excludes) {
  /** @type {ReadableStream} */const stream = through()
  typeof stream |> delogger
  // stream.write(prefixText)
  return stream
}