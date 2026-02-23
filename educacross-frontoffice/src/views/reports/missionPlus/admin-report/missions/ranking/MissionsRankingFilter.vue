<template>
  <section>
    <b-card>
      <b-row>
        <b-col cols="auto">
          <SelectSubject @input="changeSubject" />
        </b-col>
        <b-col>
          <b-form-group label="Missão" label-for="status">
            <ESelect
              v-model="selectedMission"
              label="label"
              :options="missions"
              :clearable="false"
              :loading="missionsLoading"
              :disabled="missionsLoading"
              name="status"
              @change="changeMissionStatus"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12" md>
          <b-form-group id="tooltip-target-period" label="Periodo" label-for="grupos">
            <ESelect
              v-model="selectedPeriod"
              label="name"
              :options="monthsSelectOptions"
              :clearable="false"
              :disabled="disabledPeriod"
              name="grupos"
              @change="changeMissionPeriod"
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

<script>
export default {
  name: 'MissionsRankingFilter',
}
</script>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getMonthList } from '@/utils/date.js'
import { useMissionPlusRanking } from '@/views/reports/missionPlus/admin-report/missions/ranking/useMissionsPlusRanking.js'
import { computed, onMounted, ref } from 'vue'

const {
  getGuidesOverviewClass,
  getRankingData,
  missions,
  missionsLoading,
  selectedMission,
  selectedPeriod,
  ALL_PERIOD,
} = useMissionPlusRanking()

const disabledPeriod = ref(false)
const monthsSelectOptions = [ALL_PERIOD, ...getMonthList()]

const setTooltip = computed(
  () =>
    'Esta missão possui um período definido. Para filtrar por período, selecione todas as missões. ',
)

const changeSubject = async () => {
  await getGuidesOverviewClass()
}

const changeMissionStatus = () => {
  disabledPeriod.value = selectedMission.value?.id != null

  if (disabledPeriod.value) {
    selectedPeriod.value = ALL_PERIOD
  }

  getRankingData()
}

const changeMissionPeriod = () => {
  getRankingData()
}

onMounted(() => {
  getGuidesOverviewClass()
})

</script>
