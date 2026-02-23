import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v2/guides'

export const getSASMissionsClass = filters => {
  const path = 'education-system/classes'
  const parameters = urlString(filters)
  return axios.get(`${resource}/${path}?${parameters}`)
}

export const getSASMissionList = params => {
  const path = `/v1/educationsystems/${params.EducationSystemId}/books/${params.bookId}/guides`
  if (params.institutionId) {
    return axios.get(`${path}?InstitutionId=${params.institutionId}&ClassId=${params.classId}`)
  }
  return axios.get(`${path}?ClassId=${params.classId}`)
}

export const getMissions = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/classes?${parameters}`)
}

export const getMissionsByClass = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/class/${id}?${parameters}`)
}

export const getMissionsById = (guideId, classId) =>
  axios.get(`${resource}/${guideId}/class/${classId}`)
