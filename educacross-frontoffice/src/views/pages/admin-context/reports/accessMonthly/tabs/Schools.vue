<template>
  <section>
    <b-row>
      <b-col cols="12" md="6" lg="4">
        <b-form-group label="Escola" label-for="school-name">
          <ESelect
            id="school-name"
            v-model="institution"
            label="name"
            track-by="id"
            :options="institutionList"
            placeholder="Selecione uma Escola"
            :clearable="false"
            :loading="institutionListLoading"
            @input="refreshData(1)"
          >
            <template #no-options> Nenhuma Escola encontrada </template>
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-form-group>
          <span
            id="access-class-last-update cursor-help"
            v-b-tooltip="'Esse relatório é calculado diariamente ao final do dia.'"
          >
            Última atualização:
            {{
              lastUpdateInstitutions !== ''
                ? handleFormatDate(lastUpdateInstitutions) || '--/--/----'
                : ''
            }}
          </span>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-card no-body>
          <ListTableAccess
            ref="refListTableAccess"
            :fields="tableColumns"
            :items="fetchData"
            :loading="loading"
            :total-rows="totalRows"
            :generating-excel="loadingExcel"
            :export-to-excel="exportToExcelInstitutions"
          >
            <template #cell(lastAccess)="{ item }">
              <div :class="{ 'text-center': !item.lastAccess }">
                <span>
                  {{ item.lastAccess ? handleFormatDate(item.lastAccess) : '-' }}
                </span>
              </div>
            </template>
          </ListTableAccess>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import ListTableAccess from '@/components/table/ListTableAccess.vue'
import { formatNumber } from '@/filters/filters'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import {
  getMAUStudentInstitution,
  getUserAccessMonthlySchools,
} from '@/services/shared/reports/Report.service'
import store from '@/store'
import { sanitizeString } from '@/utils/utils'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { ref, computed, onMounted, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy
const refListTableAccess = ref(null)
const loadingExcel = ref(false)
const loading = ref(true)
const lastUpdateInstitutions = ref(undefined)
const currentPageStudents = ref(1)
const institutionList = ref([])
const institutionListLoading = ref(false)
const institution = ref(null)
const totalPagesInstitutions = ref(null)
const tableColumns = [
  {
    label: 'Escola',
    key: 'institutionName',
  },
  {
    label: 'Total de Alunos',
    key: 'students',
    class: 'whitespace-no-wrap',
    formatter: value => formatNumber(value),
  },
]
const totalRows = ref(0)

const userRole = computed(() => store.getters.accessRole)
const isNetworkManager = computed(() => userRole.value === 'NetworkManager')

onMounted(async () => {
  if (isNetworkManager.value) {
    await handleGetInstitutions()
  }
})

const handleGetInstitutions = async () => {
  currentPageStudents.value = 1
  institutionListLoading.value = true
  try {
    if (isNetworkManager.value) {
      const { data } = await getInstitutions()
      institutionList.value = [{ id: null, name: 'Todas as Escolas' }, ...data]
      institution.value = institutionList.value[0]
    }
  } finally {
    institutionListLoading.value = false
  }
}

const getAccessMonthlyInstitutions = ctx => {
  return getUserAccessMonthlySchools(
    {
      institutionId: institution.value?.id,
      pageSize: ctx.perPage,
      tableOrderBy: ctx.sortBy,
      tableAscending: ctx.sortDesc,
    },
    ctx.currentPage,
  )
}

const fetchData = async (ctx, callback) => {
  loading.value = true

  getAccessMonthlyInstitutions(ctx)
    .then(response => {
      const { data } = response
      const { lastUpdate, reportInstitution } = data
      lastUpdateInstitutions.value = lastUpdate
      totalRows.value = reportInstitution.total
      totalPagesInstitutions.value = response.data.reportInstitution.totalPages
      callback(reportInstitution.data)
    })
    .catch(() => {
      callback([])
    })
    .finally(() => {
      loading.value = false
    })
}

const refreshData = async page => {
  refListTableAccess.value.refresh(page)
}

const exportToExcelInstitutions = () => {
  loadingExcel.value = true

  let fileName = 'Relatorio de acessos por Escolas'

  fileName = sanitizeString(fileName)

  getMAUStudentInstitution([institution.value?.id], fileName)
    .catch(() => {
      vm.$toast({
        component: Toast,
        props: {
          title: 'Atenção',
          icon: 'AlertTriangleIcon',
          text: 'Erro ao exportar relatório de acessos por Escolas.',
          variant: 'danger',
        },
      })
    })
    .finally(() => {
      loadingExcel.value = false
    })
}

const handleFormatDate = date => {
  if (!date) return null

  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()

  return `${day}/${month}/${year}`
}
</script>

<style lang="scss" scoped>
  .cursor-help {
    cursor: help;
    width: fit-content;
  }

  .text-legend {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: auto 0;
    color: #2c2c2c;
    font-weight: 600;
    font-size: 15px;

    margin-right: 1rem;
    @media (max-width: 425px) {
      margin-left: 0 !important;
    }

    .legend-numbers {
      font-weight: inherit;
      color: #00bdb9;
    }
  }
  .students-total-title {
    margin-left: 0.5rem;
  }
</style>
