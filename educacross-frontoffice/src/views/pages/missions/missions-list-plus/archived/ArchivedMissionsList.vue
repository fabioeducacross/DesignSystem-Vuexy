<template>
  <div id="archivedMissionsList">
    <ListTableSelect
      ref="archivedMissionsList"
      :loading="loading"
      :table-columns="columnsDefinitions"
      :data-table="missions"
      :total-data="totalData"
      :show-select-all="false"
      search-placeholder="Pesquisar missão"
      @change="handleTableChange"
      @input="setSelectedMissions"
    >
      <template #cell(createdBy)="{ item }">
        <b-img-lazy v-b-tooltip="item.createdBy" v-bind="userProps" :src="item.imageUrl" />
      </template>
      <template #cell(progress)="{ value }">
        <ProgressBarHorizontalV2
          reverse
          height="12px"
          :value="value"
          :get-variant="getColorsEnum"
        />
      </template>
      <template #cell(situation)="{ value }">
        <b-badge pill :variant="`light-${missionStatusEnum[value].variant}`">
          {{ missionStatusEnum[value].label }}
        </b-badge>
      </template>
      <template #cell(actions)="{ item }">
        <div class="d-flex justify-content-end">
          <b-dropdown variant="link" no-caret toggle-class="p-0" left>
            <template v-slot:button-content>
              <span class="material-symbols-outlined text-primary cursor-pointer align-middle">
                more_vert
              </span>
            </template>

            <b-dropdown-item
              v-for="(action, index) in dropdownActions"
              v-show="action.isShow(item)"
              :key="index"
              :disabled="!action.isEnabled(item)"
              @click.stop="action.isEnabled(item) ? action.action(item) : null"
            >
              <span
                :class="`d-flex align-items-center gap-1 ${
                  action.isEnabled(item) ? action.class : 'text-muted cursor-default'
                } `"
              >
                <span class="material-symbols-outlined"> {{ action.icon }} </span>
                {{ action.label }}
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </template>
    </ListTableSelect>
    <LegendEnum :legends="legends" />

    <b-modal
      v-model="showDetailsMission"
      size="lg"
      centered
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      title="Detalhes da Missão"
      static
      @close="showDetailsMission = false"
    >
      <MissionDetails v-if="showDetailsMission" :guide-id="selectedGuide.id" />
    </b-modal>

    <b-modal
      v-model="showShareGuide"
      size="lg"
      hide-footer
      centered
      @close="showShareGuide = false"
    >
      <ShareGuide
        :guide-obj="selectedGuide"
        @close="showShareGuide = false"
        @close-and-update="closePromptActionAndRefreshList()"
      />
    </b-modal>
  </div>
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import { progress } from '@/consts/legends/progressEnum.js'
import { EGuideSituation, missionStatusEnum } from '@/consts/missionsEnum.js'
import { formattedDate } from '@/filters/filters'
import router from '@/router'
import store from '@/store'
import ProgressBar from '@/views/pages/admin-context/shared/table-columns-components/ProgressBar.vue'
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'

const instance = getCurrentInstance()
const vm = instance.proxy

const archivedMissionsList = ref(null)

const accessName = computed(() => store.getters.accessUserData?.Name)

const missions = computed(() => store.getters['archivedMissionsModule/missions'])
const setSelectedMissions = e => store.commit('archivedMissionsModule/selectedMissions', e.value)
const pageSize = computed(() => store.getters['archivedMissionsModule/pageSize'])
const totalData = computed(() => store.getters['archivedMissionsModule/totalData'])
const page = computed(() => store.getters['archivedMissionsModule/page'])
const loading = computed(() => store.getters['archivedMissionsModule/loading'])

const columnsDefinitions = [
  { key: 'name', label: 'nome da missão', tdClass: 'font-bold' },
  { key: 'createdBy', label: 'autor' },
  { key: 'start', label: 'INÍCIO', formatter: value => `${formattedDate(value)}` },
  { key: 'expiration', label: 'FIM', formatter: value => `${formattedDate(value)}` },
  {
    key: 'progress',
    label: 'Progresso da turma',
  },
  {
    key: 'situation',
    label: 'Status',
    tooltip: `
              <div class="text-justify">
                • Não enviado: A Missão já foi criada e você poderá enviá-la aos alunos, editá-la ou excluí-la'.
              <br />
              <br />
              • Não iniciado: A Missão já foi enviada, mas a data de início não chegou. Você ainda poderá editá-la ou excluí-la.
              <br />
              <br />
              • Iniciado: A Missão está sendo realizada pelos alunos e você poderá ver o relatório.
              <br />
              <br />
              • Finalizado: A Missão foi finalizada e você poderá ver o relatório.
              <br />
              <br />
              • Cancelado: O envio da missão foi cancelado.
                </div>
              `,
  },
  {
    key: 'actions',
    label: 'ações',
    tdClass: 'actionsCol',
    tooltip:
      'As missões criadas por outros professores não podem ser compartilhadas ou excluídas por você. Somente missões finalizadas podem ser arquivadas e somente missões iniciadas possuem link de acesso.',
  },
]

const userProps = {
  blank: true,
  width: 45,
  height: 45,
  blankColor: '#bbb',
  rounded: 'circle',
}

const selectedGuide = ref(null)
const showDetailsMission = ref(false)
const showShareGuide = ref(false)

const openDetailsMission = guide => {
  showDetailsMission.value = true
  selectedGuide.value = guide
}

const shareGuide = mission => {
  if (accessName.value === mission.createdBy) {
    selectedGuide.value = mission
    showShareGuide.value = true
  }
}

const closePromptActionAndRefreshList = () => {
  showShareGuide.value = false
  store.dispatch('archivedMissionsModule/fetchData')
}

const handleTableChange = ctx => {
  store.commit('archivedMissionsModule/params', ctx)
  store.dispatch('archivedMissionsModule/fetchData')
}

onMounted(() => {
  vm.$bus.on('archivedMissionsListReset', () => {
    archivedMissionsList.value.resetSelectedItems()
  })
})

onUnmounted(() => {
  vm.$bus.off('archivedMissionsListReset')
})

const getColorsEnum = value => {
  return getVariantByRule(value, 'progress')
}

const legends = [{ text: 'Turnos finalizados', enum: progress }]

const dropdownActions = [
  {
    icon: 'visibility',
    label: 'Detalhes',
    class: 'text-primary',
    isShow: () => true,
    isEnabled: () => true,
    action: item => {
      openDetailsMission(item)
    },
  },
  {
    icon: 'pie_chart',
    label: 'Relatório',
    class: 'text-primary',
    isShow: item =>
      item.situation === EGuideSituation.Started ||
      item.situation === EGuideSituation.Finished ||
      item.situation === EGuideSituation.Cancelled,
    isEnabled: item =>
      item.situation === EGuideSituation.Started ||
      item.situation === EGuideSituation.Finished ||
      item.situation === EGuideSituation.Cancelled,
    action: item => {
      router.push(`/teacher/reports/missions/${item.id}`)
    },
  },
  {
    icon: 'share',
    label: 'Link da missão',
    class: 'text-primary',
    isShow: item => item.guideLinkUrl && item.situation === EGuideSituation.Started,
    isEnabled: item => accessName !== item.createdBy,
    action: item => {
      shareGuide(item)
    },
  },
]
</script>

<style lang="scss">
  #archivedMissionsList .actionsCol {
    max-width: 220px;
  }
</style>