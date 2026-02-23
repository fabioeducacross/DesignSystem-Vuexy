export const EQuestionAnswerStatus = {
  Right: 1,
  Incorrect: 2,
  Unanswered: 3,
  Annulled: 4,
  Undisplayed: 5,
}

export const EQuestionAnswerStatusEnum = [
  {
    id: EQuestionAnswerStatus.Right,
    text: 'Resposta correta',
    textClass: 'text-white',
    variant: 'legend-proficient',
    icon: 'done',
    rule: value => value === EQuestionAnswerStatus.Right,
    layout: 'QuestionStatus',
  },
  {
    id: EQuestionAnswerStatus.Incorrect,
    text: 'Resposta incorreta',
    textClass: 'text-white',
    variant: 'legend-below-basic',
    icon: 'close',
    rule: value => value === EQuestionAnswerStatus.Incorrect,
    layout: 'QuestionStatus',
  },
  {
    id: EQuestionAnswerStatus.Unanswered,
    text: 'Não respondida',
    textClass: 'text-white',
    variant: 'legend-basic',
    icon: 'question_mark',
    rule: value => value === EQuestionAnswerStatus.Unanswered,
    layout: 'QuestionStatus',
  },
  {
    id: EQuestionAnswerStatus.Annulled,
    text: 'Anulada',
    textClass: 'text-white',
    variant: 'legend-not-completed',
    icon: 'pen_size_3',
    rule: value => value === EQuestionAnswerStatus.Annulled,
    layout: 'QuestionStatus',
  },
  {
    id: EQuestionAnswerStatus.Undisplayed,
    text: 'Não exibida para esse aluno',
    variant: 'light',
    icon: '',
    rule: value => value === EQuestionAnswerStatus.Undisplayed,
    layout: 'QuestionStatus',
  },
]

export const getEQuestionAnswerStatusEnum = value => {
  return EQuestionAnswerStatusEnum.find(i => i.rule(value))
}

export const EQuestionAnswerStatusEnumLegend = {
  text: 'Questions',
  enum: EQuestionAnswerStatusEnum,
}
