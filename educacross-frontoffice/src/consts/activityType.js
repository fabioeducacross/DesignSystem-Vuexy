import { ACTION, PERMISSION } from './permissions'

export const activityType = [
  {
    id: 1,
    name: 'Global',
    label: 'Ilha',
    permission: PERMISSION.MODULE.ISLANDS,
    action: ACTION.READ,
  },
  {
    id: 2,
    name: 'SchoolMission',
    label: 'Missões da Escola',
    permission: PERMISSION.MODULE.SCHOOL_MISSIONS,
    action: ACTION.READ,
  },
  {
    id: 3,
    name: 'HomeMission',
    label: 'Missões para Casa',
    permission: PERMISSION.MODULE.SCHOOL_MISSIONS,
    action: ACTION.READ,
  },
  {
    id: 7,
    name: 'Family',
    label: 'Treinos da Família',
    permission: PERMISSION.MODULE.SPECIAL_MISSIONS,
    action: ACTION.READ,
  },
]
