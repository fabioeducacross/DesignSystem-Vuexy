import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    title: 'Painel Inicial',
    icon: 'home',
    route: 'homeResponsible',
    order: 10,
    resource: PERMISSION.GENERAL.STUDENT,
    action: ACTION.READ,
  },
  {
    title: 'Missões da Escola',
    icon: 'flag',
    route: 'studentInstitutionMissions',
    order: 20,
    resource: PERMISSION.MODULE.SCHOOL_MISSIONS,
    action: ACTION.READ,
  },
  // 30 - education system
  {
    title: 'Treinos da Família',
    icon: 'supervisor_account',
    route: 'studentFamilyMissions',
    order: 40,
    resource: PERMISSION.MODULE.SPECIAL_MISSIONS,
    action: ACTION.READ,
  },
  {
    title: 'High Five',
    icon: 'camera',
    route: 'studentHighfive',
    order: 50,
    resource: PERMISSION.MODULE.HIGH_FIVE,
    action: ACTION.READ,
  },
]
