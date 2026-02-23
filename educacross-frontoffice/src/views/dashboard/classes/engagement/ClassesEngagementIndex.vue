<template>
  <section>
    <b-card v-if="$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)">
      <b-row align-v="center">
        <b-col cols="12" sm>
          <b-button variant="link" class="p-0" @click="redirectToInstitutions">
            <div class="d-flex align-items-center">
              <span class="material-icons-outlined">chevron_left</span>
              <span class="underline">Voltar</span>
            </div>
          </b-button>
        </b-col>
        <b-col cols="12" sm="auto">
          <div class="d-flex align-items-center">
            <span class="font-bold text-primary">{{ institutionName }}</span>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <ClassesEngagementFilter />
    <ClassesEngagementDashboard />
    <ClassesEngagementList />
    <LegendEnum :legends="[colorsLegend]" />
  </section>
</template>

<script setup>
  import ClassesEngagementDashboard from './ClassesEngagementDashboard.vue'
  import ClassesEngagementFilter from './ClassesEngagementFilter.vue'
  import ClassesEngagementList from './ClassesEngagementList.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import router from '@/router'
  import store from '@/store'
  import moduleDashboardClassesEngagement from '@/store/pageModules/dashboard/module-dashboard-classes-engagement.js'
  import { colorsLegend } from '@/utils/report-education-system/rangeColors.js'
  import { onUnmounted, computed, watch, getCurrentInstance, ref } from 'vue'

  const vm = getCurrentInstance().proxy
  if (!store.hasModule('moduleDashboardClassesEngagement')) {
    store.registerModule('moduleDashboardClassesEngagement', moduleDashboardClassesEngagement)
  }

  const redirectToInstitutions = () => {
    router.push({
      name: 'dashboardSchoolTabsEngagement',
    })
  }

  onUnmounted(() => {
    if (store.hasModule('moduleDashboardClassesEngagement')) {
      store.commit('moduleDashboardClassesEngagement/reset')
      store.unregisterModule('moduleDashboardClassesEngagement')
    }
  })

  const institutionId = computed(
    () => store.getters['moduleDashboardClassesEngagement/institutionId'],
  )

  const dashboard = computed(() => store.getters['moduleDashboardClassesEngagement/dashboard'])

  const institutionName = ref('')

  watch([dashboard], () => {
    if (dashboard.value && dashboard.value.name && institutionId.value) {
      if (vm.$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER))
        institutionName.value = dashboard.value.name
      vm.$bus.emit('setBreadcrumb', ['', dashboard.value.name])
    }
  })

</script>

<style lang="scss" scoped></style>