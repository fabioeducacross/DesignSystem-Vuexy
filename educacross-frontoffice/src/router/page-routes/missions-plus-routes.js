import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    path: '/missions/missions-plus',
    name: 'missionsPlusReport',
    component: () => import('@/views/reports/missionPlus/admin-report/MissionPlusReportRoot.vue'),
    meta: {
      pageTitle: 'Missões Plus',
      resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Missões Plus',
          active: true,
        },
      ],
    },
    children: [
      {
        path: 'institutions',
        name: 'missionsPlusInstitutions',
        component: () =>
          import('@/views/reports/missionPlus/admin-report/institutions/ReportInstitutionsTab.vue'),
        meta: {
          pageTitle: 'Missões Plus',
          resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Missões da Escola',
              active: true,
            },
            {
              text: 'Missões Plus',
              active: true,
            },
          ],
        },
        children: [
          {
            path: 'overview',
            name: 'missionsPlusInstitutionsOverview',
            component: () =>
              import('@/views/reports/missionPlus/admin-report/institutions/overview/index.vue'),
            meta: {
              navActiveLink: 'missionsPlusInstitutionsOverview',
              pageTitle: 'Missões',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões Plus',
                  active: true,
                },
              ],
            },
          },
          {
            path: 'content',
            name: 'missionsPlusInstitutionsContent',
            component: () =>
              import('@/views/reports/missionPlus/admin-report/institutions/content/index.vue'),
            meta: {
              navActiveLink: 'missionsPlusInstitutionsOverview',
              pageTitle: 'Missões Plus',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'Missões da Escola', active: true },

                {
                  text: 'Missões Plus',
                  active: true,
                },
              ],
            },
          },
          {
            path: 'ranking',
            name: 'missionsPlusInstitutionsRanking',
            component: () =>
              import('@/views/reports/missionPlus/admin-report/institutions/ranking/index.vue'),
            meta: {
              navActiveLink: 'missionsPlusInstitutionsOverview',
              pageTitle: 'Ranking',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'Missões da Escola', active: true },

                {
                  text: 'Missões Plus',
                  active: true,
                },
              ],
            },
          },
        ],
      },
      {
        path: 'institutions/:institutionId/classes',
        name: 'missionsPlusInstitutionsClasses',
        component: () =>
          import('@/views/reports/missionPlus/admin-report/classes/ReportClassesTab.vue'),
        meta: {
          pageTitle: 'Missões Plus',
          resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Missões da Escola',
              active: true,
            },
            {
              text: 'Missões Plus',
              to: { name: 'missionsPlusInstitutionsOverview' },
            },
            {
              text: 'Missões Plus',
              active: true,
            },
          ],
        },
        children: [
          {
            path: 'overview',
            name: 'missionsPlusInstitutionsClassesOverview',
            component: () =>
              import('@/views/reports/missionPlus/admin-report/classes/overview/index.vue'),
            meta: {
              navActiveLink: 'missionsPlusInstitutionsOverview',
              pageTitle: 'Missões',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões Plus',
                  active: true,
                },
              ],
            },
          },
          {
            path: 'content',
            name: 'missionsPlusInstitutionsClassesContent',
            component: () =>
              import('@/views/reports/missionPlus/admin-report/institutions/content/index.vue'),
            meta: {
              navActiveLink: 'missionsPlusInstitutionsOverview',
              pageTitle: 'Missões Plus',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'Missões da Escola', active: true },

                {
                  text: 'Missões Plus',
                  to: { name: 'missionsPlusInstitutionsOverview' },
                },
                {
                  text: 'Escola',
                  active: true,
                },
              ],
            },
          },
          {
            path: 'ranking',
            name: 'missionsPlusClassesContentRanking',
            component: () =>
              import(
                '@/views/reports/missionPlus/admin-report/classes/ranking/missionPlusRankingRoot.vue'
              ),
            meta: {
              navActiveLink: 'missionsPlusInstitutionsOverview',
              pageTitle: 'Missões Plus',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'Missões da Escola', active: true },

                {
                  text: 'Missões Plus',
                  active: true,
                },
              ],
            },
          },
        ],
      },
      {
        path: 'classes',
        name: 'missionsPlusClasses',
        component: () =>
          import('@/views/reports/missionPlus/admin-report/classes/ReportClassesTab.vue'),
        meta: {
          pageTitle: 'Missões Plus',
          resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Missões da Escola',
              active: true,
            },
            {
              text: 'Missões Plus',
              active: true,
            },
          ],
        },
        children: [
          {
            path: 'overview',
            name: 'missionsPlusClassesOverview',
            component: () =>
              import('@/views/reports/missionPlus/admin-report/classes/overview/index.vue'),
            meta: {
              navActiveLink: 'missionsPlusClassesOverview',
              pageTitle: 'Missões',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões Plus',
                  active: true,
                },
              ],
            },
          },
          {
            path: 'content',
            name: 'missionsPlusClassesContent',
            component: () =>
              import('@/views/reports/missionPlus/admin-report/classes/content/index.vue'),
            meta: {
              navActiveLink: 'missionsPlusClassesOverview',
              pageTitle: 'Missões Plus',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'Missões da Escola', active: true },

                {
                  text: 'Missões Plus',
                  active: true,
                },
              ],
            },
          },
          {
            path: 'ranking',
            name: 'missionsPlusClassesRanking',
            component: () =>
              import(
                '@/views/reports/missionPlus/admin-report/classes/ranking/missionPlusRankingRoot.vue'
              ),
            meta: {
              navActiveLink: 'missionsPlusClassesOverview',
              pageTitle: 'Missões Plus',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'Missões da Escola', active: true },

                {
                  text: 'Missões Plus',
                  active: true,
                },
              ],
            },
          },
        ],
      },
      {
        path: 'classe/:classId/missions',
        name: 'missionsPlusClassesMissions',
        component: () =>
          import('@/views/reports/missionPlus/admin-report/missions/ReportMissionsTab.vue'),
        meta: {
          pageTitle: 'Missões Plus',
          resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Missões da Escola',
              active: true,
            },
            {
              text: 'Missões Plus',
              to: { name: 'missionsPlusClassesOverview' },
            },
            {
              text: 'Turma',
              active: true,
            },
          ],
        },
        children: [
          {
            path: 'overview',
            name: 'missionsPlusClassesMissionsOverview',
            component: () =>
              import('@/views/reports/missionPlus/admin-report/missions/overview/index.vue'),
            meta: {
              navActiveLink: 'missionsPlusClassesOverview',
              pageTitle: 'Missões',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões Plus',
                  to: { name: 'missionsPlusClassesOverview' },
                },
                {
                  text: 'Turma',
                  active: true,
                },
              ],
            },
          },
          {
            path: 'content',
            name: 'missionsPlusClassesMissionsContent',
            component: () =>
              import('@/views/reports/missionPlus/admin-report/classes/content/index.vue'),
            meta: {
              navActiveLink: 'missionsPlusClassesOverview',
              pageTitle: 'Missões Plus',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões Plus',
                  active: true,
                },
              ],
            },
          },
          {
            path: 'ranking',
            name: 'missionsPlusClassesMissionsRanking',
            component: () =>
              import('@/views/reports/missionPlus/admin-report/missions/ranking/index.vue'),
            meta: {
              navActiveLink: 'missionsPlusClassesOverview',
              pageTitle: 'Missões Plus',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões Plus',
                  active: true,
                },
                {
                  text: 'Turma',
                  active: true,
                },
              ],
            },
          },
        ],
      },

      {
        path: 'classe/:classId/missions/:guideId',
        name: 'missionsPlusClassesMission',
        component: () =>
          import('@/views/reports/missionPlus/admin-report/mission/ReportMissionTab.vue'),
        meta: {
          pageTitle: 'Missões Plus',
          resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Missões da Escola',
              active: true,
            },
            {
              text: 'Missões Plus',
              to: { name: 'missionsPlusClassesOverview' },
            },
            {
              text: 'Turma',
              to: { name: 'missionsPlusClassesMissionsOverview' },
            },
            {
              text: 'Missão',
              active: true,
            },
          ],
        },
        children: [
          {
            path: 'overview',
            name: 'missionsPlusClassesMissionOverview',
            component: () =>
              import(
                '@/views/reports/missionPlus/classe-report/classe/ReportMissionPlusClasseIndex.vue'
              ),
            meta: {
              navActiveLink: 'missionsPlusClassesOverview',
              pageTitle: 'Missões',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões Plus',
                  to: { name: 'missionsPlusClassesOverview' },
                },
                {
                  text: 'Turma',
                  to: { name: 'missionsPlusClassesMissionsOverview' },
                },
                {
                  text: 'Missão',
                  active: true,
                },
              ],
            },
          },
          {
            path: 'content',
            name: 'missionsPlusClassesMissionContent',
            component: () =>
              import('@/views/reports/missionPlus/admin-report/classes/content/index.vue'),
            meta: {
              navActiveLink: 'missionsPlusClassesOverview',
              pageTitle: 'Missões Plus',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões Plus',
                  active: true,
                },
              ],
            },
          },
          {
            path: 'ranking',
            name: 'missionsPlusClassesMissionRanking',
            component: () =>
              import('@/views/reports/missionPlus/admin-report/mission/ranking/index.vue'),
            meta: {
              navActiveLink: 'missionsPlusClassesOverview',
              pageTitle: 'Missões Plus',
              resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões Plus',
                  to: { name: 'missionsPlusClassesOverview' },
                },
                {
                  text: 'Turma',
                  to: { name: 'missionsPlusClassesMissionsOverview' },
                },
                {
                  text: 'Missão',
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
