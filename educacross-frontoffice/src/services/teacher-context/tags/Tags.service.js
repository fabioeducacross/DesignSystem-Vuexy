import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resourceV2 = '/v2/tags'

export default function getTags(filters) {
  const parameters = urlString(filters)

  return axios.get(`${resourceV2}?${parameters}`)
}
