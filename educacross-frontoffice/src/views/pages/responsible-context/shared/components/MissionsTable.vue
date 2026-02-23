<template>
  <div>
    <b-row class="match-height">
      <b-col cols="12">
        <ListTableLocalSorting
          id="RankingTable"
          ref="refListTable"
          :table-columns="fields"
          :data-table="data"
          :total-data="data.length"
          :loading="loading"
          show-view-selection
          :columns="3"
        >
          <template v-slot:card="{ data }">
            <b-card body-class="flex flex-column" @click="openMissionDetail(data)">
              <div class="flex justify-between">
                <div class="p-1 w-full">
                  <p class="text-missionsTable color-patternSeven font-bold">
                    {{ data.guideName }}
                  </p>
                  <p class="text-missionsTable color-patternTwo mt-1">
                    <span class="mb-1">
                      <span class="mr-2">Atividades realizadas:</span>
                      <span
                        v-if="hasSituation"
                        :class="{
                          'text-warning': data.situation === 'Não iniciado',
                          'text-success': data.situation === 'Iniciado',
                          'color-patternSix': data.situation === 'Finalizado',
                        }"
                      >
                        <span class="mission-activity-label">{{ data.finishedActivities }}</span>
                        de
                        <span class="mission-activity-label">{{ data.totalActivities }}</span>
                        atividades
                      </span>
                      <span
                        v-else
                        :class="{
                          'text-warning': data.finishedActivities === 0,
                          'text-success':
                            data.finishedActivities > 0 &&
                            data.finishedActivities < data.totalActivities,
                          'color-patternSix': data.finishedActivities === data.totalActivities,
                        }"
                      >
                        <span
                          >{{ data.finishedActivities }}
                          de
                          {{ data.totalActivities }}
                          atividades
                        </span>
                      </span>
                    </span>
                    <b-progress
                      :value="data.finishedActivities"
                      :max="data.totalActivities"
                      variant="success"
                      height="5px"
                    />
                  </p>
                  <div v-if="hasSituation" class="flex items-center flex-wrap mt-1">
                    <span> Situação: </span>
                    <span
                      :id="`icon-info-mmission-${data.guideId}`"
                      class="material-icons-outlined"
                    >
                      info
                    </span>
                    <b-tooltip
                      :position="'left'"
                      :target="`icon-info-mmission-${data.guideId}`"
                      triggers="hover"
                    >
                      • Não iniciado: A Missão já foi enviada, mas a data de início não chegou. •
                      Iniciado: A Missão está sendo realizada pelo aluno. • Finalizado: A Missão foi
                      finalizada.
                    </b-tooltip>
                    <b-badge pill :variant="missionVariant(data)">
                      {{ data.situation }}
                    </b-badge>
                  </div>
                  <p v-if="hasDate" class="text-missionsTable color-patternTwo mt-1">
                    <span class="mr-2">Duração:</span>
                    <span class="color-patternSeven">
                      {{ data.start | formattedDate }} até
                      {{ data.expiration | formattedDate }}
                    </span>
                  </p>
                  <div v-if="hasStatus" class="mt-1 flex flex-wrap">
                    <span class="mr-1"> Status: </span>
                    <b-badge v-if="data.enabled" pill variant="light-primary"> Habilitada </b-badge>
                    <b-badge v-else pill variant="light-secondary"> Desabilitada </b-badge>
                  </div>
                </div>
              </div>
            </b-card>
          </template>

          <template #cell(actions)="{ item }">
            <div class="text-nowrap d-flex align-items-center gap-3">
              <span
                v-for="(action, index) in tableActions"
                :key="index"
                v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
                :class="
                  action.isEnabled(item)
                    ? `text-primary cursor-pointer`
                    : 'cursor-not-allowed text-muted'
                "
                class="material-symbols-outlined"
                @click.stop="action.isEnabled(item) ? action.action(item) : null"
              >
                {{ action.icon }}
              </span>
            </div>
          </template>

          <template #cell(finishedActivities)="{ item }">
            <p v-if="hasSituation" class="mission-activity">
              <span class="font-bold">{{ item.finishedActivities }}</span>
              de
              <span class="font-bold">{{ item.totalActivities }}</span>
              atividades
            </p>
            <p v-else class="mission-activity">
              <span class="font-bold">{{ item.finishedActivities }}</span>
              de
              <span class="font-bold">{{ item.totalActivities }}</span>
              atividades
            </p>

            <b-progress
              :value="item.finishedActivities"
              :max="item.totalActivities"
              variant="success"
              height="5px"
            />
          </template>

          <template #cell(start)="{ item }">
            <div>
              {{ item.start | formattedDate }} até
              {{ item.expiration | formattedDate }}
            </div>
          </template>

          <template #cell(status)="{ item }">
            <b-badge v-if="item.enabled" pill variant="light-primary"> Habilitada </b-badge>
            <b-badge v-else pill variant="light-secondary"> Desabilitada </b-badge>
          </template>
        </ListTableLocalSorting>
      </b-col>
    </b-row>

    <b-modal ref="refModalMissionDetail" v-model="open" scrollable hide-footer size="lg">
      <education-system-mission-detail
        :id="selectedMission.guideId"
        :mission-info="selectedMission"
        @close="closeMissionDetail()"
      />
    </b-modal>
  </div>
