<template>
  <section>
    <ListTable
      :loading="loadingSharedMissions"
      :table-columns="columnsDefinitions"
      :data-table="sharedMissions"
      :total-data="totalData"
      :per-page="pageSize"
      :current-page="currentPage"
      :show-select-all-label="false"
      search-placeholder="Pesquisar missão"
      @change="handleTableChange"
    >
      <template #cell(name)="{ item }">
        <span class="font-bold">{{ item.name }}</span>
        <div v-if="item.isCustoMissionPlus" class="flex gap-1">
          <b-badge variant="light-primary" pill class="d-flex align-items-center gap-1">
            <img
              class="d-inline-block v-align-middle"
              alt="Missão Plus"
              width="16"
              height="16"
              :src="require(`@/assets/images/teacher-context/new-mission/customplus-icon.svg`)"
            />
            Missão Plus
          </b-badge>
        </div>
      </template>

      <template #cell(serieName)="{ item }">
        <b-badge pill variant="light-primary">{{ item.serieName }}</b-badge>
      </template>

      <template #cell(teacherName)="{ item }">
        <b-img-lazy v-b-tooltip="item.teacherName" v-bind="userProps" :src="item.teacherImgUrl" />
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
          <span
            v-b-tooltip.hover.top="'Detalhes da missão'"
            class="material-symbols-outlined text-primary cursor-pointer"
            @click.stop="openDetailsMission(item)"
          >
            visibility
          </span>

          <span
            v-b-tooltip.hover.top="'Usar missão'"
            class="material-symbols-outlined text-primary cursor-pointer"
            @click.stop="useMission(item)"
          >
            input
          </span>
        </div>
      </template>
    </ListTable>

    <b-modal
      v-model="activePromptGuideFeedbackConfirmation"
      centered
      size="lg"
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      static
      @close="activePromptGuideFeedbackConfirmation = false"
    >
      <guide-feedback-confirmation
        v-if="activePromptGuideFeedbackConfirmation"
        :guide-obj="missionDetailModal"
        @close-guideFeedbackConfirmation="activePromptGuideFeedbackConfirmation = false"
      />
    </b-modal>

    <b-modal
      v-model="showDetailsMission"
      centered
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      size="lg"
      static
      title="Detalhes da Missão"
      @close="showDetailsMission = false"
    >
      <MissionDetails
        v-if="showDetailsMission && !selectedMission.isCustoMissionPlus"
        :guide-id="selectedMission.id"
      />
      <MissionDetailsPlus
        v-if="showDetailsMission && selectedMission.isCustoMissionPlus"
        :guide-id="selectedMission.id"
      />
    </b-modal>
  </section>
</template>

<script setup>
import ListTable from '@/components/table/ListTable.vue'
import store from '@/store'
import GuideFeedbackConfirmation from '@/views/pages/teacher-context/shared/modals/GuideFeedbackConfirmation.vue'
import { ref, watch, computed } from 'vue'

const activePromptGuideFeedbackConfirmation = ref(false)
const missionDetailModal = ref('')

const showDetailsMission = ref(false)
const selectedMission = ref(null)

const loadingSharedMissions = computed(
  () => store.getters['sharedMissionsModule/loadingSharedMissions'],
)

const sharedMissions = computed(() => {
  return store.getters['sharedMissionsModule/sharedMissions']
})

const selectedMissionType = computed(() => {
  return store.getters['sharedMissionsModule/selectedMissionType']
})

const selectedSchoolYear = computed(() => {
  return store.getters['sharedMissionsModule/selectedSchoolYear']
})

const currentPage = computed(() => store.getters['sharedMissionsModule/currentPage'])
const pageSize = computed(() => store.getters['sharedMissionsModule/pageSize'])
const totalData = computed(() => store.getters['sharedMissionsModule/totalData'])

const columnsDefinitions = [
  { key: 'name', label: 'Nome da missão', searchable: true },
  { key: 'serieName', label: 'Ano escolar' },
  { key: 'teacherName', label: 'Autor' },
  {
    key: 'actions',
    label: 'Ações',
    thStyle: { width: '60px' },
  },
]

const useMission = mission => {
  missionDetailModal.value = mission
  activePromptGuideFeedbackConfirmation.value = true
}

const userProps = {
  blank: true,
  width: 45,
  height: 45,
  blankColor: '#bbb',
  rounded: 'circle',
}

const openDetailsMission = mission => {
  selectedMission.value = mission
  showDetailsMission.value = true
}

const filterSharedMissions = async () => {
  await store.dispatch('sharedMissionsModule/fetchSharedMissions')
}

const changePage = page => {
  store.commit('sharedMissionsModule/setCurrentPage', page)
}

const handleTableChange = ({ currentPage, perPage, searchQuery }) => {
  store.commit('sharedMissionsModule/setPageSize', perPage)
  store.commit('sharedMissionsModule/setCurrentPage', currentPage)

  store.commit('sharedMissionsModule/setSearchQuery', searchQuery)
  filterSharedMissions()
}

watch(currentPage, () => {
  filterSharedMissions()
})

watch([selectedMissionType, selectedSchoolYear], () => {
  if (currentPage.value !== 1) {
    changePage(1)
  } else {
    filterSharedMissions()
  }
})
</script>