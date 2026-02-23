<template>
  <section>
    <b-card v-if="role !== 'Teacher'" :no-body="!loading">
      <b-row align-v="center">
        <b-skeleton-wrapper :loading="loading" class="w-100 px-1">
          <template v-slot:loading>
            <div class="h-100">
              <b-row align-v="center" class="match-height">
                <b-col cols="12" sm>
                  <b-skeleton
                    type="card"
                    height="25px"
                    class="w-100 rounded mb-1 mb-sm-0"
                  ></b-skeleton>
                </b-col>
                <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)" cols="12" sm>
                  <b-skeleton
                    type="card"
                    height="25px"
                    class="w-100 rounded mb-1 mb-sm-0"
                  ></b-skeleton>
                </b-col>
                <b-col cols="12" sm>
                  <b-skeleton type="card" height="25px" class="w-100 rounded"></b-skeleton>
                </b-col>
              </b-row>
            </div>
          </template>
          <b-col cols="12" sm>
            <b-button variant="link" @click="redirectBack">
              <div class="d-flex align-items-center">
                <span class="material-icons-outlined">chevron_left</span>
                <span class="underline">Voltar</span>
              </div>
            </b-button>
          </b-col>
          <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)" cols="12" sm>
            <div class="d-flex align-items-center justify-content-center">
              <span class="m-0 font-bold text-primary">{{ institutionName }}</span>
            </div>
          </b-col>
          <b-col cols="12" sm>
            <div class="d-flex align-items-center justify-content-end gap-2 pr-2">
              <span class="m-0 font-bold text-primary">{{ className }}</span>
              <b-badge pill variant="light-primary">{{ serieName }}</b-badge>
            </div>
          </b-col>
        </b-skeleton-wrapper>
      </b-row>
    </b-card>
    <StudentDashboardFilter />
    <Dashboard v-if="viewMode !== 3" />
    <List />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import {useDashboardStudents} from '../useDashboardStudents.js'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { participation } from '@/consts/legends/participationEnum.js'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import store from '@/store'
import moduleDashboardStudents from '@/store/pageModules/dashboard/module-dashboard-students.js'
import Dashboard from '@/views/dashboard/students/Dashboard.vue'
import StudentDashboardFilter from '@/views/dashboard/students/Filter.vue'
import List from '@/views/dashboard/students/List.vue'
import { getCurrentInstance, watch, onUnmounted } from 'vue'

const vm = getCurrentInstance().proxy

const {
  module_name,
  viewMode,
  loading,
  className,
  serieName,
  institutionName,
  fetchDashboard,
} = useDashboardStudents()

if (!store.hasModule(module_name)) {
  store.registerModule(module_name, moduleDashboardStudents)
}

onUnmounted(() => {
  if (store.hasModule(module_name)) {
    store.unregisterModule(module_name)
  }
})

const { institutionId } = router.currentRoute.params
const role = store.getters.accessRole

const redirectBack = () => {
  if (role !== 'NetworkManager') {
    router.push({
      name: 'dashboardClassesTabsEngagementAdmin',
    })
    return
  }
  router.push({
    name: 'dashboardClassesTabsEngagementNetworkManager',
    params: {
      institutionId,
    },
  })
}

watch(className, () => {
  if (role !== 'Teacher') {
    const breadcrumb = ['', className.value]

    if (role === 'NetworkManager') {
      breadcrumb.splice(1, 0, institutionName.value)
    }

    vm.$bus.emit('setBreadcrumb', breadcrumb)
  }
})

const legends = [
  {
    text: 'studentsPlayedProgress',
    enum: participation,
  },
  accuracyPerformanceLegend,
]

fetchDashboard()
</script>