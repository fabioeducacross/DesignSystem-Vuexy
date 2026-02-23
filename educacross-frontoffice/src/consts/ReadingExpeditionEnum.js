export const CompreehensionChallengeQuestionStatus = {
  Right: 1,
  Incorrect: 2,
  Unanswered: 3,
}

export const CompreehensionChallengeQuestionStatusEnum = [
  {
    id: CompreehensionChallengeQuestionStatus.Right,
    text: 'Resposta correta',
    textClass: 'text-white',
    variant: 'legend-proficient',
    icon: 'done',
    rule: value => value === CompreehensionChallengeQuestionStatus.Right,
    layout: 'QuestionStatus',
  },
  {
    id: CompreehensionChallengeQuestionStatus.Incorrect,
    text: 'Resposta incorreta',
    textClass: 'text-white',
    variant: 'legend-below-basic',
    icon: 'close',
    rule: value => value === CompreehensionChallengeQuestionStatus.Incorrect,
    layout: 'QuestionStatus',
  },
  /* {
    id: CompreehensionChallengeQuestionStatus.Unanswered,
    text: 'Não respondida',
    textClass: 'text-white',
    variant: 'legend-basic',
    icon: 'question_mark',
    rule: value => value === CompreehensionChallengeQuestionStatus.Unanswered,
    layout: 'QuestionStatus',
  }, */
]

export const TestStatusEnum = {
  1: {
    label: 'NÃO INCIADO',
    variant: 'secondary',
  },
  2: {
    label: 'EM ANDAMENTO',
    variant: 'legend-below-basic',
  },
  3: {
    label: 'FINALIZADO',
    variant: 'legend-proficient',
  },
  4: {
    label: 'BLOQUEADO',
    variant: 'muted',
  },
}

export const ProficiencyTestStatusEnum = [
  {
    id: 0,
    status: `InProgress`,
    label: 'Em Andamento',
    icon: 'directions_walk',
    variant: 'legend-in-progress',
    rule: value => value === 0,
  },
  {
    id: 1,
    status: `BellowBasic`,
    label: 'Abaixo do Básico',
    variant: 'legend-below-basic',
    rule: value => value === 1,
    layout: 'badge',
    background: 'bg-light-legend-below-basic',
  },
  {
    id: 2,
    status: `Basic`,
    label: 'Básico',
    variant: 'legend-basic',
    rule: value => value === 2,
    layout: 'badge',
    background: 'bg-light-legend-basic',
  },
  {
    id: 3,
    status: `Proficient`,
    label: 'Adequado',
    variant: 'legend-proficient',
    rule: value => value === 3,
    layout: 'badge',
    background: 'bg-light-legend-proficient',
  },
  {
    id: 4,
    status: `Advenced`,
    label: 'Avançado',
    variant: 'legend-advanced',
    rule: value => value === 4,
    layout: 'badge',
    background: 'bg-light-legend-advanced',
  },
]

export const getProficiencyTestStatusEnum = value => {
  return ProficiencyTestStatusEnum.find(i => i.rule(value))
}

export const ReadingProficiencyEnum = [
  {
    id: 4,
    text: 'Avançado',
    label: 'Avançado',
    variant: 'legend-advanced',
    icon: 'sentiment_very_satisfied',
    barPercent: 100,
    backgroundColor: 'bg-legend-advanced bg-darken-1',
    rule: value => value === 4,
  },
  {
    id: 3,
    text: 'Adequado',
    label: 'Adequado',
    variant: 'legend-proficient',
    icon: 'sentiment_satisfied',
    barPercent: 66.8,
    backgroundColor: 'bg-legend-proficient bg-darken-1',
    rule: value => value === 3,
  },
  {
    id: 2,
    text: 'Básico',
    label: 'Básico',
    variant: 'legend-basic',
    icon: 'sentiment_neutral',
    barPercent: 34.6,
    backgroundColor: 'bg-legend-basic bg-darken-1',
    rule: value => value === 2,
  },
  {
    id: 1,
    text: 'Abaixo do Básico',
    label: 'Abaixo do Básico',
    variant: 'legend-below-basic',
    icon: 'sentiment_dissatisfied',
    barPercent: 0,
    backgroundColor: 'bg-legend-below-basic bg-darken-1',
    rule: value => value === 1,
  },
  {
    id: 0,
    text: 'Não fizeram',
    label: 'Não fizeram',
    variant: 'legend-not-completed',
    icon: 'no_accounts',
    barPercent: 0,
    backgroundColor: 'bg-legend-below-basic bg-darken-1',
    rule: value => value === 0,
  },
]

export const IndicatorsLegend = {
  text: 'Indicadores',
  enum: ReadingProficiencyEnum.slice(0, 4), // Exclude 'Não fizeram'
}

export const getReadingProficiencyEnum = value => {
  return (
    ReadingProficiencyEnum.find(i => i.rule(value)) || {
      id: 0,
      text: '-',
      variant: 'secondary',
      icon: '',
      barPercent: 0,
      rule: value => value === 0,
    }
  )
}

