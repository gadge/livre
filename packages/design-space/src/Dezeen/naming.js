import { makeReplaceable } from '@spare/translator'

export const REG_DEZEEN_RAW = /(?<=[_-]col_\d+|hero\d?|sq\d?)([_-]\d+|x\d+|-scaled){1,3}\.jpg$/

const REG_DEZEEN_REVIVE = /(?<=[_-]col_\d+|hero\d?|sq\d?)([_-]\d+|x\d+|-scaled){1,3}\.jpg$/
const REG_DEZEEN_NAMING = /[_-]*dezeen_\d+_col[_-]*/
const REG_DEZEEN_FOLDER = /([_-]*dezeen_?\d*)?[_-](col_\d+|hero\d?|sq\d?)([_-]\d+|x\d+|-scaled){0,3}\.jpg$/

export const DICT_DEZEEN_REVIVE = [
  [ REG_DEZEEN_REVIVE, '.jpg' ]
] |> makeReplaceable

export const DICT_DEZEEN_NAMING = [
  [ REG_DEZEEN_REVIVE, '.jpg' ],
  [ REG_DEZEEN_NAMING, '-' ]
] |> makeReplaceable

export const DICT_DEZEEN_FOLDER = [
  [ REG_DEZEEN_FOLDER, '' ]
] |> makeReplaceable

export class ImageNaming {
  static reviveUrl(url) { return url.replace(DICT_DEZEEN_REVIVE) }
  static nameBaseName(url) { return url.replace(DICT_DEZEEN_NAMING) }
  static makeFolderName(url) { return url.replace(DICT_DEZEEN_FOLDER) }
}


