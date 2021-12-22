'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enumRegexes = require('@livre/enum-regexes');
var frequentWords = require('@livre/frequent-words');

const WordCount = ({
  excludes,
  top
}) => wordCount.bind({
  excludes,
  top
});
const wordCount = function (contents) {
  const excludes = (this === null || this === void 0 ? void 0 : this.excludes) ?? frequentWords.frequentWords;
  const top = this === null || this === void 0 ? void 0 : this.top;
  const counter = {};
  let ms, wd;

  while ((ms = enumRegexes.WORD.exec(contents)) && ([wd] = ms)) {
    if (excludes.includes(wd = wd.toLowerCase())) {
      continue;
    }

    if (enumRegexes.NUM.test(wd)) {
      continue;
    }

    if (wd in counter) {
      counter[wd]++;
    } else {
      counter[wd] = 1;
    }
  }

  const entries = Object.entries(counter).sort(([, a], [, b]) => b - a);
  return top ? entries.slice(0, top) : entries;
};

exports.WordCount = WordCount;
exports.wordCount = wordCount;
