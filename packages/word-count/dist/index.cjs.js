'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const NUM = /^\d+$/g;
const WORD = /[\w']+/gi;

const WordCount = ({
  excludes,
  top
}) => wordCount.bind({
  excludes,
  top
});
const wordCount = function (contents) {
  var _this$excludes;

  const excludes = (_this$excludes = this === null || this === void 0 ? void 0 : this.excludes) !== null && _this$excludes !== void 0 ? _this$excludes : [];
  const top = this === null || this === void 0 ? void 0 : this.top;
  const counter = {};
  let ms, wd;

  while ((ms = WORD.exec(contents)) && ([wd] = ms)) {
    if (excludes.includes(wd = wd.toLowerCase())) {
      continue;
    }

    if (NUM.test(wd)) {
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
