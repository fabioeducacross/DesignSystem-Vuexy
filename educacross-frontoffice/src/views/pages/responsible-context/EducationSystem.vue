<template>
  <b-card no-body class="mb-0">
    <b-table
      ref="refEducationSystemTable"
      class="position-relative"
      :items="fetchItems"
      responsive
      :fields="tableColumns"
      primary-key="guideId"
      show-empty
      empty-text="Nenhuma missão encontrada"
      empty-filtered-text="Nenhum resultado encontrado"
      :busy="isBusy"
      @sort-changed="sortChange"
    >
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner variant="primary" class="align-middle" />
        </div>
      </template>
      <template #cell(guideName)="data">
        <div class="d-flex">
          <Subjects :subject-id="data.item.subjectId" />
          <div class="ml-1 d-flex align-items-center">
            <p class="font-weight-bold d-block text-nowrap mb-0">
              {{ data.value }}
            </p>
          </div>
        </div>
      </template>

      <template #cell(finished)="data">
        <section vertical-align="center">
          <p class="font-weight-bold d-block text-nowrap">
            {{
              formatNumber(data.item.finishedActivities) +
              ' de ' +
              formatNumber(data.item.totalActivities)
            }}
          </p>
          <b-progress
            :value="data.item.finishedActivities"
            :max="data.item.totalActivities"
            class="progress-bar-success"
            variant="success"
          />
        </section>
      </template>

      <template #cell(enabled)="data">
        <div class="text-nowrap">
          <b-badge pill :variant="statusTag(data.item.enabled)" class="text-capitalize">
            {{ data.item.enabled ? 'Em andamento' : 'Encerrado' }}
          </b-badge>
        </div>
      </template>

      <template #cell(actions)="data">
        <span
          class="material-symbols-outlined cursor-pointer text-primary"
          @click="openModal(data.item)"
        >
          visibility
        </span>
      </template>
    </b-table>

    <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        />
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >
          <b-pagination
            v-model="page"
            :total-rows="totalRows"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template v-slot:prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template v-slot:next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>

    <b-modal ref="refModalMissionDetail" scrollable size="lg" hide-footer>
      <education-system-mission-detail
        :id="selectedGuide.guideId"
        :mission-info="selectedGuide"
        @close="closeModal()"
      />
    </b-modal>
  </b-card>
</template>

<script setup>
import EducationSystemMissionDetail from './shared/modals/EducationSystemMissionDetail.vue'
import Subjects from '@/components/subjects/subjects.vue'
import { formatNumber } from '@/filters/filters'
import axiosIns from '@/libs/axios'
import useFilters from '@/store/filters/useFilters'
import UtilTeacherService from '@/utils/teacher-utils/utils'
import { urlString } from '@/utils/utils'
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
} from 'bootstrap-vue'
import { ref, watch, onMounted } from 'vue'

const refEducationSystemTable = ref(null)
const page = ref(1)
const perPage = ref(5)
const totalRows = ref(0)
const refModalMissionDetail = ref(null)
const selectedGuide = ref(0)

const { educationSystemId } = useFilters()
const isBusy = ref(false)

const sortBy = ref(null)
const sortAsc = ref(null)

const tableColumns = [
  { key: 'guideName', label: 'NOME DA MISSÃO', sortable: true },
  {
    key: 'finished',
    label: 'JOGOS FINALIZADOS',
    sortable: false,
  },
  { key: 'enabled', label: 'STATUS', sortable: true },
  { key: 'actions', label: 'AÇÕES', sortable: false },
]

const fetchItems = async (ctx, callback) => {
  isBusy.value = true
  let parameters = {
    educationSystemId: educationSystemId.value,
    page: page.value,
    pageSize: perPage.value,
  }
  parameters = urlString(parameters)
  if (sortBy.value !== null) {
    parameters += `&OrderBy=${sortBy.value}`
  }
  if (sortAsc.value !== null) {
    parameters += `&Ascending=${sortAsc.value}`
  }
  axiosIns.get(`v1/guides/education-system?${parameters}`).then(res => {
    const { data } = res
    totalRows.value = data.total
    callback(data.data)
    isBusy.value = false
  })
}

const refetchItems = newPage => {
  if (newPage) {
    page.value = newPage
  }

  refEducationSystemTable.value.refresh()
}

watch([page], () => {
  refetchItems()
})

watch([educationSystemId], () => {
  refetchItems()
})

const openModal = item => {
  refModalMissionDetail.value.show()
  selectedGuide.value = item
}

const closeModal = () => {
  refModalMissionDetail.value.hide()
}

const sortChange = ctx => {
  if (ctx.sortBy === '') return
  sortBy.value = ctx.sortBy
  sortAsc.value = ctx.sortDesc
}

watch([perPage, sortBy, sortAsc], () => {
  refetchItems(1)
})

onMounted(() => {
  UtilTeacherService.educationSystem.setColor()
})

const statusTag = value => {
  switch (value) {
    case true:
      return 'light-success'
    case false:
      return 'light-warning'
    default:
      return 'light-info'
  }
}
</script>