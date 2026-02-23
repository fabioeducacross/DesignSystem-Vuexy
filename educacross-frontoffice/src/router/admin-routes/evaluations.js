import { ACTION, PERMISSION } from '@/consts/permissions.js'

export default {
  path: '/evaluations',
  name: 'evaluations',
  redirect: '/evaluations/',
  component: () => import('@/views/pages/admin-context/evaluations/EvaluationsRoot.vue'),
  meta: {
    resource: PERMISSION.MODULE.EVALUATIONS,
    action: ACTION.READ,
    pageTitle: 'Avaliação Digital',
    breadcrumb: [
      {
        text: 'Avaliações',
        active: true,
      },
      {
        text: 'Avaliação Digital',
        active: true,
      },
    ],
  },
  children: [
    // LISTA DE EVALUACOES
    {
      path: '/',
      name: 'evaluationsList',
      component: () => import('@/views/pages/admin-context/evaluations/list/EvaluationsList.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
        text: 'Avaliação Digital',
        breadcrumb: [
          {
            text: 'Avaliações',
            active: true,
          },
          {
            text: 'Avaliação Digital',
            active: true,
          },
        ],
      },
    },
    // ESCOLAS
    {
      path: '/evaluations/:evaluationId/institutions',
      name: 'evaluationsInstutionsList',
      component: () =>
        import(
          '@/views/pages/admin-context/evaluations/institutions-list/EvaluationsInstitutionsList.vue'
        ),
      meta: {
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Avaliações',
            active: true,
          },
          {
            text: 'Avaliação Digital',
            to: {
              name: 'evaluations',
            },
          },
          {
            text: 'Escolas',
            active: true,
          },
        ],
      },
    },
    {
      path: '/evaluations/:evaluationId/result/institutions/',
      name: 'evaluationsTCTInstutionsRoot',
      component: () =>
        import('@/views/pages/admin-context/evaluations/tct/institutions-list/index.vue'),
      meta: {
        navActiveLink: 'evaluations',
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
        pageTitle: 'Avaliação Digital',
        breadcrumb: [
          {
            text: 'Avaliações',
            active: true,
          },
          {
            text: 'Avaliação Digital',
            to: {
              name: 'evaluations',
            },
          },
          {
            text: 'Escolas',
            active: true,
          },
        ],
      },
      children: [
        {
          path: 'tct',
          name: 'evaluationsTCTInstutionsAnalysis',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/institutions-list/analysis/EvaluationsTCTInstitutionsList.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Análise TCT',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },
              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Escolas',
                active: true,
              },
            ],
          },
        },
        {
          path: 'tri',
          name: 'evaluationsTRIInstutions',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/institutions-list/tri/EvaluationsTRIInstitutionsList.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Análise TRI',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },
              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Escolas',
                active: true,
              },
            ],
          },
        },
        {
          path: 'ability',
          name: 'evaluationsTCTInstutionsAbility',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/institutions-list/ability/index.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Habilidades',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },
              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Escolas',
                active: true,
              },
            ],
          },
        },
        {
          path: 'questions',
          name: 'evaluationsResultInstutionsQuestions',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/institutions-list/questions/QuestionsStudentsIndex.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Questões',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },
              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Escolas',
                active: true,
              },
            ],
          },
        },
      ],
    },
    // CLASSES
    {
      path: '/evaluations/:evaluationId/classes',
      name: 'evaluationsClassesList',
      component: () =>
        import(
          '@/views/pages/admin-context/evaluations/classes-list/EvaluationsInstitutionsClassesList.vue'
        ),
      meta: {
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Avaliações',
            active: true,
          },
          {
            text: 'Avaliação Digital',
            to: {
              name: 'evaluations',
            },
          },
          {
            text: 'Turmas',
            active: true,
          },
        ],
      },
    },
    {
      path: '/evaluations/:evaluationId/institutions/:institutionId/classes',
      name: 'evaluationsInstutionsClassesList',
      component: () =>
        import(
          '@/views/pages/admin-context/evaluations/classes-list/EvaluationsInstitutionsClassesList.vue'
        ),
      meta: {
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Avaliações',
            active: true,
          },
          {
            text: 'Avaliação Digital',
            to: {
              name: 'evaluations',
            },
          },
          {
            text: 'Escolas',
            to: {
              name: 'evaluationsInstutionsList',
            },
          },
          {
            text: 'Turmas',
            active: true,
          },
        ],
      },
    },
    {
      path: '/evaluations/:evaluationId/result/institutions/:institutionId/classes',
      name: 'evaluationsTCTInstutionsClassList',
      component: () => import('@/views/pages/admin-context/evaluations/tct/classes-list/index.vue'),
      meta: {
        navActiveLink: 'evaluations',
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Avaliações',
            active: true,
          },
          {
            text: 'Avaliação Digital',
            to: {
              name: 'evaluations',
            },
          },
          {
            text: 'Escolas',
            to: {
              name: 'evaluationsTRIInstutions',
            },
          },
          {
            text: 'Turmas',
            active: true,
          },
        ],
      },
      children: [
        {
          path: 'tct',
          name: 'evaluationsTCTInstutionsClassAnalysis',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/classes-list/analysis/EvaluationsTCTClassList.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Análise TCT',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },
              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Escolas',
                to: {
                  name: 'evaluationsTCTInstutionsAnalysis',
                },
              },
              {
                text: 'Turmas',
                active: true,
              },
            ],
          },
        },
        {
          path: 'tri',
          name: 'evaluationsTRIInstutionsClass',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/classes-list/tri/EvaluationsTRIClassList.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Análise TRI',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },
              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Escolas',
                to: {
                  name: 'evaluationsTRIInstutions',
                },
              },
              {
                text: 'Turmas',
                active: true,
              },
            ],
          },
        },
        {
          path: 'ability',
          name: 'evaluationsTCTInstutionsClassAbility',
          component: () =>
            import('@/views/pages/admin-context/evaluations/tct/classes-list/ability/index.vue'),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Habilidades',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },
              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Escolas',
                to: {
                  name: 'evaluationsTCTInstutionsAnalysis',
                },
              },
              {
                text: 'Turmas',
                active: true,
              },
            ],
          },
        },
        {
          path: 'questions',
          name: 'evaluationsResultInstutionsClassQuestions',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/classes-list/questions/QuestionsStudentsIndex.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Questões',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },
              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Escolas',
                to: {
                  name: 'evaluationsResultInstutionsQuestions',
                },
              },
              {
                text: 'Turmas',
                active: true,
              },
            ],
          },
        },
      ],
    },
    {
      path: '/evaluations/:evaluationId/result/classes',
      name: 'evaluationsTCTClassesList',
      component: () => import('@/views/pages/admin-context/evaluations/tct/classes-list/index.vue'),
      meta: {
        navActiveLink: 'evaluations',
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Avaliações',
            active: true,
          },
          {
            text: 'Avaliação Digital',
            to: {
              name: 'evaluations',
            },
          },
          {
            text: 'Turmas',
            active: true,
          },
        ],
      },
      children: [
        {
          path: 'tct',
          name: 'evaluationsTCTClassAnalysis',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/classes-list/analysis/EvaluationsTCTClassList.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Análise TCT',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },
              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Turmas',
                active: true,
              },
            ],
          },
        },
        {
          path: 'tri',
          name: 'evaluationsTRIClass',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/classes-list/tri/EvaluationsTRIClassList.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Análise TRI',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },
              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Turmas',
                active: true,
              },
            ],
          },
        },
        {
          path: 'ability',
          name: 'evaluationsTCTClassAbility',
          component: () =>
            import('@/views/pages/admin-context/evaluations/tct/classes-list/ability/index.vue'),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Habilidades',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },
              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Turmas',
                active: true,
              },
            ],
          },
        },
        {
          path: 'questions',
          name: 'evaluationsResultClassQuestions',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/classes-list/questions/QuestionsStudentsIndex.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Questões',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },
              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Turmas',
                active: true,
              },
            ],
          },
        },
      ],
    },

    // STUDENTS
    {
      path: '/evaluations/:evaluationId/institutions/:institutionId/classes/:classId/students',
      name: 'evaluationsInstutionsListStudents',
      component: () =>
        import('@/views/pages/admin-context/evaluations/students-list/EvaluationsStudentsList.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Avaliações',
            active: true,
          },
          {
            text: 'Avaliação Digital',
            to: {
              name: 'evaluations',
            },
          },
          {
            text: 'Escolas',
            to: {
              name: 'evaluationsInstutionsList',
            },
          },
          {
            text: 'Turmas',
            to: {
              name: 'evaluationsInstutionsClassesList',
            },
          },
          {
            text: 'Alunos',
            active: true,
          },
        ],
      },
    },
    {
      path: '/evaluations/:evaluationId/classes/:classId/students',
      name: 'evaluationsListStudents',
      component: () =>
        import('@/views/pages/admin-context/evaluations/students-list/EvaluationsStudentsList.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Avaliações',
            active: true,
          },
          {
            text: 'Avaliação Digital',
            to: {
              name: 'evaluations',
            },
          },
          {
            text: 'Turmas',
            to: {
              name: 'evaluationsClassesList',
            },
          },
          {
            text: 'Alunos',
            active: true,
          },
        ],
      },
    },
    {
      path: '/evaluations/:evaluationId/result/institutions/:institutionId/classes/:classId/students',
      name: 'evaluationsTCTInstutionsListStudents',
      component: () =>
        import('@/views/pages/admin-context/evaluations/tct/students-list/index.vue'),
      meta: {
        navActiveLink: 'evaluations',
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Avaliações',
            active: true,
          },
          {
            text: 'Avaliação Digital',
            to: {
              name: 'evaluations',
            },
          },
          {
            text: 'Escolas',
            to: {
              name: 'evaluationsTCTInstutionsList',
            },
          },
          {
            text: 'Turmas',
            to: {
              name: 'evaluationsTCTInstutionsClassList',
            },
          },
          {
            text: 'Alunos',
            active: true,
          },
        ],
      },
      children: [
        {
          path: 'tct',
          name: 'evaluationsTCTInstutionsStudentsAnalysis',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/students-list/analysis/EvaluationsTCTStudentsList.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Análise TCT',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },
              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Escolas',
                to: {
                  name: 'evaluationsTCTInstutionsAnalysis',
                },
              },
              {
                text: 'Turmas',
                to: {
                  name: 'evaluationsTCTInstutionsClassAnalysis',
                },
              },
              {
                text: 'Alunos',
                active: true,
              },
            ],
          },
        },
        {
          path: 'tri',
          name: 'evaluationsTRIInstutionsStudents',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/students-list/tri/EvaluationsTRIStudentsList.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Análise TRI',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },

              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Escolas',
                to: {
                  name: 'evaluationsTRIInstutions',
                },
              },
              {
                text: 'Turmas',
                to: {
                  name: 'evaluationsTRIInstutionsClass',
                },
              },
              {
                text: 'Alunos',
                active: true,
              },
            ],
          },
        },
        {
          path: 'ability',
          name: 'evaluationsTCTInstutionsStudentsAbility',
          component: () =>
            import('@/views/pages/admin-context/evaluations/tct/students-list/ability/index.vue'),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Habilidades',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },

              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Escolas',
                to: {
                  name: 'evaluationsTCTInstutionsAnalysis',
                },
              },
              {
                text: 'Turmas',
                to: {
                  name: 'evaluationsTCTInstutionsClassAnalysis',
                },
              },
              {
                text: 'Alunos',
                active: true,
              },
            ],
          },
        },
        {
          path: 'questions',
          name: 'evaluationsTCTInstutionsStudentsQuestions',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/students-list/questions/QuestionsStudentsIndex.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Questões',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },

              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Escolas',
                to: {
                  name: 'evaluationsTCTInstutionsAnalysis',
                },
              },
              {
                text: 'Turmas',
                to: {
                  name: 'evaluationsTCTInstutionsClassAnalysis',
                },
              },
              {
                text: 'Alunos',
                active: true,
              },
            ],
          },
        },
      ],
    },
    {
      path: '/evaluations/:evaluationId/result/classes/:classId/students',
      name: 'evaluationsTCTListStudents',
      component: () =>
        import('@/views/pages/admin-context/evaluations/tct/students-list/index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Avaliações',
            active: true,
          },
          {
            text: 'Avaliação Digital',
            to: {
              name: 'evaluations',
            },
          },
          {
            text: 'Turmas',
            to: {
              name: 'evaluationsTCTClassAnalysis',
            },
          },
          {
            text: 'Alunos',
            active: true,
          },
        ],
      },
      children: [
        {
          path: 'tct',
          name: 'evaluationsTCTStudentsAnalysis',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/students-list/analysis/EvaluationsTCTStudentsList.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Análise TCT',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },

              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },

              {
                text: 'Turmas',
                to: {
                  name: 'evaluationsTCTClassAnalysis',
                },
              },
              {
                text: 'Alunos',
                active: true,
              },
            ],
          },
        },
        {
          path: 'tri',
          name: 'evaluationsTRIStudents',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/students-list/tri/EvaluationsTRIStudentsList.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Análise TRI',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },

              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },

              {
                text: 'Turmas',
                to: {
                  name: 'evaluationsTRIClass',
                },
              },
              {
                text: 'Alunos',
                active: true,
              },
            ],
          },
        },
        {
          path: 'ability',
          name: 'evaluationsTCTStudentsAbility',
          component: () =>
            import('@/views/pages/admin-context/evaluations/tct/students-list/ability/index.vue'),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Habilidades',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },

              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },
              {
                text: 'Turmas',
                to: {
                  name: 'evaluationsTCTClassAnalysis',
                },
              },
              {
                text: 'Alunos',
                active: true,
              },
            ],
          },
        },
        {
          path: 'questions',
          name: 'evaluationsTCTStudentsQuestions',
          component: () =>
            import(
              '@/views/pages/admin-context/evaluations/tct/students-list/questions/QuestionsStudentsIndex.vue'
            ),
          meta: {
            navActiveLink: 'evaluations',
            resource: PERMISSION.MODULE.EVALUATIONS,
            action: ACTION.READ,
            pageTitle: 'Questões',
            breadcrumb: [
              {
                text: 'Avaliações',
                active: true,
              },

              {
                text: 'Avaliação Digital',
                to: {
                  name: 'evaluations',
                },
              },

              {
                text: 'Turmas',
                to: {
                  name: 'evaluationsTCTClassAnalysis',
                },
              },
              {
                text: 'Alunos',
                active: true,
              },
            ],
          },
        },
      ],
    },
    {
      path: '/evaluations/:evaluationId/result/classes/:classId/students/questions/:studentId',
      name: 'evaluationsTCTStudentsQuestionsDetails',
      component: () =>
        import(
          '@/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailIndex.vue'
        ),
      meta: {
        navActiveLink: 'evaluations',
        returnTo: 'evaluationsTCTStudentsQuestions',
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
        breadcrumb: [
          {
            text: 'Avaliações',
            active: true,
          },
          {
            text: 'Avaliação Digital',
            to: {
              name: 'evaluations',
            },
          },

          {
            text: 'Turmas',
            to: {
              name: 'evaluationsTCTClassAnalysis',
            },
          },
          {
            text: 'Alunos',
            to: {
              name: 'evaluationsTCTStudentsQuestions',
            },
          },
          {
            text: 'Aluno',
            active: true,
          },
        ],
      },
    },
    {
      path: '/evaluations/:evaluationId/result/institutions/:institutionId/classes/:classId/students/questions/:studentId',
      name: 'evaluationsTCTInstutionsStudentsQuestionsDetails',
      component: () =>
        import(
          '@/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailIndex.vue'
        ),
      meta: {
        navActiveLink: 'evaluations',
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
        returnTo: 'evaluationsTCTInstutionsStudentsQuestions',
        breadcrumb: [
          {
            text: 'Avaliações',
            active: true,
          },
          {
            text: 'Avaliação Digital',
            to: {
              name: 'evaluations',
            },
          },
          {
            text: 'Escolas',
            to: {
              name: 'evaluationsTCTInstutionsAnalysis',
            },
          },
          {
            text: 'Turmas',
            to: {
              name: 'evaluationsTCTInstutionsClassAnalysis',
            },
          },
          {
            text: 'Alunos',
            to: {
              name: 'evaluationsTCTInstutionsStudentsQuestions',
            },
          },
          {
            text: 'Aluno',
            active: true,
          },
        ],
      },
    },
  ],
}
