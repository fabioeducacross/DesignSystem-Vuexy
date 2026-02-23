<template>
  <section>
    <b-card>
      <b-row>
        <b-col cols="auto">
          <SelectSubject :additional-modules="MODULES_IDS" />
        </b-col>
        <b-col>
          <b-form-group label="Missão" label-for="status">
            <ESelect
              v-model="selectedGuide"
              label="label"
              :options="missions"
              :clearable="false"
              :disabled="missionsLoading"
              :loading="missionsLoading"
              name="status"
              @change="getRankingData"
            />
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
              @change="getRankingData"
            />
          </b-form-group>
          <b-tooltip v-if="disabledPeriod" target="tooltip-target-period">
            {{ setTooltip }}
          </b-tooltip>
        </b-col>
      </b-row>
    </b-card>
  </section>
</template>

<script setup>
import GuidesLimitAlert from '@/components/missions/GuidesLimitAlert.vue'
import ESelect from '@/components/selects/ESelect.vue'
import { ModulesEnum } from '@/consts/admin-context/enums/modules'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date.js'
import { useMissionRanking } from '@/views/pages/missions/missions-list/ranking/useMissionsRanking'
import ArchiveMissions from '@/views/pages/teacher-context/shared/modals/ArchiveMissions.vue'
import { computed, ref, watch, onMounted } from 'vue'

const {
  getMissionsLabelByClassIdData,
  getRankingData,
  missionsLoading,
  missions,
  selectedMonth,
  selectedGuide,
} = useMissionRanking()
const { subject } = useFilters()
const MODULES_IDS = [ModulesEnum.CustomMissionsPlus]

const ALL_PERIOD_OPTION = { id: null, name: 'Todo o período' }

const disabledPeriod = ref(false)

const monthsSelectOptions = [ALL_PERIOD_OPTION, ...getMonthList()]

// Initialize month selection
if (!selectedMonth.value) {
  selectedMonth.value = ALL_PERIOD_OPTION
}

const changeSubject = async () => {
  await getMissionsLabelByClassIdData()
}

watch(
  subject,
  () => {
    changeSubject()
  },
  { deep: true },
)

const setTooltip = computed(
  () =>
    'Esta missão possui um período definido. Para filtrar por período, selecione todas as missões.',
)

onMounted(() => {
  getMissionsLabelByClassIdData()
})
</script>