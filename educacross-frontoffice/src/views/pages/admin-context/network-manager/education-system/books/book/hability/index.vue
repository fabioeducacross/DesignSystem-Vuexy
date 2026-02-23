<template>
  <div>
    <Title />
    <!-- <Exhibition /> -->
    <Filters />
    <WeakStrong />
    <RoundsFilter />
    <Rounds />
    <LegendEnum :legends="legends" />
  </div>
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import ModuleEducationSystemBookReportNetworkManager from '@/store/pageModules/reports/educationSystem/module-education-system-students-book-report-network-manager.js'
import Exhibition from '@/views/pages/admin-context/network-manager/education-system/books/book/hability/Exhibition.vue'
import Filters from '@/views/pages/admin-context/network-manager/education-system/books/book/hability/Filters.vue'
import Rounds from '@/views/pages/admin-context/network-manager/education-system/books/book/hability/Rounds.vue'
import RoundsFilter from '@/views/pages/admin-context/network-manager/education-system/books/book/hability/RoundsFilter.vue'
import Title from '@/views/pages/admin-context/network-manager/education-system/books/book/hability/Title.vue'
import WeakStrong from '@/views/pages/admin-context/network-manager/education-system/books/book/hability/WeakStrong.vue'
import { useEducationSystemBookReportNetworkManager } from '@/views/pages/admin-context/network-manager/education-system/books/book/hability/useEducationSystemBookReportNetwork.js'
import { getCurrentInstance, onUnmounted, watch } from 'vue'

const vm = getCurrentInstance().proxy
const { module_name, bookName } = useEducationSystemBookReportNetworkManager()
store.registerModule(module_name, ModuleEducationSystemBookReportNetworkManager)

const { book } = useFilters()
const { bookId } = router.currentRoute.params

vm.$bus.emit('setEducationSystemTabTitle', store.state.access.userData.InstitutionName)

book.value = { id: bookId, name: '' }

watch(bookName, () => {
  vm.$bus.emit('setBreadcrumb', ['', bookName.value])
})

onUnmounted(() => {
  store.commit(`${module_name}/reset`)
  store.unregisterModule(module_name)
})

const legends = [accuracyPerformanceLegend]
</script>