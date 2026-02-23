<template>
  <b-card>
    <b-row>
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
import router from '@/router'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import store from '@/store'
import { ref, computed } from 'vue'

// institutionId from route params (non-reactive)
const { institutionId } = router.currentRoute.params

store.commit('moduleDashboardClassesEngagement/institutionId', institutionId)

const schoolYear = computed(
  () => store.getters['moduleDashboardClassesEngagement/schoolYear'],
)

const schoolYears = ref([])

const isLoading = ref(true)

getSeries()
  .then(response => {
    schoolYears.value = response.data.data
  })
  .finally(() => {
    schoolYears.value.unshift({ id: null, name: 'Todos' })
    isLoading.value = false
  })

const setschoolYear = schoolYear => {
  store.commit('moduleDashboardClassesEngagement/schoolYear', schoolYear)
}

// Periodo

const months = computed(() => {
  const length = new Date().getMonth() + 1
  const monthsList = Array.from({ length }, (item, i) => {
    const str = new Date(0, i).toLocaleString('pt-BR', { month: 'long' })
    const capitalized = str[0].toUpperCase() + str.substr(1)
    return {
      name: capitalized,
      id: i + 1,
    }
  })

  return [
    {
      id: null,
      name: 'Todo o período',
    },
    ...monthsList,
  ]
})

const month = computed(() => store.getters['moduleDashboardClassesEngagement/month'])

const setMonth = month => {
  store.commit('moduleDashboardClassesEngagement/month', month)
}

// professor

store.dispatch('moduleDashboardClassesEngagement/fetchDashboardData')
store.dispatch('moduleDashboardClassesEngagement/fetch')
</script>

<style lang="scss" scoped></style>