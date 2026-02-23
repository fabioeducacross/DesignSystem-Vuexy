import axios from '@/libs/axios'

const resource = '/v1/applicationusers'

export const newTempPassword = userId => {
  return axios.post(`${resource}/${userId}/temporary-password`)
}
