/**
 * Development-only routes
 * These routes are only available in development mode
 */

const devRoutes = []

// Only add dev routes in development mode
if (import.meta.env.MODE === 'development' || import.meta.env.VITE_APP_DEVELOP === 'true') {
  devRoutes.push({
    path: '/dev/color-palette',
    name: 'dev-color-palette',
    component: () => import('@/views/dev/ColorPalette.vue'),
    meta: {
      layout: 'full',
      requireAuth: false,
      pageTitle: 'Color Palette',
      breadcrumb: [
        {
          text: 'Dev Tools',
          active: false,
        },
        {
          text: 'Color Palette',
          active: true,
        },
      ],
    },
  })

  devRoutes.push({
    path: '/dev/radio-test',
    name: 'dev-radio-test',
    component: () => import('@/views/dev/RadioTest.vue'),
    meta: {
      layout: 'full',
      requireAuth: false,
      pageTitle: 'Radio Test',
      breadcrumb: [
        { text: 'Dev Tools', active: false },
        { text: 'Radio Test', active: true },
      ],
    },
  })
}

export default devRoutes
