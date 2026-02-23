import { colorsEnum } from '@/utils/report-education-system/rangeColors.js'

const getRangeColor = value => {
  let variant = {}
  const valueToFloor = Math.floor(value)

  switch (true) {
    case valueToFloor === 100:
      variant = colorsEnum[3]
      break
    case valueToFloor >= 80:
      variant = colorsEnum[2]
      break
    case valueToFloor >= 50:
      variant = colorsEnum[1]
      break
    default:
      variant = colorsEnum[0]
      break
  }

  return variant
}

export { getRangeColor }
