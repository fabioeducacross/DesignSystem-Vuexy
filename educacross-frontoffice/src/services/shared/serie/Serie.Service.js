import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/series'

export const getSeries = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}?${parameters}`)
}

export const getSerieBySubject = subjectId => {
  return axios.get(`${resource}/subjects/${subjectId}`)
}

export const getSeriesWithSubject = () => {
  return axios.get(`${resource}/subjects`)
}
