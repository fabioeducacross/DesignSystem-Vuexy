export const progressEnum = [
  {
    text: 'progressEnum.successDarken',
    textClass: 'text-legend-proficient text-darken-4',
    variant: 'legend-proficient bg-darken-4',
    rule: value => value === 100,
  },
  {
    text: 'progressEnum.success',
    textClass: 'text-legend-proficient',
    variant: 'legend-proficient',
    rule: value => value >= 80,
  },
  {
    text: 'progressEnum.orange',
    textClass: 'text-legend-basic',
    variant: 'legend-basic',
    rule: value => value >= 50,
  },
  {
    text: 'progressEnum.danger',
    textClass: 'text-legend-below-basic',
    variant: 'legend-below-basic',
    rule: value => value < 50,
  },
]

export const performanceEnum = [
  {
    id: 3,
    text: 'performanceEnum.success',
    textClass: 'text-legend-proficient',
    icon: 'sentiment_very_satisfied',
    variant: 'legend-proficient',
    rule: value => value >= 70,
  },
  {
    id: 2,
    text: 'performanceEnum.warning',
    textClass: 'text-legend-basic',
    icon: 'sentiment_satisfied',
    variant: 'legend-basic',
    rule: value => value >= 50,
  },
  {
    id: 1,
    text: 'performanceEnum.orange',
    textClass: 'text-legend-basic',
    icon: 'sentiment_neutral',
    variant: 'legend-basic',
    rule: value => value >= 25,
  },
  {
    id: 0,
    text: 'performanceEnum.danger',
    textClass: 'text-legend-below-basic',
    icon: 'sentiment_dissatisfied',
    variant: 'legend-below-basic',
    legend: 'educationColorKeyLegend',
    rule: value => value < 25,
  },
]

export const getProgressEnum = value => {
  return progressEnum.find(i => i.rule(value))
}

export const getPerformanceEnum = value => {
  return performanceEnum.find(i => i.rule(value))
}

export const progressLegend = {
  text: 'progress',
  enum: progressEnum,
}

export const performanceLegend = {
  text: 'performance',
  enum: performanceEnum,
}
