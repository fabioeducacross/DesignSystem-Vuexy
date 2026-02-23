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
      search-placeholder="Pesquisar por coordenador"
      @change="changeListTable"
    >
      <template v-slot:empty>
        <div class="d-flex flex-column align-items-center">
          <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
          <span class="text-center text-primary font-bold">
            {{ $t('noInformationFound') }}
          </span>
          <span class="text-center">
            {{ $t('Seus coordenadores excluídos irão aparecer aqui.') }}
          </span>
        </div>
      </template>

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
            <b-badge variant="light-primary" pill> +{{ data | formatNumber }} </b-badge>
          </template>
        </ListItemsLimited>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in tableActions"
            v-show="action.isShow(item)"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(action.isEnabled(item))"
            :class="
              action.isEnabled(item)
                ? `${action.color} cursor-pointer`
                : 'cursor-not-allowed text-muted'
            "
            class="material-symbols-outlined"
            @click.stop="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTableSelect>
  </section>
</template>

<script setup>
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import { EApplicationUserStatusEnum } from '@/consts/EApplicationUserStatus.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { initials } from '@/filters/filters.js'
import { postCoordinatorsExcluded } from '@/services/admin-context/coordinators/Coordinators.service.js'
import { formatDate } from '@/utils/utils'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ListItemsLimited from '@/views/pages/admin-context/shared/table-columns-components/ListItemsLimited.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { useRecordsCoordinators } from '@/views/pages/records/coordinators/list/trash/useRecordsCoordinators.js'
import { computed, getCurrentInstance, ref } from 'vue'

const {
  selectedData,
  params,
  loading,
  totalData,
  tableRef,
  dataTable,
  fetch,
  resetAndfetch,
} = useRecordsCoordinators()

const vm = getCurrentInstance().proxy

const tableColumns = computed(() => {
  const columns = [
    {
      key: 'name',
      label: 'Coordenador',
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

const tableActions = [
  {
    icon: 'undo',
    tooltip: () => 'Desfazer exclusão',
    isEnabled: () => true,
    isShow: () => true,

    color: 'text-primary',
    action: data => {
      undoDelete(data)
    },
  },
]

const changeListTable = data => {
  params.value = data
  fetch()
}

fetch()

const openConfirmDelete = ref(false)
const selectedManager = ref({})
const deleteLoading = ref(false)

const undoDelete = item => {
  const paramsObj = {
    coordinatorsIds: [item.id],
    batchAction: 1,
  }

  postCoordinatorsExcluded(paramsObj).then(() => {
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