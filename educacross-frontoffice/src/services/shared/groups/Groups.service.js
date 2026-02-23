import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/class-group'

export const getGroups = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}?${parameters}`)
}

export const postGroup = data => {
  return axios.post(resource, data)
}

export const getGroup = id => {
  return axios.get(`${resource}/${id}`)
}

export const deleteGroup = id => {
  return axios.delete(`${resource}/${id}`)
}

export const putGroup = (id, data) => {
  return axios.put(`${resource}/${id}`, data)
}
