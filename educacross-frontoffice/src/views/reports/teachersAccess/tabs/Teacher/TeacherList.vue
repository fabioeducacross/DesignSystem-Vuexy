<template>
  <section>
    <ListTable
      ref="listTableRef"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      :show-search-query-input="false"
      :generating-excel="generatingExcel"
      :export-to-excel="exportToExcel"
      @change="changeListTable"
    >
      <template #head(amountClasses)="item">
        <div class="d-flex align-items-center gap 1">
          {{ item.label }}
          <span
            v-b-tooltip.hover.top="`Quantidade de turmas do professor.`"
            class="material-symbols-outlined ml-1 head-icon-info"
          >
            info
          </span>
        </div>
      </template>
      <template #head(amountAccess)="item">
        <div class="d-flex align-items-center gap 1">
          {{ item.label }}
          <span
            v-b-tooltip.hover.top="`Quantidade de acessos do professor no mês.`"
            class="material-symbols-outlined ml-1 head-icon-info"
          >
            info
          </span>
        </div>
      </template>
      <template #head(guidesEnabled)="item">
        <div class="d-flex align-items-center gap 1">
          {{ item.label }}
          <span
            v-b-tooltip.hover.top="`Quantidade de missões enviadas pelo professor.`"
            class="material-symbols-outlined ml-1 head-icon-info"
          >
            info
          </span>
        </div>
      </template>
    </ListTable>
  </section>
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ListTable from '@/components/table/ListTable.vue'
import { formatNumber } from '@/filters/filters'
import { getTeachersAccessExcel } from '@/services/shared/teachers/Teachers.Service.js'
import store from '@/store'
import { monthName } from '@/utils/utils'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { useTeachersAccess } from '@/views/reports/teachersAccess/useTeachersAccess.js'
import { saveAs } from 'file-saver'
import { ref, watch, computed } from 'vue'

const { institution, moduleId, month, educationSystem, networkGroup } = useTeachersAccess()

const isNetworkManager = store.getters.accessRole === 'NetworkManager'

const listTableRef = ref(null)

const loading = computed(() => store.getters['moduleTeacherAccessTabTeacher/loading'])

const dataTable = computed(() => store.getters['moduleTeacherAccessTabTeacher/data'])
const totalData = computed(() => store.getters['moduleTeacherAccessTabTeacher/total'])

const year = new Date().getFullYear()

const tableColumns = [
  { key: 'teacherName', label: 'Professor' },
  {
    key: 'amountClasses',
    label: 'Qtd. de Turmas',
    formatter: value => formatNumber(value),
  },
  {
    key: 'amountAccess',
    label: 'Quantidade de Acessos',
    formatter: value => formatNumber(value),
  },
  {
    key: 'guidesEnabled',
    label: 'Missões Iniciadas',
    formatter: value => formatNumber(value),
  },
]

if (isNetworkManager) {
  tableColumns.splice(1, 0, {
    key: 'institutionName',
    label: 'ESCOLA DO PROFESSOR',
  })
}

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc }) => {
  store.commit('moduleTeacherAccessTabTeacher/setParams', {
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })

  store.dispatch('moduleTeacherAccessTabTeacher/fetch')
}

watch([moduleId, month, educationSystem], () => {
  if (moduleId.value?.id === 11 && !educationSystem.value) return
  store.commit('moduleTeacherAccessTabTeacher/setParams', {
    Page: 1,
  })
  listTableRef.value.resetPage()
  store.dispatch('moduleTeacherAccessTabTeacher/fetch')
})

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true
  getTeachersAccessExcel({
    month: month.value?.id,
    module: moduleId.value?.id,
    EducationSystemId: moduleId.value?.id === 11 ? educationSystem.value?.id : null,
    institutionId: institution.value.id,
    NetworkGroupId: networkGroup.value.id,
  })
    .then(response => {
      const fileName = 'Relatório acesso de Professores.xlsx'
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}
</script>

<style lang="scss" scoped>
.material-symbols-outlined.head-icon-info {
  font-size: 16px;
}
</style>
