<template>
  <div id="archivedMissionsList">
    <ListTableSelect
      ref="archivedMissionsList"
      :loading="loading"
      :table-columns="columnsDefinitions"
      :data-table="missions"
      :total-data="totalData"
      :show-select-all-label="false"
      search-placeholder="Pesquisar missão"
      @change="handleTableChange"
      @input="setSelectedMissions"
    >
      <template #cell(name)="{ item }">
        <div style="min-width: 150px">
          <span class="font-bold">{{ item.name }}</span>
          <div v-if="item.isCustoMissionPlus" class="flex gap-1">
            <b-badge variant="light-primary" pill class="d-flex align-items-center gap-1">
              <img
                class="d-inline-block v-align-middle"
                alt="Missão Plus"
                width="16"
                height="16"
                :src="customPlusIcon"
              />
              Missão Plus
            </b-badge>
          </div>
          <div v-else class="flex gap-1">
            <b-img-lazy
              v-if="missionTypeEnum[item.type]"
              v-b-tooltip="missionTypeEnum[item.type].label"
              v-bind="iconTypeProps"
              :src="missionTypeEnum[item.type].image"
            />

            <b-img-lazy
              v-if="applicationTypeEnum[item.application]"
              v-b-tooltip.hover.bottom="applicationTypeEnum[item.application].label"
              v-bind="iconTypeProps"
              :src="applicationTypeEnum[item.application].img"
            />
          </div>
        </div>
      </template>
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
        <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
          <span
            v-for="(action, index) in tableActions"
            v-show="action.isShow(item)"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item)"
            class="material-symbols-outlined text-primary cursor-pointer"
            :class="`${action.isEnabled(item) ? action.class : 'text-muted cursor-default'} `"
            @click.stop="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTableSelect>
    <LegendEnum :legends="legends" />

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
        v-if="showDetailsMission && !selectedGuide.isCustoMissionPlus"
        :guide-id="selectedGuide.id"
      />
      <MissionDetailsPlus
        v-if="showDetailsMission && selectedGuide.isCustoMissionPlus"
        :guide-id="selectedGuide.id"
      />
    </b-modal>

    <b-modal
      v-model="showShareGuide"
      centered
      hide-footer
      size="lg"
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
import customPlusIcon from '@/assets/images/teacher-context/new-mission/customplus-icon.svg'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import { progress } from '@/consts/legends/progressEnum.js'
import {
  EGuideSituation,
  applicationTypeEnum,
  missionStatusEnum,
  missionTypeEnum,
} from '@/consts/missionsEnum.js'
import { formattedDate } from '@/filters/filters'
import router from '@/router'
import { unarchiveGuide } from '@/services/teacher-context/guides/Guides.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ProgressBar from '@/views/pages/admin-context/shared/table-columns-components/ProgressBar.vue'
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'

const vm = getCurrentInstance().proxy

const { subject, classe } = useFilters()

const accessName = computed(() => store.getters.accessUserData?.Name)

const archivedMissionsList = ref(null)

const missions = computed(() => store.getters['archivedMissionsModule/missions'])
const setSelectedMissions = e => store.commit('archivedMissionsModule/selectedMissions', e)

const totalData = computed(() => store.getters['archivedMissionsModule/totalData'])

const loading = computed(() => store.getters['archivedMissionsModule/loading'])

const columnsDefinitions = [
  { key: 'name', label: 'nome da missão', searchable: true },
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

const tableActions = [
  {
    icon: 'unarchive',
    tooltip: () => 'Desarquivar Missão',
    class: 'text-primary',
    isShow: item =>
      item.situation === EGuideSituation.Finished ||
      item.situation === EGuideSituation.Cancelled,
    isEnabled: item =>
      item.situation === EGuideSituation.Finished ||
      item.situation === EGuideSituation.Cancelled,
    action: item => {
      unarchiveMission(item.id)
    },
  },
  {
    icon: 'pie_chart',
    tooltip: () => 'Relatório da Missão',
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
      if (item.isCustoMissionPlus) {
        router.push({
          name: 'reportMissionsPlusClasse',
          params: { guideId: item.id },
        })
      } else {
        router.push({ name: 'MissionReport', params: { missionId: item.id } })
      }
    },
  },
  {
    icon: 'visibility',
    tooltip: () => 'Detalhes',
    class: 'text-primary',
    isShow: () => true,
    isEnabled: () => true,
    action: item => {
      openDetailsMission(item)
    },
  },
  {
    icon: 'share',
    tooltip: item =>
      accessName.value !== item.createdBy
        ? `Essa missão foi criada
                    pelo(a) professor(a) ${item.createdBy}, você não pode compartilha-la`
        : 'Compartilhar Missão',
    class: 'text-primary',
    isShow: item => !item.isCustoMissionPlus,
    isEnabled: item => accessName.value === item.createdBy,
    action: item => {
      shareGuide(item)
    },
  },
]

const selectedGuide = ref(null)

// DESARQUIVAR

const unarchiveMission = guideId => {
  const params = {
    BatchAction: 1,
    GuidesIds: [guideId],
    SubjectId: subject.value.id,
    ClassId: classe.value.ClassId,
    Filed: true,
  }

  unarchiveGuide(params).then(() => {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Missão desarquivada com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
    vm.$bus.emit('archivedMissionsListReset')
    store.commit('archivedMissionsModule/params', {
      currentPage: 1,
    })
    store.dispatch('archivedMissionsModule/fetchData')
  })
}

// DETALHES

const showDetailsMission = ref(false)

const openDetailsMission = guide => {
  showDetailsMission.value = true
  selectedGuide.value = guide
}

// SHARE

const showShareGuide = ref(false)

const shareGuide = mission => {
  if (accessName.value === mission.createdBy) {
    selectedGuide.value = mission
    showShareGuide.value = true
  }
}

const closePromptActionAndRefreshList = () => {
  showShareGuide.value = false

  vm.$bus.emit('archivedMissionsListReset')
  store.commit('archivedMissionsModule/params', {
    currentPage: 1,
  })
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

const legends = [{ text: 'Progresso da turma', enum: progress }]

const iconTypeProps = { blank: true, width: 25, height: 25, blankColor: '#bbb' }
const userProps = {
  blank: true,
  width: 45,
  height: 45,
  blankColor: '#bbb',
  rounded: 'circle',
}
</script>