import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  // TEACHER
  {
    path: '/narrative-complexity/students',
    name: 'narrativeComplexityStudents',

    component: () => import('@/views/pages/test-fluency/narrative-complexity/students/Index.vue'),
    meta: {
      resource: PERMISSION.MODULE.NARRATIVECOMPLEXITY,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        {
          text: 'Complexidade Narrativa',
          active: true,
        },
      ],
    },
  },
  {
    path: '/narrative-complexity/student/:studentId',
    name: 'narrativeComplexityStudent',

    component: () => import('@/views/pages/test-fluency/narrative-complexity/student/Index.vue'),
    meta: {
      resource: PERMISSION.MODULE.NARRATIVECOMPLEXITY,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        {
          text: 'Complexidade Narrativa',
          to: { name: 'narrativeComplexityStudents' },
        },
        {
          text: 'Aluno',
          active: true,
        },
      ],
    },
  },
  // ADMIN
  {
    path: '/narrative-complexity/classes',
    name: 'narrativeComplexityClasses',

    component: () => import('@/views/pages/test-fluency/narrative-complexity/classes/Index.vue'),
    meta: {
      resource: PERMISSION.MODULE.NARRATIVECOMPLEXITY,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        {
          text: 'Complexidade Narrativa',
          active: true,
        },
      ],
    },
  },
  {
    path: '/narrative-complexity/classes/:classId/students',
    name: 'narrativeComplexityClassesStudents',

    component: () =>
      import('@/views/pages/test-fluency/narrative-complexity/students/TabIndex.vue'),
    meta: {
      resource: PERMISSION.MODULE.NARRATIVECOMPLEXITY,
      action: ACTION.READ,
      navActiveLink: 'narrativeComplexityClasses',
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        {
          text: 'Complexidade Narrativa',
          to: { name: 'narrativeComplexityClasses' },
        },
        {
          text: 'Turma',
          active: true,
        },
      ],
    },
  },
  // GESTOR
  {
    path: '/narrative-complexity/institutions',
    name: 'narrativeComplexityInstitutions',

    component: () =>
      import('@/views/pages/test-fluency/narrative-complexity/institutions/Index.vue'),
    meta: {
      resource: PERMISSION.MODULE.NARRATIVECOMPLEXITY,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        {
          text: 'Complexidade Narrativa',
          active: true,
        },
      ],
    },
  },
  {
    path: '/narrative-complexity/institutions/:institutionId/classes',
    name: 'narrativeComplexityInstitutionsClasses',

    component: () => import('@/views/pages/test-fluency/narrative-complexity/classes/Index.vue'),
    meta: {
      resource: PERMISSION.MODULE.NARRATIVECOMPLEXITY,
      action: ACTION.READ,
      navActiveLink: 'narrativeComplexityInstitutions',
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        {
          text: 'Complexidade Narrativa',
          to: { name: 'narrativeComplexityInstitutions' },
        },
        {
          text: 'Escola',
          active: true,
        },
      ],
    },
  },
]
