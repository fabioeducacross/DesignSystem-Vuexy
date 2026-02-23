import axios from '@/libs/axios'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import UtilTeacherService from '@/utils/teacher-utils/utils'

const config = {
  headers: {
    showErrorToast: false,
  },
}

class SasHttpService {
  loginSas(token, toApp = false) {
    return new Promise((resolve, reject) => {
      axios
        .get(`v1/sas/auth?token=${token}${toApp ? '&redirectToApp=true' : ''}`, config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(UtilTeacherService.generalError(err))
        })
    })
  }

  loginArcoSas(opaquetoken, toApp = false) {
    return new Promise((resolve, reject) => {
      axios
        .get(`v1/sas/auth?opaquetoken=${opaquetoken}${toApp ? '&redirectToApp=true' : ''}`, config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(UtilTeacherService.generalError(err))
        })
    })
  }

  loginSasRoteiro(guideId, token) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `v1/sas/guide/${guideId}/education-system/teacher?token=${token}&whitelabel=${getWhitelabelConfig(
            'Id',
          )}`,
          config,
        )
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(UtilTeacherService.generalError(err))
        })
    })
  }

  loginArcoRoteiro(guideId, opaquetoken) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `v1/sas/guide/${guideId}/education-system/teacher?opaquetoken=${opaquetoken}&whitelabel=${getWhitelabelConfig(
            'Id',
          )}`,
          config,
        )
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(UtilTeacherService.generalError(err))
        })
    })
  }

  loginSasAluno(guideId, token) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `v1/sas/guide/${guideId}/education-system/student?token=${token}&whitelabel=${getWhitelabelConfig(
            'Id',
          )}`,
          config,
        )
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(UtilTeacherService.generalError(err))
        })
    })
  }

  loginArcoAluno(guideId, opaquetoken) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `v1/sas/guide/${guideId}/education-system/student?opaquetoken=${opaquetoken}&whitelabel=${getWhitelabelConfig(
            'Id',
          )}`,
          config,
        )
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(UtilTeacherService.generalError(err))
        })
    })
  }

  loginSasProfessorES(missionId, token) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `v1/sas/education-system/${missionId}/teacher?token=${token}&whitelabel=${getWhitelabelConfig(
            'Id',
          )}`,
          config,
        )
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(UtilTeacherService.generalError(err))
        })
    })
  }

  loginArcoProfessorES(missionId, opaquetoken) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `v1/sas/education-system/${missionId}/teacher?opaquetoken=${opaquetoken}&whitelabel=${getWhitelabelConfig(
            'Id',
          )}`,
          config,
        )
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(UtilTeacherService.generalError(err))
        })
    })
  }
}

export default new SasHttpService()
