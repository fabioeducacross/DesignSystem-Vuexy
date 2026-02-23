import axiosIns from '@/libs/axios'

const resource = '/v1/guides/plus'

/**
 * @typedef {Object} Round
 * @property {number} round - The round number.
 * @property {number} topicId - The topic ID for the round.
 * @property {number} type - The type of the round.
 * @property {number} contentId - The content ID for the round.
 * @property {number[]} descriptorsIds - An array of descriptor IDs for the round.
 */

/**
 * @typedef {Object} CustomMission
 * @property {string} name - The name of the mission.
 * @property {Date} start - The start date and time of the mission in ISO 8601 format.
 * @property {Date} expiration - The expiration date and time of the mission in ISO 8601 format.
 * @property {boolean} sequential - Indicates if the mission is sequential.
 * @property {number} subject - The subject ID associated with the mission.
 * @property {number[]} classes - An array of class IDs associated with the mission.
 * @property {number[]} students - An array of student IDs associated with the mission.
 * @property {Round[]} rounds - An array of rounds in the mission.
 * @property {boolean} rankingEnabled
 * @property {1 | 2} application - 1: para sala. 2: para casa
 * @property {string} [messageToStudent]
 */

/**
 * Create a guide plus
 * @param {CustomMission} params - The guide plus data.
 * @returns {Promise<AxiosResponse>}
 */
export const postGuidePlus = params => {
  return axiosIns.post(`${resource}`, params)
}

export const putGuidePlus = (id, data) => {
  return axiosIns.put(`${resource}/${id}`, data)
}

export const getGuidePlus = (id, classId) => {
  return axiosIns.get(`${resource}/${id}/class/${classId}`)
}

export const getGuidePlusEdit = (id, classId) => {
  return axiosIns.get(`${resource}/${id}/class/${classId}`)
}

export const enableGuidePlus = id => {
  return axiosIns.put(`${resource}/${id}/enable`)
}
