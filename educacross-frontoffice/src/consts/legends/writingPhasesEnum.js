// public enum EWritingStages
// {
//   None = 0,
//   [Display(Name = "Rabiscos")]
// Scribbles = 1,
//   [Display(Name = "Pré-Silábica")]
// PreSyllabic = 2,
//   [Display(Name = "Silábica Sem Valor Sonoro")]
// SyllabicWithoutSoundValue = 3,
//   [Display(Name = "Silábica Com Valor Sonoro")]
// SyllabicWithSoundValue = 4,
//   [Display(Name = "Silábica-Alfabética")]
// SyllabicAlphabetic = 5,
//   [Display(Name = "Alfabética")]
// Alphabetic = 6,
//   [Display(Name = "Ortográfica")]
// Orthographic = 7
// }

/**
 *
 * @type {Array<LegendItem>}
 */
export const writingPhaseEnum = [
  {
    id: 0,
    text: 'Não Avaliados',
    textClass: 'text-legend-writing-na',
    variant: 'legend-writing-na',
    rule: value => value === 0,
    badgeLabel: 'N/A',
    key: 'studentsNotStart',
  },
  {
    id: 1,
    text: 'Pré-Silábica',
    label: 'Pré-Silábica',
    textClass: 'text-legend-writing-pre',
    variant: 'legend-writing-pre',
    rule: value => value === 1,
    badgeLabel: 'PRÉ',
    key: 'studentsPreSyllabic',
  },
  {
    id: 2,
    text: 'Silábica Sem Valor Sonoro',
    label: 'Silábica Sem Valor Sonoro',
    textClass: 'text-legend-writing-ssv',
    variant: 'legend-writing-ssv',
    rule: value => value === 2,
    badgeLabel: 'SSV',
    key: 'studentsSyllabicWithoutSoundValue',
  },
  {
    id: 3,
    text: 'Silábica Com Valor Sonoro',
    label: 'Silábica Com Valor Sonoro',
    textClass: 'text-legend-writing-scv',
    variant: 'legend-writing-scv',
    rule: value => value === 3,
    badgeLabel: 'SCV',
    key: 'studentsSyllabicWithSoundValue',
  },
  {
    id: 4,
    text: 'Silábica-Alfabética',
    label: 'Silábica-Alfabética',
    textClass: 'text-legend-writing-sal',
    variant: 'legend-writing-sal',
    rule: value => value === 4,
    badgeLabel: 'SAL',
    key: 'studentsSyllabicAlphabetic',
  },
  {
    id: 5,
    text: 'Alfabética',
    label: 'Alfabética',
    textClass: 'text-legend-writing-alf',
    variant: 'legend-writing-alf',
    rule: value => value === 5,
    badgeLabel: 'ALF',
    key: 'studentsAlphabetic',
  },
  {
    id: 6,
    text: 'Ortográfica',
    label: 'Ortográfica',
    textClass: 'text-legend-writing-ort',
    variant: 'legend-writing-ort',
    rule: value => value === 6,
    badgeLabel: 'ORT',
    key: 'studentsOrthographi',
  },
]

/**
 * Legend for writingPhaseEnum.
 * @type {{text: string, enum: Array<LegendItem>}}
 */
export const writingPhaseEnumLegend = {
  text: 'Fases da escrita',
  enum: writingPhaseEnum,
}

export const EWritingStages = {
  studentsNone: 0,
  studentsPreSyllabic: 1,
  studentsSyllabicWithoutSoundValue: 2,
  studentsSyllabicWithSoundValue: 3,
  studentsSyllabicAlphabetic: 4,
  studentsAlphabetic: 5,
  studentsOrthographi: 6,
}

export const writingPhaseEnumQuestionOptions = [
  { text: 'Sim', value: 3 },
  { text: 'Não', value: 2 },
  { text: 'Parcialmente', value: 1 },
  { text: 'N/A', value: 0 },
]
