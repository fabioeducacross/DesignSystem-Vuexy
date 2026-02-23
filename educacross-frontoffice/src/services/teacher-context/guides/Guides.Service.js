import axiosIns from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/guides'
const resourceV2 = '/v2/guides'

export const updateGuide = (guideId, data) => axiosIns.put(`${resource}/${guideId}`, data)

export const createGuide = data => axiosIns.post(`${resourceV2}`, data)

export const enableGuide = (id, data) => axiosIns.put(`${resourceV2}/${id}/enable`, data)

export const getGuideDetails = id => axiosIns.get(`${resourceV2}/${id}/details`)

export const getGuideDetailsV1 = id => axiosIns.get(`${resource}/${id}/details`)

export const getGuidesByClassV1 = (id, classId) =>
  axiosIns.get(`${resource}/${id}?classId=${classId}`)

export const getAutenticateGuide = (id, classId) =>
  axiosIns.get(`${resource}/${id}/guide-resume/guide-link?ClassId=${classId}`)

export const enableHighfiveGuide = (id, data) =>
  axiosIns.put(`${resourceV2}/${id}/highfive/enable-disable`, data)

export const createGuideBook = (id, classId) =>
  axiosIns.put(`${resource}/${id}/book/create?classId=${classId}`)

export const cloneEducacrossGuide = (id, data) =>
  axiosIns.post(`${resourceV2}/${id}/educacross/clone`, data)

export const cloneInclusionGuide = (id, classId) =>
  axiosIns.post(`${resource}/${id}/inclusion/clone?classId=${classId}`)

export const cloneSharedGuide = (id, data) => axiosIns.post(`${resource}/${id}/shared/clone`, data)

export const getEducacrossGuide = filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resourceV2}/educacross?${parameters}`)
}

export const getInclusionGuide = filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resource}/inclusion?${parameters}`)
}

export const changeGuideExpiration = (guideId, data) => {
  return axiosIns.put(`${resource}/${guideId}/change-expiration`, data)
}

export const getGuidesByClass = (id, filters) => {
  let parameters = urlString(filters)

  if (!filters.ascending) {
    parameters += '&Ascending=false'
  }

  if (!filters.filed) {
    parameters += '&Filed=false'
  }

  return axiosIns.get(`${resourceV2}/class/${id}?${parameters}`)
}

export const unarchiveGuide = guidesIds => axiosIns.put(`${resource}/filed`, guidesIds)

export const cancellationGuide = (id, data) =>
  axiosIns.post(`${resourceV2}/${id}/cancellation`, data)

export const deleteGuide = id => axiosIns.delete(`${resource}/${id}`)

export const changeSharedGuide = (guideId, data) =>
  axiosIns.put(`${resource}/${guideId}/changeshared`, data)

export const getGuideResume = (id, classId) =>
  axiosIns.get(`${resource}/${id}/guide-resume?ClassId=${classId}`)

export const getGuideBook = filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resource}/book?${parameters}`)
}

export const getSharedGuides = filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resourceV2}/shared?${parameters}`)
}

export const getSubjectAndSerie = id => axiosIns.get(`${resource}/${id}/subject-serie`)

export const getGuidesPlusByClass = (id, filters) => {
  let parameters = urlString(filters)

  if (!filters.ascending) {
    parameters += '&Ascending=false'
  }

  if (!filters.filed) {
    parameters += '&Filed=false'
  }

  return axiosIns.get(`${resource}/plus/class/${id}?${parameters}`)
}

export const getGuidePlusDetails = id => axiosIns.get(`${resource}/plus/${id}/details`)

export const enableGuidePlus = (id, data) => axiosIns.put(`${resource}/plus/${id}/enable`, data)

export const getGuidePlusReportClass = (id, classId) =>
  axiosIns.get(`${resource}/plus/${id}/class/${classId}/report`)

export const getGuidePlusReportClassRounds = (id, classId) =>
  axiosIns.get(`${resource}/plus/${id}/class/${classId}/report/rounds`)

export const getGuidePlusReportClassStudents = (id, classId, params) =>
  axiosIns.get(`${resource}/plus/${id}/class/${classId}/report/students`, { params })

export const getGuidePlusReportClassStudentsExcel = (id, classId, params) => {
  return axiosIns.get(`${resource}/plus/${id}/class/${classId}/report/students/excel`, {
    params,
    responseType: 'blob',
  })
}

/**
 * @typedef {Object} GuidePlusStudentReport
 * @property {Number} classPerformance
 * @property {Number} performance
 * @property {Number} challenges
 * @property {Number} totalTime
 * @property {Number} classTotalTime
 * @property {String} name
 * @property {String} studentName
 * @property {Number} progress
 * @property {Number} classProgress
 * @property {Number} subjectId
 * @property {Array<{performance: String, imageUrl: String, name: String}>} topicsToImprove
 * @property {Array<{performance: String, imageUrl: String, name: String}>} topicsStrong
 * @property {Array<GameItem | QuizItem>} rounds
 */

/** @returns {AxiosPromise<GuidePlusStudentReport>} */
export const getGuidePlusReportClassStudentDetails = (id, classId, studentId) => {
  return axiosIns.get(`${resource}/plus/${id}/class/${classId}/student/${studentId}`)
}

export const getGuidePlusReportStudentRoundActivityDetail = (studentId, classId, guideRoundId) =>
  axiosIns.get(`${resource}/student/round/activity/detail`, {
    params: { studentId, classId, guideRoundId },
  })

export const getGuidePlusReportStudentRoundQuizDetail = (studentId, classId, guideRoundId) =>
  axiosIns.get(`${resourceV2}/student/round/quiz/detail`, {
    params: { studentId, classId, guideRoundId },
  })

export const getGuidePlusReportStudentsRoundDetail = (classId, guideRoundId) =>
  axiosIns.get(`${resource}/plus/report/round`, {
    params: { classId, guideRoundId },
  })

export const getGuideReportActivity = (ClassId, GuideId, ActivityId) =>
  axiosIns.get(`${resource}/report/activity`, {
    params: { ClassId, GuideId, ActivityId },
  })

export const getGuideReportActivityStudent = (GuideId, activityId, studentId, filters) => {
  const parameters = urlString(filters)

  return axiosIns.get(
    `${resource}/${GuideId}/report/activity/${activityId}/student/${studentId}?${parameters}`,
  )
}

export const getGuidesPlusInstitutionOverviewInstitutions = filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resource}/plus/network/overview/institutions?${parameters}`)
}

export const getGuidesPlusInstitutionOverviewClasses = filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resource}/plus/institution/overview/classes?${parameters}`)
}

export const getGuidesPlusInstitutionOverviewClass = (classId, filters) => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resource}/plus/institution/overview/class/${classId}?${parameters}`)
}

export const getGuidesPlusInstitutionOverviewClassGuides = (classId, filters) => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resource}/plus/institution/overview/class/${classId}/guides?${parameters}`)
}

export const getGuidesPlusContent = filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resource}/plus/institution/content?${parameters}`)
}

export const getGuidesPlusInstitutionsContent = filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resource}/plus/network/content?${parameters}`)
}

export const getGuidesPlusContentDetails = (id, filters) => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resource}/plus/institution/content/${id}/detail?${parameters}`)
}
