import axiosIns from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/managers'
const resourceV2 = '/v2/managers'

export const getManagers = params => {
  const parameters = urlString(params)
  return axiosIns.get(`${resource}?${parameters}`)
}

export const getManagersV2 = params => {
  const parameters = urlString(params)
  return axiosIns.get(`${resourceV2}?${parameters}`)
}

export const getManagerById = managerId => axiosIns.get(`${resource}/${managerId}`)

export const postManagers = data => axiosIns.post(resource, data)

export const updateManagers = (managerId, data) => axiosIns.put(`${resource}/${managerId}`, data)

export const deleteManagers = managerId => axiosIns.delete(`${resource}/${managerId}`)

/**
 * Delete managers.
 * @param {Array<Number>} ids - one or more manager ids
 * @param {Number} batchAction - the action to perform on the manager(s):
 * @return {Promise<AxiosResponse<any>>}
 */
export const deleteManagersV2 = (ids, batchAction) =>
  axiosIns.delete(resourceV2, { data: { ids, batchAction } })

export const deleteMassManagers = (data, batchAction) =>
  axiosIns.delete(resourceV2, {
    data: { ids: data, batchAction },
  })

export const importDirectors = params => {
  return axiosIns.post(`${resource}/import`, params)
}

export const getDirectorsExcluded = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/excluded?${parameters}`)
}

export const postDirectorsExcluded = data => {
  return axiosIns.post(`${resource}/excluded`, data)
}
