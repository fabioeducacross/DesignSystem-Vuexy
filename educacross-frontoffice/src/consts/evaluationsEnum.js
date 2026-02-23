export const StatusEnum = {
  0: {
    label: 'Cancelada',
    value: 0,
    stringValue: 'Canceled',
    variant: 'status-canceled',
  },
  1: {
    label: 'Para ativar',
    value: 1,
    stringValue: 'ToActivate',
    variant: 'status-activate',
  },
  2: {
    label: 'Para iniciar',
    value: 2,
    stringValue: 'ToStart',
    variant: 'status-start',
  },
  3: {
    label: 'Em andamento',
    value: 3,
    stringValue: 'InProgress',
    variant: 'status-in-progress',
  },
  4: {
    label: 'Finalizada',
    value: 4,
    stringValue: 'Finished',
    variant: 'status-finished',
  },
  5: {
    label: 'Não Enviada',
    value: 5,
    stringValue: 'NotSent',
    variant: 'legend-basic',
  },
  6: {
    label: 'Pausada',
    value: 6,
    stringValue: 'Paused',
    variant: 'status-canceled',
  },
}

export const EEvaluationActiveStatus = {
  Canceled: 0,
  ToActivate: 1,
  ToStart: 2,
  InProgress: 3,
  Finished: 4,
}

export const LegendStatusEnumCard = [
  {
    title: 'Não fizeram',
    icon: 'no_accounts',
    variant: 'legend-not-completed',
    range: 0,
  },
  {
    title: 'Abaixo do básico',
    icon: 'sentiment_dissatisfied',
    variant: 'legend-below-basic',
    range: 1,
  },
  {
    title: 'Básico',
    icon: 'sentiment_neutral',
    variant: 'legend-basic',
    range: 2,
  },
  {
    title: 'Proficiente',
    icon: 'sentiment_satisfied',
    variant: 'legend-proficient',
    range: 3,
  },
  {
    title: 'Avançado',
    icon: 'sentiment_very_satisfied',
    variant: 'legend-advanced',
    range: 4,
  },
]

export const ProficiencyTRIEnum = [
  {
    title: 'Abaixo do básico',
    icon: 'sentiment_dissatisfied',
    variant: 'legend-not-completed',
    range: 1,
    text: 'Abaixo do Básico',
    key: 'belowBasic',
    studentKey: 'studentsBelowBasic',
  },
  {
    title: 'Básico',
    icon: 'sentiment_neutral',
    variant: 'legend-below-basic',
    range: 2,
    text: 'Básico',
    key: 'basic',
    studentKey: 'studentsBasic',
  },
  {
    title: 'Proficiente',
    icon: 'sentiment_satisfied',
    variant: 'legend-basic',
    range: 3,
    text: 'Proficiente',
    key: 'proficient',
    studentKey: 'studentsProficient',
  },
  {
    title: 'Avançado',
    icon: 'sentiment_very_satisfied',
    variant: 'legend-proficient',
    range: 4,
    text: 'Avançado',
    key: 'advenced',
    studentKey: 'studentsAdvenced',
  },
]

export const PerformanceEnum = {
  1: {
    label: 'Avançado: ≥70% de aprendizado',
    text: 'Avançado: ≥70% de aprendizado',
    variant: 'legend-proficient',
    textClass: 'text-legend-proficient',
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

/**
 * @deprecated
 */
export const getPerformanceEnum = value => {
  return Object.values(PerformanceEnum).find(i => i.rule(value))
}

/**
 * Enumeration of participation status options.
 * @typedef {Object} ParticipationStatusOption
 * @property {string} text - The display text for the status option.
 * @property {string} variant - The variant color for the status option.
 * @property {Function} rule - The rule function that determines if a value matches the status option.
 * @param {number} value - The value to be evaluated against the rule function.
 * @returns {boolean} - Returns true if the value matches the rule, otherwise false.
 */

/**
 * Enumeration of participation status options.
 * @type {ParticipationStatusOption[]}
 */
export const ParticipationStatusEnum = [
  {
    text: 'Finalizado = 100%',
    variant: 'legend-proficientDarken',
    textClass: 'text-legend-proficientDarken',
    rule: value => value >= 100,
  },
  {
    text: 'Satisfatório ≥ 80% ',
    variant: 'legend-proficient',
    textClass: 'text-legend-proficient',
    rule: value => value >= 80 && value < 100,
  },
  {
    text: 'Moderado ≥ 50% ',
    variant: 'legend-basic',
    textClass: 'text-legend-basic',
    rule: value => value >= 50 && value < 80,
  },
  {
    text: 'Crítico < 50% ',
    variant: 'legend-below-basic',
    textClass: 'text-legend-below-basic',
    rule: value => value < 50,
  },
]

/**
 * Retrieves the participation status enum based on the given value.
 * @param {number} value - The value to match against the enum rules.
 * @returns {ParticipationStatusOption} - The matching participation status enum object, or undefined if no match is found.
 */
export const getParticipationStatusEnum = value => {
  return ParticipationStatusEnum.find(i => i.rule(value))
}

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
    variant: 'warning',
    icon: 'sentiment_neutral',
    fontColor: 'text-dark',
    backgroundColor: 'bg-warning bg-darken-4',
    textClass: 'text-warning',
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

export const answersEnum = [
  {
    id: 3,
    text: 'Finalizado = 100%',
    textClass: 'text-legend-proficient text-darken-4',
    variant: 'legend-proficient bg-darken-4',
    rule: value => value >= 70,
  },
  {
    id: 2,
    text: 'Satisfatório ≥ 80%',
    textClass: 'text-legend-proficient',
    variant: 'legend-proficient',
    rule: value => value >= 80,
  },
  {
    id: 1,
    text: 'Moderado ≥ 50%',
    textClass: 'text-legend-basic',
    variant: 'legend-basic',
    rule: value => value >= 50,
  },
  {
    id: 0,
    text: 'Crítico < 50%',
    textClass: 'text-legend-below-basic',
    variant: 'legend-below-basic',
    rule: value => value < 50,
  },
]

export const answersLegend = {
  text: 'Total de respostas',
  enum: answersEnum,
}

export const EAnswerKey = {
  None: 0,
  EvaluationDigital: 1,
  TeacherInput: 2,
  TeacherAutomaticInput: 3,
}

export const answerKeyStatus = [
  {
    id: 3,
    text: 'LEITURA AUTOMÁTICA',
    icon: 'person_edit',
    variant: 'legend-proficient',
    rule: value => value === 3,
  },
  {
    id: 2,
    text: 'VIA PROFESSOR',
    icon: 'person_edit',
    variant: 'legend-proficient',
    rule: value => value === 2,
  },
  {
    id: 1,
    text: 'VIA PROVA DIGITAL',
    variant: 'legend-proficient',
    rule: value => value === 1,
  },
  {
    id: 0,
    text: 'NÃO PREENCHIDO',
    icon: 'info',
    variant: 'legend-below-basic',
    rule: value => value === 0,
  },
]
