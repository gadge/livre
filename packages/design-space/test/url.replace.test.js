const { parsePath } = require('@acq/path')
const { decoEntries, logger, decoString } = require('@spare/logger')
const urls = [
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city-hero-852x479.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_7-852x1278.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_3-852x682.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_9-852x1278.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_16-852x568.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_5-852x568.jpg',
  'https://static.dezeen.com/uploads/2021/11/site-plan-agua-210-hemaa-architecture-mexico-city-drawings_dezeen_2364_col_3.jpg',
  'https://static.dezeen.com/uploads/2021/11/basement-agua-210-hemaa-architecture-mexico-city-drawings_dezeen_2364_col_4.jpg',
  'https://static.dezeen.com/uploads/2021/11/ground-floor-agua-210-hemaa-architecture-mexico-city-drawings_dezeen_2364_col_0.jpg',
  'https://static.dezeen.com/uploads/2021/11/first-floor-agua-210-hemaa-architecture-mexico-city-drawings_dezeen_2364_col_1-1.jpg',
  'https://static.dezeen.com/uploads/2021/11/roof-garden-agua-210-hemaa-architecture-mexico-city-drawings_dezeen_2364_col_2.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_0-scaled.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_1-scaled.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_6.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_13-scaled.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_14-scaled.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_15-scaled.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_0-1-scaled.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_1-1.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_5-1-scaled.jpg',
  'https://static.dezeen.com/uploads/2021/11/agua-210-hemaa-architecture-mexico-city_dezeen_2364_col_8-scaled.jpg',
]

const regex = /(?<=[-_]col_\d+|hero|sq)(-\d+|x\d+|-scaled){1,2}\.jpg$/

const test = () => {
  const results = urls.map(url => {
    const path = parsePath(url)
    const result = url.replace(regex, '.jpg')
    const path2 = parsePath(result)
    return [ decoString(path.base + path.ext), decoString(path2.base + path2.ext) ]
  })
  decoEntries(results) |> logger
}

test()

