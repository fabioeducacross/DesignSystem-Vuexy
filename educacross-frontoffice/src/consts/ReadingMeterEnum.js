export const ReadingFluencyStatusEnum = [
  {
    id: 1,
    text: 'Desabilitado',
    textClass: '',
    icon: '',
    variant: 'status-activate',
    rule: value => value === 1,
  },
  {
    id: 2,
    text: 'Em andamento',
    textClass: '',
    icon: '',
    variant: 'status-in-progress',
    rule: value => value === 2,
  },
  {
    id: 3,
    text: 'Finalizado',
    textClass: '',
    icon: '',
    variant: 'status-finished',
    rule: value => value === 3,
  },
  {
    id: 4,
    text: 'Cancelado',
    textClass: '',
    icon: '',
    variant: 'status-canceled',
    rule: value => value === 4,
  },
]

export const ReadingEvaluationStatus = [
  {
    id: 0,
    text: 'Cancelada',
    textClass: '',
    icon: '',
    variant: 'status-canceled',
    rule: value => value === 0,
  },
  {
    id: 1,
    text: 'Pausado',
    textClass: '',
    icon: '',
    variant: 'status-paused',
    rule: value => value === 1,
  },
  {
    id: 2,
    text: 'Para ativar',
    textClass: '',
    icon: '',
    variant: 'status-activate',
    rule: value => value === 2,
  },
  {
    id: 3,
    text: 'Para iniciar',
    textClass: '',
    icon: '',
    variant: 'status-start',
    rule: value => value === 3,
  },
  {
    id: 4,
    text: 'Em andamento',
    textClass: '',
    icon: '',
    variant: 'status-in-progress',
    rule: value => value === 4,
  },
  {
    id: 5,
    text: 'Finalizado',
    textClass: '',
    icon: '',
    variant: 'status-finished',
    rule: value => value === 5,
  },
]

export const ReadingMeterPerformanceEnum = [
  {
    text: 'progressEnum.successDarken',
    textClass: 'text-primary',
    variant: 'primary',
    icon: 'sentiment_very_satisfied',
    backgroundColor: 'bg-primary bg-darken-1',
    rule: value => value >= 70,
  },
  {
    text: 'progressEnum.success',
    textClass: 'text-success',
    variant: 'success',
    icon: 'sentiment_satisfied',
    backgroundColor: 'bg-success bg-darken-1',
    rule: value => value >= 50,
  },
  {
    text: 'progressEnum.orange',
    textClass: 'text-orange',
    variant: 'orange',
    icon: 'sentiment_neutral',
    backgroundColor: 'bg-orange bg-darken-1',
    rule: value => value >= 25,
  },
  {
    text: 'progressEnum.danger',
    textClass: 'text-danger',
    variant: 'danger',
    icon: 'sentiment_dissatisfied',
    backgroundColor: 'bg-danger bg-darken-1',
    rule: value => value < 25,
  },
]

export const ReadingProficiencyEnum = [
  {
    id: 4,
    text: 'Avançado',
    variant: 'legend-advanced',
    icon: 'sentiment_very_satisfied',
    barPercent: 100,
    backgroundColor: 'bg-legend-advanced bg-darken-1',
    rule: value => value === 4,
  },
  {
    id: 3,
    text: 'Proficiente',
    variant: 'legend-proficient',
    icon: 'sentiment_satisfied',
    barPercent: 66.8,
    backgroundColor: 'bg-legend-proficient bg-darken-1',
    rule: value => value === 3,
  },
  {
    id: 2,
    text: 'Básico',
    variant: 'legend-basic',
    icon: 'sentiment_neutral',
    barPercent: 34.6,
    backgroundColor: 'bg-legend-basic bg-darken-1',
    rule: value => value === 2,
  },
  {
    id: 1,
    text: 'Abaixo do Básico',
    variant: 'legend-below-basic',
    icon: 'sentiment_dissatisfied',
    barPercent: 0,
    backgroundColor: 'bg-legend-below-basic bg-darken-1',
    rule: value => value === 1,
  },
]

