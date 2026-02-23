<template>
  <b-card>
    <b-row>
      <b-col cols="12" md>
        <b-form-group label="Ano Escolar" label-for="schoolYear">
          <ESelect
            id="schoolYear"
            label="name"
            :value="schoolYear"
            :options="schoolYears"
            :clearable="false"
            :loading="schoolYearLoading"
            :disabled="schoolYearLoading"
            @input="setSchoolYear"
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
  import { ref, computed, getCurrentInstance, onMounted } from 'vue'

  const vm = getCurrentInstance().proxy

  const { institutionId } = router.currentRoute.params

  store.commit('moduleReadingFluencyClasses/institutionId', institutionId)

  // schoolYear

  const schoolYearLoading = ref(true)

  const schoolYear = computed(() => store.getters['moduleReadingFluencyClasses/schoolYear'])

  const schoolYears = ref([])

  getSeries()
    .then(response => {
      schoolYears.value = response.data.data
    })
    .finally(() => {
      schoolYears.value.unshift({ id: null, name: 'Todos os anos' })
      schoolYearLoading.value = false
    })

  const setSchoolYear = value => {
    store.commit('moduleReadingFluencyClasses/schoolYear', value)
    fetchOverview()
  }

  // Fetch
  const fetchOverview = () => {
    store.commit('moduleReadingFluencyClasses/reset')
    vm.$bus.emit('resetPage')
    store.dispatch('moduleReadingFluencyClasses/fetchInstituion')
    store.dispatch('moduleReadingFluencyClasses/fetchInstituionCards')
  }

  onMounted(() => {
    fetchOverview()
  })
</script>

<style lang="scss" scoped></style>