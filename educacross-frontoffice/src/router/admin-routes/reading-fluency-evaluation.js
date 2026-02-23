import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    path: '/manager/reading-fluency-evaluation',
    component: () => import('@/views/pages/reading-meter-V2/ReadingMeterRootV2.vue'),
    meta: {
      resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
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
    children: [
      // List Evaluations
      {
        path: '',
        name: 'AdminFluencyV2Evaluations',
        component: () => import('@/views/pages/reading-meter-V2/overview/ReadingMeterV2Index.vue'),
        meta: {
          navActiveLink: 'AdminFluencyV2Evaluations',
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
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
      // Evaluation Classes
      {
        path: ':evaluationId',
        name: 'AdminFluencyV2Classes',
        component: () => import('@/views/pages/reading-meter-V2/class-report/classReportIndex.vue'),
        meta: {
          navActiveLink: 'AdminFluencyV2Evaluations',
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'AdminFluencyV2Evaluations' },
            },
            {
              text: 'Avaliação',
              active: true,
            },
          ],
        },
      },
      // Evaluation Students
      {
        path: ':evaluationId/class/:classId',
        name: 'AdminFluencyV2Students',
        component: () =>
          import('@/views/pages/reading-meter-V2/evaluation-report/EvaluationReportIndex.vue'),
        meta: {
          navActiveLink: 'AdminFluencyV2Evaluations',
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'AdminFluencyV2Evaluations' },
            },
            {
              text: 'Avaliação',
              to: { name: 'AdminFluencyV2Classes' },
            },
            {
              text: 'Turma',
              active: true,
            },
          ],
        },
      },
      // Evaluation Student Detail
      {
        path: ':evaluationId/class/:classId/student/:studentId',
        name: 'AdminFluencyV2StudentReport',
        component: () =>
          import('@/views/pages/reading-meter-V2/student-report/StudentReportIndex.vue'),
        meta: {
          navActiveLink: 'AdminFluencyV2Evaluations',
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'AdminFluencyV2Evaluations' },
            },
            {
              text: 'Avaliação',
              to: { name: 'AdminFluencyV2Classes' },
            },
            {
              text: 'Turma',
              to: { name: 'AdminFluencyV2Students' },
            },
            {
              text: 'Aluno',
              active: true,
            },
          ],
        },
      },
      // Auditor Link
      {
        path: 'linkAuditor/:evaluationId',
        name: 'AdminLinkingAuditorReadingFluency',
        component: () => import('@/views/pages/reading-meter-V2/auditor/EvaluationAuditorList.vue'),
        meta: {
          navActiveLink: 'AdminFluencyV2Evaluations',
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'AdminFluencyV2Evaluations' },
            },
            {
              text: 'Auditoria',
              active: true,
            },
            {
              text: 'Avaliação',
              active: true,
            },
          ],
        },
      },
      // PDF View
      {
        path: 'test',
        component: () => import('@/views/pages/reading-meter-V2/pdf/PDFRoot.vue'),
        meta: {
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          action: ACTION.READ,
          navActiveLink: 'AdminFluencyV2Evaluations',
        },
        children: [
          {
            path: 'evaluation/:evaluationId',
            name: 'AdminReadingMeterPDFView',
            component: () =>
              import('@/views/pages/reading-meter-V2/pdf/ReadingMeterPDFContent.vue'),
            meta: {
              layout: 'full',
              resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
              action: ACTION.READ,
              navActiveLink: 'AdminFluencyV2Evaluations',
              breadcrumb: [
                {
                  text: 'Avaliações',
                  to: { name: 'AdminFluencyV2Evaluations' },
                },
                {
                  text: 'Visualização do PDF',
                  active: true,
                },
              ],
            },
          },
        ],
      },
    ],
  },
]
