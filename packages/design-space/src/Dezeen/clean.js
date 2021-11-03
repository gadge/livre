export const cleanDezeenImage = url => {
  return url.replace(/(?<=[-_]col_\d+|hero)(-\d+|x\d+|-scaled){1,2}\.jpg$/, '.jpg')
}