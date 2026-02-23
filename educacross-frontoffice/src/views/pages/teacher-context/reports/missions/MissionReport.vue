<template>
  <div>
    <Tab :tabs="tabs" v-model="currentTab">
      <!-- ALUNOS -->
      <template v-slot:tab-content-0>
        <MissionReportPageTitle :data="missionDetails" :loading="missionDetails.loading" />
        <MissionReportStudents @mission-details="setMissionDetails" />
      </template>

      <!-- JOGOS -->
      <template v-slot:tab-content-1>
        <MissionReportPageTitle :data="missionDetails" :loading="missionDetails.loading" />
        <MissionReportGames
          ref="loadingInReportActivitiesComponet"
          @mission-details="setMissionDetails"
        />
      </template>

      <!-- RANKING -->
      <template v-slot:tab-content-2>
        <MissionReportPageTitle :data="missionDetails" :loading="missionDetails.loading" />
        <MissionReportRanking :data="missionDetails" />
      </template>
    </Tab>
  </div>
</template>

<script setup>
import LoadingInComponent from '../../shared/components/LoadingInComponent.vue'
import ActivityDetail from '../../shared/modals/ActivityDetail.vue'
import MissionReportGames from './tabs/MissionReportGames.vue'
import MissionReportRanking from './tabs/MissionReportRanking.vue'
import MissionReportStudents from './tabs/MissionReportStudents.vue'
import MissionReportPageTitle from './tabs/components/MissionReportPageTitle.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import Tab from '@/components/tab/Tab.vue'
import { getCurrentInstance, reactive, ref } from 'vue'

const breadcrumbRoot = ref(null)
const tabs = ref([{ title: 'Alunos' }, { title: 'Jogos' }])
const currentTab = ref(0)
const missionDetails = reactive({
  name: null,
  date: null,
  type: null,
  loading: true,
})
const isHighfiveMissionReportPage = ref(null)
const vm = getCurrentInstance().proxy

/**
 * @param {number} index
 * @returns {void}
 */
const changeTab = index => {
  currentTab.value = index
}

/**
 * @typedef DataParam
 * @property {string} name
 * @property {string} date
 * @property {number} type
 * @property {boolean} loading
 *
 * @param {DataParam} data
 */
const setMissionDetails = data => {
  Object.assign(
    missionDetails,
    Object.fromEntries(Object.entries(data).filter(v => v !== undefined)),
  )
}

const created = () => {
  const path = vm.$route.fullPath
  if (!path.includes('/teacher/reports/highfive')) {
    tabs.value.push({ title: 'Ranking da Missão' })
  }
  breadcrumbRoot.value = vm.$route.meta.breadcrumb[0].text
}

created()
</script>