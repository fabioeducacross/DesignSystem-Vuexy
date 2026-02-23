/**
 * @type {Array<LegendItem>}
 * */
export const UserStatusEnum = [
  {
    variant: 'light-user-pending',
    label: 'Pendente',
    rule: value => value === 1,
    key: 1,
  },
  {
    variant: 'light-user-active',
    label: 'Ativo',
    rule: value => value === 2,
    key: 2,
  },
  {
    variant: 'light-user-rejected',
    label: 'Rejeitado',
    rule: value => value === 3,
    key: 3,
  },
]