export const ReadingMeterEvaluation = [
  {
    id: 3,
    text: 'Finalizado = 100%',
    textClass: 'text-primary',
    icon: '',
    variant: 'primary',
  },
  {
    id: 2,
    text: 'Satisfatório ≥ 80%',
    textClass: 'text-success',
    icon: '',
    variant: 'success',
  },
  {
    id: 1,
    text: 'Moderado ≥ 50%',
    textClass: 'text-warning',
    icon: '',
    variant: 'warning',
  },
  {
    id: 0,
    text: 'Crítico < 50%',
    textClass: 'text-danger',
    icon: '',
    variant: 'danger',
  },
]

export const ReadingMeterWordStatusEnum = [
  {
    id: 1,
    text: 'Leitura correta',
    textClass: 'text-legend-proficient',
    icon: '',
    variant: 'legend-proficient',
    rule: value => value === 1,
  },
  {
    id: 2,
    text: 'Leitura incorreta',
    textClass: 'text-legend-below-basic',
    icon: '',
    variant: 'legend-below-basic',
    rule: value => value === 2,
  },
  // {
  //   id: 3,
  //   text: 'Palavra inserida',
  //   textClass: 'text-legend-basic',
  //   icon: '',
  //   variant: 'legend-basic',
  //   rule: value => value === 3,
  // },
  {
    id: 4,
    text: 'Palavra omitida ',
    textClass: 'text-muted',
    icon: '',
    variant: 'legend-not-completed',
    rule: value => value === 4,
  },
]

export const PassportStatusEnum = [
  {
    id: 4,
    text: 'Meta atingida = 100% ',
    prettyText: 'Meta atingida!',
    variant: 'legend-advanced',
    icon: 'star',
    rule: value => value === 100,
  },
  {
    id: 3,
    text: 'Quase lá ≥50%',
    prettyText: 'Quase lá!',
    variant: 'info',
    icon: undefined,
    rule: value => value >= 50,
  },
  {
    id: 2,
    text: 'Em andamento >0% ',
    prettyText: 'Em andamento',
    variant: 'legend-basic',
    icon: '',
    rule: value => value > 0,
  },
  {
    id: 1,
    text: '0% = Não iniciada',
    prettyText: 'Não iniciada',
    variant: 'status-canceled',
    icon: undefined,
    rule: value => value === 0,
  },
]

export const getReadingProficiencyEnum = value => {
  return (
    ReadingProficiencyEnum.find(i => i.rule(value)) || {
      id: 0,
      text: '-',
      variant: 'legend-not-completed',
      icon: '',
      barPercent: 0,
      rule: value => value === 0,
    }
  )
}

export const getReadingMeterStatusEnum = value => {
  return ReadingFluencyStatusEnum.find(i => i.rule(value)) || {}
}

export const getReadingEvaluationStatusEnum = value => {
  return ReadingEvaluationStatus.find(i => i.rule(value)) || {}
}

export const ReadingMeterFluencyStatusLegend = {
  text: '',
  enum: ReadingFluencyStatusEnum,
}

export const getReadingMeterWordStatusEnum = value => {
  return ReadingMeterWordStatusEnum.find(i => i.rule(value))
}

export const getPassportStatusEnum = value => {
  return PassportStatusEnum.find(i => i.rule(value))
}

export const ReadingMeterWordStatusEnumLegend = {
  text: 'Transcrição da Leitura ',
  enum: ReadingMeterWordStatusEnum,
}

export const PassportStatusEnumLegend = {
  text: 'Status',
  enum: PassportStatusEnum,
}

export const ReadingFluencyV2StatusEnum = [
  {
    text: 'Cancelado',
    id: 0,
    variant: 'status-canceled', // Canceled
    rule: value => value === 0,
  },
  {
    text: 'Pausado',
    id: 1,
    variant: 'status-canceled', // Paused
    rule: value => value === 1,
  },
  {
    text: 'Para aplicar',
    id: 2,
    variant: 'status-activate',
    rule: value => value === 2,
  },
  {
    text: 'Para iniciar',
    id: 3,
    variant: 'status-start', // ToActivate
    rule: value => value === 3,
  },
  {
    text: 'Em andamento',
    id: 4,
    variant: 'status-in-progress', // ToStart
    rule: value => value === 4,
  },
  {
    text: 'Finalizado',
    id: 5,
    variant: 'status-finished', // ToStart
    rule: value => value === 5,
  },
]
