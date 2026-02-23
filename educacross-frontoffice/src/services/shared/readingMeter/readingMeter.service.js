import axiosIns from '@/libs/axios'
import { urlString } from '@/utils/utils'

export const fetchReadings = async params => {
  return axiosIns.get('/v1/reading-fluency', { params })
}

export const enableReading = async params => {
  return axiosIns.put(`/v1/reading-fluency/enable`, { ...params })
}

export const cancelReading = async params => {
  return axiosIns.put(`/v1/reading-fluency/cancel`, { ...params })
}

export const enableStudentReading = async params => {
  return axiosIns.put(`/v1/reading-fluency/enable/student`, { ...params })
}

export const cancelStudentReading = async params => {
  return axiosIns.put(`/v1/reading-fluency/cancel/student`, { ...params })
}

export const fetchReadingsTest = async (testId, params) => {
  return axiosIns.get(`/v1/reading-fluency/${testId}`, { params })
}

export const fetchReadingsTestReport = async (testId, params) => {
  return axiosIns.get(`/v1/reading-fluency/${testId}/report`, { params })
}

export const fetchReadingDetails = async ({ testId, classId, studentId, readingDate }) => {
  const parameters = urlString({
    ClassId: classId,
    CreatedAt: readingDate,
  })
  return axiosIns.get(`/v1/reading-fluency/${testId}/students/${studentId}?${parameters}`)
}

export const fetchBookLibrary = async params => {
  const { classId } = params
  return axiosIns.get(`/v1/book-library/classes/${classId}`, { params })
}

export const fetchBookLibraryDetails = async ({ bookId, classId }) => {
  return axiosIns.get(`/v1/book-library/${bookId}`, { params: { classId } })
}

export const fetchBookLibrarySwitch = async bookId => {
  return axiosIns.put(`/v1/book-library/${bookId}`)
}

export const fetchBookLibraryClassBooks = async classId => {
  return axiosIns.get(`/v1/book-library/classes/${classId}`)
}

export const fetchBookLibraryReport = async params => {
  const { classId, bookId } = params
  return axiosIns.get(`/v1/book-library/${bookId}/classes/${classId}/report`, { params })
}

export const putEvaluateStudent = async ({ bookId, studentId, classId, proficiency, type }) => {
  return axiosIns.put(`/v1/book-library/${bookId}/proficiency`, {
    studentId,
    classId,
    proficiency,
    type,
  })
}

export const getStudentPassport = async ({ studentId }) => {
  return axiosIns.get(`/v1/reading-fluency/students/${studentId}/passport`)
}

export const getClasseOverview = async id => {
  return axiosIns.get(`v1/reading-fluency/classes/${id}/overview`)
}

export const getInstitutionOverview = async filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`v1/reading-fluency/institution/overview?${parameters}`)
}

export const getInstitutionOverviewClasses = async filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`v1/reading-fluency/institution/overview/classes?${parameters}`)
}

export const getNetworkOverview = async filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`v1/reading-fluency/network/overview?${parameters}`)
}

export const getNetworkOverviewInstitutions = async filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`v1/reading-fluency/network/overview/institutions?${parameters}`)
}

export const getReadingFluencyDetail = async id => {
  return axiosIns.get(`v1/reading-fluency/${id}/detail`)
}

export const getReadingFluencyHistory = async (id, studentId, ClassId) => {
  return axiosIns.get(`/v1/reading-fluency/${id}/student/${studentId}/history?ClassId=${ClassId}`)
}

export const putReadingFluencyStudentChangeLevel = (id, studentId, data) => {
  return axiosIns.put(`/v1/reading-fluency/${id}/student/${studentId}/change-level`, data)
}

export const getReadingFluencyInstitutionsStudentsProficiency = async filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`/v1/reading-fluency/institution/students/proficiency?${parameters}`)
}
