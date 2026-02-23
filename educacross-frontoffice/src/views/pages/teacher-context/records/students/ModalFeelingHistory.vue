<template>
  <b-modal
    ref="refModal"
    title="Histórico de emojis do aluno"
    size="lg"
    centered
    no-close-on-esc
    no-close-on-backdrop
    hide-footer
    static
    @close="onClose"
    @shown="onShown"
  >
    <div v-if="modalVisible">
      <b-card class="shadow-none card-border">
        <div v-if="!loading">
          <h5 class="d-inline mr-50 font-bold text-body">{{ studentName }}</h5>
          <b-badge variant="light-primary" class="d-inline" pill>{{ className }}</b-badge>
        </div>
        <b-skeleton v-else class="w-100 mb-0" />
      </b-card>
      <ListTable
        v-if="studentId"
        ref="refTable"
        :loading="loading"
        :data-table="tableData"
        :table-columns="tableFields"
        :total-data="totalItems"
        :show-search-query-input="false"
        :show-view-selection="false"
        :per-page-options="[5, 10]"
        default-sort-by="date"
        :default-sort-desc="true"
        :border="true"
        @change="changeListTable"
      >
        <template #cell(imageUrl)="{ item, index }">
          <div class="d-flex align-items-center gap-2">
            <b-avatar
              :src="item.imageUrl"
              rounded="lg"
              style="width: 44px; height: 44px"
            ></b-avatar>
            <b-badge
              v-if="currentPage === 1 && index === 0 && isOutdated(item.date)"
              variant="light-danger"
            >
              <span class="material-symbols-outlined align-middle">gpp_maybe</span>
              <span class="align-middle font-normal">Emoção não atualizada há mais de 15 dias</span>
            </b-badge>
          </div>
        </template>
      </ListTable>
    </div>
  </b-modal>
</template>

<script setup>
import ListTable from '@/components/table/ListTable.vue'
import { getStudentFeelings } from '@/services/teacher-context/students/Students.service'
import { formatDate } from '@/utils/utils'
import { ref, nextTick, reactive } from 'vue'

const refModal = ref(null)
const studentId = ref(null)
const studentName = ref('')
const className = ref('')
const modalVisible = ref(false)
const loading = ref(true)

const tableFields = [
  { key: 'imageUrl', label: 'EMOJI ESCOLHIDO PELO ALUNO' },
  {
    key: 'date',
    label: 'Data da alteração',
    sortable: true,
    formatter: value => formatDate(value),
  },
]

const tableData = ref([])
const totalItems = ref(0)
const currentPage = ref(1)

const params = reactive({
  Page: 1,
  PageSize: 10,
  OrderBy: 'date',
  Ascending: 'false',
  Search: '',
})

const fetchTableData = async () => {
  if (!studentId.value) {
    tableData.value = []
    totalItems.value = 0
    return
  }

  loading.value = true

  try {
    const response = await getStudentFeelings(studentId.value, params)
    const { data } = response
    const { feelings } = data
    tableData.value = feelings.data
    totalItems.value = feelings.total
    studentName.value = data.name
    className.value = data.className
  } finally {
    loading.value = false
  }
}

const resetComponent = () => {
  params.Page = 1
  params.PageSize = 10
  params.OrderBy = 'date'
  params.Ascending = 'false'
  params.Search = ''
  studentId.value = null
  studentName.value = ''
  className.value = ''
  tableData.value = []
  totalItems.value = 0
}

const openModal = student => {
  studentId.value = student.studentId
  modalVisible.value = true
  refModal.value.show()
}

const onClose = () => {
  refModal.value.hide()
  modalVisible.value = false
  studentId.value = null

  resetComponent()
}

const onShown = async () => {
  await nextTick()
  await fetchTableData()
}

const changeListTable = ({ currentPage: page, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.Page = page
  params.PageSize = perPage
  params.OrderBy = `${sortBy}`
  params.Ascending = `${!isSortDirDesc}`
  params.Search = searchQuery

  currentPage.value = page

  fetchTableData()
}

const isOutdated = dateString => {
  const updateDate = new Date(dateString)
  const currentDate = new Date()
  const diffDays = (currentDate - updateDate) / (1000 * 60 * 60 * 24)
  return diffDays >= 15
}
</script>