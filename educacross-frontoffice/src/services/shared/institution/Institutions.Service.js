import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/institutions'
const resourceV2 = '/v2/institutions'
const resourceSubjects = 'v1/subjects'

/**
 * @typedef {Object} getInstitutionsParams
 * @property {Number} ModuleId
 * @property {Number} NetworkGroupId
 */

/**
 *
 * @param {getInstitutionsParams} filters
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getInstitutions = filters => {
  const params = urlString(filters)
  return axios.get(`${resource}?${params}`)
}

export const getInstitutionsV2 = filters => {
  const params = urlString(filters)
  return axios.get(`${resourceV2}?${params}`)
}
/**
 * @deprecated
 * use fetchSubjects
 */
export const getInstitutionsSubjects = institutoinId => {
  const params = institutoinId ? `?InstitutionId=${institutoinId}` : ''
  return axios.get(`${resourceSubjects}${params}`)
}

export const getInstitutionsModules = institutionId =>
  axios.get(`${resource}/modules?${urlString({ InstitutionId: institutionId })}`)

export const getInstitutionsSubjectModules = () => {
  return axios.get(`${resource}/subject-modules`)
}

export const uptadeInstitutionsModules = data => {
  return axios.put(`${resource}/modules`, data)
}

export const getInstitutionsSubjectModulesSeries = () => {
  return axios.get(`${resource}/subject-modules-series`)
}
