import axios from '@/libs/axios'
import UtilTeacherService from '@/utils/teacher-utils/utils'

class LexHttpService {
  requestLogin(payload, toApp = false) {
    const config = {
      headers: {
        showErrorToast: false,
      },
    }
    return new Promise((resolve, reject) => {
      axios
        .get(
          `v1/lex/auth?code=${payload.code}&CodeVerifier=${payload.code_verifier}${
            toApp ? '&redirectToApp=true' : ''
          }`,
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

  requestLoginLexMaple(payload, toApp = false) {
    const config = {
      headers: {
        showErrorToast: false,
      },
    }
    return new Promise((resolve, reject) => {
      axios
        .get(
          `v1/lex-maple/auth?code=${payload.code}&CodeVerifier=${payload.code_verifier}${
            toApp ? '&redirectToApp=true' : ''
          }`,
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

export default new LexHttpService()
