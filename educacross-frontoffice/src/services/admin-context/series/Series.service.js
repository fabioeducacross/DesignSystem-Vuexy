import axios from '@/libs/axios'

const resource = '/v1/series'
const sasResource = 'v1/educationsystems'

export const getSeries = () => axios.get(resource)

export const getSeriesSAS = id => {
  const path = 'module'
  if (id) {
    return axios.get(`${sasResource}/${path}?InstitutionId=${id}`)
  }
  return axios.get(`${sasResource}/${path}`)
}

export const getSubjectSeries = subjectId => axios.get(`${resource}?subjects=${subjectId}`)

export const getSubjectsSeries = subjectId => axios.get(`${resource}/subjects/${subjectId}`)
