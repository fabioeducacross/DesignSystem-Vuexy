<template>
  <div id="ListMissionsList">
    <ListTableSelect
      ref="listMissionsList"
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
      v-model="showSendGuide"
      centered
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      size="xl"
      static
      @close="showSendGuide = false"
    >
      <FeedbackAndSend
        v-if="showSendGuide && selectedGuide.isCustoMissionPlus"
        :id="selectedGuide.id"
        :send-guide="true"
        :start="selectedGuide.start"
        @close="showSendGuide = false"
        @close-and-update="closePromptActionAndRefreshList()"
      />

      <feedback-create-mission
        v-if="showSendGuide && !selectedGuide.isCustoMissionPlus"
        :id="selectedGuide.id"
        :send-guide="true"
        @close-feedbackCreateMission="showSendGuide = false"
        @close-feedbackCreateMissionWithAtt="closePromptActionAndRefreshList()"
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
        @close="showExpiredMission = false"
        @edit="editMission(selectedGuide)"
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

    <b-modal v-model="showCopyLink" centered hide-footer size="lg" @close="showCopyLink = false">
      <CopyLink :mission-link="promptLink" />
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
      ref="refEditDateModal"
      centered
      size="sm"
      title="Alterar data da missão"
      @ok="saveEditingMissionDate"
      @cancel="closeEditDateModal"
    >
      <div class="text-center">
        <span class="material-symbols-outlined text-primary" style="font-size: 40px"
          >calendar_month</span
        >
        <h2>Definir data final</h2>
      </div>

      <b-form>
        <b-row align-h="center">
          <b-col cols="auto">
            <b-form-datepicker
              id="date-input"
              v-model="editingMissionDate.date"
              :min="minDate"
              :max="maxDate"
              locale="pt-BR"
              placeholder="Selecione a data"
              class="pr-1"
              label-help="Use as setas do teclado para navegar entre as datas"
              :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
            />
          </b-col>
        </b-row>
      </b-form>
      <template v-slot:modal-footer="{ ok, cancel }">
        <div class="d-flex align-items-center justify-content-center w-100 m-0 gap-2">
          <b-button variant="outline-danger" @click="cancel"> Cancelar </b-button>
          <b-button variant="primary" style="width: 106px" @click="ok"> Salvar </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script setup>
import customPlusIcon from '@/assets/images/teacher-context/new-mission/customplus-icon.svg'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import MissionDetails from '@/components/missions/MissionDetails.vue'
import MissionDetailsPlus from '@/components/mission-plus/MissionDetailsPlus.vue'
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
import {
  unarchiveGuide,
  changeGuideExpiration,
} from '@/services/teacher-context/guides/Guides.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ProgressBar from '@/views/pages/admin-context/shared/table-columns-components/ProgressBar.vue'
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  reactive,
  ref,
} from 'vue'

const vm = getCurrentInstance().proxy

const { subject, classe } = useFilters()
const refEditDateModal = ref(null)
const editingMissionDate = reactive({
  id: null,
  date: null,
})

const minDate = computed(() => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
})

