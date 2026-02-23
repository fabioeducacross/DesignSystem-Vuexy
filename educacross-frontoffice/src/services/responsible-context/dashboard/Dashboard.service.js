import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/dashboard'

export const getDashboardData = () => axios.get(`${resource}/student`)

export const getDashboardDataStudent = (filters = {}) => {
  const parameters = urlString(filters)
  const hasParams = parameters && parameters.length > 0
  const url = hasParams ? `${resource}/student?${parameters}` : `${resource}/student`
  return axios.get(url)
}
