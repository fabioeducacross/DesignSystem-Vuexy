import axios from '@/libs/axios'

const resource = '/v1/students'
const resourceAccount = '/v1/account'
const resourceV2 = 'v2/students'

export const getStudentsByClass = classId => axios.get(`${resource}/class/${classId}`)

export const getStudentsCards = data => axios.post(`${resource}/cards`, data)

export const getStudentsCertificates = data => axios.post(`${resource}/certificates`, data)

export const getStudentAccessLetter = (studentsIds, batchAction) =>
  axios.post(`${resourceAccount}/studentsaccessletter`, {
    studentsIds,
    batchAction,
  })

export const changeStudentIdiom = (studentId, idiomId) =>
  axios.put(`${resource}/${studentId}/idiom/`, {
    idiomId,
  })

export const getStudents = classId => {
  return axios.get(`${resource}/label`, {
    params: {
      classId,
    },
  })
}

export const getStudentsInGuide = subjectId => {
  return axios.get(`${resourceV2}/inguide`, {
    params: {
      subjectId,
    },
  })
}

export const getStudentFeelings = (studentId, params) => {
  return axios.get(`${resource}/${studentId}/feelings`, {
    params,
  })
}

/**
 * @param {{filename: String, studentAccess: Array<{name: String, sponsorEmail: String, classId: Number}>}} data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const importStudentsV2 = data => {
  return axios.post(`${resourceV2}/import`, data)
}
