import { says }                  from '@spare/logger'
import { candidates }            from './candidates'
import { simplifyBookIndiceSwi } from './strategies/simplifyBookIndiceSwi'

for (let [index, candidate] of Object.entries(candidates)) {
  simplifyBookIndiceSwi(candidate) |> says[index].br(candidate).p('->')
}