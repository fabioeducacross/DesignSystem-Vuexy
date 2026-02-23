import axios from '@/libs/axios'
import UtilTeacherService from '@/utils/teacher-utils/utils'

class CocHttpService {
  requestLogin(code) {
    const config = {
      headers: {
        showErrorToast: false,
      },
    }
    return new Promise((resolve, reject) => {
      axios
        .get(`v1/coc/auth?code=${code}`, config)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(UtilTeacherService.generalError(error))
        })
    })
  }

  requestLoginOpaqueToken(opaquetoken) {
    const config = {
      headers: {
        showErrorToast: false,
      },
    }
    return new Promise((resolve, reject) => {
      axios
        .get(`v1/coc/auth?opaquetoken=${opaquetoken}`, config)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(UtilTeacherService.generalError(error))
        })
    })
  }
}

export default new CocHttpService()
