import { decodeToken } from '@/auth/utils'
import axios from '@/libs/axiosAccount'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'

const resourceV1 = '/v1/account'
const resourceLex = '/v1/lex'
const resourceV2 = '/v2/account'
const resourceLoginTempAccess = '/v1/applicationusers'

export const postLogin = async user =>
  axios.post(`${resourceV2}/login`, { ...user, whitelabel: getWhitelabelConfig('Id') })

export const postLoginUpdateWithToken = async (user, oldToken) => {
  const response = await axios.post(`${resourceV1}/login/accessupdate`, user, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${oldToken}`,
    },
  })
  if (response.data.token) {
    const { token } = response.data
    const decodedToken = decodeToken(token)
    response.data.decodedToken = decodedToken
  }

  return response
}

export const postLoginGoogle = (idToken, redirectToApp = false) => {
  return axios.post(`${resourceV1}/login/google`, { idToken, redirectToApp })
}

/**
 * Calls the LEX API endpoint to retrieve user data associated with the provided access token.
 *
 * @param {string} accessToken - The user's access token.
 * @returns {Promise} A promise that resolves with the API response if the request is successful, or rejects with an error if it fails.
 * * @example
 * Example response from the API endpoint
 * {
 *    institutionId: "fd1c4530-1d5e-41bc-a8e3-c933411d7db7",
 *    institutionName: "Escola 1",
 *    profile: 1
 * }
 */
export const postLoginLex = async accessToken =>
  new Promise((resolve, reject) => {
    axios
      .post(`${resourceLex}/accesses`, {
        accessToken,
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })

export const postVerifyEmail = async user => {
  const response = await axios.post(`${resourceV1}/checkemail`, user)
  return response
}

export const postRegister = async user => {
  const response = await axios.post(`${resourceV1}/create`, {
    email: user.email,
    name: user.name,
    password: user.password,
    explicitAcceptanceOfTermsOfUse: user.acceptTerms,
  })
  return response
}

export const putChangePassword = async (formChangePassword, accountToken) => {
  return axios.put(
    `${resourceV1}/redefinepassword`,
    {
      password: formChangePassword.password,
      accountToken,
    },
    {
      headers: {
        showErrorToast: false,
      },
    },
  )
}

export const postEmailValidationByCode = async payload => {
  const response = await axios.post(`${resourceV1}/email-validation`, payload)
  return response
}

export const postResendEmailValidationCode = async payload => {
  const response = await axios.post(`${resourceV1}/resend-email-validation-code`, payload)
  return response
}

export const postLoginLexRedirect = async payload => {
  const config = {
    headers: {
      showErrorToast: false,
    },
  }
  const response = await axios.post(`${resourceLex}/auth-legacy`, payload, config)
  return response
}

export const postLoginTempAccess = payload => {
  return axios.post(`${resourceLoginTempAccess}/login/accesskey`, {
    ...payload,
    whitelabel: getWhitelabelConfig('Id'),
  })
}
