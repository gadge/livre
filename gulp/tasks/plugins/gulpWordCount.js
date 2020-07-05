import gulpUtil from 'gulp-util'
import through  from 'through2'
import wc       from 'wordcount'

const PluginError = gulpUtil.PluginError
const File = gulpUtil.File
const path = require('path')

export const gulpWordCount = function (options) {
  let total = 0
  let firstFile

  function bufferContents(file, enc, cb) {
    let wordCount = 0
    if (file.isNull()) return
    if (file.isStream()) return this.emit('error', new PluginError('gulp-wordcount', 'Streaming not supported'))
    if (!firstFile) firstFile = file
    wordCount = wc(file.contents.toString())
    total += wordCount
    cb()
  }

  function endStream(callback) {
    gulpUtil.log('Your count: ' + total)
    if (firstFile) {
      const joinedFile = new File({
        base: firstFile.base,
        cwd: firstFile.cwd,
        path: path.join(firstFile.base, options.file),
        contents: new Buffer(total.toString())
      })
      this.push(joinedFile)
      return callback()
    }
    return callback()
  }

  return through.obj(bufferContents, endStream)
}
