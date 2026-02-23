import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

export const getData = (url, query) => axios.get(`${url}?${urlString(query)}`)
