import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    path: '/teacher/reading-fluency-evaluation',
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
        name: 'TeacherFluencyV2Evaluations',
        component: () => import('@/views/pages/reading-meter-V2/overview/ReadingMeterV2Index.vue'),
        meta: {
          navActiveLink: 'TeacherFluencyV2Evaluations',
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
      // Evaluation Students
      {
        path: ':evaluationId/class/:classId',
        name: 'TeacherFluencyV2Students',
        component: () =>
          import('@/views/pages/reading-meter-V2/evaluation-report/EvaluationReportIndex.vue'),
        meta: {
          navActiveLink: 'TeacherFluencyV2Evaluations',
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'TeacherFluencyV2Evaluations' },
            },
            {
              text: 'Avaliação',
              active: true,
            },
          ],
        },
      },
      // Evaluation Student Report
      {
        path: ':evaluationId/class/:classId/student/:studentId/student-report',
        name: 'TeacherFluencyV2StudentReport',
        component: () =>
          import('@/views/pages/reading-meter-V2/student-report/StudentReportIndex.vue'),
        meta: {
          navActiveLink: 'TeacherFluencyV2Evaluations',
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'TeacherFluencyV2Evaluations' },
            },
            {
              text: 'Avaliação',
              to: { name: 'TeacherFluencyV2Students' },
            },
            {
              text: 'Aluno',
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
          navActiveLink: 'TeacherFluencyV2Evaluations',
        },
        children: [
          {
            path: 'evaluation/:evaluationId',
            name: 'TeacherReadingMeterPDFView',
            component: () =>
              import('@/views/pages/reading-meter-V2/pdf/ReadingMeterPDFContent.vue'),
            meta: {
              layout: 'full',
              resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
              action: ACTION.READ,
              navActiveLink: 'TeacherFluencyV2Evaluations',
              breadcrumb: [
                {
                  text: 'Avaliações',
                  to: { name: 'TeacherFluencyV2Evaluations' },
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
