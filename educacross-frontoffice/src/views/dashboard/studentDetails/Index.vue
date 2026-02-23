<template>
  <section>
    <b-card body-class="d-flex justify-content-between">
      <b-link variant="primary" class="d-flex align-items-center" :to="redirectBack">
        <span class="material-symbols-outlined" style="font-size: 14px"> arrow_back_ios </span>
        <span class="underline">Voltar</span>
      </b-link>
      <span class="font-bold text-primary">{{ studentName }}</span>
    </b-card>
    <StudentDetailFilter />
    <StudentDetailDashboard />
    <Rounds />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum.js'
import router from '@/router'
import store from '@/store'
import moduleDashboardStudentDetails from '@/store/pageModules/dashboard/module-dashboard-student-details.js'
import StudentDetailDashboard from '@/views/dashboard/studentDetails/Dashboard.vue'
import StudentDetailFilter from '@/views/dashboard/studentDetails/Filter.vue'
import Rounds from '@/views/dashboard/studentDetails/Rounds.vue'
import {useStudentDetails} from '@/views/dashboard/studentDetails/useStudentDetails.js'
import { getCurrentInstance, onUnmounted, computed, watch } from 'vue'

const vm = getCurrentInstance().proxy

const { className, institutionName, studentName } = useStudentDetails()

if (!store.hasModule('moduleDashboardStudentDetails')) {
  store.registerModule('moduleDashboardStudentDetails', moduleDashboardStudentDetails)
}
onUnmounted(() => {
  if (store.hasModule('moduleDashboardStudentDetails')) {
    store.unregisterModule('moduleDashboardStudentDetails')
  }
})

const { institutionId, classId } = router.currentRoute.params

const role = store.getters.accessRole

const redirectBack = computed(() => {
  if (role === 'NetworkManager') {
    return {
      name: 'dashboardStudentsNetworkManager',
      params: {
        institutionId,
        classId,
      },
    }
  }
  if (role === 'Teacher') {
    return {
      name: 'dashboardStudentsTeacher',
    }
  }
  return {
    name: 'dashboardStudentsAdmin',
    params: {
      classId,
    },
  }
})

watch(studentName, () => {
  const breadcrumb = [className.value, studentName.value]

  if (role !== 'Teacher') {
    if (role === 'NetworkManager') {
      breadcrumb.unshift(institutionName.value)
    }
    breadcrumb.unshift('')
  }
  vm.$bus.emit('setBreadcrumb', breadcrumb)
})

const legends = [accuracyPerformanceLegend]
</script>