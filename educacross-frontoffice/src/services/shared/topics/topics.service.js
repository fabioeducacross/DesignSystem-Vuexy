import axiosIns from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = 'v1/topics'

export const getTopics = filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resource}/label?${parameters}`)
}
