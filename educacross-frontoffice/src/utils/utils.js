import { formatNumber } from '@/filters/filters'
import store from '@/store'

const arrayToUrl = (params, key) => {
  let url = ''
  params = params.filter(item => item)
  params.forEach(item => {
    url += `&${key}=${item}`
  })

  return url
}

export function urlString(params) {
  if (!params) {
    return ''
  }
  if (!(params instanceof Object)) {
    return params
  }

  let url = ''

  Object.keys(params).forEach(key => {
    if (!params[key] && (params[key] !== 0 && params[key] !== false)) return
    if (Array.isArray(params[key])) {
      url += arrayToUrl(params[key], key)
    } else {
      url += `&${key}=${params[key]}`
    }
  })

  return url
}

export function formatDate(date) {
  // if invalid Date string, return empty string
  if (Number.isNaN(new Date(date).getTime())) return '-'

  const d = new Date(date)
  let month = `${d.getMonth() + 1}`
  let day = `${d.getDate()}`
  const year = d.getFullYear()

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return `${day}/${month}/${year}`
}

export function formatDateAndTime(date) {
  // if invalid Date string, return empty string
  if (Number.isNaN(new Date(date).getTime())) return '-'

  const d = new Date(date)
  let month = `${d.getMonth() + 1}`
  let day = `${d.getDate()}`
  const year = d.getFullYear()

  const hour = `${d.getHours()}`
  const min = `${d.getMinutes()}`

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return `${day}/${month}/${year} às ${hour}:${min}`
}

/**
 * Adds an alpha value to a hexadecimal color code.
 *
 * @param {string} hexCode - The hexadecimal color code to modify.
 * @param {number} alphaValue - The alpha value to add, in the range 0 to 1.
 * @returns {string|undefined} A new hexadecimal color code with the specified alpha value added,
 *                             or undefined if either parameter is invalid.
 */
export function addAlpha(hexCode, alphaValue) {
  if (typeof alphaValue !== 'number' || alphaValue < 0 || alphaValue > 1) {
    return undefined
  }

  if (typeof hexCode !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(hexCode)) {
    return undefined
  }

  const hexNumber = parseInt(hexCode.substring(1), 16)
  const red = (hexNumber >> 16) & 255
  const green = (hexNumber >> 8) & 255
  const blue = hexNumber & 255
  const alpha = Math.round(alphaValue * 255)
    .toString(16)
    .padStart(2, '0')

  return `#${(((red << 16) | (green << 8) | blue) >>> 0).toString(16).padStart(6, '0')}${alpha}`
}

export function formattedTime(time, customMessageEmptyMessage) {
  if (typeof time !== 'undefined') {
    const hours = Math.floor(time / 3600)
    time %= 3600
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    if (hours > 0) {
      return `${formatNumber(hours)}h ${formatNumber(minutes)}min`
    }
    if (hours === 0 && minutes > 0) {
      return `${formatNumber(minutes)}min ${formatNumber(seconds)}s`
    }
    if (hours === 0 && minutes === 0 && seconds > 0) {
      return `${formatNumber(seconds)}s`
    }
    if (hours === 0 && minutes === 0 && seconds === 0) {
      if (customMessageEmptyMessage) return customMessageEmptyMessage
      return `${formatNumber(seconds)}s`
    }
  }
  return null
}

export function RegressiveDays(startDay, endDay) {
  const start = new Date(startDay)
  const end = new Date(endDay)
  let differenceDay = end.getTime() - start.getTime()
  differenceDay /= 1000 * 60 * 60 * 24
  return Math.ceil(differenceDay)
}

export function monthName(month) {
  const months = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro',
  }
  return months[month]
}

/**
 * Generates an array of month names in the specified locale and format.
 *
 * @export
 * @param {string} [locale='pt-BR'] - The locale to be used for generating the month names. Defaults to 'pt-BR'.
 * @param {Object} [options={ month: 'long' }] - An object that represents options for the toLocaleString() function. Defaults to { month: 'long' } which generates full month names.
 * @returns {Array.<string>} An array of month names in the specified locale and format.
 */
export const months = (locale = 'pt-BR', options = { month: 'long' }) => {
  const months = []
  for (let i = 0; i < 12; i++) {
    months.push(new Date(0, i).toLocaleString(locale, options))
  }
  return months.map(month => month.charAt(0).toUpperCase() + month.slice(1))
}

export function activityClasses(accessActivity) {
  return {
    'less-activity': parseFloat(accessActivity) >= 0 && parseFloat(accessActivity) <= 25,
    'some-activity': parseFloat(accessActivity) >= 26 && parseFloat(accessActivity) <= 50,
    'half-activity': parseFloat(accessActivity) >= 51 && parseFloat(accessActivity) <= 75,
    'almost-full-activity': parseFloat(accessActivity) >= 76 && parseFloat(accessActivity) <= 100,
  }
}

