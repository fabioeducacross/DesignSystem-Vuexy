import axios from '@/libs/axios'
import UtilTeacherService from '@/utils/teacher-utils/utils'

export const getSimulations = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/v1/simulations')
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(UtilTeacherService.generalError(err))
      })
  })
}
