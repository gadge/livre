import { dest, src } from 'gulp'

function copy() {
  return src('static/books/*.txt')
    .pipe(dest('static/booksGamma/'))
}

export { copy }