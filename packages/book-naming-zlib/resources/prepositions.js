import { makeReplaceable } from '@spare/translator'

export const PREPOSITONS = [
  'a',
  'about',
  'above',
  'across',
  'after',
  'against',
  'along',
  'around',
  'as',
  'at',
  'before',
  'behind',
  'below',
  'beside',
  'between',
  'beyond',
  'but',
  'by',
  'down',
  'during',
  'except',
  'for',
  'from',
  'in',
  'including',
  'inside',
  'into',
  'less',
  'near',
  'of',
  'off',
  'on',
  'out',
  'over',
  'per',
  'since',
  'than',
  'till',
  'to',
  'toward',
  'under',
  'up',
  'upon',
  'via',
  'with',
  'within',
  'without',
]

export const CONJUNCTIONS = [
  'and',
  'nor',
  'but',
  'or',
  'yet',
  'so',
]

export const ARTICLES = [
  'a',
  'an',
  'the',
]

export const PREPOSITION_REPLACE_DICT = makeReplaceable(
  [...PREPOSITONS, ...CONJUNCTIONS, ...ARTICLES]
    .map(word => [new RegExp(`\\b${word}\\b`, 'gi'), word])
)
