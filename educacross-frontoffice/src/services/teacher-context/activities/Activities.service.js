import axiosIns from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/activities'
const resourceV2 = '/v2/activities'

export const getActivities = filters => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resourceV2}?${parameters}`)
}

export const getTeacherOrientationsActivitie = (id, filters) => {
  const parameters = urlString(filters)

  return axiosIns.get(`${resource}/${id}/teacherorientations?${parameters}`)
}

export const getTeacherOrientationsMultiliteracyActivitie = (id, idiom) =>
  axiosIns.get(`${resource}/${id}/teacher-orientations-multiliteracy?idiomId=${idiom}`)

export const getActivitieQuiz = params => {
  const parameters = urlString(params)
  return axiosIns.get(`${resource}/quiz?${parameters}`)
}

export const getActivitiesV1 = params => {
  const parameters = urlString(params)
  return axiosIns.get(`${resource}?${parameters}`)
}

export const getActivitiesToken = (id, params) => {
  const parameters = urlString(params)
  return axiosIns.get(`${resource}/${id}/token?${parameters}`)
}
