<template>
  <div>
    <b-card>
      <b-row>
        <b-col cols="auto">
          <SelectSubject />
        </b-col>
        <b-col cols md="6">
          <b-form-group label="Período" label-for="period">
            <ESelect
              id="period"
              v-model="selectedPeriod"
              :options="periodSelectOptions"
              label="name"
              :clearable="false"
            />
          </b-form-group>
        </b-col>
        <b-col v-if="selectedPeriod.id === 0" cols="12" md>
          <b-form-group label="Mês" label-for="month">
            <ESelect
              v-model="selectedMonth"
              :options="monthsSelectOptions"
              label="name"
              :clearable="false"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <div class="ranking-list-content">
      <ranking-table
        :ranking-title="`Ranking de conquistas ${className}`"
        :leader-board="dataRanking"
        :class-name="className"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script setup>
import RankingTable from '../../../admin-context/shared/components/ranking-table/RankingTable.vue'
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getMissionsRankingReport } from '@/services/shared/ranking/Ranking.Service'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date.js'
import { computed, ref, watch } from 'vue'

const { classe, subject } = useFilters()
const loading = ref(true)

const selectedPeriod = ref({ id: null, name: 'Todos' })
const selectedMonth = ref({})

const dataRanking = ref([])

const monthsSelectOptions = getMonthList()

const periodSelectOptions = [
  { id: null, name: 'Todos' },
  { id: 0, name: 'Mensal' },
]

const setCurrentMonth = () => {
  const monthNow = new Date().getMonth() + 1
  selectedMonth.value = monthsSelectOptions.find(month => month.id === monthNow)
}

const handleGetDataRanking = async () => {
  loading.value = true
  const payload = {
    SubjectId: subject.value.id,
    ClassIds: classe.value.ClassId,
    SerieId: classe.value.SerieId,
    Month: selectedPeriod.value.id === 0 ? selectedMonth.value.id : null,
  }

  await getMissionsRankingReport(payload).then(response => {
    dataRanking.value = response.data
  })
  loading.value = false
}

const className = computed(() => {
  return `${classe.value.Name}`
})

watch(selectedPeriod, () => {
  if (selectedPeriod.value.id === 0) {
    setCurrentMonth()
  } else {
    selectedMonth.value = {}
  }
})

watch(selectedMonth, () => {
  handleGetDataRanking()
})

watch(
  subject,
  () => {
    handleGetDataRanking()
  },
  { deep: true },
)
</script>