import axiosIns from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/narrative-complexity'

export const getNarrativeComplexityStudents = (id, filters) => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/class/${id}?${parameters}`)
}

/**
 * @typedef {Object} Recording
 * @property {string} imageUrl - The URL of the associated image.
 * @property {string} audioUrl - The URL of the associated audio.
 * @property {string} transcription - The transcription of the audio.
 */

/**
 * @typedef {Object} Application
 * @property {number} apply - The apply flag, with a value of 1.
 * @property {string} createdAt - The timestamp when the application was created (ISO 8601 format).
 * @property {number} percentilComplexity - The complexity percentile (0-100).
 * @property {number} complexity - The complexity score.
 * @property {number} percentilDecoding - The decoding percentile (0-100).
 * @property {number} decoding - The decoding score.
 * @property {number} percentilComprehension - The comprehension percentile (0-100).
 * @property {number} comprehension - The comprehension score.
 * @property {boolean} blocked - Indicates if the application is blocked.
 * @property {boolean} enabled - Indicates if the application is enabled.
 * @property {boolean} paused - Indicates if the application is paused.
 * @property {boolean} finished - Indicates if the application is finished.
 * @property {boolean} error - Indicates if there was an error in the application.
 * @property {Recording[]} recording - A list of recordings associated with the application.
 */

/**
 * @typedef {Object} StudentDetailsResponse
 * @property {string} name - The name of the user or entity.
 * @property {Number} serieId - The serie id of the student's class.
 * @property {Application[]} applications - The list of applications.
 */

/** @returns {Promise<AxiosResponse<StudentDetailsResponse>>} */
export const getNarrativeComplexityStudent = (id, studentId) => {
  return axiosIns.get(`${resource}/class/${id}/student/${studentId}`)
}

export const enableNarrativeComplexity = async params => {
  return axiosIns.put(`${resource}/enable`, { ...params })
}

export const pauseNarrativeComplexity = async params => {
  return axiosIns.put(`${resource}/pause`, { ...params })
}

export const getNarrativeComplexityClassesCards = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/institution/overview?${parameters}`)
}

export const getNarrativeComplexityClasses = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/institution/overview/classes?${parameters}`)
}

export const getNarrativeComplexityinstitutionsCards = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/network/overview?${parameters}`)
}

export const getNarrativeComplexityinstitutions = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/network/overview/institution?${parameters}`)
}
