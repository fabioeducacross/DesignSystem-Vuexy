/**
 * @type {Array<LegendItem>}
 */
export const guideStatus = [
  {
    variant: 'legend-basic',
    label: 'Não enviada',
    rule: value => value === 0,
    key: 0,
    text: 'Não enviada',
    badgeLabel: 'Não enviada',
    textClass: 'text-legend-basic',
  },
  {
    variant: 'legend-below-basic',
    label: 'Pausada',
    rule: value => value === 1,
    key: 1,
    text: 'Pausada',
    badgeLabel: 'Pausada',
    textClass: 'text-legend-below-basic',
  },
  {
    variant: 'legend-advanced',
    label: 'Finalizada',
    rule: value => value === 2,
    key: 2,
    text: 'Finalizada',
    badgeLabel: 'Finalizada',
    textClass: 'text-legend-advanced',
  },
  {
    variant: 'legend-proficient',
    label: 'Iniciada',
    rule: value => value === 3,
    key: 3,
    text: 'Iniciada',
    badgeLabel: 'Iniciada',
    textClass: 'text-legend-proficient',
  },
  {
    variant: 'legend-in-progress',
    label: 'Não iniciada',
    rule: value => value === 4,
    key: 4,
    text: 'Não iniciada',
    badgeLabel: 'Não iniciada',
    textClass: 'text-legend-in-progress',
  },
]
