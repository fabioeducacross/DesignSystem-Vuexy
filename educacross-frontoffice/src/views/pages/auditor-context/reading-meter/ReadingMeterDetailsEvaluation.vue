<template>
  <SimpleTab tab-title="Auditoria">
    <b-row>
      <b-col cols="12">
        <b-card>
          <div class="d-flex justify-center align-items-center">
            <b-link class="text-primary link-floating" :to="{ name: 'readingMeterListAuditor' }">
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
        <ReadingMeterDetailFilter />
      </b-col>
      <b-col cols="12">
        <ListTable
          ref="refList"
          :table-columns="tableColumns"
          :data-table="evaluationDetail.students"
          :total-data="totalData"
          search-placeholder="Pesquisar por aluno"
          :loading="loading"
          @change="changePage"
        >
          <template #cell(studentName)="{ item }">
            <div class="d-flex align-items-center">
              <span class="font-bold">
                {{ item.name }}
              </span>
            </div>
          </template>

          <template #cell(lastAccess)="{ item }">
            <div>
              <span v-if="item.lastAccess" variant="light-primary" pill>{{
                formatDate(item.lastAccess)
              }}</span>
              <span v-else variant="light-primary" pill>-</span>
            </div>
          </template>

          <template #cell(proficiency)="{ item }">
            <div
              v-if="item.status === 0"
              v-b-tooltip.hover.top="'Nenhum teste foi iniciado.'"
              class="d-flex justify-center text-info"
            >
              <b-badge pill variant="light-dark"> Não iniciado </b-badge>
            </div>
            <div
              v-if="item.status === 1"
              v-b-tooltip.hover.top="'Nem todos os testes foram finalizados.'"
              class="d-flex justify-center text-info"
            >
              <span class="material-symbols-outlined"> directions_walk </span>
              <span>EM ANDAMENTO</span>
            </div>
            <div v-else-if="item.status == 3" class="d-flex justify-center">
              <b-badge pill variant="light-danger" class="d-flex align-items-center gap-1">
                <span class="material-symbols-outlined"> error </span>
                <span>Problema identificado</span>
              </b-badge>
            </div>
            <CellStatus
              v-else-if="item.status == 4"
              :value="item.proficiency"
              enum="proficiency"
              pill
            />
          </template>

          <template #cell(actions)="{ item }">
            <div
              v-for="(action, index) in tableActions"
              v-show="action.isShow(item)"
              :key="index"
              v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
              class="text-nowrap d-flex align-items-center gap-2 audit-actions"
              :class="[
                action.isEnabled(item)
                  ? `${action.color} cursor-pointer`
                  : 'cursor-not-allowed opacity-50',
                item.audited ? 'audit-validate' : '',
              ]"
              @click.stop="action.isEnabled(item) ? action.action(item) : null"
            >
              <span class="material-symbols-outlined">
                {{ action.icon(item) }}
              </span>
              <span> {{ action.text(item) }}</span>
            </div>
          </template>
        </ListTable>
        <LegendEnum :legends="legends" />
      </b-col>
      <b-col cols="12" class="mt-2">
        <ReadingMeterEvaluationFooter />
      </b-col>
    </b-row>
  </SimpleTab>
</template>

