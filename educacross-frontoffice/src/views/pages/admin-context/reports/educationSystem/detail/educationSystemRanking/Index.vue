<script setup>
import Tab from '@/components/tab/Tab.vue'
import store from '@/store'
import moduleEducationSystemRanking from '@/store/pageModules/educationSystem/module-educarion-system-ranking-admin'
import EducationSystemRankingFilter from '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemRanking/Filter.vue'
import EducationSystemRankingListAdmin from '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemRanking/List.vue'
import { useEducationSystemRankingAdmin } from '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemRanking/useEducationSystemRankingAdmin.js'
import { getCurrentInstance, onUnmounted, watch } from 'vue'

const vm = getCurrentInstance().proxy
const { moduleName, ranking } = useEducationSystemRankingAdmin()

if (!store.hasModule(moduleName)) {
  store.registerModule(moduleName, moduleEducationSystemRanking)
}

onUnmounted(() => {
  if (store.hasModule(moduleName)) {
    store.commit(`${moduleName}/reset`)
    store.unregisterModule(moduleName)
  }
})

watch(
  () => ranking.value.educationSystemName,
  () => {
    vm.$bus.emit('replaceBreadcrumb', [
      {
        text: 'Sistema de Ensino',
        to: { name: 'reportsEducationSystemList' },
      },
      {
        text: `${ranking.value.educationSystemName}`,
        active: true,
      },
    ])

    vm.$bus.emit('setTabTitle', store.state.access.userData.InstitutionName)
  },
)
</script>

<template>
  <b-row>
    <b-col cols="12">
      <EducationSystemRankingFilter />
    </b-col>
    <b-col cols="12">
      <EducationSystemRankingListAdmin />
    </b-col>
  </b-row>
</template>