import axios from '@/libs/axiosAccount'

const resource = '/v1/account'

export const checkAccountByEmail = email => axios.post(`${resource}/checkemail`, email)

export const getFamilyContextData = () => axios.get(`${resource}/access/familycontext`)
