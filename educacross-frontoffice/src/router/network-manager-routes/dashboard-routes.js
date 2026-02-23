import DashboardClassesTab from '@/views/dashboard/classes/DashboardClassesTab.vue'
import ClassesEngagementIndex from '@/views/dashboard/classes/engagement/ClassesEngagementIndex.vue'
import ClassesPerformanceIndex from '@/views/dashboard/classes/performance/ClassesPerformanceIndex.vue'
import DashboardSchoolsTab from '@/views/dashboard/schools/DashboardSchoolsTab.vue'
import SchoolsEngagementIndex from '@/views/dashboard/schools/engagement/SchoolsEngagementIndex.vue'
import SchoolsPerformanceIndex from '@/views/dashboard/schools/performance/SchoolsPerformanceIndex.vue'
import DashboardStudentDetailsIndex from '@/views/dashboard/studentDetails/Index.vue'
import DashboardStudentsIndex from '@/views/dashboard/students/Index.vue'

export default [
  {
    path: 'institutions',
    name: 'dashboardSchoolTabs',
    component: DashboardSchoolsTab,

    children: [
      {
        path: 'engagement',
        name: 'dashboardSchoolTabsEngagement',
        component: SchoolsEngagementIndex,
        meta: {
          tabIndex: 0,
          navActiveLink: 'home',
        },
      },
      {
        path: 'performance',
        name: 'dashboardSchoolTabsPerformance',
        component: SchoolsPerformanceIndex,
        meta: {
          tabIndex: 1,
          navActiveLink: 'home',
        },
      },
    ],
  },
  {
    path: 'institutions/:institutionId/classes',
    name: 'dashboardClassesTabsNetworkmanager',
    component: DashboardClassesTab,

    children: [
      {
        path: 'engagement',
        name: 'dashboardClassesTabsEngagementNetworkManager',
        component: ClassesEngagementIndex,
        meta: {
          tabIndex: 0,
          navActiveLink: 'home',
          breadcrumb: [
            {
              text: 'Painel Inicial',
              to: { name: 'dashboardSchoolTabsEngagement' },
            },
            {
              text: 'Turma',
              active: true,
            },
          ],
        },
      },
      {
        path: 'performance',
        name: 'dashboardClassesTabsPerformanceNetworkManager',
        component: ClassesPerformanceIndex,
        meta: {
          tabIndex: 1,
          navActiveLink: 'home',
          breadcrumb: [
            {
              text: 'Painel Inicial',
              to: { name: 'dashboardSchoolTabsEngagement' },
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
    path: 'institutions/:institutionId/classes/:classId/students',
    name: 'dashboardStudentsNetworkManager',
    component: DashboardStudentsIndex,
    meta: {
      navActiveLink: 'home',
      breadcrumb: [
        {
          text: 'Painel Inicial',
          to: { name: 'dashboardSchoolTabsEngagement' },
        },
        {
          text: 'Escola',
          to: { name: 'dashboardClassesTabsEngagementNetworkManager' },
        },
        {
          text: 'Turmas',
          active: true,
        },
      ],
    },
  },
  {
    path: 'institutions/:institutionId/classes/:classId/students/:studentId/details',
    name: 'dashboardStudentsDetailsNetworkManager',
    component: DashboardStudentDetailsIndex,
    meta: {
      navActiveLink: 'home',
      breadcrumb: [
        {
          text: 'Painel Inicial',
          to: { name: 'dashboardSchoolTabsEngagement' },
        },
        {
          text: 'Turmas',
          to: { name: 'dashboardClassesTabsEngagementNetworkManager' },
        },
        {
          text: 'Alunos',
          to: { name: 'dashboardStudentsNetworkManager' },
        },
        {
          text: 'Aluno',
          active: true,
        },
      ],
    },
  },
]
