import formatDate from '@/utils/date'
import Vue from 'vue'

const title = (value, replacer = '_') => {
  if (!value) return ''
  value = value.toString()

  const arr = value.split(replacer)
  const capitalizedArray = []
  arr.forEach(word => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
    capitalizedArray.push(capitalized)
  })
  return capitalizedArray.join(' ')
}

const formatNumber = (num, fixed = 2) => {
  // Convert numeric strings to number
  // eslint-disable-next-line no-restricted-globals
  if (typeof num === 'string' || isNaN(num)) {
    num = Number(num)
  }

  // Check if num is a number
  // eslint-disable-next-line no-restricted-globals
  if (typeof num !== 'number' || isNaN(num)) {
    return '-'
  }

  // If it's a float, truncate it to the specified number of decimal places
  const factor = 10 ** fixed
  num = Math.floor(num * factor) / factor

  // Separate the integer part and the decimal part
  // eslint-disable-next-line prefer-const
  let [integer, decimal] = num.toString().split('.')

  // Format the integer part with dot as thousands separator
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  // Add the decimal part back in, if it exists
  if (decimal !== undefined) {
    return `${integer},${decimal.padEnd(fixed, '0')}`
  }
  return integer
}

const formattedDate = date => {
  if (!date || date === '') {
    return '-'
  }

  const d = new Date(date)
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  const year = d.getFullYear()

  return `${day}/${month}/${year}`
}

const formattedSchedule = schedule => {
  if (!schedule) return null

  const d = new Date(schedule)
  const hour = d.getHours().toString().padStart(2, '0')
  const minute = d.getMinutes().toString().padStart(2, '0')

  return `${hour}:${minute}`
}

const formattedTime = (time, customMessageEmptyMessage) => {
  if (typeof time !== 'undefined') {
    const hours = Math.floor(time / 3600)
    time %= 3600
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    if (hours > 0) {
      return `${hours}h ${minutes}min`
    }
    if (hours === 0 && minutes > 0) {
      return `${minutes}min ${formatNumber(seconds, 0)}s`
    }
    if (hours === 0 && minutes === 0 && seconds > 0) {
      return `${formatNumber(seconds, 0)}s`
    }
    if (hours === 0 && minutes === 0 && seconds === 0) {
      if (customMessageEmptyMessage) return customMessageEmptyMessage
      return `${formatNumber(seconds, 0)}s`
    }
  }
  return null
}

const truncate = (string, qtdCharacters) => {
  if (!string) return ''
  if (string.length <= qtdCharacters) return string
  const stringEllipses = string.substr(0, qtdCharacters)
  return `${stringEllipses}...`
}

const abbreviateName = name => {
  if (!name) return '-'
  const names = name.split(' ')
  if (names.length === 1) return names[0].charAt(0).toUpperCase()
  return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase()
}

const formatPercentToPtBr = value => `${formatNumber(value)}%`

const floatToPercent = value => `${String(parseFloat(value.toFixed(2))).replace('.', ',')}%`

const arrayToString = array => {
  if (Array.isArray(array) === false) return ''
  if (!array) return ''
  if (array.length === 0) return ''
  if (array.length === 1) return array[0]

  return array.join(', ')
}
const initials = (value = '') => {
  const words = value.trim().split(/\s+/) // Remove espaços extras e divide por espaços
  if (words.length === 0) return '' // Retorna string vazia se não houver palavras

  const firstInitial = words[0].charAt(0).toUpperCase()
  const lastInitial = words.length > 1 ? words[words.length - 1].charAt(0).toUpperCase() : ''

  return firstInitial + lastInitial
}

Vue.filter('truncate', truncate)
Vue.filter('title', title)
Vue.filter('formatNumber', formatNumber)
Vue.filter('formattedDate', formattedDate)
Vue.filter('formattedTime', formattedTime)
Vue.filter('formattedSchedule', formattedSchedule)
Vue.filter('formatPercentToPtBr', formatPercentToPtBr)
Vue.filter('abbreviateName', abbreviateName)
Vue.filter('floatToPercent', floatToPercent)
Vue.filter('formatDate', formatDate)
Vue.filter('arrayToString', arrayToString)
Vue.filter('initials', initials)

export {
  abbreviateName,
  arrayToString,
  floatToPercent,
  formatNumber,
  formatPercentToPtBr,
  formattedDate,
  formattedSchedule,
  formattedTime,
  title,
  truncate,
  initials,
}

Vue.prototype.$filters = {
  abbreviateName,
  arrayToString,
  floatToPercent,
  formatNumber,
  formatPercentToPtBr,
  formattedDate,
  formattedSchedule,
  formattedTime,
  title,
  truncate,
  initials,
  formatDate,
}