<script setup>
import CellStatus from '@/components/badge/CellStatus.vue'
import ExerciseType from '@/components/exercise-type/reading-meter/ExerciseType.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import SimpleTab from '@/components/tab/SimpleTab.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getReadingEvaluationStatusEnum } from '@/consts/ReadingMeterEnum.js'
import { StatusEnum } from '@/consts/evaluationsEnum.js'
import { getVariantByRule } from '@/consts/legends/index.js'
import { progressLegend } from '@/consts/legends/progressEnum.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import formatDate from '@/utils/date.js'
import ReadingMeterDetailFilter from '@/views/pages/auditor-context/reading-meter/list/ReadingMeterDetailFilter.vue'
import ReadingMeterEvaluationFooter from '@/views/pages/auditor-context/reading-meter/reading/ReadingMeterEvaluationFooter.vue'
import { ref, computed, getCurrentInstance, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

const { classe } = useFilters()

const refList = ref(null)
const vm = getCurrentInstance().proxy
const route = useRoute()
const router = useRouter()
const evaluationId = route.params.evaluationId

const pagination = computed(() => store.getters['ReadingMeterEvaluationModule/pagination'])
const typeTest = computed(() => store.getters['ReadingMeterEvaluationModule/typeTest'])
const totalData = computed(() => pagination.value.totalData)
const evaluationDetail = computed(
  () => store.getters['ReadingMeterEvaluationModule/readingEvaluationDetail'],
)
const proficiencyValue = computed(
  () => store.getters['ReadingMeterEvaluationModule/proficiency'],
)
const omitAudited = computed(() => store.getters['ReadingMeterEvaluationModule/omitAudited'])
const loading = computed(() => store.getters['ReadingMeterEvaluationModule/loading'])

const tableColumns = [
  {
    key: 'studentName',
    label: 'Aluno',
    sortable: true,
  },
  {
    key: 'lastAccess',
    label: 'Último acesso',
    sortable: true,
  },
  {
    key: 'proficiency',
    label: 'Proficiência Leitora',
    class: 'position-relative',
    tooltip:
      'A média de proficiência da avaliação só será exibida quando todos os testes forem finalizados.',
    sortable: true,
  },
  {
    key: 'actions',
    label: 'AÇÕES',
    thStyle: { width: '120px' },
  },
]

const tableActions = [
  {
    icon: data => (data.audited ? 'check' : 'document_search'),
    tooltip: data => {
      if (data.status === 0) {
        return 'Disponível quando o aluno iniciar'
      }
      if (data.status === 3) {
        return 'Disponível quando todos os problemas forem resolvidos.'
      }
    },
    isShow: () => true,
    isEnabled: data => data.status !== 0 && data.status !== 3,
    text: data => (data.audited ? 'Auditado' : 'Auditar'),
    color: 'white',
    action: data => {
      router.push({
        name: 'auditorStudentReport',
        params: {
          evaluationId,
          classId: data.classId,
          studentId: data.id,
        },
      })
    },
  },
]

const sortEnum = {
  studentName: 0,
  lastAccess: 1,
  proficiency: 2,
}

const changePage = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('ReadingMeterEvaluationModule/setParams', {
    Search: searchQuery,
    OrderBy: sortEnum[sortBy.value],
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })

  store.dispatch('ReadingMeterEvaluationModule/fetchEvaluationStudents', {
    evaluationId,
  })
}

store.dispatch('ReadingMeterEvaluationModule/fetchEvaluationDetail', {
  evaluationId,
})

const getColorsEnum = value => {
  return getVariantByRule(value, 'progress')
}

const legends = [progressLegend]

watch([typeTest, proficiencyValue, omitAudited], () => {
  refList.value.resetPage()
  store.commit('ReadingMeterEvaluationModule/setParams', {
    Search: '',
    OrderBy: null,
    Ascending: true,
    Page: 1,
  })
  store.dispatch('ReadingMeterEvaluationModule/fetchEvaluationStudents', {
    evaluationId,
  })
})

watch([evaluationDetail], () => {
  vm.$bus.emit('setBreadcrumb', ['', '', evaluationDetail.value.evaluationName])
})

</script>

<style lang="scss" scoped>
.audit-actions {
  background: #7367f0;
  border-radius: 5px;
  color: #ffffff;
  font-weight: 700;
  padding: 4px 8px;
  font-size: 14px;

  &.audit-validate {
    background: #28c76f;
  }
}
@media (min-width: 768px) {
  .link-floating {
    position: absolute;
    left: 25px;
  }
}
</style>