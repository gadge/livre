import { says }                  from '@spare/logger'
import { candidates }            from './candidates'
import { simplifyBookIndiceArc } from './strategies/simplifyBookIndiceArc'

// const dict = simplifyBookIndiceArc |> makeReplaceable
for (let [index, candidate] of Object.entries(candidates)) {
  simplifyBookIndiceArc(candidate) |> says[index].br(candidate).p('->')
}