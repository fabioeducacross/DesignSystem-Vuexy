import axiosIns from '@/libs/axios'

const resource = 'v1/network-groups'

export const getNetworkGroups = () => axiosIns.get(resource)

export const getNetworkGroupsEvaluation = evaluationId => {
  return axiosIns.get(`v1/evaluations/${evaluationId}/institutions/label`)
}

export const getNetworkGroupsEvaluationNetworkManager = evaluationId => {
  return axiosIns.get(`v1/evaluations/${evaluationId}/network-groups/label`)
}
