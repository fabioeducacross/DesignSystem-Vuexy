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
    @hide="closeModal"
  >
    <div v-if="value">
      <b-card class="card-style">
        <b-row>
          <b-col>
            Ano Escolar:
            <span class="font-bold text-primary">{{ schoolYear.name }}</span>
          </b-col>
          <!-- <b-col></b-col> -->
          <b-col class="text-right">
            Período:
            <span class="font-bold text-primary">{{ month.name }}</span>
          </b-col>
        </b-row>
      </b-card>
      <ListTable
        :loading="loading"
        :table-columns="tableColumns"
        :data-table="dataTable"
        :total-data="totalData"
        :search-placeholder="searchPlaceholder"
        border
        @change="changeListTable"
      >
        <template #cell(name)="{ item }">
          <div class="d-flex align-items-center gap-2">
            <span>{{ item.name }}</span>
            <b-badge v-if="!item.access" variant="light-danger">
              <span>Não acessou</span>
            </b-badge>
          </div>
        </template>
        <template #cell(classesNames)="{ item }">
          <ListItemsLimited :data="item.classesNames">
            <template v-slot:item="{ data }">
              <b-badge variant="light-primary">
                {{ data }}
              </b-badge>
            </template>
            <template v-slot:excess="{ data }">
              <b-badge variant="light-primary"> +{{ data | formatNumber }} </b-badge>
            </template>
          </ListItemsLimited>
        </template>

        <template #cell(access)="{ item }">
          <ConditionalValueDisplay :value="item.access" :layout="'badge'">
            {{ item.access | formatNumber }}
          </ConditionalValueDisplay>
        </template>

        <template #cell(guides)="{ item }">
          <ConditionalValueDisplay :value="item.guides" :layout="'badge'">
            {{ item.guides | formatNumber }}
          </ConditionalValueDisplay>
        </template>

        <template #cell(lastAccess)="{ item }">
          <ConditionalValueDisplay :value="item.lastAccess" :layout="'badge'">
            {{ item.lastAccess | formatDate }}
          </ConditionalValueDisplay>
        </template>
      </ListTable>
      <b-row v-if="reportRoute" class="mb-2">
        <b-col class="text-center">
          <b-button variant="primary" @click="openReport">
            Ver relatório de acessos completo
            <span style="font-size: 12px" class="material-icons-outlined">chevron_right</span>
          </b-button>
        </b-col>
      </b-row>
    </div>
  </b-modal>
</template>

<script setup>
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTable from '@/components/table/ListTable.vue'
import { DynamicCardStatusEnum } from '@/consts/StatusEnums'
import router from '@/router'
import { getOverviewAccessProfile } from '@/services/shared/reports/Report.service.js'
import store from '@/store'
import ListItemsLimited from '@/views/pages/admin-context/shared/table-columns-components/ListItemsLimited.vue'
import { ref, watch, computed } from 'vue'

const props = defineProps({
  value: {
    type: Boolean,
  },
  context: {
    type: String,
  },
})

const emit = defineEmits(['input'])

const institutionId = computed(
  () => store.getters['moduleDashboardClassesEngagement/institutionId'],
)
const schoolYear = computed(
  () => store.getters['moduleDashboardClassesEngagement/schoolYear'],
)
const teacher = computed(() => store.getters['moduleDashboardClassesEngagement/teacher'])
const month = computed(() => store.getters['moduleDashboardClassesEngagement/month'])
const listTable = ref(null)
const loading = ref(false)

const contextData = {
  Secretariats: {
    id: 7,
    modalTitle: 'Detalhes de acesso de administradores',
    tableColumns: [
      { key: 'name', label: 'Administrador', sortable: true },
      {
        key: 'access',
        label: 'ACESSOS DO Administrador NO PERÍODO',
        sortable: true,
      },
      {
        key: 'lastAccess',
        label: 'ÚLTIMO ACESSO NO PERÍODO',
        sortable: true,
      },
    ],
    searchPlaceholder: 'Pesquisar por administrador',
    reportRoute: '',
  },
  Teachers: {
    id: 2,
    modalTitle: 'Detalhes de acesso de professores',
    tableColumns: [
      { key: 'name', label: 'PROFESSOR', sortable: true },
      { key: 'classesNames', label: 'TURMAS DO PROFESSOR', sortable: false },
      {
        key: 'access',
        label: 'ACESSOS DO PROFESSOR NO PERÍODO',
        sortable: true,
        thStyle: { width: '200px' },
      },
      {
        key: 'guides',
        label: 'MISSÕES ENVIADAS NO PERÍODO',
        sortable: true,
        thStyle: { width: '180px' },
      },
      {
        key: 'lastAccess',
        label: 'ÚLTIMO ACESSO NO PERÍODO',
        sortable: true,
        thStyle: { width: '180px' },
      },
    ],
    searchPlaceholder: 'Pesquisar por professor',
    reportRoute: 'teachersAccessTeacher',
  },
  Coordinators: {
    id: 5,
    modalTitle: 'Detalhes de acesso de coordenadores',
    tableColumns: [
      { key: 'name', label: 'COORDENADOR', sortable: true },
      { key: 'classesNames', label: 'TURMAS DO COORDENADOR', sortable: false },
      {
        key: 'access',
        label: 'ACESSOS DO COORDENADOR NO PERÍODO',
        thStyle: { width: '200px' },
        sortable: true,
      },
      {
        key: 'lastAccess',
        label: 'ÚLTIMO ACESSO NO PERÍODO',
        sortable: true,
        thStyle: { width: '180px' },
      },
    ],
    searchPlaceholder: 'Pesquisar por coordenador',
    reportRoute: '',
  },
  Managers: {
    id: 4,
    modalTitle: 'Detalhes de acesso de Diretores',
    tableColumns: [
      { key: 'name', label: 'DIRETOR', sortable: true },
      {
        key: 'access',
        label: 'ACESSOS DO DIRETOR NO PERÍODO',
        sortable: true,
      },
      {
        key: 'lastAccess',
        label: 'ÚLTIMO ACESSO NO PERÍODO',
        sortable: true,
      },
    ],
    searchPlaceholder: 'Pesquisar por diretor',
    reportRoute: '',
  },
}

const modalTitle = computed(() => {
  return contextData[props.context]?.modalTitle || ''
})

const tableColumns = computed(() => {
  return contextData[props.context]?.tableColumns || []
})

const searchPlaceholder = computed(() => {
  return contextData[props.context]?.searchPlaceholder || ''
})

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
  getOverviewAccessProfile({
    UserType: contextData[props.context]?.id || null,
    SerieId: schoolYear.value.id,
    Month: month.value.id,
    InstitutionId: institutionId.value,
    TeachersIds: teacher.value.map(item => item.id),
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
      fetchData()
    }
  },
)

const reportRoute = computed(() => {
  return contextData[props.context]?.reportRoute || false
})

const openReport = () => {
  if (reportRoute.value) {
    router.push({ name: reportRoute.value, params: { institutionId: institutionId.value } })
  }
}

const closeModal = () => {
  emit('input', false)
}

const setRangeColor = value => {
  let variant = {}

  switch (true) {
    case value === 100:
      variant = DynamicCardStatusEnum[4]
      break
    case value >= 80:
      variant = DynamicCardStatusEnum[3]
      break
    case value >= 50:
      variant = DynamicCardStatusEnum[2]
      break
    default:
      variant = DynamicCardStatusEnum[1]
      break
  }

  return variant
}
</script>

<style lang="scss" scoped>
  .card-style {
    border: 1px solid #d8d6de;
    box-shadow: none;
  }
</style>