export const ReadingMeterWordStatusEnum = [
  {
    id: 1,
    text: 'Leitura correta',
    textClass: 'text-legend-proficient',
    icon: '',
    variant: 'legend-proficient',
    rule: value => value === 1,
  },
  {
    id: 2,
    text: 'Leitura incorreta',
    textClass: 'text-legend-below-basic',
    icon: '',
    variant: 'legend-below-basic',
    rule: value => value === 2,
  },
  // {
  //   id: 3,
  //   text: 'Palavra inserida',
  //   textClass: 'text-warning',
  //   icon: '',
  //   variant: 'warning',
  //   rule: value => value === 3,
  // },
  {
    id: 4,
    text: 'Palavra Omitida',
    textClass: 'text-muted',
    icon: '',
    variant: 'secondary',
    rule: value => value === 4,
  },
]

export const ReadingMeterWordStatusEnumLegend = {
  text: 'Leitura',
  enum: ReadingMeterWordStatusEnum,
}

export const expeditionStudentProgress = [
  {
    text: 'Finalizado = 100%',
    variant: 'legend-proficient bg-darken-4',
    textClass: 'text-legend-proficient text-darken-4',
    rule: value => value === 100,
  },
  {
    text: 'Satisfatório ≥ 80% ',
    variant: 'legend-proficient',
    textClass: 'text-legend-proficient',
    rule: value => value >= 80 && value < 100,
  },
  {
    text: 'Moderado ≥ 50%',
    variant: 'warning',
    textClass: 'text-warning',
    rule: value => value >= 50 && value < 80,
  },
  {
    text: 'Crítico < 50%',
    variant: 'legend-below-basic',
    textClass: 'text-legend-below-basic',
    rule: value => value < 50,
  },
]

export const getExpeditionStudentProgress = value => {
  return expeditionStudentProgress.find(i => i.rule(value))
}

export const expeditionStudentProgressLegend = {
  text: 'Progresso',
  enum: expeditionStudentProgress,
}

export const getReadingMeterWordStatusEnum = value => {
  return ReadingMeterWordStatusEnum.find(i => i.rule(value))
}

export const EExpeditionStageStatus = {
  Block: 0,
  NotStarted: 1,
  InProgress: 2,
  Processing: 3,
  Finished: 4,
  Accomplished: 5,
}

export const ExpeditionStageStatusEnum = [
  {
    id: 0,
    status: `Block`,
    label: 'Bloqueado',
    variant: 'legend-not-completed',
    rule: value => value === 0,
    layout: 'badge',
  },
  {
    id: 1,
    status: `NotStarted`,
    label: 'Não iniciado',
    variant: 'legend-not-completed',
    rule: value => value === 1,
    layout: 'badge',
  },
  {
    id: 2,
    status: `InProgress`,
    label: 'Em Andamento',
    icon: 'directions_walk',
    variant: 'legend-in-progress',
    rule: value => value === 2,
  },
  {
    id: 3,
    status: `Processing`,
    label: 'Processando',
    variant: 'legend-in-progress',
    rule: value => value === 3,
  },
  {
    id: 4,
    status: `Finished`,
    label: 'Finalizado',
    variant: 'legend-proficient',
    icon: 'check_circle',
    background: 'bg-light-legend-proficient',
    rule: value => value === 4,
  },
  {
    id: 5,
    status: `Accomplished`,
    label: 'Realizado',
    variant: 'legend-in-progress',
    background: 'bg-light-legend-in-progress',
    rule: value => value === 5,
    layout: 'badge',
  },
]

export const getExpeditionStageStatusEnum = value => {
  return ExpeditionStageStatusEnum.find(i => i.rule(value))
}

export const StudentProficiencyEnum = [
  {
    id: 1,
    text: 'Passaporte concluído = 100% ',
    textClass: 'text-legend-advanced',
    icon: '',
    variant: 'legend-advanced',
    rule: value => value === 100,
  },
  {
    id: 2,
    text: 'Em andamento >0% ',
    textClass: 'text-legend-in-progress',
    icon: '',
    variant: 'legend-in-progress',
    rule: value => value > 0 && value < 100,
  },
  {
    id: 3,
    text: '0% = Não iniciado',
    textClass: 'text-legend-below-basic',
    icon: '',
    variant: 'legend-below-basic',
    rule: value => value === 0,
  },
]

export const getStudentProficiencyEnum = value => {
  return StudentProficiencyEnum.find(i => i.rule(value))
}

export const stageIcons = {
  1: 'dictionary',
  2: 'mic',
  3: 'draw',
  4: 'local_library',
  5: 'joystick',
  6: 'dictionary',
}

export const EExpeditionType = {
  ReadingFluencyTest: 1,
  ReadingChallenge: 2,
  WritingChallenge: 3,
  UnderstandingChallenge: 4,
  ExpeditionGuides: 5,
}

/**
 * Enumeration of learning performance options.
 * @type {Array<LegendItem>}
 */
export const peformanceExpedition = [
  {
    label: 'Avançado: ≥70% de aprendizado',
    text: 'Avançado: ≥70% de aprendizado',
    badgeLabel: 'Avançado',
    variant: 'legend-advanced',
    textClass: 'text-legend-advanced',
    rule: value => value >= 70,
  },
  {
    label: 'Adequado: ≥50% de aprendizado',
    text: 'Adequado: ≥50% de aprendizado',
    badgeLabel: 'Adequado',
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
export const peformanceExpeditionLegend = {
  text: 'Rendimento',
  enum: peformanceExpedition,
}
