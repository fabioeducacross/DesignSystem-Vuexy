import axiosIns from '@/libs/axios'

export const getNetworkGroups = () => {
  return axiosIns.get('/v1/network-groups')
}
