import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = 'v1/events'

export const getEventsActiveReport = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/active?${parameters}`)
}

export const getEventDetails = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/active/${id}/detail?${parameters}`)
}

export const getEventsActiveReportInstitution = (eventId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/active/${eventId}/report/institution?${parameters}`)
}

export const getEventsActiveReportInstitutionDashboard = (eventId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/active/${eventId}/report/institution/dashboard?${parameters}`)
}

export const getEventsActiveReportClass = (eventId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/active/${eventId}/report/class?${parameters}`)
}
export const getEventsActiveReportStudent = (eventId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/active/${eventId}/report/student?${parameters}`)
}

export const getEventsParticipationStudent = (eventId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/active/${eventId}/participation/student?${parameters}`)
}
export const getEventRankingSchool = (eventId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/active/${eventId}/ranking/institution?${parameters}`)
}

export const getEventRankingStudent = (eventId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/active/${eventId}/ranking/students?${parameters}`)
}

export const getEventResultReportInstitutionsDashboard = (eventId, filters) => {
  const parameters = urlString(filters)
  return axios.get(
    `${resource}/active/${eventId}/participation/institution/dashboard?${parameters}`,
  )
}

export const getEventResultReportInstitutions = (eventId, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/active/${eventId}/participation/institution?${parameters}`)
}

export const getEventResultReportClassesDashboard = (eventId, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/active/${eventId}/participation/class/dashboard?${parameters}`)
}

export const getEventResultReportClasses = (eventId, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/active/${eventId}/participation/class?${parameters}`)
}

export const getEventResultReportStudentsDashboard = (eventId, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/active/${eventId}/participation/student/dashboard?${parameters}`)
}

export const getEventResultReportStudents = (eventId, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/active/${eventId}/participation/student?${parameters}`)
}

export const getEventIndividualReportStudentsDashboard = (eventId, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/active/${eventId}/individual/student/dashboard?${parameters}`)
}

export const getEventResultsReportNetworkAbilities = (eventId, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/active/${eventId}/descriptors?${parameters}`)
}

export const getEventResultsReportInstitutionAbilities = (eventId, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/active/${eventId}/institution/descriptors?${parameters}`)
}

export const getEventResultsReportClassAbilities = (eventId, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/active/${eventId}/class/descriptors?${parameters}`)
}

export const getEventResultsReportStudentHabilities = (eventId, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/active/${eventId}/student/descriptors?${parameters}`)
}

export const toggleEventsClass = (id, classId) => {
  return axios.post(`${resource}/${id}/classes/${classId}/toggle`)
}

export const postEventsActivate = (id, parameters) => {
  return axios.post(`${resource}/${id}/activate`, parameters)
}
