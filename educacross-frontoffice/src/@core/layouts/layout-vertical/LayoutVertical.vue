<template>
  <div
    :class="[layoutClasses]"
    :data-col="isNavMenuHidden ? '1-column' : null"
    class="vertical-layout h-100"
  >
    <!-- Navbar -->
    <b-navbar
      :class="[navbarTypeClass]"
      :toggleable="false"
      :variant="navbarBackgroundColor"
      class="header-navbar navbar navbar-shadow align-items-center"
      style="z-index: 999"
    >
      <slot
        :navbarBackgroundColor="navbarBackgroundColor"
        :navbarTypeClass="[
          ...navbarTypeClass,
          'header-navbar navbar navbar-shadow align-items-center',
        ]"
        :toggleVerticalMenuActive="toggleKeepVerticalMenuActive"
        name="navbar"
      >
        <app-navbar-vertical-layout :toggle-vertical-menu-active="toggleVerticalMenuActive" />
      </slot>
    </b-navbar>
    <!--/ Navbar -->

    <!-- Vertical Nav Menu -->
    <vertical-nav-menu
      v-if="!isNavMenuHidden"
      :is-vertical-menu-active="isVerticalMenuActive"
      :toggle-vertical-menu-active="toggleVerticalMenuActive"
    >
      <template v-slot:header="slotProps">
        <slot name="vertical-menu-header" v-bind="slotProps" />
      </template>
    </vertical-nav-menu>
    <!-- /Vertical Nav Menu -->

    <!-- Vertical Nav Menu Overlay -->
    <!-- <div class="sidenav-overlay" :class="overlayClasses" @click="isVerticalMenuActive = false" /> -->
    <!-- /Vertical Nav Menu Overlay -->

    <!-- Content -->

    <!-- CONTENT TYPE: Left -->
    <transition :name="routerTransition" mode="out-in">
      <component
        :is="layoutContentRenderer"
        :key="
          layoutContentRenderer === 'layout-content-renderer-left'
            ? $route.meta.navActiveLink || $route.name
            : null
        "
      >
        <template v-for="(index, name) in $scopedSlots" #[name]="data">
          <slot :name="name" v-bind="data" />
        </template>
      </component>
    </transition>
    <!--/ Content -->

    <!-- Footer -->
    <footer :class="[footerTypeClass]" class="footer footer-light">
      <slot name="footer">
        <app-footer />
      </slot>
    </footer>
    <!-- /Footer -->

    <slot name="customizer" />
  </div>
</template>

<script>
  import VerticalNavMenu from './components/vertical-nav-menu/VerticalNavMenu.vue'
  import mixinVerticalLayout from './mixinVerticalLayout'
  import useVerticalLayout from './useVerticalLayout'
  import useAppConfig from '@core/app-config/useAppConfig'
  import AppFooter from '@core/layouts/components/AppFooter.vue'
  import AppNavbarVerticalLayout from '@core/layouts/components/app-navbar/AppNavbarVerticalLayout.vue'
  import LayoutContentRendererDefault from '@core/layouts/components/layout-content-renderer/LayoutContentRendererDefault.vue'
  import LayoutContentRendererLeft from '@core/layouts/components/layout-content-renderer/LayoutContentRendererLeft.vue'
  import LayoutContentRendererLeftDetached from '@core/layouts/components/layout-content-renderer/LayoutContentRendererLeftDetached.vue'
  import { BNavbar } from 'bootstrap-vue'
  import { onUnmounted } from 'vue'

  export default {
    components: {
      // AppBreadcrumb,
      AppNavbarVerticalLayout,
      AppFooter,
      VerticalNavMenu,
      BNavbar,
      LayoutContentRendererLeftDetached,
      LayoutContentRendererLeft,
      LayoutContentRendererDefault,
    },
    mixins: [mixinVerticalLayout],
    setup() {
      const { routerTransition, navbarBackgroundColor, navbarType, footerType, isNavMenuHidden } =
        useAppConfig()

      const {
        isVerticalMenuActive,
        toggleVerticalMenuActive,
        isVerticalMenuCollapsed,
        layoutClasses,
        overlayClasses,
        resizeHandler,
        navbarTypeClass,
        footerTypeClass,
        toggleKeepVerticalMenuActive,
      } = useVerticalLayout(navbarType, footerType)

      // Resize handler
      resizeHandler()
      window.addEventListener('resize', resizeHandler)
      onUnmounted(() => {
        window.removeEventListener('resize', resizeHandler)
      })

      return {
        isVerticalMenuActive,
        toggleVerticalMenuActive,
        isVerticalMenuCollapsed,
        overlayClasses,
        layoutClasses,
        navbarTypeClass,
        footerTypeClass,
        toggleKeepVerticalMenuActive,

        // App Config
        routerTransition,
        navbarBackgroundColor,
        isNavMenuHidden,
      }
    },
    computed: {
      layoutContentRenderer() {
        const rendererType = this.$route.meta.contentRenderer
        if (rendererType === 'sidebar-left') return 'layout-content-renderer-left'
        if (rendererType === 'sidebar-left-detached') return 'layout-content-renderer-left-detached'
        return 'layout-content-renderer-default'
      },
    },
  }
</script>

<style lang="scss">
  .header-navbar {
    z-index: 1000 !important;
  }
  @import '@core/scss/base/themes/bordered-layout.scss';
</style>
