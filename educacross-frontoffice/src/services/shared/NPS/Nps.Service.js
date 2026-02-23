import axios from '@/libs/axios'

const resource = '/v1/nps'

export const postNps = data => axios.post(resource, data)

export const getNps = () => axios.get(resource)
