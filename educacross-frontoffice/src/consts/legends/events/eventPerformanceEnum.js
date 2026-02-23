/**
 * @type {Array<LegendItem>}
 */
export const eventLearningPerformance = [
  {
    label: 'Não há dados para exibir',
    text: 'Não há dados para exibir',
    variant: 'light-primary',
    textClass: 'text-legend-primary',
    badgeLabel: 'Não há dados para exibir',
    rule: value => value === 0,
  },
  {
    label: 'Avançado: ≥70% de aprendizado',
    text: 'Avançado: ≥70% de aprendizado',
    variant: 'legend-advanced',
    textClass: 'text-legend-advanced',
    badgeLabel: 'Avançado',
    rule: value => value >= 70,
  },
  {
    label: 'Proficiente: ≥50% de aprendizado',
    text: 'Proficiente: ≥50% de aprendizado',
    variant: 'legend-proficient',
    textClass: 'text-legend-proficient',
    badgeLabel: 'Proficiente',
    rule: value => value >= 50,
  },
  {
    label: 'Básico: ≥25% de aprendizado',
    text: 'Básico: ≥25% de aprendizado',
    variant: 'legend-basic',
    textClass: 'text-legend-basic',
    badgeLabel: 'Básico',
    rule: value => value >= 25,
  },
  {
    label: 'Abaixo do Básico: <25% de aprendizado',
    text: 'Abaixo do Básico: <25% de aprendizado',
    variant: 'legend-below-basic',
    textClass: 'text-legend-below-basic',
    badgeLabel: 'Abaixo do Básico',
    rule: value => value < 25,
  },
]

/**
 * Legend for event learning performance.
 * @type {{text: string, enum: Array<LegendItem>}}
 */
export const eventLearningPerformanceLegend = {
  text: 'Rendimento',
  enum: eventLearningPerformance,
}
