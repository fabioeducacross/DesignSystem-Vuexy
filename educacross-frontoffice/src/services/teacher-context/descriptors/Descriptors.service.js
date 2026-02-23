import axios from '@/libs/axios'

const resource = '/v1/descriptors'

export const getDescriptors = knowledgeAxisId =>
  axios.get(`${resource}?knowledgeAxisId=${knowledgeAxisId}`)

export const getKnowledgeObject = params => {
  return axios.get(`${resource}/knowledge-object/label`, { params })
}

/**
 * @param {Number} educationalOrganizationId
 * @param {Number | null} [knowledgeAxisId]
 * @param {String | null} [searchKnowledgeObject]
 * @returns {Promise<axios.AxiosResponse<Array<{name: String, id: Number}>>>}
 */
export const getDescriptorsV2 = (
  educationalOrganizationId,
  knowledgeAxisId,
  searchKnowledgeObject,
) => {
  return axios.get('/v2/descriptors', {
    params: { educationalOrganizationId, knowledgeAxisId, searchKnowledgeObject },
  })
}
