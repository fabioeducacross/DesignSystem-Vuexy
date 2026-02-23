<template>
  <section>
    <ListTableLocalSorting
      ref="tableRef"
      :data-table="dataTable"
      :table-columns="setFields"
      :loading="loading"
      search-placeholder="Pesquisar por escola"
    >
      <template #cell(name)="{ item }">
        <div>
          <span class="font-bold">{{ item.name }} </span>
        </div>
      </template>
      <template #cell(serieName)="{ item }">
        <b-badge pill variant="light-primary">
          {{ item.serieName }}
        </b-badge>
      </template>
      <template #cell(guidesSend)="{ item }">
        <div>
          <span class="font-bold">{{ item.guidesSend }} </span> de {{ item.totalGuides }}
        </div>
      </template>

      <template #cell(progressTotal)="{ item }">
        <ProgressBarHorizontalV2
          reverse
          height="12px"
          :value="item.progressTotal"
          enum="progress"
        />
      </template>
      <template #cell(progressSend)="{ item }">
        <ProgressBarHorizontalV2 reverse height="12px" :value="item.progressSend" enum="progress" />
      </template>
      <template #cell(performance)="{ item }">
        <PerformanceCell :performance="item.performance" />
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
          <span
            v-for="(action, index) in tableActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip"
            class="material-symbols-outlined text-primary cursor-pointer"
            @click.stop="action.action(item)"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTableLocalSorting>
  </section>
</template>

<script setup>
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import router from '@/router'
import useTable from '@/store/table/useTable.js'
import { useEducationSystemInstitutions } from '@/views/pages/admin-context/network-manager/education-system/schools/institutions/useEducationSystemInstitutions.js'
import { onUnmounted, computed } from 'vue'

const { loading, dataTable, reset, tableRef } = useTable()
const { bookId, educationSystemId } = router.currentRoute.params
const { groups } = useEducationSystemInstitutions()

const tableColumns = [
  { key: 'name', label: 'ESCOLA', class: 'font-bold', sortable: true, searchable: true },
  { key: 'networkGroupName', label: 'GRUPO DE ESCOLAS', sortable: true },
  { key: 'guidesSend', label: 'MISSÕES ENVIADAS', sortable: true },
  {
    key: 'progressTotal',
    label: 'PROGRESSO Em missões totais',
    sortable: true,
    tooltip:
      'Missões totais são todas as missões cadastradas no Sistema de Ensino. Seu cálculo de progresso também inclui missões que não foram enviadas.',
  },
  {
    key: 'progressSend',
    label: 'PROGRESSO EM MISSÕES ENVIADAS',
    sortable: true,
    tooltip:
      'O cálculo de progresso em missões enviadas desconsidera a parcela de missões não enviadas.',
  },
  {
    key: 'performance',
    label: 'rendimento médio',
    sortable: true,
    tooltip:
      'Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas).',
  },
  {
    key: 'actions',
    label: 'ações',
  },
]

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: 'Relatório da escola',
    action: item => {
      router.push({
        name: router.currentRoute.meta.routeClasses,
        params: {
          bookId,
          institutionId: item.id,
          educationSystemId,
        },
      })
    },
  },
]

const setFields = computed(() => {
  if (groups.value != null && groups.value.filter(cs => cs.id).length < 2)
    return tableColumns.filter(f => f.key !== 'networkGroupName')
  return tableColumns
})

onUnmounted(() => {
  reset()
})
</script>