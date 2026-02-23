<template>
  <div>
    <p class="title-classes color-patternTwo mt-2">{{ $t('missionReports') }}</p>
    <p class="text-classes color-patternTwo mt-2 mb-2">
      {{ $t('trackActiveMissionReports') }}
    </p>
    <b-card>
      <SelectSubject />
    </b-card>
    <ModuleError
      v-if="feedbackGeneralError.message.length > 0 && !loading"
      :data-list-length="reportsData.length"
      :server-errors-message="feedbackGeneralError"
      custom-empty-message="noActiveMissions"
    />
    <ListTableLocalSorting
      v-else
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="reportsData"
      show-view-selection
      search-placeholder="searchMission"
      empty-text="noActiveMissions"
    >
      <template #cell(missionName)="{ item }">
        <div class="text-wrap mb-50" style="min-width: 100px">
          <span class="align-text-top font-bold">{{ item.missionName }}</span>
        </div>
        <div class="d-flex">
          <img
            v-if="item.type === 3"
            v-b-tooltip.hover.top="$t('collectiveMission')"
            src="@/assets/icons/mission-icons/missao-coletiva.svg"
            class="mr-1"
          />
          <img
            v-if="item.type === 1"
            v-b-tooltip.hover.top="$t('individualMission')"
            src="@/assets/icons/mission-icons/missao-individual.svg"
            class="mr-1"
          />
          <img
            v-if="item.type === 2"
            v-b-tooltip.hover.top="$t('mixedMission')"
            src="@/assets/icons/mission-icons/missao-mista.svg"
            class="mr-1"
          />
        </div>
      </template>

      <template #cell(enabled)="{ item }">
        <b-badge pill :variant="item.enabled ? 'light-success' : 'light-danger'">
          {{ item.enabled ? $t('enabled') : $t('disabled') }}
        </b-badge>
      </template>

      <template #cell(progress)="{ item }">
        <ProgressBarHorizontal
          :value="item.progress"
          :progress-bar-colors="[
            {
              variant: 'primary',
              min: 0,
            },
          ]"
        />
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in actions"
            :key="index"
            v-b-tooltip.hover.top="$t(action.tooltip(item))"
            class="text-primary cursor-pointer material-symbols-outlined"
            @click="action.action(item)"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>

      <template v-slot:card="{ data }">
        <EducationSystemReportsCard :data="data" :actions="actions" />
      </template>
    </ListTableLocalSorting>
  </div>
</template>

<script setup>
import ModuleError from '../shared/components/ModuleError.vue'
import EducationSystemReportsCard from './components/EducationSystemReportsCard.vue'
import ProgressBarHorizontal from '@/components/progessBar/ProgressBarHorizontal.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getEducationSystemMissionReports } from '@/services/teacher-context/educationSystem/EducationSystem.Service'
import useFilters from '@/store/filters/useFilters'
import { ref, watch, onMounted, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy
const { classe, subject, educationSystemId } = useFilters()

const loading = ref(true)

const tableColumns = [
  { key: 'missionName', label: 'missionName', sortable: true, searchable: true },
  { key: 'bookName', label: 'Book', sortable: false },
  { key: 'enabled', label: 'Status', sortable: false },
  {
    key: 'progress',
    label: 'Progress',
    sortable: false,
    tooltip: 'completedGamesPercentage',
  },
  { key: 'actions', label: 'actions', sortable: false },
]

const reportsData = ref([])

const actions = [
  {
    icon: 'article',
    tooltip: () => 'report',
    label: 'ViewReport',
    action: data => {
      router.push({
        name: `MissionReportEducationSystem${educationSystemId.value}`,
        params: {
          educationSystemId: educationSystemId.value,
          missionId: data.missionId,
        },
      })
    },
  },
]

const feedbackGeneralError = ref({
  status: 0,
  message: [],
  errorDictionary: [],
})

const getEducationSystemsReports = () => {
  loading.value = true
  getEducationSystemMissionReports({
    educationSystemId: educationSystemId.value,
    subjectId: subject.value.id,
    classId: classe.value.ClassId,
  })
    .then(response => {
      reportsData.value = response.data
    })
    .catch(error => {
      if (error.status === 400) feedbackGeneralError.value = error
    })
    .finally(() => {
      loading.value = false
    })
}

const initialSettings = () => {
  reportsData.value = []
  feedbackGeneralError.value.message = []
  getEducationSystemsReports()
}

onMounted(() => {
  vm.$utilTeacherService.educationSystem.setColor()
})

watch(
  [subject, educationSystemId],
  () => {
    if (educationSystemId.value) {
      initialSettings()
    }
  },
  { deep: true },
)
</script>

<style lang="scss" scoped>
  .title-classes {
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;
  }

  .text-classes {
    font-size: 16px;
    line-height: 21px;
  }

  .icon-table {
    font-size: 26px;
  }

  @media (max-width: 1330px) {
    .hiddenTable-mobile {
      display: none;
    }
  }

  .text-cardActiveList {
    font-size: 14px;
    line-height: 19px;
  }

  .bgcolor-patternTen {
    transition: all 0.8s ease;
  }

  .situation-table {
    font-size: 14px;
    line-height: 19px;
    width: 120px;
    height: 33px;
  }

  @media (min-width: 1331px) {
    .hiddenCard-desktop {
      display: none;
    }
  }

  @media (max-width: 1330px) {
    .hiddenTable-mobile {
      display: none;
    }
  }
</style>

<style lang="scss" scoped>
  .material-symbols-outlined.head-icon-info {
    font-size: 16px;
  }
</style>