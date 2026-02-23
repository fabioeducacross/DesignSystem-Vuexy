<template>
  <div id="ListMissionsList">
    <ListTableSelect
      ref="listMissionsList"
      :data-table="missions"
      :loading="loading"
      :show-select-all="false"
      :table-columns="columnsDefinitions"
      :total-data="totalData"
      search-placeholder="Pesquisar missão"
      @change="handleTableChange"
      @input="setSelectedMissions"
    >
      <template #cell(createdBy)="{ item }">
        <b-img-lazy v-b-tooltip="item.createdBy" :src="item.imageUrl" v-bind="userProps" />
      </template>

      <template #cell(progress)="{ value }">
        <ProgressBarHorizontalV2
          :get-variant="getColorsEnum"
          :value="value"
          height="12px"
          reverse
        />
      </template>
      <template #cell(situation)="{ value }">
        <b-badge :variant="`light-${missionStatusEnum[value].variant}`" pill>
          {{ missionStatusEnum[value].label }}
        </b-badge>
      </template>

      <template #cell(actions)="{ item }">
        <div class="d-flex justify-content-end">
          <b-dropdown left no-caret toggle-class="p-0" variant="link">
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
      centered
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      size="xl"
      static
      title="Detalhes da Missão"
      @close="showDetailsMission = false"
    >
      <MissionDetails v-if="showDetailsMission" :guide-id="selectedGuide.id" />
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

    <b-modal
      v-model="showDeleteGuide"
      centered
      hide-footer
      size="lg"
      @close="showDeleteGuide = false"
    >
      <DeleteGuide
        :guide-obj="selectedGuide"
        @close="showDeleteGuide = false"
        @close-and-update="closePromptActionAndRefreshList()"
      />
    </b-modal>

    <b-modal v-model="showCopyLink" centered hide-footer size="lg" @close="showCopyLink = false">
      <CopyLink :mission-link="promptLink" />
    </b-modal>

    <b-modal
      v-model="showSendGuide"
      centered
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      size="lg"
      static
      @close="showSendGuide = false"
    >
      <FeedbackAndSend
        v-if="showSendGuide"
        :id="selectedGuide.id"
        :send-guide="true"
        :start="selectedGuide.start"
        @close="showSendGuide = false"
        @close-and-update="closePromptActionAndRefreshList()"
      />
    </b-modal>

    <b-modal
      v-model="showExpiredMission"
      centered
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      size="lg"
      static
      @close="showExpiredMission = false"
    >
      <ExpiredMission
        v-if="showExpiredMission"
        :guide-id="selectedGuide.guideId"
        @close="showExpiredMission = false"
      />
    </b-modal>

    <b-modal
      v-model="showCancelMission"
      centered
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      size="lg"
      static
      @close="showCancelMission = false"
    >
      <CancelMission
        v-if="showCancelMission"
        :cancel-mission="selectedGuide"
        @close-cancel-mission="showCancelMission = false"
        @close-cancel-mission-and-refresh="closePromptActionAndRefreshList()"
      />
    </b-modal>

    <b-modal
      v-model="activePromptArchiveMission"
      centered
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      size="lg"
      static
      @close="closePromptActionArchiveMissions()"
    >
      <archive-missions
        v-if="activePromptArchiveMission"
        :archive-missions="selectedGuide"
        @close-archive-missions="closePromptActionArchiveMissions()"
        @archive-missions="archiveMission"
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
import { unarchiveGuide } from '@/services/teacher-context/guides/Guides.Service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import store from '@/store'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ProgressBar from '@/views/pages/admin-context/shared/table-columns-components/ProgressBar.vue'
import ArchiveMissions from '@/views/pages/teacher-context/shared/modals/ArchiveMissions.vue'
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'

const dateNow = new Date().toLocaleDateString()
const vm = getCurrentInstance().proxy

const accessName = computed(() => store.getters.accessUserData?.Name)

const listMissionsList = ref(null)

const missions = computed(() => store.getters['listMissionsModule/missions'])
const setSelectedMissions = e => store.commit('listMissionsModule/selectedMissions', e.value)
const pageSize = computed(() => store.getters['listMissionsModule/pageSize'])
const totalData = computed(() => store.getters['listMissionsModule/totalData'])
const page = computed(() => store.getters['listMissionsModule/page'])
const loading = computed(() => store.getters['listMissionsModule/loading'])

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
    thStyle: { width: '100px' },
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
// Play

// Archive
const activePromptArchiveMission = ref(false)

const openModalArchiveMission = guide => {
  activePromptArchiveMission.value = true
  selectedGuide.value = guide
}

const closePromptActionArchiveMissions = () => {
  activePromptArchiveMission.value = false
  vm.$bus.emit('listMissionsListReset')
}

// SendGuide
const showSendGuide = ref(false)

const sendGuide = guide => {
  showSendGuide.value = true
  selectedGuide.value = guide
}

// SendGuide expired
const showExpiredMission = ref(false)

const expiredMission = guide => {
  showExpiredMission.value = true
  selectedGuide.value = guide
}

const compareDates = (initialDate, finalDate) => {
  const dateNow = new Date(initialDate)
  const expirationDate = new Date(finalDate)

  return dateNow <= expirationDate
}

