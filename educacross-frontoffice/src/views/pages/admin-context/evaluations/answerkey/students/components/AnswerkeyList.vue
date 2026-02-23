<template>
  <div>
    <b-row align-v="center" class="mb-1">
      <!-- Per Page -->
      <b-col cols="12" md>
        <div
          class="d-flex align-items-center gap-2 justify-content-center justify-content-sm-start text-primary mb-1 mb-md-0"
        >
          <span class="material-symbols-outlined"> checklist </span>
          <h4 class="mb-0 text-primary">
            <span class="font-bold">Gabarito Digital</span>
          </h4>
        </div>
      </b-col>
      <b-col cols="12" md="auto" class="d-flex align-items-center justify-content-end">
        <label>{{ $t('show') }}</label>
        <ESelect
          v-model="perPage"
          :options="perPageOptions"
          :clearable="false"
          :searchable="false"
          class="per-page-selector d-inline-block mx-50"
          @change="onUpdatePagination"
        />
      </b-col>
    </b-row>
    <b-row class="d-none d-lg-flex">
      <b-col cols="12" lg="6">
        <b-skeleton-table v-show="loading" :columns="2" :rows="2" />
        <b-table-simple v-show="!loading" class="mb-0">
          <b-thead>
            <b-tr>
              <b-th class="bg-white border-0" style="width: 140px">QUESTÃO</b-th>
              <b-th class="bg-white border-0">ALTERNATIVA RESPONDIDA PELO ALUNO</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <AnswerkeyQuestion
              v-for="(item, index) in paginationData.leftColumn"
              :key="`${index}-${currentPage}-left`"
              :value="item"
              :subject-id="subjectId"
              :disabled="disabled || item.answerKey === EAnswerKey.EvaluationDigital"
              :question-index="index + 1 + currentPage * perPage.id - perPage.id"
              @input="updateAnswer"
            />
          </b-tbody>
        </b-table-simple>
      </b-col>
      <b-col cols="12" lg="6">
        <b-skeleton-table v-show="loading" :columns="2" :rows="2" />
        <b-table-simple v-show="!loading" class="mb-0">
          <b-thead class="mb-0 second-table-header">
            <b-tr>
              <b-th class="bg-white border-0" style="width: 140px">QUESTÃO</b-th>
              <b-th class="bg-white border-0">ALTERNATIVA RESPONDIDA PELO ALUNO</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <AnswerkeyQuestion
              v-for="(item, index) in paginationData.rightColumn"
              :key="`${index}-${currentPage}-right`"
              :value="item"
              :subject-id="subjectId"
              :disabled="disabled || item.answerKey === EAnswerKey.EvaluationDigital"
              :question-index="
                index + 1 + paginationData.leftColumn.length + currentPage * perPage.id - perPage.id
              "
              @input="updateAnswer"
            />
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>

    <b-row class="d-lg-none">
      <b-col cols="12">
        <b-skeleton-table v-show="loading" :columns="2" :rows="2" />
        <b-table-simple v-show="!loading" responsive class="mb-0">
          <b-thead>
            <b-tr>
              <b-th class="bg-white border-0" style="width: 140px">QUESTÃO</b-th>
              <b-th class="bg-white border-0">ALTERNATIVA RESPONDIDA PELO ALUNO</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <AnswerkeyQuestion
              v-for="(item, index) in data"
              :key="index"
              :value="item"
              :subject-id="subjectId"
              :disabled="disabled"
              :question-index="index + 1"
              @input="updateAnswer"
            />
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>

    <ListTablePagination
      :value="currentPage"
      :total-data="paginationData.totalData"
      :per-page="perPage.id"
      @input="changePage"
    />
  </div>
</template>

<script setup>
/**
 * @module AnswerkeyList
 * @description
 * This component displays a paginated list of student answers for a digital answer key.
 * It is responsive and shows the answers in two columns for larger screens and a single column for smaller ones.
 * It includes controls for pagination and number of items per page.
 *
 * @component
 * @property {Boolean} loading - Indicates if the table should show skeletons for loading state.
 * @property {Array<{id: Number, alternative: Number, answerKey: Number}>} data - Array of answer objects, each containing an `id`, `alternative`, and `answerKey`, all numeric.
 * @property {Number} subjectId - ID of the subject to which the questions belong.
 * @property {Boolean} disabled - Indicates if the answer fields should be disabled.
 *
 * @emits
 * @event input - Emitted when a student's answer is updated.
 * @type {Array<Object>} Updated answer array
 *
 * @example
 * <AnswerkeyList
 *   :loading="true"
 *   :data="answerData"
 *   :subject-id="1"
 *   :disabled="false"
 *   @input="handleUpdatedAnswers"
 * />
 */
import ESelect from '@/components/selects/ESelect.vue'
import ListTablePagination from '@/components/table/ListTablePagination.vue'
import { EAnswerKey } from '@/consts/evaluationsEnum'
import AnswerkeyQuestion from '@/views/pages/admin-context/evaluations/answerkey/students/components/AnswerkeyQuestion.vue'
import { ref, reactive, watch } from 'vue'

// Props
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array,
    default: () => [],
  },
  subjectId: {
    type: Number,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
})

// Emits
const emit = defineEmits(['input'])

const currentPage = ref(1)
const perPageOptions = [
  {
    id: 24,
    name: 24,
  },
  {
    id: 48,
    name: 48,
  },
]

const perPage = ref(perPageOptions[0])

const paginationData = reactive({
  totalData: 0,
  leftColumn: [],
  rightColumn: [],
})

const onUpdatePagination = (resetPage = true) => {
  if (resetPage) {
    currentPage.value = 1
  }

  const startIndex = (currentPage.value - 1) * perPage.value.id
  const endIndex = startIndex + perPage.value.id
  const paginatedItems = props.data.slice(startIndex, endIndex)

  const totalData = props.data.length

  // Split the paginated data into two arrays
  const halfLength = Math.ceil(paginatedItems.length / 2)
  const leftColumn = paginatedItems.slice(0, halfLength)
  const rightColumn = paginatedItems.slice(halfLength)

  paginationData.totalData = totalData
  paginationData.leftColumn = leftColumn
  paginationData.rightColumn = rightColumn
}

const changePage = page => {
  currentPage.value = page
  onUpdatePagination(false)
}

const updateAnswer = answer => {
  const valueToUpdate = props.data.map(item => {
    if (item.id === answer.id) {
      return { ...item, alternative: answer.alternative }
    }
    return item
  })
  emit('input', valueToUpdate)
}

watch(
  () => props.data,
  () => {
    console.table({ ...props.data })
    onUpdatePagination()
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
  @import '@core/scss/base/bootstrap-extended/include';

  .per-page-selector {
    width: 90px;
    min-width: 90px;
  }

  .second-table-header {
    @media (max-width: (map-get($grid-breakpoints, lg))) {
      display: none;
    }
  }
</style>