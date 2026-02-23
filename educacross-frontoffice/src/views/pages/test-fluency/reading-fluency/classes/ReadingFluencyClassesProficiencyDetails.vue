<template>
  <b-modal
    ref="Modal"
    :visible="value"
    hide-footer
    size="xl"
    no-close-on-backdrop
    centered
    static
    title="Alunos neste nível de proficiência"
    header-bg-variant="light-primary"
    @close="closeModal"
  >
    <div v-if="value">
      <b-card class="card-style">
        <b-row>
          <b-col cols="12" md>
            <div class="d-flex align-items-center gap-1">
              <span class="material-symbols-outlined text-primary"> dictionary </span>
              <span class="text-primary h5 mb-0">
                <span class="font-bold"> Proficiência no Teste de Fluência Leitora Período: </span>
              </span>
            </div>
          </b-col>
          <b-col cols="12" md="auto">
            <div class="d-flex gap-1">
              <span> Nível: </span>
              <BadgeStatus :value="proficiency" enum="proficiencyWithNotCompleted" />
            </div>
          </b-col>
        </b-row>
      </b-card>
      <ListTable
        :loading="loading"
        :table-columns="tableColumns"
        :data-table="dataTable"
        :total-data="totalData"
        search-placeholder="searchForStudent"
        border
        @change="changeListTable"
      >
        <template #cell(className)="{ value }">
          <div>
            <b-badge variant="light-primary">{{ value }}</b-badge>
          </div>
        </template>
        <template #cell(totalTime)="{ item }">
          <div class="d-flex align-items-center gap-2 justify-content-start">
            <span class="material-symbols-outlined" style="font-size: 16px">pace</span>
            <span class="font-semibold">{{ item.totalTime | formattedTime }}</span>
          </div>
        </template>
      </ListTable>
    </div>
  </b-modal>
</template>

<script setup>
import BadgeStatus from '@/components/badge/BadgeStatus.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getReadingFluencyInstitutionsStudentsProficiency } from '@/services/shared/readingMeter/readingMeter.service.js'
import store from '@/store'
import formatDate from '@/utils/date'
import { ref, watch, computed } from 'vue'

// Props
const props = defineProps({
  value: {
    type: Boolean,
  },
  proficiency: {
    type: Number,
  },
})

// Emits
const emit = defineEmits(['input'])

// Computed store getters
const schoolYear = computed(() => store.getters['moduleReadingFluencyClasses/schoolYear'])
const institutionId = computed(() => store.getters['moduleReadingFluencyClasses/institutionId'])

// Refs
const listTable = ref(null)
const loading = ref(false)

const tableColumns = [
  { key: 'name', label: 'ALUNO', sortable: true, tdClass: 'font-bold' },
  { key: 'className', label: 'Turma', sortable: true },
  {
    key: 'totalTime',
    label: 'TEMPO TOTAL INVESTIDO',
    sortable: true,
  },
  {
    key: 'lastDate',
    label: 'ÚLTIMO TESTE REALIZADO',
    sortable: true,
    formatter: value => formatDate(value),
  },
]

const dataTable = ref([])
const totalData = ref(0)

const params = ref({
  Page: 1,
  pageSize: 10,
  OrderBy: 0,
  Ascending: 'true',
  Search: '',
})

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
  getReadingFluencyInstitutionsStudentsProficiency({
    Proficiency: `${props.proficiency}`,
    SerieId: schoolYear.value.id,
    InstitutionId: institutionId.value,
    ...params.value,
  })
    .then(({ data }) => {
      dataTable.value = data.data
      totalData.value = data.total
    })
    .finally(() => {
      loading.value = false
    })
}

watch(
  () => props.value,
  value => {
    if (value) {
      params.value = {
        Page: 1,
        pageSize: 10,
        OrderBy: 0,
        Ascending: 'true',
        Search: '',
      }
      fetchData()
    }
  }
)

const closeModal = () => {
  emit('input', false)
}
</script>

<style lang="scss" scoped>
.card-style {
  border: 1px solid #d8d6de;
  box-shadow: none;
}
</style>