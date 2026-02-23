<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject />
      </b-col>

      <b-col>
        <b-form-group label="Ano Escolar" label-for="status">
          <ESelect
            v-model="serie"
            label="name"
            :options="schoolYears"
            :clearable="false"
            name="status"
            :loading="loadingSchoolYear"
            @change="changeSerie"
          >
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group label="Grupo Escolar" label-for="networkGroup">
          <ESelect
            id="missionsLabel"
            v-model="group"
            label="name"
            :options="networkGroups"
            :clearable="false"
            :disabled="loadingNetworkGroup"
            :loading="loadingNetworkGroup"
            @input="changeNetworkGroup"
          >
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group id="tooltip-target-period" label="Periodo" label-for="grupos">
          <ESelect
            v-model="month"
            label="name"
            :options="monthsSelectOptions"
            :clearable="false"
            :disabled="disabledPeriod"
            name="grupos"
            @input="changeMissionPeriod"
          >
          </ESelect>
        </b-form-group>
        <b-tooltip v-if="disabledPeriod" target="tooltip-target-period">
          {{ textTooltip }}
        </b-tooltip>
      </b-col>
    </b-row>

    <ExpandableFilterArea>
      <b-row align-v="end">
        <b-col>
          <b-form-group label-for="missionsLabel" label="Missão">
            <ESelect
              id="missionsLabel"
              v-model="guide"
              label="name"
              :options="missions"
              :clearable="false"
              :disabled="loadingMission"
              :loading="loadingMission"
              @input="changeMission"
            >
            </ESelect>
          </b-form-group>
        </b-col>
      </b-row>
      <template v-slot:footer>
        <div class="w-100 d-flex justify-content-end">
          <b-link
            variant="flat-primary"
            class="d-flex align-items-center p-0 gap-1"
            @click.stop="checkIfCanResetFilters"
          >
            <span class="material-symbols-outlined"> cancel </span> Limpar busca
          </b-link>
        </div>
      </template>
    </ExpandableFilterArea>
  </b-card>
</template>

<script setup>
import ExpandableFilterArea from '@/components/filter/ExpandableFilterArea.vue'
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date.js'
import { useMissionPlusRanking } from '@/views/reports/missionPlus/admin-report/institutions/ranking/useReportMissionPlusRanking.js'
import { computed, ref, watch } from 'vue'
import { VueAutosuggest } from 'vue-autosuggest'

const {
  getRankingData,
  getMissionsLabelByClassIdData,
  getSeriesData,
  missions,
  networkGroups,
  schoolYears,
  serie,
  month,
  guide,
  group,
} = useMissionPlusRanking()

const { subject } = useFilters()

const loadingMission = ref(false)
const loadingNetworkGroup = ref(false)
const loadingSchoolYear = ref(false)

const selectedMission = ref({ id: null, name: 'Todas as missões' })

const monthsSelectOptions = [{ id: null, name: 'Todos' }, ...getMonthList()]
month.value = monthsSelectOptions[0]

const textTooltip =
  'Esta missão possui um período definido. Para filtrar por período, selecione todas as missões.'

const disabledPeriod = computed(() => {
  return guide.value && guide.value.id != null
})

const changeSerie = async value => {
  serie.value = value
  await getMissionsLabelByClassIdData()
  await getRankingData()
}

const changeNetworkGroup = async () => {
  await getMissionsLabelByClassIdData()
  await getRankingData()
}

const changeMissionPeriod = () => {
  getRankingData()
}

const changeMission = () => {
  setPeriodToNull()
  getRankingData()
}

const setPeriodToNull = () => {
  month.value = monthsSelectOptions.find(month => month.id == null)
}

const checkIfCanResetFilters = () => {
  if (schoolYears.value.length > 0) {
    serie.value = schoolYears.value[0]
  }
  if (missions.value.length > 0) {
    guide.value = missions.value[0]
  }

  if (networkGroups.value.length > 0) {
    group.value = networkGroups.value[0]
  }

  month.value = monthsSelectOptions[0]
  getRankingData()
}

watch(
  subject,
  async () => {
    await getSeriesData()
  },
  { deep: true }
)
</script>