import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/subjects'
const resource2 = '/v2/subjects'

export const getSubjects = institutionId => {
  const URL = `${resource}?InstitutionId=${institutionId}`
  return axios.get(URL)
}

export const getSubjectsLabel = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/label?${parameters}`)
}

export const getSubjectsLabelV2 = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource2}/label?${parameters}`)
}
