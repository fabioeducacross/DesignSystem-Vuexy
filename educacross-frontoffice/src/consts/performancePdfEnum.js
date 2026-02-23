export const performanceEnum = [
  {
    id: 4,
    text: 'Avançado',
    textClass: '',
    icon: '',
    variant: 'legend-advanced',
    rule: value => value === 4,
  },
  {
    id: 3,
    text: 'Proficiente',
    textClass: '',
    icon: '',
    variant: 'legend-proficient',
    rule: value => value === 3,
  },
  {
    id: 2,
    text: 'Básico',
    textClass: '',
    icon: '',
    variant: 'legend-basic',
    rule: value => value === 2,
  },
  {
    id: 1,
    text: 'Abaixo do básico',
    textClass: '',
    icon: '',
    variant: 'legend-below-basic',
    rule: value => value === 1,
  },
]

export const getPerformancPDFEnum = value => {
  return performanceEnum.find(i => i.rule(value))
}

export const performancePDFLegend = {
  text: '',
  enum: performanceEnum.reverse(),
}
