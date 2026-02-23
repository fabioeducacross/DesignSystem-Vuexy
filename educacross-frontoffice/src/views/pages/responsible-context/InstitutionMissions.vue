<template>
  <section>
    <b-card no-body>
      <b-table
        ref="refUserListTable"
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

        <template #head(timeToFinished)="item">
          <div class="text-wrap" style="min-width: 130px">
            <span class="align-text-top font-bold">{{ item.label }}</span>
          </div>
        </template>
        <template #cell(guideName)="data">
          <div class="d-flex">
            <Subjects :subject-id="data.item.subjectId" />
            <div class="ml-1 text-wrap">
              <span class="align-text-top font-weight-bold">{{ data.value }}</span>
            </div>
          </div>
        </template>

        <template #cell(performance)="{ item }">
          <SemaphoreStatus :status-enum="getPerformanceEnum(item.performance)">
            <span>{{ item.performance | formatNumber }}%</span>
          </SemaphoreStatus>
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

        <template #cell(situation)="data">
          <div class="text-nowrap">
            <b-badge pill :variant="statusTag(data.item.situation)" class="text-capitalize">
              {{ data.item.situation }}
            </b-badge>
          </div>
        </template>

        <template #cell(duration)="data">
          {{ data.item.start | formattedDate }} até
          {{ data.item.expiration | formattedDate }}
        </template>
        <template #cell(timeToFinished)="data">
          {{ data.item.timeToFinished | formattedTime }}
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

      <b-modal ref="refModalMissionDetail" size="lg" scrollable hide-footer>
        <education-system-mission-detail
          :id="selectedGuide.guideId"
          :mission-info="selectedGuide"
          @close="closeModal()"
        />
      </b-modal>
    </b-card>
    <!--<LegendEnum :legends="[performanceEnum]" />-->
  </section>
</template>

<script setup>
import EducationSystemMissionDetail from './shared/modals/EducationSystemMissionDetail.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import Subjects from '@/components/subjects/subjects.vue'
import { getPerformanceEnum, performanceEnum } from '@/consts/progressPerformanceEnum.js'
import { formatNumber } from '@/filters/filters'
import axiosIns from '@/libs/axios'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { ref, watch } from 'vue'

// Refs and reactive state
const refUserListTable = ref(null)
const page = ref(1)
const perPage = ref(5)
const totalRows = ref(0)
const refModalMissionDetail = ref(null)
const selectedGuide = ref(0)
const isBusy = ref(false)

const sortBy = ref('duration')
const sortAsc = ref(true)

const tableColumns = [
  { key: 'guideName', label: 'NOME DA MISSÃO', sortable: true },
  {
    key: 'finished',
    label: 'PROGRESSO',
    sortable: true,
  },
  { key: 'performance', label: 'DESEMPENHO', sortable: true },
  { key: 'situation', label: 'STATUS', sortable: false },
  { key: 'duration', label: 'DURAÇÃO', sortable: true },
  { key: 'timeToFinished', label: 'TEMPO ESTIMADO PARA CONCLUSÃO', sortable: true },
  { key: 'actions', label: 'AÇÕES', sortable: false },
]

const sortEnum = {
  guideName: 0,
  finished: 1,
  duration: 2,
  performance: 3,
  timeToFinished: 4,
}

const fetchItems = async (ctx, callback) => {
  isBusy.value = true
  axiosIns
    .get(
      `v1/guides/student?page=${page.value}&pageSize=${perPage.value}&orderBy=${
        sortEnum[sortBy.value]
      }&ascending=${sortAsc.value}`,
    )
    .then(res => {
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
  if (refUserListTable.value) {
    refUserListTable.value.refresh()
  }
}

watch([page], () => {
  refetchItems()
})

const openModal = item => {
  if (refModalMissionDetail.value) {
    refModalMissionDetail.value.show()
    selectedGuide.value = item
  }
}

const closeModal = () => {
  if (refModalMissionDetail.value) {
    refModalMissionDetail.value.hide()
  }
}

const sortChange = ctx => {
  if (ctx.sortBy === '') return
  sortBy.value = ctx.sortBy
  sortAsc.value = ctx.sortDesc
}

watch([perPage, sortBy, sortAsc], () => {
  refetchItems(1)
})

// Methods
const statusTag = value => {
  switch (value) {
    case 'Finalizado':
      return 'light-primary'
    case 'Iniciado':
      return 'light-success'
    case 'Não iniciado':
      return 'light-warning'
    default:
      return 'light-info'
  }
}
</script>
<style></style>