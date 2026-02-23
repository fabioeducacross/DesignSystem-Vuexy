import axios from '@/libs/axios'

const resourcev2 = '/v2/supportmaterials'

export const getSupportmaterials = () => axios.get(resourcev2)
