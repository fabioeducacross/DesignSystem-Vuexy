import axiosIns from '@/libs/axios'

const resourceV1 = '/v1/tour'

/**
 * @param {ETour} tour
 * @returns {Promise<AxiosResponse<Boolean>>}
 */
export const getTour = tour => {
  return axiosIns.get(`${resourceV1}/${tour}`)
}

/**
 * @param {ETour} tour
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postTour = tour => {
  return axiosIns.post(`${resourceV1}`, { tour })
}
