import { says }                  from '@spare/logger'
import { candidates }            from './candidates'
import { simplifyBookIndiceDev } from './strategies/simplifyBookIndiceDev'

for (let [index, candidate] of Object.entries(candidates)) {
  simplifyBookIndiceDev(candidate) |> says[index].br(candidate).p('->')
}