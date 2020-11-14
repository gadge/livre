import { range }  from '@vect/vector-init'
import { merges } from '@vect/vector-merge'

/**
 * 0-9: 48-57
 * a-z: 97-122
 * A-Z: 65-90
 * @type {string[]}
 */
export const alphabets = range(97, 122).map(x => String.fromCharCode(x))
export const numerals = range(48, 57).map(x => String.fromCharCode(x))
export const prepositions = [
  'of',
  'to',
  'on',
  'in',
  'at',
  'by',
  'up',
  'out',
  'for',
  'with',
  'from',
  'upon',
  'down',
  'into',
  'onto',
  'than',
  'under',
  'toward',
  'before',
  'after',
  'behind',
  'during',
  'inside',
  'against',
  'between',
  'outside',
  'without',
  'through',
  'beneath',
  'throughout'
]
export const adverbs = [
  'all',
  'not',
  'no',
  'nor',
  'neither',
  'either',
  'any',
  'again',
  'never',
]
export const conjunctions = [
  'and',
  'but',
  'if',
  'or',
  'so',
  'as',
  'therefore',
  'however',
  'although',
  'even',
  'though',
  'yet',
  'once'
]
export const pronouns = [
  'you',
  'i',
  'he',
  'she',
  'it',
  'it\'s',
  'we',
  'they',
  'me',
  'him',
  'himself',
  'her',
  'herself',
  'us',
  'them',
  'themselves',
  'your',
  'yourself',
  'my',
  'myself',
  'his',
  'her',
  'its',
  'our',
  'your',
  'their',
  'this',
  'these',
  'that',
  'that\'s',
  'those',
  'their',
  'theirs',
  'there',
  'then',
  'what',
  'which',
  'where',
  'who',
  'whose',
  'whom',
  'when',
  'while',
  'whence',
  'why',
  'how',
  'other'
]
export const articles = [
  'a', 'an', 'the'
]
export const auxiliaryVerbs = [
  'have',
  'has',
  'had',
  'may',
  'might',
  'do',
  'don\'t',
  'did',
  'done',
  'shall',
  'should',
  'will',
  'would',
  'can',
  'could',
  'must'
]
export const linkVerbs = [
  'is', 'am', 'was', 'are', 'were', 'be', 'been', 'get', 'being'
]
export const punctuations = [
  '\"', '\"i', '\'', '-', '*', '_'
]
export const reserved = [
  'gutenberg',
  'tm',
  'www'
]

export const frequentWords = merges(
  alphabets,
  prepositions,
  conjunctions,
  pronouns,
  articles,
  linkVerbs,
  auxiliaryVerbs,
  adverbs,
  punctuations,
  reserved
)