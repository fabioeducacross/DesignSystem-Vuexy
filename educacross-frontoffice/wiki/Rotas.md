# Sistema de Rotas

Este documento descreve o sistema de roteamento do projeto **Educacross Frontend**, incluindo configuração, organização das rotas, guards de navegação e padrões utilizados.

## 🛣️ Visão Geral do Roteamento

O projeto utiliza **Vue Router** para navegação SPA (Single Page Application) com suporte a:

- Roteamento baseado em roles (Admin, Professor, Estudante)
- Guards de navegação para proteção de rotas
- Lazy loading de componentes
- Breadcrumbs dinâmicos
- Roteamento hierárquico

### Estrutura de Arquivos

```
src/router/
├── 📄 index.js                    # Configuração principal do router
├── 📄 admin-routes.js             # Rotas específicas do administrador
├── 📄 auth-routes.js              # Rotas de autenticação
├── 📄 professor-routes.js         # Rotas específicas do professor
├── 📄 student-routes.js           # Rotas específicas do estudante
├── 📄 layoutFull-routes.js        # Rotas com layout completo
└── 📄 education-system-routes.js  # Rotas do sistema educacional
```

## ⚙️ Configuração Principal

### `router/index.js`

```javascript
import AdminRoutes from './admin-routes'
import AuthRoutes from './auth-routes'
import LayoutFullRoutes from './layoutFull-routes'
import ProfessorRoutes from './professor-routes'
import StudentRoutes from './student-routes'
import store from '@/store/index.js'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    ...LayoutFullRoutes,
    ...AdminRoutes,
    ...AuthRoutes,
    ...ProfessorRoutes,
    ...StudentRoutes,
  ],
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  // Lógica de autenticação e autorização
  const isAuthenticated = store.getters['auth/isAuthenticated']
  const userRole = store.getters['user/role']

  if (to.meta.requiresAuth && !isAuthenticated) {
    toLogin(to, from, next)
    return
  }

  if (to.meta.role && to.meta.role !== userRole) {
    next({ name: 'unauthorized' })
    return
  }

  next()
})

export default router
```

## 🔐 Sistema de Autenticação

### Helpers de Autenticação

```javascript
// Verificar URL de login do white label
const LoginUrl = () => getWhitelabel('LoginUrl')

// Redirecionar para login
const toLogin = (to, from, next) => {
  if (to.name === 'login') {
    if (LoginUrl()) {
      window.location.href = LoginUrl()
      return
    }
    next()
    return
  }
  next({ name: 'login' })
}

// Verificar se usuário está autenticado
const isAuthenticated = () => {
  return store.getters['auth/isAuthenticated'] && !store.getters['auth/tokenExpired']
}
```

### Guards de Navegação

```javascript
router.beforeEach((to, from, next) => {
  // 1. Verificar autenticação
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      toLogin(to, from, next)
      return
    }
  }

  // 2. Verificar autorização (roles)
  if (to.meta.role) {
    const userRole = store.getters['user/role']
    if (userRole !== to.meta.role) {
      next({ name: 'unauthorized' })
      return
    }
  }

  // 3. Verificar permissões específicas
  if (to.meta.permission) {
    const hasPermission = store.getters['user/hasPermission'](to.meta.permission)
    if (!hasPermission) {
      next({ name: 'forbidden' })
      return
    }
  }

  // 4. Atualizar breadcrumbs
  if (to.meta.breadcrumb) {
    store.commit('navigation/SET_BREADCRUMB', to.meta.breadcrumb)
  }

  next()
})
```

## 👨‍💼 Rotas do Administrador

### `admin-routes.js`

