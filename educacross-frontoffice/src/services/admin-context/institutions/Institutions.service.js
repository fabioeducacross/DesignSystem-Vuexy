import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/institutions'

export const getLogos = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/logos?${parameters}`)
}

export const putLogo = data => axios.put(`${resource}/logo`, data)

export const getInstitutionModules = (institutionId = null, subjectId = null, serieId = null) =>
  axios.get(`${resource}/modules`, { params: { institutionId, subjectId, serieId } })
