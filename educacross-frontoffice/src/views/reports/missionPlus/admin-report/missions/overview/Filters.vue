<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject :fetch-on-mounted="false" />
      </b-col>

      <b-col>
        <b-form-group label="Período" label-for="month">
          <ESelect
            id="month"
            label="name"
            :value="period"
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
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { getMonthList } from '@/utils/date'
import { computed, getCurrentInstance, onMounted, watch } from 'vue'

const vm = getCurrentInstance().proxy

const { period, serie, classe, subject, fetchSubjects } = useFilters()

const { classId } = router.currentRoute.params
serie.value = {}
classe.value = { id: classId }

fetchSubjects()

const subjectId = computed(() => subject.value.id)

const fetch = () => {
  vm.$bus.emit('resetPage')
  store.commit('moduleMissionsPlusReportAdminMissionsOverview/setParams', {
    Page: 1,
  })
  store.dispatch('moduleMissionsPlusReportAdminMissionsOverview/fetchCards')
  store.dispatch('moduleMissionsPlusReportAdminMissionsOverview/fetch')
}

watch(subjectId, () => {
  store.commit('moduleMissionsPlusReportAdminMissionsOverview/loading', true)
  fetch()
})

// Periodo
period.value = { id: null, name: 'Todo o período' }

const months = computed(() => {
  return [
    {
      id: null,
      name: 'Todo o período',
    },
    ...getMonthList(),
  ]
})

const setMonth = month => {
  period.value = month
  fetch()
}

onMounted(() => {
  fetch()
})

</script>

<style lang="scss" scoped></style>