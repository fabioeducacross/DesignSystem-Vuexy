import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/classes'
const resourceV2 = '/v2/classes'

/**
 * @typedef {Object} GetClassesV2Params
 * @property {Number} InstitutionId
 * @property {Number} SubjectId
 * @property {String} [ClassName]
 * @property {Number[]} [SerieIds]
 * @property {Number} [Page]
 * @property {Number} [PageSize]
 */

/**
 * @typedef {Object} GetClassesV2Response
 * @property {Array<Object>} data
 * @property {Number} data[].id
 * @property {String} data[].name
 * @property {String} data[].serieName
 * @property {String[]} orderBy
 * @property {Object} orderByDescription
 * @property {String} orderByDescription.additionalProp1
 * @property {String} orderByDescription.additionalProp2
 * @property {String} orderByDescription.additionalProp3
 * @property {Number} currentPage
 * @property {Number} pageSize
 * @property {Number} currentPageSize
 * @property {Number} totalPages
 * @property {Number} total
 */

/**
 * @param {GetClassesV2Params} params
 * @returns {Promise<axios.AxiosResponse<GetClassesV2Response>>}
 */
export const getClassesV2 = params => {
  return axios.get(`${resourceV2}`, { params })
}

export const getClassesV2Label = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resourceV2}/label?${parameters}`)
}

export const getStudentsByClass = classId => axios.get(`${resource}/students?classId=${classId}`)

export const postClasses = classes => axios.post(`${resourceV2}`, classes)

export const updateClasses = (classId, data) => axios.put(`${resourceV2}/${classId}`, data)

export const deleteClasses = (classId, batchAction = 1, serieId = null) =>
  axios.delete(resourceV2, { data: { classIds: classId, batchAction, serieId } })

export const postClassesImport = data => {
  return axios.post(`${resource}/import`, data)
}

export const getTeacherClasses = () => axios.get(`${resource}/dashboard`)

export const getGuideFilter = (classId, subjectId) =>
  axios.get(`${resource}/${classId}/guide-filter?subjectId=${subjectId}`)

export const getUpdateMap = classId => axios.get(`${resource}/${classId}/update-map`)

export const putGuideFilter = (classId, data) =>
  axios.put(`${resource}/${classId}/guide-filter`, data)

export const putUpdateMap = (classId, data) => axios.put(`${resource}/${classId}/update-map`, data)

export const changeClassIdiom = (classId, idiomId) =>
  axios.put(`${resource}/${classId}/idiom/`, {
    idiomId,
  })

export const getEditClassesById = classId => axios.get(`${resourceV2}/${classId}`)

export const getClassesGuidesMonth = classId => axios.get(`${resource}/${classId}/guides-month`)

export const getClassesExcluded = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/excluded?${parameters}`)
}

export const postClassesExcluded = data => {
  return axios.post(`${resource}/excluded`, data)
}

export const getClassesSimplified = () => {
  return axios.get(`${resource}/simplified`)
}
