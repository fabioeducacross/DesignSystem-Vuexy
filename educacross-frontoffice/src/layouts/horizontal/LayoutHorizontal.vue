<template>
  <layout-horizontal>
    <router-view />

    <template #navbar="{ toggleVerticalMenuActive }" style="z-index: 999">
      <app-navbar-horizontal-layout-brand />
      <navbar :toggle-vertical-menu-active="toggleVerticalMenuActive" />
    </template>

    <!-- <template #customizer>
      <app-customizer
        v-if="showCustomizer"
      />
    </template> -->
  </layout-horizontal>
</template>

<script>
  // import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
  // import { $themeConfig } from '@themeConfig'
  import Navbar from '../components/Navbar.vue'
  import AppNavbarHorizontalLayoutBrand from '@core/layouts/components/app-navbar/AppNavbarHorizontalLayoutBrand.vue'

  const LayoutHorizontal = () => import('@core/layouts/layout-horizontal/LayoutHorizontal.vue')

  export default {
    components: {
      LayoutHorizontal,
      // AppCustomizer,
      Navbar,
      AppNavbarHorizontalLayoutBrand,
    },
    data() {
      return {
        // showCustomizer: $themeConfig.layout.customizer,
      }
    },
  }
</script>