const showDetailsMission = ref(false)

const openDetailsMission = guide => {
  showDetailsMission.value = true
  selectedGuide.value = guide
}

const closeDetailsMissionPrompt = () => {
  showDetailsMission.value = false
}

// share

const showShareGuide = ref(false)

const shareGuide = mission => {
  if (accessName.value === mission.createdBy) {
    selectedGuide.value = mission
    showShareGuide.value = true
  }
}

// delete
const showDeleteGuide = ref(false)

const deleteGuide = mission => {
  if (accessName.value === mission.createdBy) {
    selectedGuide.value = mission
    showDeleteGuide.value = true
  }
}

// Cancel

const showCancelMission = ref(false)

const cancelMission = mission => {
  selectedGuide.value = mission
  showCancelMission.value = true
}

// copy

const showCopyLink = ref(false)

const promptLink = ref(null)

const copyLink = link => {
  showCopyLink.value = true
  promptLink.value = link
}

const closePromptActionAndRefreshList = () => {
  showShareGuide.value = false
  showDeleteGuide.value = false
  showSendGuide.value = false
  store.dispatch('listMissionsModule/fetchData')
}

const handleTableChange = ctx => {
  store.commit('listMissionsModule/params', ctx)
  store.dispatch('listMissionsModule/fetchData')
}

const archiveMission = () => {
  const guidesIds = [selectedGuide.value.id]
  unarchiveGuide({ guidesIds })
    .then(() => {
      vm.$toast({
        component: Toast,
        props: {
          text:
            guidesIds.length > 1
              ? 'Missões arquivadas com sucesso!'
              : 'Missão arquivada com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      store.dispatch('listMissionsModule/fetchData')
      vm.$bus.emit('listMissionsListReset')
    })
    .finally(() => {
      activePromptArchiveMission.value = false
    })
}

const GET_NAME = getWhitelabelConfig('Name')

const dropdownActions = [
  {
    icon: 'send',
    label: 'Enviar',
    class: 'text-success',
    isShow: item => item.situation === EGuideSituation.NotSent,
    isEnabled: item => accessName !== item.createdBy,
    action: item => {
      if (compareDates(dateNow, item.expiration)) {
        sendGuide(item)
      } else {
        expiredMission(item)
      }
    },
  },
  {
    icon: 'disabled_by_default',
    label: 'Cancelar',
    class: 'text-danger',
    isShow: item => item.situation === EGuideSituation.Started,
    isEnabled: item => item.situation === EGuideSituation.Started,
    action: item => {
      cancelMission(item)
    },
  },
  {
    icon: 'delete',
    label: 'Excluir',
    class: 'text-danger',
    isShow: item =>
      (item.situation === EGuideSituation.NotSent ||
        item.situation === EGuideSituation.NotStarted) &&
      accessName !== item.createdBy,
    isEnabled: item =>
      (item.situation === EGuideSituation.NotSent ||
        item.situation === EGuideSituation.NotStarted) &&
      accessName !== item.createdBy,
    action: item => {
      deleteGuide(item)
    },
  },

  {
    icon: 'edit',
    label: 'Editar',
    class: 'text-primary',
    isShow: item =>
      item.situation === EGuideSituation.NotSent ||
      item.situation === EGuideSituation.NotStarted,
    isEnabled: item =>
      item.situation === EGuideSituation.NotSent ||
      item.situation === EGuideSituation.NotStarted,
    action: item => {
      router.push({ name: 'EditCustomMissionPlus', params: { id: item.id } })
    },
  },

  {
    icon: 'archive',
    label: 'Arquivar',
    class: 'text-primary',
    isShow: item => item.situation === EGuideSituation.Finished,
    isEnabled: item => item.situation === EGuideSituation.Finished,
    action: item => {
      openModalArchiveMission(item)
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
      router.push({ name: 'reportMissionsPlusClasse', params: { guideId: item.id } })
    },
  },

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
    icon: 'link',
    label: 'Link da missão',
    class: 'text-primary',
    isShow: item => item.guideLinkUrl && item.situation === EGuideSituation.Started,
    isEnabled: item => item.guideLinkUrl && item.situation === EGuideSituation.Started,
    action: item => {
      copyLink(item.guideLinkUrl)
    },
  },

  {
    icon: 'share',
    label: 'Compartilhar',
    class: 'text-primary',
    isShow: item =>
      item.guideLinkUrl &&
      item.situation === EGuideSituation.Started &&
      accessName !== item.createdBy,
    isEnabled: item =>
      item.guideLinkUrl &&
      item.situation === EGuideSituation.Started &&
      accessName !== item.createdBy,
    action: item => {
      shareGuide(item)
    },
  },
]

onMounted(() => {
  vm.$bus.on('listMissionsListReset', () => {
    listMissionsList.value.resetSelectedItems()
  })
})

onUnmounted(() => {
  vm.$bus.off('listMissionsListReset')
})

const getColorsEnum = value => {
  return getVariantByRule(value, 'progress')
}

const legends = [{ text: 'Turnos finalizados', enum: progress }]
</script>

<style lang="scss">
  #ListMissionsList .actionsCol {
    max-width: 220px;
  }
</style>