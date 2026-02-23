export const ReadingFluencyStudentStatusEnum = [
  {
    id: 0,
    text: 'Não iniciado',
    label: 'Não iniciado',
    variant: 'status-activate',
    lightVariant: 'light-status-activate',
    textClass: 'text-status-activate',
    icon: '',
    value: 'NotStarted',
    rule: value => value === 0,
    canCancel: true,
    canReapply: false,
    canShowReport: false,
    tooltip: 'Nenhum teste foi iniciado.',
  },
  {
    id: 1,
    text: 'Em andamento',
    label: 'Em andamento',
    variant: 'status-in-progress',
    lightVariant: 'light-status-in-progress',
    textClass: 'text-status-in-progress',
    icon: 'pending',
    value: 'InProgress',
    rule: value => value === 1,
    canCancel: false,
    canReapply: false,
    canShowReport: false,
    tooltip: 'Teste em andamento.',
  },
  {
    id: 2,
    text: 'Analisando gravação',
    label: 'Analisando gravação',
    variant: 'status-start',
    lightVariant: 'light-status-start',
    textClass: 'text-status-start',
    icon: 'hourglass_top',
    value: 'Processing',
    rule: value => value === 2,
    canCancel: false,
    canReapply: false,
    canShowReport: false,
    tooltip: 'Nem todos os testes foram finalizados ou o teste está em auditoria.',
  },
  {
    id: 3,
    text: 'Problema identificado',
    label: 'Problema identificado',
    variant: 'status-canceled',
    lightVariant: 'light-status-canceled',
    textClass: 'text-status-canceled',
    icon: 'info',
    value: 'Error',
    rule: value => value === 3,
    canCancel: false,
    canReapply: true,
    canShowReport: false,
    tooltip: 'Ocorreu um erro durante o teste.',
  },
  {
    id: 4,
    text: 'Finalizado',
    label: 'Finalizado',
    variant: 'status-finished',
    lightVariant: 'light-status-finished',
    textClass: 'text-status-finished',
    icon: 'check_circle',
    value: 'Finished',
    rule: value => value === 4,
    canCancel: false,
    canReapply: true,
    canShowReport: true,
    tooltip: 'Teste finalizado com sucesso.',
  },
]

/**
 * Get status enum by value
 * @param {number} value - Status value (0-4)
 * @returns {Object|null} Status object or null if not found
 */
export const getReadingFluencyStudentStatus = value => {
  return ReadingFluencyStudentStatusEnum.find(status => status.rule(value)) || null
}

/**
 * Get status enum by string value
 * @param {string} stringValue - Status string value (NotStarted, InProgress, etc)
 * @returns {Object|null} Status object or null if not found
 */
export const getReadingFluencyStudentStatusByString = stringValue => {
  return ReadingFluencyStudentStatusEnum.find(status => status.value === stringValue) || null
}

export default ReadingFluencyStudentStatusEnum
