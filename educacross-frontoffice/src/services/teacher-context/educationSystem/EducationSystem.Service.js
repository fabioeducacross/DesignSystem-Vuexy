import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = 'v1/educationsystems'
const rankingResource = '/v1/educationsystems/ranking'

/**
 * @typedef {Object} GetEducationSystemBooksParams
 * @property {Number} EducationSystemId
 * @property {Number} SubjectId
 * @property {Number} [NetworkGroupId]
 * @property {Number} [InstitutionId]
 * @property {Number} [ClassId]
 * @property {Number} [SerieId]
 * @property {Number} [BookId]
 * @property {Number} [GuideId]
 */

/**
 * @typedef {Object} GetEducationSystemBooksResponseBook
 * @property {Number} id
 * @property {String} imageUrl
 * @property {String} name
 * @property {String} serieName
 * @property {Boolean} hasGuideEnabled
 * @property {Number} progress
 * @property {Number} performance
 */

/**
 * @typedef {Object} GetEducationSystemBooksResponse
 * @property {String} educationSystemName
 * @property {Array<GetEducationSystemBooksResponseBook>} books
 */

/**
 *
 * @param {GetEducationSystemBooksParams} filters
 * @returns {Promise<axios.AxiosResponse<GetEducationSystemBooksResponse>>}
 */
export const getEducationSystemBooks = filters => {
  return axios.get(`${resource}/books`, { params: filters })
}

export const enableDisableEducationSystemBooks = data =>
  axios.post(`${resource}/book/mission/enable-disable`, data)

export const getEducationSystemMissionBooks = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/book/missions?${parameters}`)
}

export const getEducationSystemMissionReports = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/missions/report?${parameters}`)
}

export const getEducationSystemMissionGuide = (id, classId) =>
  axios.get(`${resource}/guide/${id}?classId=${classId}`)

export const getEducationSystemGuideHistory = (GuideId, ClassId) =>
  axios.get(`${resource}/book/guide/history`, { params: { GuideId, ClassId } })

/**
 * @typedef {Object} GetEducationSystemRankingResponseRanking
 * @property {Number} classPosition
 * @property {Number} institutionPosition
 * @property {String} studentName
 * @property {String} className
 * @property {Number} stars
 * @property {Number} pointsXp
 * @property {Number} coins
 */

/**
 * @typedef {Object} GetEducationSystemRankingResponse
 * @property {String} educationSystemName
 * @property {Array<GetEducationSystemRankingResponseRanking>} ranking
 */

/**
 * @typedef {Object} GetEducationSystemRankingParams
 * @property {Number} EducationSystemId
 * @property {Number} SubjectId
 * @property {Number} [ClassId]
 * @property {Number} [SerieId]
 * @property {Number} [BookId]
 * @property {Number} [GuideId]
 * @property {Number} [Month]
 */

/**
 *
 * @param {GetEducationSystemRankingParams} filters
 * @returns {Promise<axios.AxiosResponse<GetEducationSystemRankingResponse>>}
 */

export const getEducationSystemRankingNetwork = filters => {
  const parameters = urlString(filters)

  return axios.get(`${rankingResource}/network?${parameters}`)
}

export const getEducationSystemRanking = filters => {
  const parameters = urlString(filters)

  return axios.get(`${rankingResource}?${parameters}`)
}

/**
 * @param {GetEducationSystemRankingParams} filters
 * @returns {Promise<axios.AxiosResponse<Blob>>}
 */
export const getEducationSystemRankingExcel = filters => {
  return axios.get(`${rankingResource}/excel`, { params: filters, responseType: 'blob' })
}

export const getEducationSystemBookDetails = (educationSystemId, bookId) => {
  return axios.get(`${resource}/${educationSystemId}/book/${bookId}/detail`)
}
