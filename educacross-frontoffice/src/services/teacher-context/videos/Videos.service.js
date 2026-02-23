import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/meet-videos'

export const getMeetVideos = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}?${parameters}`)
}

export const getMeetVideoById = id => {
  return axios.get(`${resource}/${id}`)
}

export const createMeetVideo = data => {
  return axios.post(resource, data)
}

export const updateMeetVideo = (id, data) => {
  return axios.put(`${resource}/${id}`, data)
}

export const deleteMeetVideo = id => {
  return axios.delete(`${resource}/${id}`)
}
