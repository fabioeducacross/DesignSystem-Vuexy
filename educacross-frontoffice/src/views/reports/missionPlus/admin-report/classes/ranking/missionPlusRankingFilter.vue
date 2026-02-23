<template>
  <section>
    <b-card>
      <b-row>
        <b-col cols="auto">
          <SelectSubject />
        </b-col>

        <b-col>
          <b-form-group label="Ano Escolar" label-for="status">
            <ESelect
              v-model="selectedSerie"
              label="name"
              :options="schoolYears"
              :clearable="false"
              :loading="schoolYearsLoading"
              name="status"
              @change="changeSerie"
            >
            </ESelect>
          </b-form-group>
        </b-col>

        <b-col>
          <b-form-group label="Turma" label-for="status">
            <ESelect
              v-model="selectedClass"
              label="label"
              :options="classes"
              :clearable="false"
              :disabled="loadingGetMissions"
              name="status"
              :loading="classLoading"
              paginated
              :page="classPage"
              :total-pages="classTotalPages"
              skip-initial-request
              @change="changeClass"
              @nextPage="loadMoreClasses"
            >
            </ESelect>
          </b-form-group>
        </b-col>

        <b-col>
          <b-form-group label="Missão" label-for="status">
            <ESelect
              v-model="selectedGuide"
              label="label"
              :options="missions"
              :clearable="false"
              :disabled="loadingGetMissions"
              :loading="missionsLoading"
              name="status"
              @change="changeMissionStatus"
            >
            </ESelect>
          </b-form-group>
        </b-col>

        <b-col cols="12" md>
          <b-form-group id="tooltip-target-period" label="Periodo" label-for="grupos">
            <ESelect
              v-model="selectedMonth"
              label="name"
              :options="monthsSelectOptions"
              :clearable="false"
              :disabled="disabledPeriod"
              name="grupos"
              @change="changeMissionPeriod"
            >
            </ESelect>
          </b-form-group>
          <b-tooltip v-if="disabledPeriod" target="tooltip-target-period">
            {{ textTooltip }}
          </b-tooltip>
        </b-col>
      </b-row>
    </b-card>
  </section>
</template>

<script setup>
import GuidesLimitAlert from '@/components/missions/GuidesLimitAlert.vue'
import ESelect from '@/components/selects/ESelect.vue'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date.js'
import ArchiveMissions from '@/views/pages/teacher-context/shared/modals/ArchiveMissions.vue'
import { useMissionPlusRanking } from '@/views/reports/missionPlus/admin-report/classes/ranking/useMissionPlusRanking.js'
import { computed, ref, watch } from 'vue'

const {
  getClassesSimplifiedData,
  getRankingData,
  getSeriesData,
  getMissionsLabelByClassIdData,
  missions,
  missionsLoading,
  schoolYears,
  schoolYearsLoading,
  classes,
  classLoading,
  title,
  selectedMonth,
  selectedSerie,
  selectedClass,
  selectedGuide,
  classPage,
  classPageSize,
  classTotalPages,
  monthFirstOption,
} = useMissionPlusRanking()
const { subject } = useFilters()

const textTooltip =
  'Esta missão possui um período definido. Para filtrar por período, selecione todas as missões.'

const loadingGroup = ref(false)
const loadingGetMissions = ref(false)
const disabledPeriod = computed(() => {
  return selectedGuide && selectedGuide.id != null
})

const monthsSelectOptions = [monthFirstOption, ...getMonthList()]
selectedMonth.value = monthFirstOption

const changeMissionStatus = value => {
  title.value.title = value.label

  loadingGroup.value = value.id != null

  getRankingData()
}

const changeMissionPeriod = () => {
  getRankingData()
}

const changeSerie = async value => {
  loadingGroup.value = value.id != null

  classPage.value = 1
  classTotalPages.value = 1

  await getClassesSimplifiedData({ page: 1 })
}

const changeClass = async value => {
  title.value.className = value.label

  await getMissionsLabelByClassIdData()
}

const setPeriodToNull = () => {
  selectedMonth.value = monthsSelectOptions.find(month => month.id == null)
}

const loadMoreClasses = ctx => {
  getClassesSimplifiedData(ctx)
}

watch(subject, () => {
  getSeriesData()
})
</script>