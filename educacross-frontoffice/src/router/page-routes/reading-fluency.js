import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    path: '/reading-fluency/institutions',
    name: 'readingFluencySchools',

    component: () =>
      import('@/views/pages/test-fluency/reading-fluency/schools/ReadingFluencySchoolsIndex.vue'),
    meta: {
      resource: PERMISSION.MODULE.READINGFLUENCY,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        {
          text: 'Fluência Leitora',
          active: true,
        },
      ],
    },
  },
  {
    path: '/reading-fluency/institutions/:institutionId/classes',
    name: 'readingFluencyClasses',

    component: () =>
      import('@/views/pages/test-fluency/reading-fluency/classes/ReadingFluencyClassesIndex.vue'),
    meta: {
      resource: PERMISSION.MODULE.READINGFLUENCY,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        {
          text: 'Fluência Leitora',
          to: { name: 'readingFluencySchools' },
        },
        {
          text: 'Escola',
          active: true,
        },
      ],
    },
  },
  {
    path: '/reading-fluency/classes',
    name: 'readingFluencyAdminClasses',

    component: () =>
      import('@/views/pages/test-fluency/reading-fluency/classes/ReadingFluencyClassesIndex.vue'),
    meta: {
      resource: PERMISSION.MODULE.READINGFLUENCY,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        {
          text: 'Fluência Leitora',
          active: true,
        },
      ],
    },
  },
]
