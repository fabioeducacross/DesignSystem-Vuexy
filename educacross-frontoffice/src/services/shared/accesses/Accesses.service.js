import axios from '@/libs/axios'

const resource = '/v1/accesses'

export const sendEmail = id => axios.post(`${resource}/${id}/send-email`)
