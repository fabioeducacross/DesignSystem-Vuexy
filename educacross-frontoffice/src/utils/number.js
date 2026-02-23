export function calcPercent(value, total) {
  if (!value || !total) {
    return 0
  }
  const valueToPercent = (value * 100) / total

  const factor = 10 ** 2
  return Math.floor(valueToPercent * factor) / factor
}

/**
 * @param {Number} value returns a simple decimal number
 * */

export function formatDecimalPlace(value) {
  if (!value) {
    return 0
  }

  if (value % 2 !== 0 && value % 2 !== 1) {
    const factor = 10 ** 2
    return Math.floor(value * factor) / factor
  }

  return value
}
