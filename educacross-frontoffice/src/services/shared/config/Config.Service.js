import axios from '@/libs/axios'

const resource = '/v1/educacrossconfig'
const resourceV2 = '/v2/educacrossconfig'

export const getClassesConfig = () => axios.get(`${resource}/class`)

export const editClassConfig = (id, data) => axios.put(`${resource}/class/${id}`, data)

export const getInstitutionConfig = () => axios.get(`${resourceV2}/institution`)

export const editInstitutionConfig = data => axios.put(`${resourceV2}/institution`, data)
