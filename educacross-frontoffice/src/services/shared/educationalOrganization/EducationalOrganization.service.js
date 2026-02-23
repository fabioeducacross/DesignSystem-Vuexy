import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/educationalorganizations'

export const getEducationalOrganizations = subjectId =>
  axios.get(`${resource}?SubjectId=${subjectId}`)

export const getEducationalOrganizationsLabel = (SerieId, subjectId) =>
  axios.get(`${resource}/institution/label`, {
    params: {
      SerieId,
      subjectId,
    },
  })

export const getEducationalOrganizationsLabels = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/institution/label?${parameters}`)
}
