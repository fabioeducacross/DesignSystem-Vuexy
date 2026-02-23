import axiosIns from '@/libs/axios'

/**
 * @param {String|Number} institutionId - { institutionId: string | number }
 * @returns {Promise<Response>} { token: string, refreshToken: string }
 * @description Login as admin
 *
 * @export
 */
export const impersonateAdmin = institutionId =>
  axiosIns.get(`/v1/institutions/${institutionId}/impersonate`)