const maxDate = computed(() => {
  const today = new Date()
  const futureDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  const year = futureDate.getFullYear()
  const month = String(futureDate.getMonth() + 1).padStart(2, '0')
  const day = String(futureDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
})

const accessName = computed(() => store.getters.accessUserData?.Name)

const listMissionsList = ref(null)

const missions = computed(() => store.getters['listMissionsModule/missions'])
const setSelectedMissions = e => store.commit('listMissionsModule/selectedMissions', e)

const totalData = computed(() => store.getters['listMissionsModule/totalData'])

const loading = computed(() => store.getters['listMissionsModule/loading'])

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
    icon: 'archive',
    tooltip: () => 'Arquivar Missão',
    class: 'text-primary',
    isShow: item =>
      item.situation === EGuideSituation.Finished ||
      item.situation === EGuideSituation.Cancelled,
    isEnabled: item =>
      item.situation === EGuideSituation.Finished ||
      item.situation === EGuideSituation.Cancelled,
    action: item => {
      archiveMission(item.id)
    },
  },
  {
    icon: 'send',
    tooltip: () => 'Enviar Missão',
    class: 'text-success',
    isShow: item => item.situation === EGuideSituation.NotSent,
    isEnabled: item => item.situation === EGuideSituation.NotSent,
    action: item => {
      if (compareDates(item.expiration)) {
        sendGuide(item)
      } else {
        expiredMission(item)
      }
    },
  },
  {
    icon: 'disabled_by_default',
    tooltip: () => 'Cancelar Missão',
    class: 'text-danger',
    isShow: item => item.situation === EGuideSituation.Started,
    isEnabled: item => item.situation === EGuideSituation.Started,
    action: item => {
      cancelMission(item)
    },
  },
  {
    icon: 'edit_calendar',
    tooltip: () => 'Editar data final',
    isShow: item => item.situation === EGuideSituation.Started,
    isEnabled: () => true,
    action: item => {
      editingMissionDate.id = item.id

      // Parse the existing expiration date (only date part)
      if (item.expiration) {
        const expirationDate = new Date(item.expiration)
        const year = expirationDate.getFullYear()
        const month = String(expirationDate.getMonth() + 1).padStart(2, '0')
        const day = String(expirationDate.getDate()).padStart(2, '0')

        editingMissionDate.date = `${year}-${month}-${day}`
      } else {
        editingMissionDate.date = null
      }

      refEditDateModal.value.show()
    },
  },
  {
    icon: 'delete',
    tooltip: item =>
      accessName.value !== item.createdBy
        ? `Essa missão foi criada pelo(a) professor(a) ${item.createdBy}, você não pode excluí-la`
        : 'Excluir Missão',
    class: 'text-danger',
    isShow: item =>
      (item.situation === EGuideSituation.NotSent ||
        item.situation === EGuideSituation.NotStarted) &&
      accessName.value === item.createdBy,
    isEnabled: item =>
      (item.situation === EGuideSituation.NotSent ||
        item.situation === EGuideSituation.NotStarted) &&
      accessName.value === item.createdBy,
    action: item => {
      deleteGuide(item)
    },
  },

  {
    icon: 'edit',
    tooltip: () => 'Editar Missão',
    class: 'text-primary',
    isShow: item =>
      item.situation === EGuideSituation.NotSent ||
      item.situation === EGuideSituation.NotStarted,
    isEnabled: item =>
      item.situation === EGuideSituation.NotSent ||
      item.situation === EGuideSituation.NotStarted,
    action: item => {
      editMission(item)
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
    icon: 'link',
    tooltip: () => 'Link da missão',
    class: 'text-primary',
    isShow: item => item.guideLinkUrl && item.situation === EGuideSituation.Started,
    isEnabled: item => item.guideLinkUrl && item.situation === EGuideSituation.Started,
    action: item => {
      copyLink(item.guideLinkUrl)
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
    isShow: () => true,
    isEnabled: item => accessName.value === item.createdBy,
    action: item => {
      shareGuide(item)
    },
  },
]

const compareDates = finalDate => {
  const dateNow = new Date()
  const expirationDate = new Date(finalDate)

  return dateNow <= expirationDate
}

const selectedGuide = ref(null)

/* EDITAR */

const editMission = mission => {
  if (mission.isCustoMissionPlus) {
    router.push({
      name: 'EditCustomMissionPlus',
      params: { id: mission.id },
    })
  } else {
    router.push({
      name: 'CreateCustomMissionById',
      params: { id: mission.id },
    })
  }
}

/* ARQUIVAR */

const archiveMission = guideId => {
  const params = {
    BatchAction: 1,
    GuidesIds: [guideId],
    SubjectId: subject.value.id,
    ClassId: classe.value.ClassId,
    Filed: false,
  }

  unarchiveGuide(params).then(() => {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Missão arquivada com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
    vm.$bus.emit('listMissionsListReset')
    store.commit('listMissionsModule/params', {
      currentPage: 1,
    })
    store.dispatch('listMissionsModule/fetchData')
  })
}

// ENVIAR MISSÃO
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

// CANCELAR

const showCancelMission = ref(false)

const cancelMission = mission => {
  selectedGuide.value = mission
  showCancelMission.value = true
}

// EXCLUIR
const showDeleteGuide = ref(false)

const deleteGuide = mission => {
  if (accessName.value === mission.createdBy) {
    selectedGuide.value = mission
    showDeleteGuide.value = true
  }
}

// DETALHES

const showDetailsMission = ref(false)

const openDetailsMission = guide => {
  showDetailsMission.value = true
  selectedGuide.value = guide
}

// LINK

const showCopyLink = ref(false)

const promptLink = ref(null)

const copyLink = link => {
  showCopyLink.value = true
  promptLink.value = link
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
  vm.$bus.emit('fetchGuidesMonth')
  showShareGuide.value = false
  showDeleteGuide.value = false
  showSendGuide.value = false
  vm.$bus.emit('listMissionsListReset')
  store.commit('listMissionsModule/params', {
    currentPage: 1,
  })
  store.dispatch('listMissionsModule/fetchData')
}

const handleTableChange = ctx => {
  store.commit('listMissionsModule/params', ctx)
  store.dispatch('listMissionsModule/fetchData')
}

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

const legends = [{ text: 'Progresso da turma', enum: progress }]

const iconTypeProps = { blank: true, width: 25, height: 25, blankColor: '#bbb' }
const userProps = {
  blank: true,
  width: 45,
  height: 45,
  blankColor: '#bbb',
  rounded: 'circle',
}

// EDITAR DATA DA MISSÃO
const saveEditingMissionDate = async () => {
  if (!editingMissionDate.date) {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Por favor, selecione uma data',
        icon: 'XCircleIcon',
        variant: 'warning',
      },
    })
    return
  }

  try {
    const dateTimeString = `${editingMissionDate.date}T00:00:00`
    const expirationDate = new Date(dateTimeString)

    changeGuideExpiration(editingMissionDate.id, {
      SubjectId: subject.value.id,
      ClassId: classe.value.ClassId,
      expiration: expirationDate.toISOString(),
    }).then(() => {
      vm.$toast({
        component: Toast,
        props: {
          title: 'Data da missão atualizada com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })

      closeEditDateModal()
      closePromptActionAndRefreshList()
    })
  } catch (error) {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Erro ao atualizar data da missão',
        icon: 'XCircleIcon',
        variant: 'danger',
      },
    })
  }

  editingMissionDate.date = null
  editingMissionDate.id = null
}

const closeEditDateModal = () => {
  refEditDateModal.value.hide()
  editingMissionDate.date = null
  editingMissionDate.id = null
}
</script>