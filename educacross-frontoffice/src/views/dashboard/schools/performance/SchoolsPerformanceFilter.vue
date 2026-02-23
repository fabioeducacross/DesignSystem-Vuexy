<template>
  <b-card>
    <b-row>
      <b-col>
        <b-form-group label="Grupo de Escolas" label-for="network-group">
          <ESelect
            id="network-group"
            label="name"
            :value="networkGroup"
            :options="networkGroups"
            :clearable="false"
            multiple
            :loading="isLoading"
            :disabled="isLoading"
            @change="setNetworkGroup"
          >
            <template v-slot:allOptionsLabel>
              <span>Todos os grupos de escolas</span>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Ano Escolar" label-for="schoolYear">
          <ESelect
            id="schoolYear"
            label="name"
            :value="schoolYear"
            :options="schoolYears"
            :clearable="false"
            :loading="isLoading"
            :disabled="isLoading"
            @input="setschoolYear"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Período" label-for="month">
          <ESelect
            id="month"
            label="name"
            :value="month"
            :options="months"
            :clearable="false"
            @input="setMonth"
          >
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import store from '@/store'
import { getMonthList } from '@/utils/date'
import { ref, computed } from 'vue'

const isLoading = ref(true)

// networkGroup
const networkGroup = computed(
  () => store.getters['moduleDashboardSchoolsPerformance/networkGroup'],
)

const networkGroups = ref([])

// Initial fetch for networkGroups (first API call)
getNetworkGroups()
  .then(response => {
    networkGroups.value = response.data
  })
  .finally(() => {
    isLoading.value = false
  })

const setNetworkGroup = networkGroupVal => {
  store.commit('moduleDashboardSchoolsPerformance/networkGroup', networkGroupVal)
}

// Periodo

const months = computed(() => {
  return [
    {
      id: null,
      name: 'Todo o período',
    },
    ...getMonthList(),
  ]
})

const month = computed(() => store.getters['moduleDashboardSchoolsPerformance/month'])

const setMonth = monthVal => {
  store.commit('moduleDashboardSchoolsPerformance/month', monthVal)
}

store.dispatch('moduleDashboardSchoolsPerformance/fetch')

// serie

const schoolYear = computed(
  () => store.getters['moduleDashboardSchoolsPerformance/schoolYear'],
)

const schoolYears = ref([])

Promise.all([
  getSeries().then(response => {
    schoolYears.value = response.data.data
    schoolYears.value.unshift({ id: null, name: 'Todos' })
  }),
  getNetworkGroups().then(response => {
    networkGroups.value = response.data
  }),
]).then(() => {
  isLoading.value = false
})

// Second series fetch (matches legacy code behavior)
getSeries()
  .then(response => {
    schoolYears.value = response.data.data
  })
  .finally(() => {
    schoolYears.value.unshift({ id: null, name: 'Todos' })
    isLoading.value = false
  })

const setschoolYear = schoolYearVal => {
  store.commit('moduleDashboardSchoolsPerformance/schoolYear', schoolYearVal)
}
</script>

<style lang="scss" scoped></style>