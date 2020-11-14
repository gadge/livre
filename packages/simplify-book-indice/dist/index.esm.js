import { DOT, RT, DA, SP } from '@spare/enum-chars';
import { Differentiator } from '@vect/vector-differentiator';
import { tapBy } from '@spare/tap';
import { romanToDecimal } from '@aryth/roman';
import { nullish } from '@typen/nullish';
import { isNumeric, parseNum } from '@typen/num-strict';

const INDICE = tapBy('|', '-', '[Aa]ct', '[Aa]rticle', '[Cc]h(?:\\.|apter)?', '[Ee]pisode', '[Ll]ines?', '[Pp]aragraph', '[Pp]art', '[Pp]ages?', '[Ss]cene', '[Ss]eason', '[Vv]ol(?:\\.|ume)?');
const NUMERAL = '\\d+|[IVXLC]+|[ivxlc]+';
const TRAIL = '[.,]*\\s?:?(?:\\s+|$)?';

const INDICED_NUMERAL = new RegExp(`\\b(${INDICE})[\\b\\s](${NUMERAL})(${TRAIL})`, 'g');

const parseIndice = indice => {
  if (nullish(indice)) return '';
  if (/^ch/gi.test(indice)) return indice.slice(0, 2);
  if (/^vol/gi.test(indice)) return indice.slice(0, 3);
  return indice[0];
};
const parseNumeral = num => {
  return String(isNumeric(num) ? parseNum(num) : romanToDecimal(num));
};
const parseTrail = trail => {
  if (trail) {
    if (trail.startsWith(DOT)) return trail.trim();
    if (trail.endsWith(RT)) return RT;
    if (trail.endsWith(DA)) return DA;
  }

  return '';
};
const parseIndicedNumeral = (match, indice, numeral, trail) => {
  return parseIndice(indice) + parseNumeral(numeral) + parseTrail(trail);
}; // ({ match, indice, numeral, trail: '(' + trail + ')' }) |> delogger

const simplifyBookIndice = text => {
  var _text;

  const vec = (_text = text, textToVector(_text)),
        l = vec.length;
  let res = '',
      p,
      prev,
      c,
      curr;
  if (l === 0) return res;
  if (l === 1) return [[c, prev]] = vec, prev;
  {
    for ([[p, prev], [c, curr]] of Differentiator.build(vec)) res += prev + (p && !c ? DOT + SP : '');

    return res + curr;
  }
};
const textToVector = function (text) {
  const reg = INDICED_NUMERAL;
  let ms,
      l = 0,
      r = 0,
      bond;
  const vec = [];

  while (ms = reg.exec(text)) {
    // ({ match: ms[0], index: { prev: l, curr: ms.index } }) |> delogger
    r = ms.index;
    if (bond = text.slice(l, r)) vec.push([0, bond]);
    vec.push([1, parseIndicedNumeral(...ms)]);
    l = reg.lastIndex;
  }

  if (bond = text.slice(l)) vec.push([0, bond]);
  return vec;
};

export { simplifyBookIndice };
