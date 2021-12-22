import { WORD, NUM } from '@livre/enum-regexes';
import { frequentWords } from '@livre/frequent-words';

const WordCount = ({
  excludes,
  top
}) => wordCount.bind({
  excludes,
  top
});
const wordCount = function (contents) {
  const excludes = (this === null || this === void 0 ? void 0 : this.excludes) ?? frequentWords;
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

export { WordCount, wordCount };
