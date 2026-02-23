export const EventStatusEnum = {
  0: { label: 'Cancelado', value: 0, variant: 'status-canceled', stringValue: 'Canceled' },
  1: { label: 'Para ativar', value: 1, variant: 'status-activate', stringValue: 'ToActivate' },
  2: { label: 'Para iniciar', value: 2, variant: 'status-start', stringValue: 'ToStart' },
  3: { label: 'Em andamento', value: 3, variant: 'status-in-progress', stringValue: 'InProgress' },
  4: { label: 'Finalizado', value: 4, variant: 'status-finished', stringValue: 'Finished' },
  5: {
    label: 'Não Enviado',
    value: 5,
    stringValue: 'NotSent',
    variant: 'legend-basic',
  },
  6: {
    label: 'Pausado',
    value: 6,
    stringValue: 'Paused',
    variant: 'status-canceled',
  },
}

export const SemaphoreStatusEnum = {
  1: { label: 'Crítico', variant: 'legend-below-basic' },
  2: { label: 'Moderado', variant: 'legend-basic' },
  3: { label: 'Satisfatório', variant: 'legend-proficient' },
  4: { label: 'Finalizado', variant: 'legend-proficient bg-darken-4' },
}

export const LegendStatusEnum = {
  1: {
    label: 'Avançado: ≥70% de aprendizado',
    text: 'Avançado: ≥70% de aprendizado',
    variant: 'status-finished',
    textClass: 'text-status-finished',
    rule: value => value >= 70,
  },
  2: {
    label: 'Proficiente: ≥50% de aprendizado',
    text: 'Proficiente: ≥50% de aprendizado',
    variant: 'legend-proficient',
    textClass: 'text-legend-proficient',
    rule: value => value >= 50,
  },
  3: {
    label: 'Básico: ≥25% de aprendizado',
    text: 'Básico: ≥25% de aprendizado',
    variant: 'legend-basic',
    textClass: 'text-legend-basic',
    rule: value => value >= 25,
  },
  4: {
    label: 'Abaixo do Básico: <25% de aprendizado',
    text: 'Abaixo do Básico: <25% de aprendizado',
    variant: 'legend-below-basic',
    textClass: 'text-legend-below-basic',
    rule: value => value < 25,
  },
}

export const getLegendStatusEnum = value => {
  return Object.values(LegendStatusEnum).find(i => i.rule(value))
}

export const DynamicCardStatusEnum = {
  1: {
    label: 'Crítico',
    variant: 'legend-below-basic',
    icon: 'sentiment_dissatisfied',
    fontColor: 'text-white',
    backgroundColor: 'bg-legend-below-basic bg-darken-4',
    textClass: 'text-legend-below-basic',
  },
  2: {
    label: 'Moderado',
    variant: 'legend-basic',
    icon: 'sentiment_neutral',
    fontColor: 'text-dark',
    backgroundColor: 'bg-legend-basic bg-darken-4',
    textClass: 'text-legend-basic',
  },
  3: {
    label: 'Satisfatório',
    variant: 'legend-proficient',
    icon: 'sentiment_satisfied',
    fontColor: 'text-white',
    backgroundColor: 'bg-legend-proficient bg-darken-1',
    textClass: 'text-legend-proficient',
  },
  4: {
    label: 'Finalizado',
    variant: 'legend-proficient bg-darken-3',
    icon: 'sentiment_very_satisfied',
    fontColor: 'text-white',
    backgroundColor: 'bg-legend-proficient bg-darken-4',
    textClass: 'text-legend-proficient text-darken-4',
  },
}

export const SponsorAccessStatus = {
  Recusado: { label: 'Recusado', variant: 'legend-below-basic' },
  Pendente: { label: 'Pendente', variant: 'legend-basic' },
  Ativo: { label: 'Ativo', variant: 'legend-proficient' },
}

export const IndividualReportStatusEnum = {
  1: {
    label: 'Abaixo do Básico',
    variant: 'legend-below-basic',
    fontColor: 'text-white',
    backgroundColor: 'bg-legend-below-basic',
  },
  2: {
    label: 'Básico',
    variant: 'legend-basic',
    fontColor: 'text-dark',
    backgroundColor: 'bg-legend-basic',
  },
  3: {
    label: 'Proficiente',
    variant: 'legend-proficient',
    fontColor: 'text-white',
    backgroundColor: 'bg-legend-proficient',
  },
  4: {
    label: 'Avançado',
    variant: 'legend-proficient bg-darken-3',
    fontColor: 'text-white',
    backgroundColor: 'bg-legend-proficient',
  },
}