/**
 * Function to sanitize a string by replacing special characters with similar ASCII characters.
 * @param {string} string - The string to be sanitized.
 * @returns {string} - The sanitized string.
 */
export const sanitizeString = string => {
  return string
    .replace(/[áàãâä]/gi, 'a')
    .replace(/[éè¨ê]/gi, 'e')
    .replace(/[íìïî]/gi, 'i')
    .replace(/[óòöôõ]/gi, 'o')
    .replace(/[úùüû]/gi, 'u')
    .replace(/[ç]/gi, 'c')
    .replace(/[ñ]/gi, 'n')
    .replace(/\s+/g, ' ')
    .trim()
}

export const uuidv4 = () => {
  // Generate 16 random bytes
  const rnds = crypto.getRandomValues(new Uint8Array(16))
  // Per RFC 4122: set bits for version (4) and variant (10)
  rnds[6] = (rnds[6] & 0x0f) | 0x40
  rnds[8] = (rnds[8] & 0x3f) | 0x80

  // Convert bytes to hex and insert dashes at appropriate positions
  const hex = Array.from(rnds, b => b.toString(16).padStart(2, '0')).join('')
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20),
  ].join('-')
}

export const converteMinutos = valorMinutos => {
  if (valorMinutos < 60) {
    return `${valorMinutos} minuto${valorMinutos === 1 ? '' : 's'}`
  }
  const horas = Math.floor(valorMinutos / 60)
  const minutos = valorMinutos % 60
  if (minutos === 0) {
    return `${horas} hora${horas === 1 ? '' : 's'}`
  }
  return `${horas} hora${horas === 1 ? '' : 's'} e ${minutos} minuto${minutos === 1 ? '' : 's'}`
}

export const getExtension = value => {
  if (!value) return
  const parts = value.split('.')
  return parts[parts.length - 1]
}

export const capitalizeKeys = obj => {
  if (!(obj instanceof Object)) {
    return obj // Return unchanged if not an object
  }

  return Object.entries(obj).reduce(
    (newObj, [key, value]) => ({
      ...newObj,
      [key.charAt(0).toUpperCase() + key.slice(1)]: value,
    }),
    {},
  )
}

export const replaceDotsAndCommas = string => {
  string = `${string}`
  return string.replace(/[,.]/g, m => (m === ',' ? '.' : ','))
}

export function toReversed(arr) {
  const reversed = []
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i])
  }
  return reversed
}

// sort funcion to sort strings with special characters removing them

/**
 * Sorts two strings in a locale-sensitive manner.
 * using localeCompare to sort strings. https://caniuse.com/mdn-javascript_builtins_string_localecompare_locales_parameter
 *
 * @param {string} a - The first string to compare.
 * @param {string} b - The second string to compare.
 * @returns {number} - A negative number if `a` should be sorted before `b`, a positive number if `a` should be sorted after `b`, or 0 if they are equal.
 */
export function sortString(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return 0
  }

  return a.localeCompare(b, undefined, { numeric: true })
}

/**
 * @typedef {'math' | 'port' | 'liga' | 'math-ing'} SubjectVariant
 */

/**
 *
 * @param {number} subjectId
 * @returns {SubjectVariant}
 */
export const getSubjectVariant = subjectId => {
  const subjectVariant = {
    1: 'math',
    2: 'port',
    3: 'liga',
    4: 'math-ing',
  }

  return subjectVariant[subjectId]
}

/**
 * Return the Hexadecimal from the css variable
 * @param {String} color
 * @returns {string}
 */
export const getColorHexFromCssVar = color => {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${color}`)
}

export const scrollToElement = (target, offset = 0, behavior = 'smooth') => {
  if (!target) {
    return
  }

  const element = target instanceof HTMLElement ? target : target.$el || target.value || target

  if (!(element instanceof HTMLElement)) {
    return
  }

  const rect = element.getBoundingClientRect()

  const currentScroll = window.scrollY || document.documentElement.scrollTop

  const targetPosition = rect.top + currentScroll + offset

  window.scrollTo({
    top: targetPosition,
    behavior,
  })
}

export const isNumber = num => {
  if (typeof num === 'number') {
    return num - num === 0
  }

  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num)
  }

  return false
}

/**
 * Check if the serie has the permission
 * @param {number} serie
 * @param {string} permission
 *
 * @returns {boolean}
 */
export const havePermissionOnSerie = (serie, permission) => {
  if (!serie || !permission) return false

  const permissions = store.getters.getModulePermissions?.[serie]
  if (!Array.isArray(permissions)) return false

  return permissions.some(item => item.subject === permission)
}
