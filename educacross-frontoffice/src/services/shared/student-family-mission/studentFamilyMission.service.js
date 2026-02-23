import axiosIns from '@/libs/axios'

export const getMissions = params => {
  return axiosIns.get('v1/guides/family', { params })
}

export const activeMission = id => {
  return axiosIns.put(`v1/guides/${id}/family`)
}
