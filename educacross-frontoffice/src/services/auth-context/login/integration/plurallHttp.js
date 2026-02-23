import axios from '@/libs/axios'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import UtilTeacherService from '@/utils/teacher-utils/utils'

const config = {
  headers: {
    showErrorToast: false,
  },
}

class PlurallHttpService {
  requestLogin(code) {
    return new Promise((resolve, reject) => {
      axios
        .get(`v1/plurall/auth?code=${code}&whiteLabel=${getWhitelabelConfig('Id')}`, config)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(UtilTeacherService.generalError(error))
        })
    })
  }

  educationSystem(educationSystemId, bookId, code, subjectId, serieId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `v1/plurall/education-system/${educationSystemId}/books/${bookId}/teacher?code=${code}&subjectId=${subjectId}&serieId=${serieId}&whitelabel=${getWhitelabelConfig(
            'Id',
          )}`,
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

export default new PlurallHttpService()