```javascript
import { PERMISSION, ACTION } from '@/consts/permissions'

const AdminRoutes = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: {
      requiresAuth: true,
      role: 'admin',
      pageTitle: 'Administração',
      navActiveLink: 'admin',
    },
    children: [
      {
        path: 'dashboard',
        name: 'adminDashboard',
        component: () => import('@/views/pages/admin-context/AdminDashboard.vue'),
        meta: {
          pageTitle: 'Dashboard Administrativo',
          breadcrumb: [{ text: 'Administração', active: true }],
        },
      },
      {
        path: 'institutions',
        name: 'institutions',
        component: () => import('@/views/pages/admin-context/institutions/InstitutionsList.vue'),
        meta: {
          pageTitle: 'Gestão de Instituições',
          resource: PERMISSION.MODULE.INSTITUTIONS,
          action: ACTION.READ,
          breadcrumb: [
            { text: 'Administração', to: { name: 'admin' } },
            { text: 'Instituições', active: true },
          ],
        },
      },
      {
        path: 'institutions/create',
        name: 'createInstitution',
        component: () => import('@/views/pages/admin-context/institutions/CreateInstitution.vue'),
        meta: {
          pageTitle: 'Nova Instituição',
          resource: PERMISSION.MODULE.INSTITUTIONS,
          action: ACTION.CREATE,
          breadcrumb: [
            { text: 'Administração', to: { name: 'admin' } },
            { text: 'Instituições', to: { name: 'institutions' } },
            { text: 'Nova Instituição', active: true },
          ],
        },
      },
      {
        path: 'users',
        name: 'adminUsers',
        component: () => import('@/views/pages/admin-context/users/UsersList.vue'),
        meta: {
          pageTitle: 'Gestão de Usuários',
          resource: PERMISSION.MODULE.USERS,
          action: ACTION.READ,
        },
      },
      {
        path: 'analytics',
        name: 'adminAnalytics',
        component: () => import('@/views/pages/admin-context/analytics/AdminAnalytics.vue'),
        meta: {
          pageTitle: 'Analytics Administrativos',
          resource: PERMISSION.MODULE.ANALYTICS,
          action: ACTION.READ,
        },
      },
    ],
  },
]

export default AdminRoutes
```

## 👨‍🏫 Rotas do Professor

### `professor-routes.js`

