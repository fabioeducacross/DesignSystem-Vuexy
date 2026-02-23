import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

export const SSelectInfinityScroll = (api, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${api}?${parameters}`, { ...filters })
}
