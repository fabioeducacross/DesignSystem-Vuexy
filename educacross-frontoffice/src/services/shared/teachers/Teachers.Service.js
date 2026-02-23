import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/teachers'
const resourceV2 = '/v2/teachers'

export const getTeachersAccessExcel = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/access/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getTeachersAccessByMonthExcel = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/access-by-month/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getTeachersAccessByInstitutionMonthExcel = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/access-by-institution-month/excel?${parameters}`, {
    responseType: 'blob',
  })
}

/** @deprecated */
export const postTeachersImport = data => {
  return axios.post(`${resource}/import`, data)
}

export const postTeachersImportV2 = data => {
  return axios.post(`${resourceV2}/import`, data)
}

export const getTeachersLabel = params => {
  const parameters = urlString(params)
  return axios.get(`${resource}/label?${parameters}`)
}
