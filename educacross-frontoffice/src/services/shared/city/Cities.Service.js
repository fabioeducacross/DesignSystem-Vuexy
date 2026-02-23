import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/cities'

export const getCities = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}?${parameters}`)
}
