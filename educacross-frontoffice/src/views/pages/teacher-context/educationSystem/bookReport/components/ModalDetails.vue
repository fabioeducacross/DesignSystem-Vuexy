<template>
  <b-modal
    ref="Modal"
    :visible="value"
    hide-footer
    size="xl"
    no-close-on-backdrop
    centered
    static
    :title="modalTitle"
    header-bg-variant="light-primary"
    @close="closeModal"
  >
    <div v-if="value">
      <div class="mb-2">
        <MissionAndQuestionItemByTopic v-if="exhibition" :item="round" :subject-id="subject.id">
          <template v-slot:left-content>
            <div class="d-flex align-items-center flex-grow-1 gap-8 ml-2">
              <div class="ml-auto">
                <p
                  class="d-flex align-items-center mb-50 gap-2 text-nowrap text-primary justify-content-end"
                >
                  {{ round.amountGuides }} missões vinculadas ao tópico
                </p>
                <p
                  class="d-flex align-items-center mb-50 gap-2 text-nowrap text-primary justify-content-end"
                >
                  {{ round.amountActivities }} turnos de jogo
                </p>
                <p
                  class="d-flex align-items-center mb-50 gap-2 text-nowrap text-primary justify-content-end"
                >
                  {{ round.amountQuiz }} turnos de quiz
                </p>
              </div>
            </div>
          </template>
        </MissionAndQuestionItemByTopic>
        <MissionAndQuestionItemByAbility v-else :item="round" :subject-id="subject.id">
          <template v-slot:left-content>
            <div class="d-flex align-items-center flex-grow-1 gap-8 ml-2">
              <div class="ml-auto">
                <p
                  class="d-flex align-items-center mb-50 gap-2 text-nowrap text-primary justify-content-end"
                >
                  {{ round.amountGuides }} missões vinculadas ao tópico
                </p>
                <p
                  class="d-flex align-items-center mb-50 gap-2 text-nowrap text-primary justify-content-end"
                >
                  {{ round.amountActivities }} turnos de jogo
                </p>
                <p
                  class="d-flex align-items-center mb-50 gap-2 text-nowrap text-primary justify-content-end"
                >
                  {{ round.amountQuiz }} turnos de quiz
                </p>
              </div>
            </div>
          </template>
        </MissionAndQuestionItemByAbility>
      </div>
      <ListTable
        :loading="loading"
        :table-columns="tableColumns"
        :data-table="dataTable"
        :total-data="totalData"
        search-placeholder="searchMission"
        border
        @change="changeListTable"
      >
        <template #cell(classesNames)="{ item }">
          <div class="d-flex gap-1 flex-wrap">
            <div v-for="(className, index) in item.classesNames" :key="index">
              <b-badge variant="light-primary" class="mb-50">
                {{ className }}
              </b-badge>
            </div>
          </div>
        </template>
      </ListTable>
    </div>
  </b-modal>
</template>

<script setup>
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTable from '@/components/table/ListTable.vue'
import { formatNumber } from '@/filters/filters'
import { getGuidesPlusContentDetails } from '@/services/teacher-context/guides/Guides.Service.js'
import useFilters from '@/store/filters/useFilters'
import MissionAndQuestionItemByAbility from '@/views/pages/teacher-context/educationSystem/bookReport/components/MissionAndQuestionItemByAbility.vue'
import MissionAndQuestionItemByTopic from '@/views/pages/teacher-context/educationSystem/bookReport/components/MissionAndQuestionItemByTopic.vue'
import { useEducationSystemBookReport } from '@/views/pages/teacher-context/educationSystem/bookReport/useEducationSystemBookReport.js'
import { ref, watch, computed } from 'vue'

// Props
const props = defineProps({
  value: {
    type: Boolean,
  },
  round: {},
})

// Emits
const emit = defineEmits(['input'])

const { exhibition } = useEducationSystemBookReport()
const { classe, subject, period } = useFilters()

const listTable = ref(null)
const loading = ref(false)

const modalTitle = computed(() => {
  return `Detalhes das missões com ${props.round?.contentName}`
})

const tableColumns = [
  { key: 'name', label: 'Missão', sortable: true, tdClass: 'font-weight-bold' },
  {
    key: 'classesNames',
    label: 'TURMAS VINCULADAS À MISSÃO',
  },
  {
    key: 'amountActivities',
    label: 'JOGOS NA MISSÃO',
    sortable: true,
    formatter: value => formatNumber(value),
  },
  {
    key: 'amountQuiz',
    label: 'QUIzZes NA MISSÃO',
    formatter: value => formatNumber(value),
    sortable: true,
  },
]

const defaultParams = () => {
  return {
    Search: '',
    OrderBy: null,
    Page: 1,
    PageSize: 10,
    Ascending: 'true',
  }
}

const data = ref(null)
const params = ref(defaultParams())

const dataTable = computed(() => data.value?.report.data || [])
const totalData = computed(() => data.value?.report.total || 0)

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Page: currentPage,
    PageSize: perPage,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Search: searchQuery,
  }

  fetchData()
}

const fetchData = () => {
  loading.value = true

  getGuidesPlusContentDetails(props.round.id, {
    SubjectId: subject.value.id,
    ByTopic: !!exhibition.value,
    Month: period.value.id,
    ClassId: classe.value.id,
    ...params.value,
  })
    .then(response => {
      data.value = response.data
    })
    .finally(() => {
      loading.value = false
    })
}

watch(
  () => props.value,
  value => {
    if (value) {
      fetchData()
    }
  },
)

const closeModal = () => {
  params.value = defaultParams()
  data.value = null
  emit('input', false)
}
</script>

<style lang="scss" scoped>
.card-style {
  border: 1px solid #d8d6de;
  box-shadow: none;
}
</style>