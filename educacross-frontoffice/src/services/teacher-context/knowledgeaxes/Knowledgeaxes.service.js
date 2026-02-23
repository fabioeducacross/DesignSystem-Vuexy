import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/knowledgeaxes'

export default function getKnowledgeaxes(educationalOrganizationId) {
  return axios.get(`${resource}?educationalOrganizationId=${educationalOrganizationId}`)
}

export const getKnowledgeaxesFilterOptions = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}?${parameters}`)
}
