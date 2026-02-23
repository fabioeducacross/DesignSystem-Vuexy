const EStudentWorksheetBatchModelStatus = {
  Processing: 0,
  Completed: 1,
  Failed: 2,
}

export const EStudentWorksheetBatchModelStatusEnum = [
  {
    id: EStudentWorksheetBatchModelStatus.Processing,
    text: 'Em andamento',
    variant: 'legend-basic',
    rule: value => value === 'Processing',
  },
  {
    id: EStudentWorksheetBatchModelStatus.Completed,
    text: 'Finalizado',
    variant: 'legend-advanced',
    rule: value => value === 'Completed',
  },
  {
    id: EStudentWorksheetBatchModelStatus.Failed,
    text: 'Erro',
    variant: 'legend-below-basic',
    rule: value => value === 'Failed',
  },
]

const EStudentWorksheetBatchModelEmailStatus = {
  Processing: 0,
  Completed: 1,
  Failed: 2,
}

export const EStudentWorksheetBatchModelEmailStatusEnum = [
  {
    id: EStudentWorksheetBatchModelEmailStatus.Processing,
    text: 'Em andamento',
    variant: 'legend-basic',
    rule: value => value === 'Processing',
  },
  {
    id: EStudentWorksheetBatchModelEmailStatus.Completed,
    text: 'Finalizado',
    variant: 'legend-advanced',
    rule: value => value === 'Completed',
  },
  {
    id: EStudentWorksheetBatchModelEmailStatus.Failed,
    text: 'Erro no envio',
    variant: 'legend-below-basic',
    rule: value => value === 'Failed',
  },
]

export const getStatus = value => {
  const status = EStudentWorksheetBatchModelStatusEnum.find(i => i.rule(value))
  return status || {}
}

export const getEmailStatus = value => {
  const status = EStudentWorksheetBatchModelEmailStatusEnum.find(i => i.rule(value))
  return status || {}
}
