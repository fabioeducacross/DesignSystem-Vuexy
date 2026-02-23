<template>
  <b-row>
    <b-col cols="12">
      <b-card>
        <b-skeleton-wrapper :loading="loading">
          <template v-slot:loading>
            <b-skeleton class="m-0" height="100%" width="100%"></b-skeleton>
          </template>
          <div
            class="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-sm-between"
          >
            <div class="mb-1 mb-sm-0">
              <span
                id="access-class-last-update cursor-help"
                v-b-tooltip="'Esse relatório é calculado diariamente ao final do dia.'"
              >
                <span class="font-weight-bold">Última atualização:</span>
                {{ lastUpdateStudents ? formatDate(lastUpdateStudents) : '--/--/----' }}
              </span>
            </div>

            <div>
              <span
                id="access-class-last-update cursor-help"
                v-b-tooltip="'Esse relatório é calculado diariamente ao final do dia.'"
              >
                <span class="font-weight-bold">Total de alunos na turma:</span>
                <span class="font-bold text-primary">
                  {{ formatNumber(totalStudents) }}
                </span>
              </span>
            </div>
          </div>
        </b-skeleton-wrapper>
      </b-card>
    </b-col>
    <b-col cols="12">
      <b-card no-body>
        <ListTableAccess
          ref="refListTableAccess"
          :loading="loading"
          :fields="tableColumns"
          :items="fetchData"
          :total-rows="totalRows"
          :formatter="item => formatNumber(item)"
          :class-map="classMap"
        >
          <template #cell(studentName)="{ item }">
            <div>
              <span class="font-bold text-body whitespace-no-wrap">
                {{ item.studentName }}
              </span>
            </div>
          </template>
          <template #cell(lastAccess)="{ item }">
            <div :class="formatDate(item.lastAccess) === '-' ? 'text-center' : ''">
              <span class="text-body whitespace-no-wrap">
                {{ formatDate(item.lastAccess) }}
              </span>
            </div>
          </template>
        </ListTableAccess>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
import ListTableAccess from '@/components/table/ListTableAccess.vue'
import { formatNumber } from '@/filters/filters'
import { getUserAccessMonthlyStudents } from '@/services/shared/reports/Report.service'
import useFilters from '@/store/filters/useFilters'
import formatDate from '@/utils/date'
import { computed, ref, watch } from 'vue'

const { classe } = useFilters()

const refListTableAccess = ref(null)
const loading = ref(false)
const lastUpdateStudents = ref(undefined)
const totalRows = ref(0)
const totalStudents = ref(0)

const tableColumns = ref([
  {
    label: 'Aluno',
    key: 'studentName',
  },
  {
    label: 'Último acesso',
    key: 'lastAccess',
    class: 'whitespace-no-wrap',
  },
])

const globalClassId = computed(() => {
  return classe.value?.ClassId || classe.value?.id
})

const classMap = accessActivity => {
  const access = Number.parseFloat(accessActivity)
  if (Number.isNaN(access)) return ''

  if (access < 1) return 'less-activity'
  return 'almost-full-activity'
}

const fetchData = (ctx, callback) => {
  const params = {
    ...ctx,
    pageSize: ctx.perPage,
    classId: globalClassId.value,
    tableOrderBy: ctx.sortBy,
    tableAscending: ctx.sortDesc,
  }

  loading.value = true

  getUserAccessMonthlyStudents(params, ctx.currentPage)
    .then(response => {
      const { data } = response
      const { lastUpdate, reportStudents } = data
      lastUpdateStudents.value = lastUpdate
      totalRows.value = reportStudents.total
      totalStudents.value = reportStudents.total
      callback(reportStudents.data)
    })
    .catch(() => {
      callback([])
    })
    .finally(() => {
      loading.value = false
    })

  return null
}

// Methods
const refreshData = async page => {
  if (refListTableAccess.value) {
    refListTableAccess.value.refresh(page)
  }
}

watch(globalClassId, () => {
  refreshData(1)
})
</script>
<style scoped>
  .cursor-help {
    cursor: help;
    width: fit-content;
  }
</style>