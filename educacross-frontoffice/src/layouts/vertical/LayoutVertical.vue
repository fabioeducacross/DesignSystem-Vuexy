<template>
  <layout-vertical>
    <router-view />
    <template v-slot:navbar="{ toggleVerticalMenuActive }">
      <navbar :toggle-vertical-menu-active="toggleVerticalMenuActive" />
    </template>

    <template v-slot:breadcrumb>
      <b-row
        v-if="
          $can(ACTION.READ, PERMISSION.GENERAL.TEACHER) ||
          $can(ACTION.READ, PERMISSION.GENERAL.STUDENT)
        "
        no-gutters
        class="flex-column-reverse flex-md-row justify-content-between mb-1"
      >
        <b-col cols="auto" class="d-flex justify-content-center justify-content-md-start">
          <SelectClass
            v-if="$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
            :action="currentRouteAction"
            :resource="currentRouteResource"
            :disabled="disabled"
            :hidden="hidden"
            :sort="true"
          />
          <SelectStudent v-else-if="$can(ACTION.READ, PERMISSION.GENERAL.STUDENT)" />
        </b-col>
        <b-col
          cols="auto"
          class="d-flex align-items-center justify-content-center justify-content-md-end mb-50 mb-md-0"
        >
          <span class="material-symbols-outlined text-primary"> school </span>
          <p class="text-primary font-bold mb-0">&nbsp;{{ InstitutionName }}</p>
        </b-col>
      </b-row>

      <AppBreadcrumb />
      <ConfirmBeforeRouteLeave />
    </template>
  </layout-vertical>
</template>
<script>
  import AppBreadcrumb from '../components/AppBreadcrumb.vue'
  import Navbar from '../components/Navbar.vue'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import ConfirmBeforeRouteLeave from '@/layouts/components/ConfirmBeforeRouteLeave.vue'
  import SelectClass from '@/layouts/components/SelectClass.vue'
  import SelectStudent from '@/layouts/components/SelectStudent.vue'
  import { blockClassRegs, hideClassRegs } from '@/layouts/components/useSelectClass.js'
  import router from '@/router'
  import store from '@/store'
  import { computed, defineComponent, getCurrentInstance } from 'vue'

  const LayoutVertical = () => import('@core/layouts/layout-vertical/LayoutVertical.vue')

  export default defineComponent({
    components: {
      LayoutVertical,
      Navbar,
      AppBreadcrumb,
      SelectClass,
      SelectStudent,
      ConfirmBeforeRouteLeave,
      // VerticalNavMenu,
    },
    setup() {
      const vm = getCurrentInstance().proxy

      const role = store.getters.accessRole
      const InstitutionName = computed(() => {
        return store.getters.accessUserData?.InstitutionName
      })

      const currentRouteAction = computed(() => {
        return router.currentRoute.meta.action
      })
      const currentRouteResource = computed(() => {
        return router.currentRoute.meta.resource
      })

      const path = computed(() => vm.$route.path)

      const disabled = computed(() => {
        return blockClassRegs.some(regex => regex.test(path.value))
      })
      const hidden = computed(() => {
        return hideClassRegs.some(regex => regex.test(path.value))
      })

      return {
        role,
        InstitutionName,
        ACTION,
        PERMISSION,
        router,
        currentRouteAction,
        currentRouteResource,

        disabled,
        hidden,
      }
    },
  })
</script>
<style lang="scss">
  @import '../../assets/scss/components/verticalNavMenu/verticalNavMenu';
</style>
