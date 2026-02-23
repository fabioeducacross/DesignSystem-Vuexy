export const EApplicationUserStatus = {
  Pending: 1,
  Active: 2,
  Refused: 3,
}

export const EApplicationUserStatusEnum = {
  1: {
    id: EApplicationUserStatus.Pending,
    label: 'Pendente',
    variant: 'orange',
  },
  2: {
    id: EApplicationUserStatus.Active,
    label: 'Ativado',
    variant: 'success',
  },
  3: {
    id: EApplicationUserStatus.Refused,
    label: 'Rejeitado',
    variant: 'danger',
  },
}
