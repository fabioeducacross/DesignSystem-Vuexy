import axios from '@/libs/axios'

const resource = '/v2/applicationusers/revoke-token'

export const postLogoutSystem = data =>
  axios.post(resource, data, {
    headers: {
      showErrorToast: false,
    },
  })
