<template>
  <section>
    <!-- LIST -->
    <ListTableSelect
      ref="tableRef"
      v-model="selectedData"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por professor"
      @change="changeListTable"
    >
      <template #cell(name)="{ item }">
        <div class="d-flex align-items-center">
          <b-avatar variant="info" :text="initials(item.name)" />
          <span class="ml-50 font-bold">{{ item.name }}</span>
        </div>
      </template>
      <template #cell(status)="{ item }">
        <b-badge variant="light-danger" pill>
          <div class="d-flex align-items-center justify-content-center gap-1">
            <span class="material-symbols-outlined" style="font-size: 14px"> avg_pace </span>
            <span v-if="item.days">{{ item.days }} dias para exclusão permanente</span>
            <span v-else>Menos de 1 dia para exclusão permanente</span>
          </div>
        </b-badge>
      </template>

      <template #cell(classes)="{ item }">
        <ListItemsLimited :data="item.classes" :limit="5">
          <template v-slot:item="{ data }">
            <b-badge variant="light-primary">
              {{ data.className }}
            </b-badge>
          </template>
          <template v-slot:excess="{ data }">
            <b-badge variant="light-primary" pill> +{{ data | formatNumber }}</b-badge>
          </template>
        </ListItemsLimited>
      </template>
      <template #cell(actions)="{ item }">
        <div class="d-flex gap-1">
          <span
            v-b-tooltip="'Desfazer exclusão'"
            class="material-symbols-outlined text-primary"
            @click.stop="undoDelete(item)"
          >
            undo
          </span>
        </div>
      </template>
    </ListTableSelect>
  </section>
</template>

<script setup>
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import { initials } from '@/filters/filters.js'
import { postTeacherExcluded } from '@/services/admin-context/professor/Professor.service'
import { formatDate } from '@/utils/utils'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ListItemsLimited from '@/views/pages/admin-context/shared/table-columns-components/ListItemsLimited.vue'
import { useRecordsTeachers } from '@/views/pages/records/teachers/list/trash/useRecordsTeachers.js'
import { computed, getCurrentInstance } from 'vue'

const {
  selectedData,
  params,
  loading,
  totalData,
  tableRef,
  dataTable,
  fetch,
  resetAndfetch,
} = useRecordsTeachers()

const vm = getCurrentInstance().proxy

const tableColumns = computed(() => {
  const columns = [
    {
      key: 'name',
      label: 'PROFESSOR',
      sortable: true,
      searchable: true,
    },
    { key: 'email', label: 'E-MAIL', sortable: true },
    { key: 'classes', label: 'TURMAs', sortable: false, thStyle: { width: '400px' } },
    {
      key: 'date',
      label: 'Data da exclusão',
      sortable: true,
      formatter: value => formatDate(value),
    },
    { key: 'status', label: 'status', sortable: false, thStyle: { width: '120px' } },
    {
      key: 'actions',
      label: 'Ações',
      thStyle: { width: '120px' },
    },
  ]

  return columns
})

const changeListTable = data => {
  params.value = data
  fetch()
}

fetch()

const undoDelete = item => {
  const request = {
    teachersIds: [item.id],
    batchAction: 1,
  }

  postTeacherExcluded(request).then(() => {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Exclusão desfeita com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
    resetAndfetch()
  })
}
</script>