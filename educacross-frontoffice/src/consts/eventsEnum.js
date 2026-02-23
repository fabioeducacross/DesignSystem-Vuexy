const EventStatusEnum = {
  Canceled: 0,
  ToActivate: 1,
  ToStart: 2,
  InProgress: 3,
  Finished: 4,
}

export default EventStatusEnum

export const DynamicCardStatusEnum = {
  1: {
    label: 'Crítico',
    variant: 'legend-below-basic',
    icon: 'sentiment_dissatisfied',
    fontColor: 'text-white',
    backgroundColor: 'bg-legend-below-basic bg-darken-4',
    textClass: 'text-legend-below-basic',
    rule: value => value < 50,
  },
  2: {
    label: 'Moderado',
    variant: 'legend-basic',
    icon: 'sentiment_neutral',
    fontColor: 'text-dark',
    backgroundColor: 'bg-legend-basic bg-darken-4',
    textClass: 'text-legend-basic',
    rule: value => value >= 50 && value < 80,
  },
  3: {
    label: 'Satisfatório',
    variant: 'legend-proficient',
    icon: 'sentiment_satisfied',
    fontColor: 'text-white',
    backgroundColor: 'bg-legend-proficient bg-darken-1',
    textClass: 'text-legend-proficient',
    rule: value => value >= 80 && value < 100,
  },
  4: {
    label: 'Finalizado',
    variant: 'legend-proficient bg-darken-3',
    icon: 'sentiment_very_satisfied',
    fontColor: 'text-white',
    backgroundColor: 'bg-legend-proficient bg-darken-4',
    textClass: 'text-legend-proficient text-darken-4',
    rule: value => value >= 100,
  },
}

export const getDynamicCardStatusEnum = value => {
  return Object.values(DynamicCardStatusEnum).find(i => i.rule(value)) || DynamicCardStatusEnum[1]
}
