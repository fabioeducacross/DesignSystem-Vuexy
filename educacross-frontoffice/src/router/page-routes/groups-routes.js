import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    path: '/groups',
    name: 'GroupsRoot',
    redirect: '/groups/',
    component: () => import('@/views/pages/groups/GroupsRoot.vue'),
    meta: {
      resource: PERMISSION.GENERAL.CLASS_GROUP,
      action: ACTION.READ,
      pageTitle: 'Grupos',
      breadcrumb: [
        {
          text: 'Grupos',
          active: true,
        },
      ],
    },
    children: [
      {
        path: '/',
        name: 'GroupsList',
        component: () => import('@/views/pages/groups/list/Index.vue'),
        meta: {
          resource: PERMISSION.GENERAL.CLASS_GROUP,
          action: ACTION.READ,
          navActiveLink: 'GroupsList',
          text: 'Grupos',
          breadcrumb: [
            {
              text: 'Grupos',
              active: true,
            },
          ],
        },
      },
      {
        path: 'create',
        name: 'GroupsCreate',
        component: () => import('@/views/pages/groups/create/Index.vue'),
        meta: {
          resource: PERMISSION.GENERAL.CLASS_GROUP,
          action: ACTION.CREATE,
          navActiveLink: 'GroupsList',
          text: 'Grupos',
          breadcrumb: [
            {
              text: 'Grupos',
              to: {
                name: 'GroupsList',
              },
            },
            {
              text: 'Novo grupo',
              active: true,
            },
          ],
        },
      },
      {
        path: 'edit/:groupId',
        name: 'GroupEdit',
        component: () => import('@/views/pages/groups/create/Index.vue'),
        meta: {
          resource: PERMISSION.GENERAL.CLASS_GROUP,
          action: ACTION.CREATE,
          navActiveLink: 'GroupsList',
          text: 'Grupos',
          breadcrumb: [
            {
              text: 'Grupos',
              to: {
                name: 'GroupsList',
              },
            },
            {
              text: 'Editar Grupo',
              active: true,
            },
          ],
        },
      },
    ],
  },
]
