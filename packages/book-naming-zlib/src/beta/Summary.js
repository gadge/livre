import { Xr } from '@spare/logger'

export class Summary {
  succeed = 0
  failure = 0
  unchanged = 0
  constructor() {}
  get total() { return this.succeed + this.failure + this.unchanged }
  toString() {
    return Xr()
      ['total'](this.total)
      ['succeed'](this.succeed)
      ['failure'](this.failure)
      ['unchanged'](this.unchanged)
  }
}