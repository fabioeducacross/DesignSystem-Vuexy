import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/coordinators'
const resourceV2 = '/v2/coordinators'

export const getCoordinators = params => {
  const parameters = urlString(params)
  return axios.get(`${resource}?${parameters}`)
}

export const getCoordinatorsLabel = params => {
  const parameters = urlString(params)
  return axios.get(`${resource}/label?${parameters}`)
}

export const getCoordinatorsById = coordinatorId => axios.get(`${resource}/${coordinatorId}`)

export const postCoordinators = data => axios.post(resource, data)

export const updateCoordinators = (coordinatorId, data) =>
  axios.put(`${resource}/${coordinatorId}`, data)

export const deleteCoordinators = coordinatorsIds => axios.delete(`${resource}/${coordinatorsIds}`)

export const deleteMassCoordinators = params => {
  return axios.delete(resourceV2, {
    data: params,
  })
}

export const postCoordinatorsImport = data => {
  return axios.post(`${resource}/import`, data)
}

export const getCoordinatorsV2 = params => {
  const parameters = urlString(params)
  return axios.get(`${resourceV2}?${parameters}`)
}

export const getCoordinatorsExcluded = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/excluded?${parameters}`)
}

export const postCoordinatorsExcluded = data => {
  return axios.post(`${resource}/excluded`, data)
}
