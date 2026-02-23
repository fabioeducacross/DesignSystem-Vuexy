import axios from '@/libs/axios'
import UtilTeacherService from '@/utils/teacher-utils/utils'

class LayersHttpService {
  requestLogin(code) {
    const config = {
      headers: {
        showErrorToast: false,
      },
    }
    return new Promise((resolve, reject) => {
      axios
        .get(`v1/layers/auth?code=${code}`, config)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(UtilTeacherService.generalError(error))
        })
    })
  }

  loginWithSessionId(payload) {
    const config = {
      headers: {
        showErrorToast: false,
      },
    }
    return new Promise((resolve, reject) => {
      axios
        .get(
          `v1/layers/auth/session?session=${payload.session}&communityId=${payload.communityId}&userId=${payload.userId}`,
          config,
        )
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(UtilTeacherService.generalError(error))
        })
    })
  }
}

export default new LayersHttpService()