```javascript
const ProfessorRoutes = [
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import('@/layouts/TeacherLayout.vue'),
    meta: {
      requiresAuth: true,
      role: 'teacher',
      pageTitle: 'Área do Professor',
    },
    children: [
      {
        path: 'dashboard',
        name: 'teacherDashboard',
        component: () => import('@/views/pages/teacher-context/TeacherDashboard.vue'),
        meta: {
          pageTitle: 'Dashboard do Professor',
          navActiveLink: 'teacherDashboard',
        },
      },

      // Gestão de Turmas
      {
        path: 'classes',
        name: 'teacherClasses',
        component: () => import('@/views/pages/teacher-context/classes/ClassesList.vue'),
        meta: {
          pageTitle: 'Minhas Turmas',
          resource: PERMISSION.MODULE.CLASSES,
          action: ACTION.READ,
          navActiveLink: 'teacherClasses',
        },
      },
      {
        path: 'classes/:id',
        name: 'classDetail',
        component: () => import('@/views/pages/teacher-context/classes/ClassDetail.vue'),
        meta: {
          pageTitle: 'Detalhes da Turma',
          resource: PERMISSION.MODULE.CLASSES,
          action: ACTION.READ,
        },
        beforeEnter(to, from, next) {
          // Configurar breadcrumb dinâmico
          to.meta.breadcrumb = [
            { text: 'Turmas', to: { name: 'teacherClasses' } },
            { text: `Turma ${to.params.id}`, active: true },
          ]
          next()
        },
      },

      // Gestão de Missões
      {
        path: 'missions',
        name: 'teacherMissions',
        component: () => import('@/views/pages/teacher-context/missions/MissionsList.vue'),
        meta: {
          pageTitle: 'Missões',
          navActiveLink: 'teacherMissions',
        },
      },
      {
        path: 'missions/create',
        name: 'createMission',
        component: () => import('@/views/pages/teacher-context/missions/CreateMission.vue'),
        meta: {
          pageTitle: 'Nova Missão',
          resource: PERMISSION.MODULE.CUSTOM_MISSIONS,
          action: ACTION.CREATE,
          navActiveLink: 'teacherMissions',
        },
      },
      {
        path: 'missions/educacross',
        name: 'educacrossMissions',
        component: () =>
          import(
            '@/views/pages/teacher-context/missions/educacrossMission/EducacrossMissionRoot.vue'
          ),
        meta: {
          pageTitle: 'Missões Educacross',
          resource: PERMISSION.MODULE.EDUCACROSS_MISSIONS,
          action: ACTION.READ,
          navActiveLink: 'teacherMissions',
        },
      },
      {
        path: 'missions/custom',
        name: 'customMissions',
        component: () => import('@/views/pages/teacher-context/missions/CustomMission.vue'),
        meta: {
          pageTitle: 'Missões Personalizadas',
          resource: PERMISSION.MODULE.CUSTOM_MISSIONS,
          action: ACTION.READ,
          navActiveLink: 'teacherMissions',
        },
      },

      // Relatórios
      {
        path: 'reports',
        name: 'teacherReports',
        component: () => import('@/views/pages/teacher-context/reports/ReportsList.vue'),
        meta: {
          pageTitle: 'Relatórios',
          navActiveLink: 'teacherReports',
        },
      },
      {
        path: 'reports/performance',
        name: 'performanceReport',
        component: () => import('@/views/pages/teacher-context/reports/PerformanceReport.vue'),
        meta: {
          pageTitle: 'Relatório de Desempenho',
          resource: PERMISSION.MODULE.REPORTS,
          action: ACTION.READ,
          navActiveLink: 'teacherReports',
        },
      },

      // Estudantes
      {
        path: 'students',
        name: 'teacherStudents',
        component: () => import('@/views/pages/teacher-context/students/StudentsList.vue'),
        meta: {
          pageTitle: 'Estudantes',
          resource: PERMISSION.MODULE.STUDENTS,
          action: ACTION.READ,
          navActiveLink: 'teacherStudents',
        },
      },
    ],
  },
]

export default ProfessorRoutes
```

## 🎓 Rotas do Estudante

### `student-routes.js`

```javascript
const StudentRoutes = [
  {
    path: '/student',
    name: 'student',
    component: () => import('@/layouts/StudentLayout.vue'),
    meta: {
      requiresAuth: true,
      role: 'student',
      pageTitle: 'Área do Estudante',
    },
    children: [
      {
        path: 'dashboard',
        name: 'studentDashboard',
        component: () => import('@/views/pages/student-context/StudentDashboard.vue'),
        meta: {
          pageTitle: 'Meu Painel',
          navActiveLink: 'studentDashboard',
        },
      },
      {
        path: 'missions',
        name: 'studentMissions',
        component: () => import('@/views/pages/student-context/missions/StudentMissions.vue'),
        meta: {
          pageTitle: 'Minhas Missões',
          navActiveLink: 'studentMissions',
        },
      },
      {
        path: 'profile',
        name: 'studentProfile',
        component: () => import('@/views/pages/student-context/profile/StudentProfile.vue'),
        meta: {
          pageTitle: 'Meu Perfil',
          navActiveLink: 'studentProfile',
        },
      },
      {
        path: 'achievements',
        name: 'studentAchievements',
        component: () =>
          import('@/views/pages/student-context/achievements/StudentAchievements.vue'),
        meta: {
          pageTitle: 'Conquistas',
          navActiveLink: 'studentAchievements',
        },
      },
    ],
  },
]

export default StudentRoutes
```

## 🔐 Rotas de Autenticação

### `auth-routes.js`

