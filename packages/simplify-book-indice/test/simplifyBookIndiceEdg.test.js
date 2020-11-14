import { says }                  from '@spare/logger'
import { candidates }            from './candidates'
import { simplifyBookIndiceEdg } from './strategies/simplifyBookIndiceEdg'

for (let [index, candidate] of Object.entries(candidates)) {
  simplifyBookIndiceEdg(candidate) |> says[index].br(candidate).p('->')
}