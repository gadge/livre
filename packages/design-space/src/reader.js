/**
 *
 * @param {string[]} urls
 * @return {string|null}
 */
export const readYear = (urls) => {
  for (let url of urls) {
    const years = url.match(/(?<=uploads\/)\d{4}(?=\/)/)
    if (years) return years[0]
  }
  return null
}