```javascript
const AuthRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'blank',
      pageTitle: 'Login',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/pages/authentication/Register.vue'),
    meta: {
      layout: 'blank',
      pageTitle: 'Cadastro',
    },
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () => import('@/views/pages/authentication/ForgotPassword.vue'),
    meta: {
      layout: 'blank',
      pageTitle: 'Esqueci minha senha',
    },
  },
  {
    path: '/reset-password',
    name: 'resetPassword',
    component: () => import('@/views/pages/authentication/ResetPassword.vue'),
    meta: {
      layout: 'blank',
      pageTitle: 'Redefinir senha',
    },
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import('@/views/pages/errors/Unauthorized.vue'),
    meta: {
      layout: 'blank',
      pageTitle: 'Acesso Negado',
    },
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import('@/views/pages/errors/Forbidden.vue'),
    meta: {
      layout: 'blank',
      pageTitle: 'Sem Permissão',
    },
  },
]

export default AuthRoutes
```

## 🎯 Sistema de Permissões

### Constantes de Permissão

```javascript
// src/consts/permissions.js
export const PERMISSION = {
  MODULE: {
    CUSTOM_MISSIONS: 'custom_missions',
    EDUCACROSS_MISSIONS: 'educacross_missions',
    CLASSES: 'classes',
    STUDENTS: 'students',
    REPORTS: 'reports',
    ANALYTICS: 'analytics',
    INSTITUTIONS: 'institutions',
    USERS: 'users',
  },
}

export const ACTION = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
}
```

### Guard de Permissão

```javascript
const checkPermission = (to, from, next) => {
  const { resource, action } = to.meta

  if (resource && action) {
    const hasPermission = store.getters['user/hasPermission'](`${resource}:${action}`)

    if (!hasPermission) {
      next({ name: 'forbidden' })
      return
    }
  }

  next()
}

// Aplicar em rotas específicas
router.beforeEach(checkPermission)
```

## 🗂️ Breadcrumbs Dinâmicos

### Configuração de Breadcrumbs

```javascript
// No meta da rota
meta: {
  breadcrumb: [
    { text: 'Home', to: { name: 'dashboard' } },
    { text: 'Missões', to: { name: 'missions' } },
    { text: 'Nova Missão', active: true }
  ]
}

// Breadcrumb dinâmico
beforeEnter(to, from, next) {
  const missionName = await getMissionName(to.params.id)
  to.meta.breadcrumb = [
    { text: 'Missões', to: { name: 'missions' } },
    { text: missionName, active: true }
  ]
  next()
}
```

### Componente Breadcrumb

```vue
<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: item.active }"
      >
        <router-link v-if="!item.active && item.to" :to="item.to">
          {{ item.text }}
        </router-link>
        <span v-else>{{ item.text }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
  export default {
    computed: {
      breadcrumbs() {
        return this.$route.meta.breadcrumb || []
      },
    },
  }
</script>
```

## 🚀 Lazy Loading

### Carregamento Sob Demanda

```javascript
// ✅ Bom - Lazy loading
const routes = [
  {
    path: '/missions',
    component: () => import('@/views/pages/teacher-context/missions/MissionsList.vue')
  }
]

// ❌ Ruim - Import direto
import MissionsList from '@/views/pages/teacher-context/missions/MissionsList.vue'
const routes = [
  {
    path: '/missions',
    component: MissionsList
  }
]
```

### Chunking por Grupos

```javascript
// Agrupar componentes relacionados
const routes = [
  {
    path: '/missions/create',
    component: () =>
      import(
        /* webpackChunkName: "missions" */
        '@/views/pages/teacher-context/missions/CreateMission.vue'
      ),
  },
  {
    path: '/missions/edit/:id',
    component: () =>
      import(
        /* webpackChunkName: "missions" */
        '@/views/pages/teacher-context/missions/EditMission.vue'
      ),
  },
]
```

## 🔄 Redirecionamentos

### Redirecionamento Baseado em Role

