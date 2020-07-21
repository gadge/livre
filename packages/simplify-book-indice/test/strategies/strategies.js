import { makeEmbedded }              from '@foba/util'
import { decoCrostab, logger, says } from '@spare/logger'
import { strategies }                from '@valjoux/strategies'
import { dateTime }                  from '@valjoux/timestamp-pretty'
import { candidates }                from '../candidates'
import { simplifyBookIndiceArc }     from './simplifyBookIndiceArc'
import { simplifyBookIndiceDev }     from './simplifyBookIndiceDev'
import { simplifyBookIndiceEdg }     from './simplifyBookIndiceEdg'
import { simplifyBookIndiceSwi }     from './simplifyBookIndiceSwi'

const test = () => {
  const { lapse, result } = strategies({
    repeat: 1E+5,
    candidates: candidates |> makeEmbedded,
    methods: {
      simplifyBookIndiceArc,
      simplifyBookIndiceDev,
      simplifyBookIndiceEdg,
      simplifyBookIndiceSwi,
    }
  })
  lapse |> decoCrostab |> says['lapse'].p(dateTime())
  '' |> logger
  result |> decoCrostab |> says['result'].p(dateTime())
}
test()