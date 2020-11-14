import { formatBookAuthor } from './formatBookAuthor'
import { formatBookTitle }  from './formatBookTitle'

export const determineBookName = ({ author, title }) => {
  return {
    author: formatBookAuthor(author),
    title: formatBookTitle(title)
  }
}