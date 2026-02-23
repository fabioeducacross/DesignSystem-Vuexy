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
      search-placeholder="Pesquisar por aluno"
      @change="changeListTable"
    >
      <template v-slot:empty>
        <div class="d-flex flex-column align-items-center">
          <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
          <span class="text-center text-primary font-bold">
            {{ $t('noInformationFound') }}
          </span>
          <span class="text-center">
            {{ $t('Seus alunos excluídos irão aparecer aqui.') }}
          </span>
        </div>
      </template>

      <template #cell(name)="{ item }">
        <span class="d-flex flex-column flex-md-row align-items-md-center gap-2">
          <b-avatar variant="info" :text="initials(item.name)" />
          <span class="font-bold">{{ item.name }}</span>
        </span>
      </template>

      <template #cell(email)="{ item }">
        <span>{{ item.sponsorEmail ? item.sponsorEmail : '-' }}</span>
      </template>

      <template #cell(classes)="{ value }">
        <ClassesTableCell :classes="value" />
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
import { ACTION, PERMISSION } from '@/consts/permissions'
import { initials } from '@/filters/filters.js'
import { postStudentsExcluded } from '@/services/admin-context/students/Students.service.js'
import { formatDate } from '@/utils/utils'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import NameClasses from '@/views/pages/admin-context/shared/table-columns-components/NameClasses.vue'
import ClassesTableCell from '@/views/pages/records/students/components/ClassesTableCell.vue'
import { useRecordsStudentsTrash } from '@/views/pages/records/students/list/trash/useRecordsStudentsTrash.js'
import { computed, getCurrentInstance, ref, defineAsyncComponent } from 'vue'

const ListTableSelect = defineAsyncComponent(() => import('@/components/table/ListTableSelect.vue'))

const {
  selectedData,
  params,
  loading,
  totalData,
  tableRef,
  dataTable,
  fetch,
  resetAndfetch,
  schoolYears,
} = useRecordsStudentsTrash()

const vm = getCurrentInstance().proxy

const tableColumns = computed(() => {
  const columns = [
    {
      key: 'name',
      label: 'Aluno',
      sortable: true,
      searchable: true,
    },
    { key: 'classes', label: 'TURMAs', sortable: false, thStyle: { width: '400px' } },
    {
      key: 'Email',
      label: 'E-MAIL DO RESPONSÁVEL',
      sortable: true,
    },
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

const deleteLoading = ref(false)

const undoDelete = item => {
  deleteLoading.value = true

  const reqParams = {
    StudentsIds: [item.id],
    batchAction: 1,
  }

  postStudentsExcluded(reqParams).then(() => {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Exclusão desfeita com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
    deleteLoading.value = false

    resetAndfetch()
  })
}
</script>