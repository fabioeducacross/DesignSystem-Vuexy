<template>
  <section>
    <b-card :class="currentItemClass" body-class="p-0" class="shadow-none">
      <b-row align-v="center" class="p-1">
        <b-col cols="12" md>
          <span
            class="text-primary cursor-pointer d-flex align-items-center mb-2 mb-md-0"
            @click="back"
          >
            <span class="material-symbols-outlined" style="font-size: 14px"> arrow_back_ios </span>
            <span class="underline">Voltar</span>
          </span>
        </b-col>
        <b-col v-if="currentTabConfig.showAudio" cols="12" md>
          <b-skeleton-wrapper :loading="loading">
            <template v-slot:loading>
              <b-skeleton width="100%"></b-skeleton>
            </template>
            <div class="d-flex justify-content-center mb-2 mb-md-0">
              <audio :src="audioFileUrl" controls preload="metadata" style="height: 30px"></audio>
            </div>
          </b-skeleton-wrapper>
        </b-col>
        <b-col cols="12" md>
          <div v-if="tabsListEnabled">
            <b-skeleton-wrapper :loading="loading">
              <template v-slot:loading>
                <div class="d-flex flex-column align-items-end">
                  <b-skeleton width="200px"></b-skeleton>
                  <b-skeleton width="180px"></b-skeleton>
                </div>
              </template>
              <div class="d-flex flex-column align-items-end gap-1">
                <div>Ultimo acesso em: {{ lastAccessDate | formatDate }}</div>
                <div>
                  <div
                    :class="`text-${proficiency.variant} `"
                    class="small font-weight-bolder d-flex align-items-center gap-1"
                  >
                    <span
                      :class="{
                        'cursor-pointer':
                          currentProficiency.changeLevel && currentTabConfig.showCustomMessage,
                      }"
                      @click="changeProficiency"
                    >
                      <BadgeStatusReadingExpedition
                        :enum="
                          currentProficiency.level
                            ? 'ProficiencyTestStatusEnum'
                            : 'ExpeditionStageStatusEnum'
                        "
                        :pill="!currentProficiency.changeLevel"
                        :value="
                          currentProficiency.level
                            ? currentProficiency.level
                            : currentProficiency.status
                        "
                      />
                    </span>
                  </div>
                </div>
              </div>
            </b-skeleton-wrapper>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-skeleton-wrapper :loading="loadingChallenges">
            <template v-slot:loading>
              <div class="px-1">
                <b-row>
                  <b-col v-for="index in 4" :key="index" cols="12" md>
                    <b-skeleton height="38px" width="100%"></b-skeleton>
                  </b-col>
                </b-row>
              </div>
            </template>
            <b-tabs
              v-model="tabIndex"
              fill
              justified
              nav-class="gap-2 px-1"
              pills
              @input="changedTab"
            >
              <b-tab
                v-for="(tab, index) in tabsList"
                :key="tab.id"
                :class="{ 'opacity-50': tab.disabled }"
                :disabled="tab.disabled"
                :title="tab.label"
                :title-link-class="linkClass(index, tab.disabled)"
                lazy
              >
                <component :is="tab.component" />
              </b-tab>
            </b-tabs>
            <NotFound v-if="!tabsListEnabled" />
          </b-skeleton-wrapper>
        </b-col>
      </b-row>
    </b-card>

    <div v-if="currentTabConfig.showCustomMessage">
      <ChangeEvaluation
        :current-proficiency="currentProficiency"
        :stage="unitId"
        :student-id="parseInt(studentId)"
        :type="currentTabConfig.id"
      />
    </div>

    <LegendEnum v-if="currentTabConfig.showLegend" :legends="currentTabConfig.legend">
      <template v-slot:enum-component="{ value }">
        <QuestionStatus v-if="value.layout === 'QuestionStatus'" :status="value.id">
          <span> {{ value.text }}</span>
        </QuestionStatus>
      </template>
    </LegendEnum>
  </section>
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import QuestionStatus from '@/components/question/QuestionStatus.vue'
import {
  CompreehensionChallengeQuestionStatusEnum,
  EExpeditionStageStatus,
  EExpeditionType,
  getProficiencyTestStatusEnum,
  IndicatorsLegend,
  ReadingMeterWordStatusEnumLegend,
  peformanceExpeditionLegend,
} from '@/consts/ReadingExpeditionEnum.js'
import { learningPerformanceLegend } from '@/consts/legends/performanceEnum.js'
import router from '@/router'
import store from '@/store'
import readingExpeditionUnitStudentModule from '@/store/pageModules/readingExpedition/readingExpeditionUnitStudentModule.js'
import formatDate from '@/utils/date.js'
import ChangeEvaluation from '@/views/pages/reading-expedition/components/ChangeEvaluation.vue'
import CustomBadge from '@/views/pages/reading-expedition/components/CustomBadge.vue'
import NotFound from '@/views/pages/reading-expedition/components/NotFound.vue'
import SidebarInfo from '@/views/pages/reading-expedition/components/SidebarInfo.vue'
import BadgeStatusReadingExpedition from '@/views/pages/reading-expedition/overview/components/BadgeStatusReadingExpedition.vue'
import { computed, getCurrentInstance, onUnmounted, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy

const moduleName = 'readingExpeditionUnitStudentModule'
store.registerModule(moduleName, readingExpeditionUnitStudentModule)

const studentName = computed(() => store.getters['ReadingExpeditionModule/studentName'])

const updateBreadcrumb = () => {
  const unit = store.getters['ReadingExpeditionModule/unit']
  vm.$bus.emit('setBreadcrumb', [null, unit?.unitName, studentName.value])
}

watch(studentName, () => {
  vm.$bus.emit('setTabTitle', studentName.value)
  updateBreadcrumb()
})

const { studentId } = router.currentRoute.params

store.commit('readingExpeditionUnitStudentModule/studentId', studentId)

const unitId = computed(() => store.getters['ReadingExpeditionModule/unitId'])

const loading = computed(() => store.getters['readingExpeditionUnitStudentModule/loading'])
const loadingChallenges = computed(
  () => store.getters['readingExpeditionUnitStudentModule/loadingChallenges'],
)

const totalSeconds = computed(
  () => store.getters['readingExpeditionUnitStudentModule/totalSeconds'],
)

const currentItemClass = computed(
  () => store.getters['ReadingExpeditionModule/currentUnitClass'],
)

const challenges = computed(
  () => store.getters['readingExpeditionUnitStudentModule/challenges'],
)

const audioFileUrl = computed(
  () => store.getters['readingExpeditionUnitStudentModule/audioFileUrl'],
)
const lastAccessDate = computed(
  () => store.getters['readingExpeditionUnitStudentModule/lastAccessDate'],
)

const currentProficiency = computed(
  () => store.getters['readingExpeditionUnitStudentModule/currentProficiency'],
)

const back = () => {
  router
    .push({
      name: 'readingExpeditionUnit',
      params: { unitId: unitId.value },
    })
    .catch(() => {})
}

// TABS

const tabsConfig = [
  {
    id: EExpeditionType.UnderstandingChallenge,
    label: 'Desafio de Compreensao',
    component: 'CompreehensionChallenge',
    showLegend: true,
    showCustomMessage: false,
    showAudio: false,
    legend: [
      {
        text: 'Questoes',
        enum: CompreehensionChallengeQuestionStatusEnum,
      },
      peformanceExpeditionLegend,
    ],
  },

  {
    id: EExpeditionType.WritingChallenge,
    label: 'Desafio de Escrita',
    component: 'WritingChallenge',
    showLegend: false,
    showCustomMessage: true,
    showAudio: false,
    legend: [],
  },

  {
    id: EExpeditionType.ExpeditionGuides,
    label: 'Trilha de Jogos',
    component: 'GamesTrail',
    showLegend: true,
    showCustomMessage: false,
    showAudio: false,
    legend: [learningPerformanceLegend],
  },
  {
    id: EExpeditionType.ReadingChallenge,
    label: 'Desafio de Leitura',
    component: 'ReadingChallenge',
    showLegend: true,
    showCustomMessage: true,
    showAudio: true,
    legend: [IndicatorsLegend, ReadingMeterWordStatusEnumLegend],
  },
]

const tabIndex = ref(0)

const changedTab = () => {
  store.commit('readingExpeditionUnitStudentModule/loading', true)
}

const linkClass = (idx, disabled) => {
  const color = disabled ? 'light-gray' : 'primary'
  const baseClasses = `border-${color} h-100 d-flex align-items-center justify-content-center`
  const textClass = tabIndex.value === idx ? 'text-white' : `text-${color}`
  return `${baseClasses} ${textClass}`
}

const tabsList = computed(() => {
  return tabsConfig
    .filter(tab => {
      const matchingType = challenges.value.find(type => type.type === tab.id)
      return matchingType !== undefined
    })
    .map(tab => {
      return {
        ...tab,
        disabled: !challenges.value.find(type => type.type === tab.id).studentFinish,
      }
    })
})

const tabsListEnabled = computed(() => {
  return tabsList.value.some(tab => !tab.disabled)
})

const currentTabConfig = computed(() => {
  return tabsList.value[tabIndex.value] || {}
})

const proficiency = computed(() => {
  if (currentProficiency.value.status === undefined) return {}

  return (
    getProficiencyTestStatusEnum(
      currentProficiency.value.level ? currentProficiency.value.level : 0,
    ) || {}
  )
})

const changeProficiency = () => {
  if (!currentProficiency.value.changeLevel) return
  if (!currentTabConfig.value.showCustomMessage) return
  if (currentProficiency.value.status !== EExpeditionStageStatus.Finished) return
  vm.$bus.emit(
    'changeProficiency',
    {
      status: EExpeditionStageStatus.Finished,
      level: proficiency.value.id,
      changeLevel: currentProficiency.value.changeLevel,
    },
    {
      status: EExpeditionStageStatus.Finished,
      level: currentProficiency.value.changeLevel,
      changeLevel: null,
    },
  )
}

const fetchUnitDetails = () => {
  if (unitId.value) {
    store.dispatch('readingExpeditionUnitStudentModule/fetchChallenges')
    updateBreadcrumb()
  }
}

watch([unitId], () => {
  fetchUnitDetails()
})

onUnmounted(() => {
  store.dispatch('readingExpeditionUnitStudentModule/reset')
  store.unregisterModule(moduleName)
})
</script>

<style lang="scss" scoped>
  .border-gray {
    border-width: 1px;
    border-style: solid;
  }
</style>
