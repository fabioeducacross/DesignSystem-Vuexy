/**
 * Enum de progresso de eventos
 * @type {Array<LegendItem>}
 */
export const eventProgress = [
  {
    text: 'progressEnum.successDarken',
    textClass: 'text-legend-complete',
    variant: 'legend-complete',
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

/**
 * Legend item for event progress.
 * @type {{text: string, enum: Array<LegendItem>}}
 */
export const eventProgressLegend = {
  text: 'Progresso',
  enum: eventProgress,
}
