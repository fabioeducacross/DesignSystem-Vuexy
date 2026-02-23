import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/books'

export const getBooks = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}?${parameters}`)
}
