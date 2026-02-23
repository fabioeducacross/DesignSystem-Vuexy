import axiosIns from '@/libs/axios'

export const validatorPositive = value => {
  return value >= 0
}

export const validatorPassword = password => {
  /* eslint-disable no-useless-escape */
  const regExp = /^\S+$/
  /* eslint-enable no-useless-escape */
  return regExp.test(password)
}

export const validatorCreditCard = creditnum => {
  /* eslint-disable no-useless-escape */
  const cRegExp = /^(?:3[47][0-9]{13})$/
  /* eslint-enable no-useless-escape */
  return cRegExp.test(creditnum)
}

export const validatorUrlValidator = val => {
  if (val === undefined || val === null || val.length === 0) {
    return true
  }
  /* eslint-disable no-useless-escape */
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
  /* eslint-enable no-useless-escape */
  return re.test(val)
}

export const validEmail = async email => {
  const result = await axiosIns
    .post('v1/account/checkemail', { email })
    .then(response => response.data.haveAccount)
    .catch(() => false)

  return result
}

/** @param {String | Array} val */
export const validDateRange = val => {
  if (val instanceof Array) {
    return val.length === 2
  }

  const splitVal = val.split(' ')

  return splitVal.length === 3
}
