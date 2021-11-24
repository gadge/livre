import { says }   from '@palett/says'
import { deco }          from '@spare/deco'
import { DezeenBrowser } from '../src/DezeenBrowser'

const SRC = 'file:' + process.cwd() + '/packages/dezeen/resources/dezeen-sample.html'

const test = async () => {
  const dezeen = await DezeenBrowser.build()
  const vecs = await dezeen.imageUrls(
    [
      "https://www.dezeen.com/2021/11/02/hemaa-pair-of-stone-houses-two-brothers-families-mexico-city/",
      "https://www.dezeen.com/2021/10/30/interiors-wes-anderson-film-lookbook/",
      "https://www.dezeen.com/2021/10/30/daga-architects-mirrored-courtyard-traditional-hutong-house/"
    ]
  )
  vecs |> deco |> says['result']
  console.log("done")
  await dezeen.close()
}

test().then()