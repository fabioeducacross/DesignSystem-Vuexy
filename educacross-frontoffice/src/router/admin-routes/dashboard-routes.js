import DashboardClassesTab from '@/views/dashboard/classes/DashboardClassesTab.vue'
import ClassesEngagementIndex from '@/views/dashboard/classes/engagement/ClassesEngagementIndex.vue'
import ClassesPerformanceIndex from '@/views/dashboard/classes/performance/ClassesPerformanceIndex.vue'
import DashboardStudentDetailsIndex from '@/views/dashboard/studentDetails/Index.vue'
import DashboardStudentsIndex from '@/views/dashboard/students/Index.vue'

export default [
  {
    path: 'classes',
    name: 'dashboardClassesTabsAdmin',
    component: DashboardClassesTab,

    children: [
      {
        path: 'engagement',
        name: 'dashboardClassesTabsEngagementAdmin',
        component: ClassesEngagementIndex,
        meta: {
          tabIndex: 0,
          navActiveLink: 'home',
        },
      },
      {
        path: 'performance',
        name: 'dashboardClassesTabsPerformanceAdmin',
        component: ClassesPerformanceIndex,
        meta: {
          tabIndex: 1,
          navActiveLink: 'home',
        },
      },
    ],
  },
  {
    path: 'classes/:classId/students',
    name: 'dashboardStudentsAdmin',
    component: DashboardStudentsIndex,
    meta: {
      navActiveLink: 'home',
      breadcrumb: [
        {
          text: 'Painel Inicial',
          to: { name: 'dashboardClassesTabsEngagementAdmin' },
        },
        {
          text: 'Alunos',
          active: true,
        },
      ],
    },
  },
  {
    path: 'classes/:classId/students/:studentId/details',
    name: 'dashboardStudentsDetailsAdmin',
    component: DashboardStudentDetailsIndex,
    meta: {
      navActiveLink: 'home',
      breadcrumb: [
        {
          text: 'Painel Inicial',
          to: { name: 'dashboardClassesTabsEngagementAdmin' },
        },

        {
          text: 'Alunos',
          to: { name: 'dashboardStudentsAdmin' },
        },
        {
          text: 'Aluno',
          active: true,
        },
      ],
    },
  },
]
