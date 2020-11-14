import { delogger }                                   from '@spare/logger'
import { extractAuthorTitle, extractAuthorTitleHard } from '../functions/extractAuthorTitle'

const text = 'The Project Gutenberg EBook of Pride and Prejudice, by Jane Austen\n' +
  '\n' +
  'Title: Pride and Prejudice\n' +
  '\n' +
  'Author: Jane Austen\n' +
  '\n' +
  'Posting Date: August 26, 2008 [EBook #1342]\n' +
  'Release Date: June, 1998\n' +
  'Last updated: February 15, 2015]'

const text2 = 'Project Gutenberg’s Macbeth, by William Shakespeare\n' +
  '\n' +
  'Title: Macbeth\n' +
  '\n' +
  'Author: William Shakespeare\n' +
  '\n'

export const test = () => {
  extractAuthorTitleHard(text2) |> delogger
}

test()