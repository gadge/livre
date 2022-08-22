import { presetFlopper } from '@palett/flopper'
import { DecoString }    from '@spare/logger'

export class DecoFab {
  static flopper = presetFlopper(false)

  static next() {
    const { value } = DecoFab.flopper.next()
    return DecoString({ pres: { str: value, num: value } })
  }
}