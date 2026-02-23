/**
 * Enumeration of learning performance options.
 * @type {Array<LegendItem>}
 */
export const proficiency = [
  {
    id: 1,
    label: 'Abaixo do Básico',
    variant: 'legend-below-basic',
    textClass: 'text-legend-below-basic',
    rule: value => value === 1,
    layout: 'badge',
    background: 'bg-light-legend-below-basic',
    icon: 'sentiment_dissatisfied',
    key: 'belowBasic',
    studentKey: 'studentsBelowBasic',
    performanceRule: value => value < 25,
  },
  {
    id: 2,
    label: 'Básico',
    variant: 'legend-basic',
    textClass: 'text-legend-basic',
    rule: value => value === 2,
    layout: 'badge',
    background: 'bg-light-legend-basic',
    icon: 'sentiment_neutral',
    key: 'basic',
    studentKey: 'studentsBasic',
    performanceRule: value => value >= 25 && value < 50,
  },
  {
    id: 3,
    label: 'Proficiente',
    variant: 'legend-proficient',
    textClass: 'text-legend-proficient',
    rule: value => value === 3,
    layout: 'badge',
    background: 'bg-light-legend-proficient',
    icon: 'sentiment_satisfied',
    key: 'proficient',
    studentKey: 'studentsProficient',
    performanceRule: value => value >= 50 && value < 70,
  },
  {
    id: 4,
    label: 'Avançado',
    variant: 'legend-advanced',
    textClass: 'text-legend-advanced',
    rule: value => value === 4,
    layout: 'badge',
    background: 'bg-light-legend-advanced',
    icon: 'sentiment_very_satisfied',
    key: 'advenced',
    studentKey: 'studentsAdvenced',
    performanceRule: value => value >= 70,
  },
]

/**
 * Enumeration of learning performance options.
 * @type {Array<LegendItem>}
 */
export const proficiencyWithInProgress = [
  {
    id: 0,
    label: 'Em Andamento',
    variant: 'legend-in-progress',
    textClass: 'text-legend-in-progress',
    rule: value => value === 0,
    layout: 'badge',
    background: 'bg-light-legend-in-progress',
    icon: 'directions_walk',
    key: 'none',
    studentKey: 'studentsNone',
  },
  ...proficiency,
]

/**
 * Enumeration of learning performance options.
 * @type {Array<LegendItem>}
 */
export const proficiencyWithNotCompleted = [
  {
    id: 0,
    label: 'Não fizeram',
    variant: 'legend-not-completed',
    textClass: 'text-legend-not-completed',
    rule: value => value === 0,
    layout: 'badge',
    background: 'bg-light-legend-not-completed',
    icon: 'no_accounts',
    key: 'none',
    studentKey: 'studentsNone',
  },
  ...proficiency,
]
