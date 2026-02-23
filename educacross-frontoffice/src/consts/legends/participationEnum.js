/**
 * Enum de participação
 * @type {Array<LegendItem>}
 */
export const participation = [
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
 * Legend for participation.
 * @type {{text: string, enum: Array<LegendItem>}}
 */
export const participationLegend = {
  text: 'Participação',
  enum: participation,
}
