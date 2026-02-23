import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    path: '/writing-phases/students',
    name: 'WritingPhasesList',
    component: () => import('@/views/pages/writing-phases/students/Index.vue'),
    meta: {
      pageTitle: 'Fases da Escrita',
      resource: PERMISSION.MODULE.WRITING_STAGES,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        { text: 'Fases da Escrita', active: true },
      ],
    },
  },
  {
    path: '/writing-phases/students/:studentId',
    name: 'WritingPhasesStudentDetail',
    component: () => import('@/views/pages/writing-phases/writing-phase-register/Index.vue'),
    meta: {
      resource: PERMISSION.MODULE.WRITING_STAGES,
      action: ACTION.READ,
      navActiveLink: 'WritingPhasesList',
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        { text: 'Fases da Escrita', to: { name: 'WritingPhasesList' } },
        { text: 'Aluno', active: true },
      ],
    },
  },
  {
    path: '/writing-phases/classes',
    name: 'WritingPhasesListClassesAdmin',
    component: () => import('@/views/pages/writing-phases/classes/Index.vue'),
    meta: {
      pageTitle: 'Fases da Escrita',
      resource: PERMISSION.MODULE.WRITING_STAGES,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        { text: 'Fases da Escrita', active: true },
      ],
    },
  },
  {
    path: '/writing-phases/classes/:classId/students',
    name: 'WritingPhasesListStudentsAdmin',
    component: () => import('@/views/pages/writing-phases/students/TabIndex.vue'),
    meta: {
      navActiveLink: 'WritingPhasesListClassesAdmin',
      pageTitle: 'Fases da Escrita',
      resource: PERMISSION.MODULE.WRITING_STAGES,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        { text: 'Fases da Escrita', to: { name: 'WritingPhasesListClassesAdmin' } },
        { text: 'Turma', active: true },
      ],
    },
  },

  // GESTOR
  {
    path: '/writing-phases/institutions',
    name: 'writingPhasesInstitutions',

    component: () => import('@/views/pages/writing-phases/institutions/Index.vue'),
    meta: {
      resource: PERMISSION.MODULE.WRITING_STAGES,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        {
          text: 'Fases da Escrita',
          active: true,
        },
      ],
    },
  },
  {
    path: '/writing-phases/institutions/:institutionId/classes',
    name: 'WritingPhasesInstitutionsClasses',

    component: () => import('@/views/pages/writing-phases/classes/Index.vue'),
    meta: {
      resource: PERMISSION.MODULE.WRITING_STAGES,
      action: ACTION.READ,
      navActiveLink: 'writingPhasesInstitutions',
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        {
          text: 'Fases da Escrita',
          to: { name: 'writingPhasesInstitutions' },
        },
        {
          text: 'Escola',
          active: true,
        },
      ],
    },
  },
]