</template>

<script setup>
import EducationSystemMissionDetail from '../modals/EducationSystemMissionDetail.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { BProgress } from 'bootstrap-vue'
import { watch, ref, computed } from 'vue'

// Props
const props = defineProps({
  data: { type: Array, required: true },
  hasSituation: { type: Boolean, default: false },
  hasDate: { type: Boolean, default: false },
  hasStatus: { type: Boolean, default: false },
  loading: { type: Boolean, default: true },
  leaderBoard: { type: null }, // Accept any, matches Vue 2 original access
})

// Fields for ListTableLocalSorting
const fields = computed(() => {
  const items = [
    {
      key: 'guideName',
      label: 'Nome da missão',
      sortable: true,
      searchable: true,
      tdClass: 'font-bold',
    },
    {
      key: 'finishedActivities',
      label: 'Jogos finalizados',
      sortable: true,
      tdClass: 'font-bold',
    },
  ]

  if (props.hasSituation) {
    items.push({
      key: 'situation',
      label: 'Situação',
      sortable: true,
    })
  }
  if (props.hasDate) {
    items.push({
      key: 'start',
      label: 'Duração',
      sortable: true,
    })
  }
  if (props.hasStatus) {
    items.push({
      key: 'status',
      label: 'Status',
      sortable: true,
    })
  }
  items.push({
    key: 'actions',
    label: 'ações',
    thStyle: { width: '100px' },
  })
  return items
})

// Table actions
const tableActions = [
  {
    icon: 'visibility',
    tooltip: (item, enabled) => (enabled ? 'Ver detalhes' : ''),
    isEnabled: item => item.enabled,
    action: item => {
      openMissionDetail(item)
    },
  },
]

// Template refs
const refListTable = ref(null)
const refModalMissionDetail = ref(null)

// Watch for leaderBoard changes to reset page
watch(
  () => props.leaderBoard,
  () => {
    if (refListTable.value && typeof refListTable.value.resetPage === 'function') {
      refListTable.value.resetPage()
    }
  }
)

// Detailed mission modal state/behavior
const selectedMission = ref({})
const open = ref(false)

const openMissionDetail = mission => {
  if (!mission.enabled) return
  selectedMission.value = mission
  open.value = true
}
const closeMissionDetail = () => {
  selectedMission.value = {}
  open.value = false
}

// Badge variant for situation
const missionVariant = mission => {
  switch (mission.situation) {
    case 'Não iniciado':
      return 'light-warning'
    case 'Iniciado':
      return 'light-success'
    case 'Finalizado':
      return 'light-secondary'
    default:
      return 'light-warning'
  }
}

</script>

<script>
export default { inheritAttrs: false }
</script>

<style lang="scss" scoped>
  .text-missionsTable {
    font-size: 14px;
    line-height: 21px;
  }

  .mission-activity-label {
    font-weight: bold;
    font-size: 16px;
  }
</style>