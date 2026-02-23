/**
 *
 * @type {Array<LegendItem>}
 */
export const progress = [
  {
    text: 'progressEnum.successDarken',
    textClass: 'text-legend-complete',
    variant: 'legend-complete',
    rule: value => value === 100,
    badgeLabel: 'progressEnumLabel.successDarken',
  },
  {
    text: 'progressEnum.success',
    textClass: 'text-legend-proficient',
    variant: 'legend-proficient',
    rule: value => value >= 80,
    badgeLabel: 'progressEnumLabel.success',
  },
  {
    text: 'progressEnum.orange',
    textClass: 'text-legend-basic',
    variant: 'legend-basic',
    rule: value => value >= 50,
    badgeLabel: 'progressEnumLabel.orange',
  },
  {
    text: 'progressEnum.danger',
    textClass: 'text-legend-below-basic',
    variant: 'legend-below-basic',
    rule: value => value < 50,
    badgeLabel: 'progressEnumLabel.danger',
  },
]

/**
 * Legend for progress.
 * @type {{text: string, enum: Array<LegendItem>}}
 */
export const progressLegend = {
  text: 'Progresso',
  enum: progress,
}
