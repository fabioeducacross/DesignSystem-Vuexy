import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    title: 'Avaliações',
    icon: 'quiz',
    order: 76,
    children: [
      {
        title: 'Fluência Leitora',
        route: 'readingMeterListAuditor',
        resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
        action: ACTION.READ,
      },
    ],
  },
]
