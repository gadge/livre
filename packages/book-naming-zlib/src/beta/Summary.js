import { x }       from '@spare/xr'
import { DecoFab } from './DecoFab'

export class Summary {
  succeed = 0
  failure = 0
  unchanged = 0
  constructor() {}
  get total() { return this.succeed + this.failure + this.unchanged }
  toString() {
    const deco = DecoFab.next()
    return x
      [deco('total')](this.total)
      [deco('succeed')](this.succeed)
      [deco('failure')](this.failure)
      [deco('unchanged')](this.unchanged).toString()
  }
}