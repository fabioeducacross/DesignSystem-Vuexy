<template>
  <section>
    <ListTableLocalSorting
      ref="tableRef"
      :data-table="dataTable"
      :table-columns="tableColumns"
      :loading="loading"
      search-placeholder="searchForStudent"
    >
      <template #cell(name)="{ item }">
        <div>
          <span class="font-bold">{{ item.name }} </span>
        </div>
      </template>

      <template #cell(progressTotal)="{ item }">
        <div v-if="item.totalTime">
          <ProgressBarHorizontalV2
            reverse
            height="12px"
            :value="item.progressTotal"
            enum="progress"
          />
        </div>
        <b-badge v-else pill variant="light-danger"> Não iniciou</b-badge>
      </template>
      <template #cell(progressSend)="{ item }">
        <div v-if="item.totalTime">
          <ProgressBarHorizontalV2
            reverse
            height="12px"
            :value="item.progressSend"
            enum="progress"
          />
        </div>
        <b-badge v-else pill variant="light-danger"> Não iniciou</b-badge>
      </template>

      <template #cell(performance)="{ item }">
        <PerformanceCell v-if="item.totalTime" :performance="item.performance" />
        <b-badge v-else pill variant="light-danger"> Não iniciou</b-badge>
      </template>
      <template #cell(totalTime)="{ item }">
        <div>
          <div v-if="item.totalTime">
            <span class="material-symbols-outlined align-middle" style="font-size: 16px">pace</span>
            <span class="font-semibold align-middle"> {{ item.totalTime | formattedTime }}</span>
          </div>
          <b-badge v-else pill variant="light-danger"> Não iniciou</b-badge>
        </div>
      </template>
    </ListTableLocalSorting>
  </section>
</template>

<script setup>
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import useTable from '@/store/table/useTable.js'
import { useEducationSystemStudents } from '@/views/pages/admin-context/reports/educationSystem/studentsTab/students/useEducationSystemStudents.js'
import { onUnmounted } from 'vue'

const { generatingExcel, exportToExcel } = useEducationSystemStudents()

const { loading, dataTable, reset, tableRef } = useTable()

const tableColumns = [
  { key: 'name', label: 'Aluno', class: 'font-bold', sortable: true, searchable: true },
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
    key: 'totalTime',
    label: 'TEMPO INVESTIDO',
    sortable: true,
  },
]

onUnmounted(() => {
  reset()
})
</script>