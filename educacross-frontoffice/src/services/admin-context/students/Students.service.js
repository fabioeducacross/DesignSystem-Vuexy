import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/students'
const resourceV2 = '/v2/students'
const coordinatorResource = 'v1/coordinator'
const accountResource = '/v1/account'

export const getLabelStudentsByClass = classId => axios.get(`${resource}/label?classId=${classId}`)

export const getStudents = filters => {
  const parameters = urlString(filters)
  if (filters) {
    return axios.get(`${resource}?${parameters}`)
  }
  return axios.get(resource)
}

export const getStudentsLabel = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/label?${parameters}`)
}

export const getCoordinatorStudents = filters => {
  const parameters = urlString(filters)

  return axios.get(`${coordinatorResource}/students?${parameters}`)
}

export const getStudentById = studentId => axios.get(`${resource}/${studentId}`)

export const getImportStudentList = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resourceV2}/import?${parameters}`)
}

export const importStudents = data => axios.post(`${resourceV2}/import`, data)

export const getImportStudentListById = id => axios.get(`${resourceV2}/import/${id}`)

export const getImportStudentListEmailErrorById = id =>
  axios.get(`${resourceV2}/import/${id}/emails`)

export const resendEmailError = id => axios.post(`${resourceV2}/import/${id}/resend-emails`)

export const postStudents = data => {
  const config = {
    header: {
      'Content-Type': 'multipart/form-data',
    },
  }

  return axios.post(resourceV2, data, config)
}

export const updateStudents = (studentId, data) => {
  const config = {
    header: {
      'Content-Type': 'multipart/form-data',
    },
  }

  return axios.put(`${resourceV2}/${studentId}`, data, config)
}

export const moveStudents = data =>
  axios.put(`${resource}/move`, {
    classId: data.classId,
    studentsIds: data.studentsIds,
  })

export const deleteMassStudentds = (
  data,
  batchAction = 1,
  search = null,
  classId = null,
  serieId = null,
) => {
  const request = {
    batchAction,
  }

  if (batchAction === 1) {
    request.StudentsIds = data
  }
  if (search) {
    request.search = search
  }
  if (classId) {
    request.classId = classId
  }
  if (serieId) {
    request.serieId = serieId
  }

  return axios.delete(resource, { data: request })
}

export const getStudentCards = (studentsIds, batchAction = 1, search, classId, status, serieId) =>
  axios.post(`${resource}/cards`, {
    studentsIds,
    batchAction,
    search,
    classId,
    status,
    serieId,
  })

export const getStudentCertificates = (
  subjectId,
  month,
  module,
  studentsIds,
  batchAction = 1,
  search,
  classId,
  status,
  serieId,
) =>
  axios.post(`${resource}/certificates`, {
    subjectId,
    month,
    module,
    studentsIds,
    isWhitelabel: false,
    batchAction,
    search,
    classId,
    status,
    serieId,
  })

export const getStudentAccessLetter = (studentsIds, batchAction = 1, search, classId, status) =>
  axios.post(`${accountResource}/studentsaccessletter`, {
    studentsIds,
    batchAction,
    search,
    classId,
    status,
  })

export const getStudentDataInguide = subjectId =>
  axios.get(`${resourceV2}/inguide?SubjectId=${subjectId}`)

export const getStudentsV2 = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resourceV2}?${parameters}`)
}

/**
 * @param {Number} studentId
 * @param {FormData} data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const putStudentV2 = (studentId, data) => {
  return axios.put(`${resourceV2}/${studentId}`, data)
}

export const postStudentV2 = data => {
  return axios.post(resourceV2, data)
}

export const getStudentsExcluded = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/excluded?${parameters}`)
}

export const postStudentsExcluded = data => {
  return axios.post(`${resource}/excluded`, data)
}
