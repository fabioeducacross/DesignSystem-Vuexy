import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/teachers'
const resourceV2 = '/v2/teachers'

const coordinatorResource = 'v1/coordinator'

export const getProfessors = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}?${parameters}`)
}

export const getProfessorsV2 = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resourceV2}?${parameters}`)
}

export const getCoordinatorProfessors = filters => {
  const parameters = urlString(filters)

  return axios.get(`${coordinatorResource}/teachers?${parameters}`)
}

export const getTeacherLabels = () => {
  const path = 'label'
  return axios.get(`${resource}/${path}`)
}

export const getProfessorsByLabel = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/label?${parameters}`)
}

export const getProfessorById = teacherId => axios.get(`${resource}/${teacherId}`)

/** @deprecated */
export const postProfessors = data => axios.post(resource, data)

/**
 * @deprecated
 */
export const updateProfessors = (teacherId, data) => axios.put(`${resource}/${teacherId}`, data)

export const deleteProfessors = (teachersIds, batchAction, status = null) =>
  axios.delete(resource, { data: { teachersIds, batchAction, status } })

export const getTeacherAccessByMonth = filters => {
  const parameters = urlString(filters)
  const path = 'access-by-month'
  return axios.get(`${resource}/${path}?${parameters}`)
}

export const getTeacherSchoolGuidesEnabled = filters => {
  const parameters = urlString(filters)
  const path = 'school-guides-enabled'
  return axios.get(`${resource}/${path}?${parameters}`)
}

export const getTeacherEducationSystemGuidesEnabled = filters => {
  const parameters = urlString(filters)
  const path = 'education-system-guides-enabled'
  return axios.get(`${resource}/${path}?${parameters}`)
}

export const getAccessByTeachers = (filters, page) => {
  const parameters = urlString(filters)
  const path = 'access'
  return axios.get(`${resource}/${path}?page=${page}&${parameters}`)
}

// access-by-institution-month?InstitutionsIds=1&Module=1&EducationSystemId=12&Month=1
export const getAccessByInstitutionMonth = filters => {
  const parameters = urlString(filters)
  const path = 'access-by-institution-month'
  return axios.get(`${resource}/${path}?${parameters}`)
}

export const getTeacherExcluded = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/excluded?${parameters}`)
}

export const postTeacherExcluded = data => {
  return axios.post(`${resource}/excluded`, data)
}

export const postTeacherV2 = data => axios.post(resourceV2, data)

export const updateTeacherV2 = (teacherId, data) => axios.post(`${resourceV2}/${teacherId}`, data)
