<template>
  <div>
    <Filters :loading="loading" :serie-id="serieId" />
    <Dashboard :data="dashboard" :loading="loadingData" />
    <List
      :data-table="dataTable"
      :loading="loadingData"
      :params="params"
      :education-system-name="educationSystemName"
      :class-name="className"
    />
    <LegendEnum :legends="legends" />
  </div>
</template>

<script setup>
import Dashboard from './Dashboard.vue'
import Filters from './Filters.vue'
import List from './List.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { progressLegend } from '@/consts/legends/progressEnum.js'
import { getEducationSystemStudents } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router/composables'
import { emitter } from '@/eventBus'

const route = useRoute()
const { subject } = useFilters()

const loading = ref(true)
const loadingData = ref(true)

const dashboard = ref({})
const dataTable = ref([])

const educationSystemId = route.params.educationSystemId
const institutionId = route.params.institutionId
const classId = route.params.classId

const serieId = ref(null)

const params = computed(() => ({
  InstitutionId: institutionId,
  SubjectId: subject.value.id,
  BookId: store.getters['educationSystemReportTabsRoot/book'].id || null,
  GuideId: store.getters['educationSystemReportTabsRoot/mission'].id || null,
  ClassId: classId,
}))

const educationSystemName = ref('')
const className = ref('')

const fetchData = () => {
  if (!params.value.SubjectId) return
  loadingData.value = true
  getEducationSystemStudents(educationSystemId, params.value)
    .then(({ data }) => {
      dataTable.value = data.students
      serieId.value = data.serieId
      dashboard.value = data.dashboard

      educationSystemName.value = data.educationSystemName
      className.value = data.className

      emitter.emit('setBreadcrumb', ['', '', data.educationSystemName, data.className])
      emitter.emit('setTabTitle', data.className)
      store.commit('educationSystemReportTabsRoot/setTabTitle', data.className)
    })
    .finally(() => {
      loading.value = false
      loadingData.value = false
    })
}

watch(params, () => {
  fetchData()
})

onUnmounted(() => {
  store.commit('educationSystemReportTabsRoot/setTabTitle', '')
})

const legends = [progressLegend]
</script>