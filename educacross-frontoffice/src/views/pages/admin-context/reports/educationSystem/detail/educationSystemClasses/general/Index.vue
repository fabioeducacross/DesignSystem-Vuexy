<template>
  <div>
    <GeralClassesFilters v-model="params" :loading="loading" />
    <GeralClassesDashboard :data="dashboard" :loading="loadingData" />
    <GeralClassesList
      :data-table="dataTable"
      :loading="loadingData"
      :params="params"
      :education-system-name="educationSystemName"
      :institution-name="institutionName"
    />
    <LegendEnum :legends="legends" />
  </div>
</template>

<script setup>
  import GeralClassesDashboard from './GeralClassesDashboard.vue'
  import GeralClassesFilters from './GeralClassesFilters.vue'
  import GeralClassesList from './GeralClassesList.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import { progressLegend } from '@/consts/legends/progressEnum.js'
  import router from '@/router'
  import { getEducationSystemClasses } from '@/services/shared/educationSystem/EducationSystem.Service.js'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters'
  import { getCurrentInstance, ref, watch } from 'vue'

  const vm = getCurrentInstance().proxy

  const { subject } = useFilters()

  const loading = ref(true)
  const loadingData = ref(true)

  const dashboard = ref({})
  const dataTable = ref([])

  const institutionId = router.currentRoute.params.institutionId
  const educationSystemId = router.currentRoute.params.educationSystemId
  const isNetworkManager = store.getters.accessRole === 'NetworkManager'

  const params = ref({
    InstitutionId: institutionId,
    SubjectId: subject.value.id,
    SerieId: store.getters['educationSystemReportTabsRoot/year'].id || null,
    BookId: store.getters['educationSystemReportTabsRoot/book'].id || null,
    GuideId: store.getters['educationSystemReportTabsRoot/mission'].id || null,
  })

  const educationSystemName = ref('')
  const institutionName = ref('')

  const fetchData = () => {
    if (!params.value.SubjectId) return
    loadingData.value = true
    getEducationSystemClasses(educationSystemId, params.value)
      .then(({ data }) => {
        dataTable.value = data.classes
        dashboard.value = data.dashboard

        educationSystemName.value = data.educationSystemName

        if (isNetworkManager) {
          institutionName.value = data.institutionName

          vm.$bus.emit('setBreadcrumb', [
            '',
            '',
            data.educationSystemName,
            data.institutionName,
          ])
          vm.$bus.emit('setTabTitle', data.institutionName)
        } else {
          vm.$bus.emit('setBreadcrumb', ['', '', data.educationSystemName])
          vm.$bus.emit('setTabTitle', data.educationSystemName)
        }
      })
      .finally(() => {
        loading.value = false
        loadingData.value = false
      })
  }

  watch([params], () => {
    fetchData()
  })

  const legends = [progressLegend]
</script>