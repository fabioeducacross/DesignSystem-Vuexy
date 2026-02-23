<template>
  <section>
    <b-row class="px-1">
      <b-col>
        <b-form-group label="Missão" label-for="mission">
          <ESelect
            id="mission"
            label="name"
            :value="mission"
            :options="missions"
            :clearable="false"
            :loading="missionsLoading"
            :disabled="missionsLoading"
            @input="setMission"
          >
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <ListTableLocalSorting
          ref="listTable"
          :table-columns="tableColumns"
          :data-table="dataTable"
          :total-data="totalData"
          search-placeholder="Pesquisar por jogo"
          :loading="loading"
          :export-to-excel="exportExcell"
          :generating-excel="generatingExcel"
          @change="changeListTable"
        >
          <template #cell(name)="{ item }">
            <div class="d-flex align-items-center gap-3">
              <div class="game-image-container">
                <img :src="item.imageUrl" alt="" />
              </div>
              <div class="d-flex flex-grow align-items-center gap-2">
                <span
                  v-b-tooltip="'Detalhes do jogo'"
                  class="font-bold text-primary underline cursor-pointer"
                  @click="handleOpenGameDetailModal(item.activityId)"
                >
                  {{ item.name }}
                </span>
                <span
                  v-b-tooltip="'Detalhes do jogo'"
                  class="material-symbols-outlined text-primary cursor-pointer"
                  @click="handleOpenGameDetailModal(item.activityId)"
                >
                  visibility
                </span>
              </div>
            </div>
          </template>
          <template #cell(performance)="{ item }">
            <PerformanceCell :performance="item.performance" enum="learningPerformance" />
          </template>
          <template #cell(totalTime)="{ value }">
            <div class="d-flex align-items-center gap-1">
              <span class="material-symbols-outlined" :style="`font-size: 18px`"> pace </span>
              <span class="font-bold">{{ value | formattedTime }}</span>
            </div>
          </template>

          <template #cell(actions)="{ item }">
            <div class="text-nowrap d-flex align-items-center gap-3">
              <span
                v-for="(action, index) in tableActions"
                :key="index"
                v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
                :class="
                  action.isEnabled(item)
                    ? `${action.color} cursor-pointer`
                    : 'cursor-not-allowed text-muted'
                "
                class="material-symbols-outlined"
                @click.stop="action.isEnabled(item) ? action.action(item) : null"
              >
                {{ action.icon }}
              </span>
            </div>
          </template>
        </ListTableLocalSorting>
        <GameDetailsModal
          v-model="openGameDetailModal"
          :selected-activity-id="selectedActivityId"
        />

        <StudentGameDetailsModal
          v-model="openStudentDetailModal"
          :is-loading="isLoadingStudentDetailsModal"
          :data="studentDetailModalData"
          :student-name="studentName"
        />
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
  import PerformanceCell from '@/components/cells/PerformanceCell.vue'
  import GameDetailsModal from '@/components/modal/GameDetailsModal.vue'
  import StudentGameDetailsModal from '@/components/modal/StudentGameDetailsModal.vue'
  import ESelect from '@/components/selects/ESelect.vue'
  import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
  import { EExpeditionStageStatus } from '@/consts/ReadingExpeditionEnum.js'
  import { getVariantByRule } from '@/consts/legends/index.js'
  import { SubjectEnum } from '@/consts/teacher-context/enums/subjectEnum.js'
  import router from '@/router'
  import {
    gamesTrailExportExcel,
    getGamesTrailMissionsList,
  } from '@/services/shared/reading-expedition/reading-expedition.service.js'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters'
  import readingExpeditionUnitStudentGameTrailModule from '@/store/pageModules/readingExpedition/readingExpeditionUnitStudentGameTrailModule.js'
  import { sanitizeString } from '@/utils/utils'
  import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
  import { saveAs } from 'file-saver'
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

  const moduleName = 'readingExpeditionUnitStudentGameTrailModule'
  store.registerModule(moduleName, readingExpeditionUnitStudentGameTrailModule)

  onUnmounted(() => {
    store.dispatch('readingExpeditionUnitStudentGameTrailModule/reset')
    store.unregisterModule(moduleName)
  })

  const { subject } = useFilters()
  subject.value = { id: SubjectEnum.portuguese }

  const generatingExcel = ref(false)
  const missionsLoading = ref(false)

  const missions = ref([
    {
      id: null,
      name: 'Todas as missões',
    },
  ])

  const mission = ref(missions.value[0])
  const setMission = m => {
    mission.value = m
    store.commit('readingExpeditionUnitStudentGameTrailModule/guide', m)
    store.commit('readingExpeditionUnitStudentGameTrailModule/params', {})
    store.dispatch('readingExpeditionUnitStudentGameTrailModule/fetchGamesTrail')
  }

  const fetchMissions = async () => {
    const { studentId, unitId } = router.currentRoute.params
    missionsLoading.value = true
    try {
      const res = await getGamesTrailMissionsList(studentId, { stage: unitId })
      missions.value = [...missions.value, ...res.data]
    } finally {
      missionsLoading.value = false
    }
  }

  const studentName = computed(() => store.getters['ReadingExpeditionModule/studentName'])

  const exportExcell = async () => {
    const { unitId, studentId } = router.currentRoute.params

    generatingExcel.value = true

    const unitName = store.getters['ReadingExpeditionModule/unit']?.unitName

    const fileName = sanitizeString(
      `Expedicao Leitora - ${unitName} - Trilha de Jogos - ${studentName.value}`,
    )

    const res = await gamesTrailExportExcel(studentId, { stage: unitId }, fileName)

    const excelBlob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officed' })

    saveAs(excelBlob, `${fileName}.xlsx`)

    generatingExcel.value = false
  }

  const tableColumns = [
    {
      key: 'name',
      label: 'NOME DO JOGO',
      sortable: true,
      searchable: true,
    },
    {
      key: 'name',
      label: 'MISSÃO',
      sortable: true,
    },
    {
      key: 'challengesDone',
      label: 'DESAFIOS REALIZADOS',
      sortable: true,
    },
    {
      key: 'totalTime',
      label: 'TEMPO INVESTIDO',
      sortable: true,
    },
    {
      key: 'performance',
      label: 'RENDIMENTO',
      sortable: true,
    },
    {
      key: 'actions',
      label: 'AÇÕES',
      sortable: false,
    },
  ]

  const tableActions = [
    {
      icon: 'visibility',
      tooltip: () => {
        return ''
      },
      isEnabled: () => true,
      color: 'text-primary',
      action: data => {
        store.commit('readingExpeditionUnitStudentGameTrailModule/activityId', data.activityId)
        handleOpenStudentDetailModal(data.activityId, data.guideId)
      },
    },
  ]

  const totalData = computed(
    () => store.getters['readingExpeditionUnitStudentGameTrailModule/total'],
  )
  const loading = computed(
    () => store.getters['readingExpeditionUnitStudentGameTrailModule/loading'],
  )
  const data = computed(() => store.getters['readingExpeditionUnitStudentGameTrailModule/data'])
  const dataTable = computed(() => data.value.activities || [])

  watch(data, () => {
    store.dispatch('readingExpeditionUnitStudentModule/setChallengeDetails', {
      lastAccessDate: data.value.date,
      totalSeconds: data.value.time,
      currentProficiency: {
        status: EExpeditionStageStatus.Finished,
        level: data.value.level,
        changeLevel: null,
      },
    })
  })

  const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
    store.commit('readingExpeditionUnitStudentGameTrailModule/params', {
      Search: searchQuery,
      OrderBy: sortBy || '0',
      Ascending: `${!isSortDirDesc}`,
      Page: currentPage,
      PageSize: perPage,
    })
    store.dispatch('readingExpeditionUnitStudentGameTrailModule/fetchGamesTrail')
  }
  onMounted(() => {
    store.dispatch('readingExpeditionUnitStudentGameTrailModule/fetchGamesTrail')
  })
  const openGameDetailModal = ref(false)
  const selectedActivityId = ref(null)

  const handleOpenGameDetailModal = activityId => {
    openGameDetailModal.value = true
    selectedActivityId.value = activityId
  }

  const openStudentDetailModal = ref(false)

  const isLoadingStudentDetailsModal = computed(
    () =>
      store.getters['readingExpeditionUnitStudentGameTrailModule/loadingStudentDetailsModal'],
  )

  const studentDetailModalData = computed(
    () => store.getters['readingExpeditionUnitStudentGameTrailModule/studentDetailsModal'],
  )

  const handleOpenStudentDetailModal = (activityId, guideId) => {
    openStudentDetailModal.value = true
    store.dispatch('readingExpeditionUnitStudentGameTrailModule/fetchStudentDetails', {
      activityId,
      guideId,
    })
  }

  fetchMissions()

</script>

<style lang="scss" scoped>
  .game-image-container {
    height: 48px;
    width: 48px;
  }
</style>