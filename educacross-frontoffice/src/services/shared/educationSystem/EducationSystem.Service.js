import axios from '@/libs/axios'
import store from '@/store'
import { urlString } from '@/utils/utils'

const resource = 'v1/educationsystems'
const resourceV2 = 'v2/educationsystems'

export const getEducationSystemInfo = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}?${parameters}`)
}

export const getEducationSystem = (id = null) => {
  if (id) {
    const path = 'module'
    return axios.get(`${resource}/${path}?InstitutionId=${id}`)
  }
  return store.state.access.educationSystems
}

export const getEducationSystemBooks = (
  { InstitutionId, EducationSystemId, ...filters },
  page,
  pageSize = 15,
) => {
  const path = 'books'
  const parameters = urlString({ InstitutionId, EducationSystemId, ...filters })
  return axios.get(`${resource}/${path}?${parameters}&Page=${+page}&PageSize=${pageSize}`)
}

export const getEducationSystemReport = () => {
  return axios.get(`${resource}/report`)
}

export const getEducationSystemSubjectsLabel = id => {
  return axios.get(`${resource}/${id}/subjects/label`)
}

export const getEducationSystemSeriesLabel = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/series/label?${parameters}`)
}

export const getEducationSystemGuidesLabel = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/guides/label?${parameters}`)
}

export const getEducationSystemInstitutions = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/institutions?${parameters}`)
}

export const getEducationSystemInstitutionsExcel = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/institutions/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEducationSystemClasses = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/classes?${parameters}`)
}

export const getEducationSystemClassesExcel = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/classes/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEducationSystemBooksReport = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/books?${parameters}`)
}

export const getEducationSystemBooksReportExcel = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/books/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEducationSystemStudents = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/students?${parameters}`)
}

export const getEducationSystemStudentsExcel = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/students/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEducationSystemModule = id => {
  const institutionId = id || ''
  return axios.get(`${resource}/module?institutionId=${institutionId}`)
}

export const getEducationSystemModuleV2 = () => {
  return axios.get(`${resourceV2}/module`)
}

export const getEducationSystemReportStudent = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/report/students?${parameters}`)
}

export const getEducationSystemReportStudentExcel = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/report/students/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEducationSystemBookGuideDetail = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/book/guide/detail?${parameters}`)
}
/**
 * @typedef {Object} GetEducationSystemDashboardParams
 *
 * @property {Number} EducationSystemId
 * @property {Number} SubjectId
 * @property {Number} [ClassId]
 * @property {Number} [SerieId]
 * @property {Number} [BookId]
 * @property {Number} [GuideId]
 */

/**
 * @typedef {Object} GetEducationSystemDashboardResponse
 * @property {Number} totalGuideProgress
 * @property {Number} sendGuideProgress
 * @property {Number} amountGuideSend
 * @property {Number} totalGuide
 * @property {Number} studentsPlayed
 * @property {Number} performance
 * @property {Number} totalTime
 * @property {Number} challengesDone
 */

/**
 * @param {GetEducationSystemDashboardParams} params
 * @returns {Promise<axios.AxiosResponse<GetEducationSystemDashboardResponse>>}
 */
export const getEducationSystemDashboard = params => {
  return axios.get(`${resource}/dashboard`, { params })
}

export const getEducationSystemReportGuide = (educationSystemId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${educationSystemId}/report/guide?${parameters}`)
}

export const getEducationSystemReportGuidePlus = (educationSystemId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${educationSystemId}/report/guide/plus?${parameters}`)
}

export const getEducationSystemReportInstitutionGuide = (educationSystemId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${educationSystemId}/report/institution/guide?${parameters}`)
}

export const getEducationSystemReportInstitutionGuidePlus = (educationSystemId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${educationSystemId}/report/institution/guide/plus?${parameters}`)
}

export const getEducationSystemReporBooksContent = (educationSystemId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${educationSystemId}/report/books/content?${parameters}`)
}

export const getEducationSystemReporBooksContentNetwork = (educationSystemId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${educationSystemId}/report/network/books/content?${parameters}`)
}

export const getEducationSystemReporInstitutions = (educationSystemId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${educationSystemId}/report/institutions?${parameters}`)
}

export const getEducationSystemReporClasses = (educationSystemId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${educationSystemId}/report/classes?${parameters}`)
}

export const getEducationSystemReporClassStudents = (educationSystemId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${educationSystemId}/report/class/students?${parameters}`)
}

/**
 * @typedef {Object} GetEducationSystemInstitutionsLabelParams
 * @property {Number} EducationSystemId
 * @property {Number} SubjectId
 * @property {Number} [SerieId]
 * @property {Number} [NetworkGroupId]
 */

/**
 * @param {GetEducationSystemInstitutionsLabelParams} params
 * @returns {Promise<axios.AxiosResponse<Array<{name: String, id: Number}>>>}
 */

// /v1/educationsystems/institutions/label
export const getEducationSystemInstitutionsLabel = params => {
  return axios.get(`${resource}/institutions/label`, { params })
}