```javascript
// Rota raiz redireciona baseado no papel do usuário
{
  path: '/',
  redirect: (to) => {
    const userRole = store.getters['user/role']

    switch (userRole) {
      case 'admin':
        return { name: 'adminDashboard' }
      case 'teacher':
        return { name: 'teacherDashboard' }
      case 'student':
        return { name: 'studentDashboard' }
      default:
        return { name: 'login' }
    }
  }
}
```

### Redirecionamento Condicional

```javascript
{
  path: '/dashboard',
  beforeEnter: (to, from, next) => {
    const isFirstLogin = store.getters['user/isFirstLogin']

    if (isFirstLogin) {
      next({ name: 'onboarding' })
    } else {
      next()
    }
  }
}
```

## 📱 Rotas Responsivas

### Meta para Dispositivos Móveis

```javascript
{
  path: '/mobile-dashboard',
  component: () => import('@/views/mobile/MobileDashboard.vue'),
  meta: {
    mobileOnly: true,
    hideNavigation: true
  }
}
```

### Guard para Dispositivos

```javascript
router.beforeEach((to, from, next) => {
  const isMobile = window.innerWidth < 768

  if (to.meta.mobileOnly && !isMobile) {
    next({ name: 'dashboard' })
    return
  }

  if (to.meta.desktopOnly && isMobile) {
    next({ name: 'mobileDashboard' })
    return
  }

  next()
})
```

## 🔧 Configurações Avançadas

### Scroll Behavior Customizado

```javascript
const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  },
})
```

### Route Transitions

```javascript
// No componente
<template>
  <transition
    :name="$route.meta.transition || 'fade'"
    mode="out-in"
  >
    <router-view />
  </transition>
</template>

// Nas rotas
meta: {
  transition: 'slide-left'
}
```

## 🧪 Testing de Rotas

### Testando Navigation Guards

```javascript
import router from '@/router'
import { createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'

describe('Navigation Guards', () => {
  it('should redirect to login if not authenticated', async () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)

    router.push('/teacher/dashboard')
    await router.onReady()

    expect(router.currentRoute.name).toBe('login')
  })
})
```

### Testando Componentes com Router

```javascript
import MyComponent from '@/components/MyComponent.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

const router = new VueRouter({
  routes: [{ path: '/test', component: MyComponent }],
})

describe('MyComponent', () => {
  it('should navigate correctly', () => {
    const wrapper = shallowMount(MyComponent, {
      localVue,
      router,
    })

    wrapper.find('button').trigger('click')
    expect(wrapper.vm.$route.name).toBe('expectedRoute')
  })
})
```

## 📋 Boas Práticas

### 1. Estrutura Hierárquica

```javascript
// ✅ Bom - rotas organizadas hierarquicamente
{
  path: '/teacher',
  children: [
    { path: 'dashboard', name: 'teacherDashboard' },
    { path: 'classes', name: 'teacherClasses' }
  ]
}
```

### 2. Nomes Consistentes

```javascript
// ✅ Bom - nomes descritivos
{
  name: 'teacherDashboard'
}
{
  name: 'adminUsersList'
}
{
  name: 'studentProfile'
}

// ❌ Ruim - nomes genéricos
{
  name: 'dashboard'
}
{
  name: 'list'
}
{
  name: 'profile'
}
```

### 3. Meta Informações Completas

```javascript
// ✅ Bom - meta completo
meta: {
  requiresAuth: true,
  role: 'teacher',
  pageTitle: 'Minhas Turmas',
  resource: 'classes',
  action: 'read',
  navActiveLink: 'teacherClasses',
  breadcrumb: [...]
}
```

### 4. Lazy Loading Apropriado

```javascript
// ✅ Bom - lazy loading para páginas grandes
component: () => import('@/views/heavy-component/HeavyComponent.vue')

// ✅ Bom - import direto para componentes pequenos
component: require('@/components/small/SmallComponent.vue').default
```

---

🎯 **Próximos Passos**: Consulte [Componentes](Components/Home.md) para entender como os componentes Vue.js são organizados e utilizados nas rotas.
