<template>
  <SimpleTab tab-title="Auditoria">
    <section>
      <b-row>
        <b-col cols="12">
          <b-card>
            <div class="d-flex justify-center align-items-center">
              <b-link class="text-primary link-floating" :to="backRoute">
                <span
                  class="material-symbols-outlined"
                  style="font-size: 12px; vertical-align: middle"
                >
                  arrow_back_ios
                </span>
                <span class="underline"> Voltar</span>
              </b-link>
              <div class="d-flex align-items-center gap-2">
                <ExerciseType
                  v-for="exerciseId in evaluationDetail.types"
                  :key="exerciseId"
                  :exercise-id="exerciseId"
                  :size="32"
                />
                <span class="h4 mr-50 mb-0 text-body">
                  <span class="font-bold">{{ evaluationDetail.evaluationName }}</span>
                </span>
                <b-badge pill variant="light-primary">
                  {{ evaluationDetail.serieName }}
                </b-badge>
                <b-badge
                  :variant="`${getReadingEvaluationStatusEnum(evaluationDetail.status).variant}`"
                  pill
                >
                  {{ getReadingEvaluationStatusEnum(evaluationDetail.status).text }}
                </b-badge>
              </div>
            </div>
          </b-card>
        </b-col>
        <b-col cols="12">
          <ListTable
            ref="refList"
            :table-columns="tableColumns"
            :data-table="auditorList"
            :total-data="totalData"
            search-placeholder="Pesquisar por auditor"
            :loading="loading"
            @change="changePage"
          >
            <template #cell(name)="{ item }">
              <div class="d-flex align-items-center gap-2">
                <b-avatar :text="initials(item.name)" variant="info" />
                <span class="font-bold whitespace-no-wrap">{{ item.name }}</span>
              </div>
            </template>

            <template #cell(email)="{ item }">
              <div>
                <span>{{ item.email }}</span>
              </div>
            </template>

            <template #cell(institutions)="{ item }">
              <ListItemsLimited
                v-if="item.institutions.length"
                :data="item.institutions"
                :limit="3"
              >
                <template v-slot:item="{ data }">
                  <b-badge variant="light-primary">
                    {{ data.name }}
                  </b-badge>
                </template>
                <template v-slot:excess="{ data }">
                  <b-badge variant="light-primary" pill> +{{ data | formatNumber }} </b-badge>
                </template>
              </ListItemsLimited>
              <b-badge v-else variant="light-dark"> Sem vínculo </b-badge>
            </template>

            <template #cell(actions)="{ item }">
              <div class="text-nowrap d-flex align-items-center gap-3">
                <span
                  v-for="(action, index) in tableActions"
                  :key="index"
                  v-b-tooltip.hover.top="action.tooltip"
                  class="material-symbols-outlined text-primary cursor-pointer"
                  @click.stop="action.action(item)"
                >
                  {{ action.icon }}
                </span>
              </div>
            </template>
          </ListTable>
        </b-col>
      </b-row>
      <LinkAuditorSidebar :auditor-data="selectedAuditor" />
    </section>
  </SimpleTab>
</template>

<script setup>
import ExerciseType from '@/components/exercise-type/reading-meter/ExerciseType.vue'
import SimpleTab from '@/components/tab/SimpleTab.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getReadingEvaluationStatusEnum } from '@/consts/ReadingMeterEnum.js'
import { initials } from '@/filters/filters'
import store from '@/store'
import formatDate from '@/utils/date.js'
import ListItemsLimited from '@/views/pages/admin-context/shared/table-columns-components/ListItemsLimited.vue'
import { useEvaluationReport } from '@/views/pages/reading-meter-V2/evaluation-report/useEvaluationReport.js'
import LinkAuditorSidebar from '@/views/pages/records/audits/LinkAuditorSidebar.vue'
import { computed, ref, getCurrentInstance, onMounted } from 'vue'

const { getEvaluationDetails, getEvaluationAudits, changeListTable, resetModule } =
  useEvaluationReport()

const vm = getCurrentInstance().proxy

const evaluationDetail = computed(
  () => store.getters['ReadingMeterV2Module/readingFluencyEvaluation'],
)

resetModule()

onMounted(async () => {
  await Promise.all([getEvaluationDetails(), getEvaluationAudits()])
  vm.$bus.emit('setBreadcrumb', ['', '', '', evaluationDetail.value.evaluationName])
})

const refList = ref(null)

const loading = computed(() => store.getters['ReadingMeterV2Module/loading'])

const auditorList = computed(() => store.getters['ReadingMeterV2Module/auditorList'])

const totalData = computed(() => store.getters['ReadingMeterV2Module/totalData'])

const selectedAuditor = ref(null)

const tableColumns = [
  {
    key: 'name',
    label: 'Auditor',
    sortable: true,
  },
  {
    key: 'email',
    label: 'E-mail do Auditor',
    sortable: true,
  },
  {
    key: 'institutions',
    label: 'Escolas Vinculadas',
  },

  {
    key: 'actions',
    label: 'AÇÕES',
    thStyle: { width: '60px' },
  },
]

const tableActions = [
  {
    icon: 'edit_square',
    color: 'text-primary',
    tooltip: 'Vincular',
    action: async data => {
      selectedAuditor.value = {
        ...data,
        evaluationName: evaluationDetail.value.evaluationName,
      }
    },
  },
]

const changePage = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  changeListTable(
    {
      currentPage,
      perPage,
      sortBy,
      isSortDirDesc,
      searchQuery,
    },
    getEvaluationAudits,
  )
}

const backRoute = computed(() => {
  const role = store.getters.accessRole
  if (role === 'NetworkManager') {
    return { name: 'NetworkManagerFluencyV2Evaluations' }
  }
  return { name: 'AdminFluencyV2Evaluations' }
})
</script>

<style lang="scss" scoped>
  @media (min-width: 768px) {
    .link-floating {
      position: absolute;
      left: 25px;
    }
  }
</style>