import { presetFlopper } from '@palett/flopper'
import { DecoString }    from '@spare/logger'

export class DecoFab {
  static flopper = presetFlopper(false)
  static next() { return DecoString({ presets: DecoFab.flopper.next().value }) }
}