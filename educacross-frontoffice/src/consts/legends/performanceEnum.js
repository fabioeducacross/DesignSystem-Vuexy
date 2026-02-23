/**
 * Enumeration of learning performance options.
 * @type {Array<LegendItem>}
 */
export const learningPerformance = [
  {
    label: 'Avançado: ≥70% de aprendizado',
    text: 'Avançado: ≥70% de aprendizado',
    badgeLabel: 'Avançado',
    variant: 'legend-advanced',
    textClass: 'text-legend-advanced',
    rule: value => value >= 70,
  },
  {
    label: 'Proficiente: ≥50% de aprendizado',
    text: 'Proficiente: ≥50% de aprendizado',
    badgeLabel: 'Proficiente',
    variant: 'legend-proficient',
    textClass: 'text-legend-proficient',
    rule: value => value >= 50,
  },
  {
    label: 'Básico: ≥25% de aprendizado',
    text: 'Básico: ≥25% de aprendizado',
    badgeLabel: 'Básico',
    variant: 'legend-basic',
    textClass: 'text-legend-basic',
    rule: value => value >= 25,
  },
  {
    label: 'Abaixo do Básico: <25% de aprendizado',
    text: 'Abaixo do Básico: <25% de aprendizado',
    badgeLabel: 'Abaixo do Básico',
    variant: 'legend-below-basic',
    textClass: 'text-legend-below-basic',
    rule: value => value < 25,
  },
]

/**
 * Legend for learning performance.
 * @type {{text: string, enum: Array<LegendItem>}}
 */
export const learningPerformanceLegend = {
  text: 'Rendimento',
  enum: learningPerformance,
}

/**
 * List of accuracy performance options.
 * @type {Array<LegendItem>}
 */
export const accuracyPerformance = [
  {
    /**
     * Avançado: ≥70% de acertos
     */
    label: 'Avançado: ≥70% de acertos',
    text: 'Avançado: ≥70% de acertos',
    variant: 'legend-advanced',
    textClass: 'text-legend-advanced',
    rule: value => value >= 70,
    badgeLabel: 'Avançado',
  },
  {
    /**
     * Proficiente: ≥50% de acertos
     */
    label: 'Proficiente: ≥50% de acertos',
    text: 'Proficiente: ≥50% de acertos',
    variant: 'legend-proficient',
    textClass: 'text-legend-proficient',
    rule: value => value >= 50,
    badgeLabel: 'Proficiente',
  },
  {
    /**
     * Básico: ≥25% de acertos
     */
    label: 'Básico: ≥25% de acertos',
    text: 'Básico: ≥25% de acertos',
    variant: 'legend-basic',
    textClass: 'text-legend-basic',
    rule: value => value >= 25,
    badgeLabel: 'Básico',
  },
  {
    /**
     * Abaixo do Básico: <25% de acertos
     */
    label: 'Abaixo do Básico: <25% de acertos',
    text: 'Abaixo do Básico: <25% de acertos',
    variant: 'legend-below-basic',
    textClass: 'text-legend-below-basic',
    rule: value => value < 25,
    badgeLabel: 'Abaixo do Básico',
  },
]

/**
 * Legend for accuracy performance.
 * @type {{text: string, enum: Array<LegendItem>}}
 */
export const accuracyPerformanceLegend = {
  text: 'Rendimento',
  enum: accuracyPerformance,
}
