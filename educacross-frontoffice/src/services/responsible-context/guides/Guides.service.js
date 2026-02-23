import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/guides'
const resourceV2 = '/v2/guides'

export const getGuidesDetails = guideId => axios.get(`${resource}/${guideId}/details/student`)

export const getGuidesHighfive = () => axios.get(`${resource}/highfive/student`)

export const getGuidesStudents = () => axios.get(`${resource}/student`)

export const getHighFiveMissions = ({ classId, subjectId }) =>
  axios.get(`${resourceV2}/highfive/class/${classId}?subject=${subjectId}`)

export const getHighfiveDetail = guideId => axios.get(`${resource}/${guideId}/highfive/detail`)

export const getMissionByEducationSystem = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/education-system?${parameters}`)
}

export const getMissionDataByEducationSystem = (id, educationSystemId) =>
  axios.get(`${resource}/${id}/education-system?EducationSystemId=${educationSystemId}`)
