<template>
  <b-card>
    <b-row>
      <b-col cols="12" md>
        <b-form-group label="Ano Escolar" label-for="schoolYear">
          <ESelect
            id="schoolYear"
            label="name"
            :value="serie"
            :options="schoolYears"
            :clearable="false"
            :loading="schoolYearsLoading"
            :disabled="schoolYearsLoading"
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
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { ref, computed, getCurrentInstance, onMounted, watch } from 'vue'

const vm = getCurrentInstance().proxy

const { institutionId } = router.currentRoute.params
const { serie, institution } = useFilters()

if (institutionId) {
  institution.value = { id: institutionId }
}

// schoolYear

serie.value = { id: null, name: 'Todos os anos' }

const schoolYears = ref([])
const schoolYearsLoading = ref(true)

getSeries()
  .then(response => {
    schoolYears.value = response.data.data
  })
  .finally(() => {
    schoolYears.value.unshift({ id: null, name: 'Todos os anos' })
    schoolYearsLoading.value = false
  })

const setSchoolYear = value => {
  serie.value = value
  fetch()
}

// Fetch
const fetch = () => {
  store.dispatch('narrativeComplexityClasses/fetchCards')
}

onMounted(() => {
  fetch()
})

const applyId = computed(() => store.getters['narrativeComplexityClasses/applyId'])

watch(applyId, () => {
  if (!applyId.value) return
  store.commit('narrativeComplexityClasses/resetParams')
  vm.$bus.emit('resetPage')
  store.dispatch('narrativeComplexityClasses/fetch')
})
</script>

<style lang="scss" scoped></style>