import DashboardStudentDetails from '@/views/dashboard/studentDetails/Index.vue'
import DashboardStudents from '@/views/dashboard/students/Index.vue'

export default [
  {
    path: 'students',
    name: 'dashboardStudentsTeacher',
    component: DashboardStudents,
    meta: {
      navActiveLink: 'home',
    },
  },
  {
    path: 'students/:studentId/details',
    name: 'dashboardStudentsDetailsTeacher',
    component: DashboardStudentDetails,
    meta: {
      navActiveLink: 'home',
      breadcrumb: [
        {
          text: 'Turma',
          to: { name: 'dashboardStudentsTeacher' },
        },
        {
          text: 'Aluno',
          active: true,
        },
      ],
    },
  },
]
