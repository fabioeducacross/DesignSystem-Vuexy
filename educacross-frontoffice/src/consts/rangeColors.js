const progressBarEnum = [
  {
    textVariant: 'text-legend-below-basic',
    variant: 'legend-below-basic',
    background: 'bg-progress-bar-legend-below-basic',
    min: 0,
    max: 30,
  },
  {
    textVariant: 'text-legend-basic',
    variant: 'legend-basic',
    background: 'bg-progress-bar-legend-basic',
    min: 30,
    max: 70,
  },
  {
    textVariant: 'text-legend-proficient',
    variant: 'legend-proficient',
    background: 'bg-progress-bar-legend-proficient',
    min: 70,
  },
]

const getColors = (value, progressBarEnum) => {
  const filteredStatus = progressBarEnum.filter(status => {
    if (status.max) {
      return value >= status.min && value < status.max
    }
    return value >= status.min
  })
  if (filteredStatus) {
    return filteredStatus[0]
  }

  return {}
}

export { getColors, progressBarEnum }
