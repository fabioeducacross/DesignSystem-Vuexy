import axios from '@/libs/axiosAccount'

const resourceV1 = '/v1/account'
const resourceV2 = '/v2/account'
const resourceInvitation = '/v1/invitation'

export const getAccessContexts = async () => {
  const response = await axios.get(`${resourceV1}/access`)
  return response
}

export const getAccessContextsByUserId = async UserId => {
  const response = await axios.get(`${resourceV1}/access/${UserId}/login`)
  return response
}

export const postVerifyAccessKey = async accessKey => {
  const response = await axios.post(`${resourceV1}/verifyaccesskey`, {
    accessKey,
  })
  return response
}

export const postActiveAccessKey = async (accessKey, explicitAcceptanceOfTermsOfUse) => {
  const response = await axios.post(`${resourceV1}/activeaccesskey`, {
    accessKey,
    explicitAcceptanceOfTermsOfUse,
  })
  return response
}

export const getAllInvitations = async () => {
  const response = await axios.get(`${resourceInvitation}`)
  return response
}

export const putInvitationsAction = async ({ invitations }) => {
  const response = await axios.put(`${resourceInvitation}/actions`, {
    invitations,
  })

  return response
}

export const postVerifyLinkUser = async user => {
  const response = await axios.post(`${resourceV1}/verifylinkuser`, user)
  return response
}

export const putLinkUser = async ({ userName, password, acceptAccess }) => {
  const response = await axios.put(`${resourceV1}/linkuser`, {
    userName,
    password,
    explicitAcceptanceOfTermsOfUse: acceptAccess,
  })
  return response
}

export const getEditProfileStudent = async id => {
  const response = await axios.get(`${resourceV1}/access/${id}`)
  return response
}

export const putEditAccessStudent = async (id, data) => {
  const response = await axios.put(`${resourceV1}/editaccess/${id}`, data)
  return response
}

export const putLinkFacebook = async data => {
  const response = await axios.put(`${resourceV1}/linkfacebook/`, data)
  return response
}

export const putLinkGoogle = async data => {
  const response = await axios.put(`${resourceV1}/linkgoogle/`, data)
  return response
}

export const getProfileAdminData = async () => {
  const response = await axios.get(`${resourceV1}/data`)
  return response
}

export const putEditAccessAdmin = async data => {
  const response = await axios.put(`${resourceV1}/edit/`, data)
  return response
}

export const postSendEmailValidation = async data => {
  const config = {
    headers: {
      showErrorToast: false,
    },
  }
  const response = await axios.post(`${resourceV1}/send-email-validation`, data, config)
  return response
}

export const postResendEmailValidation = async payload => {
  const response = await axios.post(`${resourceV2}/resend-email-change-validation-code`, payload)
  return response
}

export const postChangeEmailValidation = async payload => {
  const response = await axios.post(`${resourceV1}/change-email-validation`, payload)
  return response
}
