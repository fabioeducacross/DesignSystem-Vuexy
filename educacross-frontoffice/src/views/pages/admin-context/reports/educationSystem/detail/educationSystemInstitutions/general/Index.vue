<template>
  <div>
    <GeneralInstitutionsFilters v-model="params" :loading="loading" />
    <GeneralInstitutionsDashboard :data="dashboard" :loading="loadingData" />
    <GeneralInstitutionsList
      :data-table="dataTable"
      :loading="loadingData"
      :params="params"
      :education-system-name="educationSystemName"
    />
    <LegendEnum :legends="legends" />
  </div>
</template>

<script setup>
  import GeneralInstitutionsDashboard from './GeneralInstitutionsDashboard.vue'
  import GeneralInstitutionsFilters from './GeneralInstitutionsFilters.vue'
  import GeneralInstitutionsList from './GeneralInstitutionsList.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { progressLegend } from '@/consts/legends/progressEnum.js'
  import router from '@/router'
  import { getEducationSystemInstitutions } from '@/services/shared/educationSystem/EducationSystem.Service.js'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters'
  import { getCurrentInstance, onMounted, ref, watch } from 'vue'

  const vm = getCurrentInstance().proxy

  const { subject } = useFilters()

  const loading = ref(true)
  const loadingData = ref(true)

  const dashboard = ref({})
  const dataTable = ref([])

  const institutionId = router.currentRoute.params.institutionId
  const educationSystemId = router.currentRoute.params.educationSystemId

  const params = ref({
    InstitutionId: institutionId,
    SubjectId: subject.value.id,
    SerieId: store.getters['educationSystemReportTabsRoot/year'].id || null,
    BookId: store.getters['educationSystemReportTabsRoot/book'].id || null,
    GuideId: store.getters['educationSystemReportTabsRoot/mission'].id || null,
    NetworkGroupId: null,
  })
  const educationSystemName = ref('')

  const fetchData = () => {
    if (!params.value.SubjectId) return
    loadingData.value = true
    getEducationSystemInstitutions(educationSystemId, params.value)
      .then(({ data }) => {
        dataTable.value = data.institutions
        dashboard.value = data.dashboard
        educationSystemName.value = data.educationSystemName

        vm.$bus.emit('setBreadcrumb', ['', '', data.educationSystemName])
        vm.$bus.emit('setTabTitle', data.educationSystemName)
      })
      .finally(() => {
        loading.value = false
        loadingData.value = false
      })
  }

  watch([params], () => {
    fetchData()
  })

  onMounted(() => {
    fetchData()
  })

  const legends = [progressLegend]
</script>

<style lang="scss" scoped></style>