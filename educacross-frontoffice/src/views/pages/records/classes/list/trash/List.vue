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
      search-placeholder="Pesquisar por turma"
      @change="changeListTable"
    >
      <template v-slot:empty>
        <div class="d-flex flex-column align-items-center">
          <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
          <span class="text-center text-primary font-bold">
            {{ $t('noInformationFound') }}
          </span>
          <span class="text-center">
            {{ $t('Suas turmas excluídas irão aparecer aqui.') }}
          </span>
        </div>
      </template>

      <template #cell(name)="{ item }">
        <NameClasses
          :content="{
            name: item.name,
            serie: item.serie,
          }"
        />
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
  import { postClassesExcluded } from '@/services/shared/classes/Classes.service'
  import { formatDate } from '@/utils/utils'
  import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
  import NameClasses from '@/views/pages/admin-context/shared/table-columns-components/NameClasses.vue'
  import { useRecordsClassesTrash } from '@/views/pages/records/classes/list/trash/useRecordsClassesTrash.js'
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
    schoolYears,
  } = useRecordsClassesTrash()

  const vm = getCurrentInstance().proxy

  const tableColumns = computed(() => {
    const columns = [
      {
        key: 'name',
        label: 'Turma',
        sortable: true,
        searchable: true,
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

  const selectedClass = ref({})
  const showModalReport = ref(false)

  const deleteLoading = ref(false)

  const undoDelete = item => {
    deleteLoading.value = true

    const paramsData = {
      classIds: [item.id],
      batchAction: 1,
    }

    postClassesExcluded(paramsData).then(() => {
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