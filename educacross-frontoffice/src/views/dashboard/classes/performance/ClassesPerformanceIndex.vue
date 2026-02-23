<template>
  <section>
    <b-row v-if="isNetworkManager">
      <b-col>
        <b-card>
          <div class="d-flex align-items-center justify-content-between gap-2">
            <b-link @click="redirectToInstitutions">
              <div class="whitespace-no-wrap">
                <span class="material-icons-outlined align-middle">chevron_left</span>
                <span class="underline align-middle">Voltar</span>
              </div>
            </b-link>
            <h5 class="text-primary text-right font-bold mb-0">{{ dashboard.institutionName }}</h5>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <ClassesPerformanceFilter />
    <ClassesPerformanceDashboard />
    <ClassesPerformanceList />
    <LegendEnum :legends="legend" />
  </section>
</template>

<script setup>
  import ClassesPerformanceDashboard from './ClassesPerformanceDashboard.vue'
  import ClassesPerformanceFilter from './ClassesPerformanceFilter.vue'
  import ClassesPerformanceList from './ClassesPerformanceList.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { learningPerformanceLegend } from '@/consts/legends/performanceEnum.js'
  import router from '@/router'
  import store from '@/store'
  import moduleDashboardClassesPerformance from '@/store/pageModules/dashboard/module-dashboard-classes-performance.js'
  import { computed, getCurrentInstance, onUnmounted, watch } from 'vue'

  const { proxy } = getCurrentInstance()
  if (!store.hasModule('moduleDashboardClassesPerformance')) {
    store.registerModule('moduleDashboardClassesPerformance', moduleDashboardClassesPerformance)
  }
  const isNetworkManager = store.getters.accessRole === 'NetworkManager'

  const redirectToInstitutions = () => {
    router.push({
      name: 'dashboardSchoolTabsPerformance',
    })
  }

  onUnmounted(() => {
    if (store.hasModule('moduleDashboardClassesPerformance')) {
      store.commit('moduleDashboardClassesPerformance/reset')
      store.unregisterModule('moduleDashboardClassesPerformance')
    }
  })
  const legend = [learningPerformanceLegend]
  const dashboard = computed(() => store.getters['moduleDashboardClassesPerformance/dashboard'])

  watch(dashboard, () => {
    proxy.$bus.emit('setBreadcrumb', ['', dashboard.value.institutionName])
  })
</script>

<style lang="scss" scoped></style>