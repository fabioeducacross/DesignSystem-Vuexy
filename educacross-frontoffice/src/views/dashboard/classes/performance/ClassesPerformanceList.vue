<template>
  <section>
    <ListTableSelect
      ref="listTableRef"
      v-model="selectedData"
      :loading="isLoading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por turma"
      :generating-excel="generatingExcel"
      :export-to-excel="exportToExcel"
      @change="changeListTable"
    >
      <template #cell(className)="{ item }">
        <span class="align-text-top font-bold">{{ item.className }}</span>
      </template>

      <template #cell(serieName)="{ item }">
        <b-badge pill variant="light-primary">
          {{ item.serieName }}
        </b-badge>
      </template>

      <template #cell(challengesDone)="{ item }">
        <ConditionalValueDisplay :value="item.challengesDone" :layout="'badge'">
          {{ item.challengesDone | formatNumber }}
        </ConditionalValueDisplay>
      </template>

      <template #cell(totalTime)="{ item }">
        <ConditionalValueDisplay :value="item.totalTime" :layout="'badge'">
          {{ item.totalTime | formattedTime }}
        </ConditionalValueDisplay>
      </template>

      <template #cell(performance)="{ item }">
        <PerformanceCell :performance="item.performance" enum="learningPerformance" />
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in tableActions"
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
  import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
  import PerformanceCell from '@/components/cells/PerformanceCell.vue'
  import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
  import ListTableSelect from '@/components/table/ListTableSelect.vue'
  import router from '@/router'
  import { getNetworkManagerPerformanceReportClassesExcel } from '@/services/shared/reports/Report.service'
  import store from '@/store'
  import SemaphoreStatusV2 from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatusV2.vue'
  import { saveAs } from 'file-saver'
  import { computed, ref, watch } from 'vue'

  const selectedData = ref({
    value: [],
    batchAction: 1,
  })

  const listTableRef = ref(null)

  const institutionId = computed(
    () => store.getters['moduleDashboardClassesPerformance/institutionId'],
  )
  const schoolYear = computed(
    () => store.getters['moduleDashboardClassesPerformance/schoolYear'],
  )
  const month = computed(() => store.getters['moduleDashboardClassesPerformance/month'])

  const isLoading = computed(() => store.getters['moduleDashboardClassesPerformance/loading'])
  const dataTable = computed(() => store.getters['moduleDashboardClassesPerformance/dataTable'])
  const totalData = computed(() => store.getters['moduleDashboardClassesPerformance/totalData'])

  const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
    store.commit('moduleDashboardClassesPerformance/setParams', {
      Search: searchQuery,
      OrderBy: `${sortBy}`,
      Ascending: `${!isSortDirDesc}`,
      Page: currentPage,
      PageSize: perPage,
    })

    store.dispatch('moduleDashboardClassesPerformance/fetch')
  }

  const tableColumns = [
    { key: 'className', label: 'Turma', sortable: true, searchable: true },
    { key: 'serieName', label: 'Ano Escolar', sortable: true, searchable: false },
    {
      key: 'challengesDone',
      label: 'DESAFIOS REALIZADOS',
      sortable: true,
      searchable: false,
      tooltip:
        'Os desafios são as etapas que compõem uma atividade, desafios que o aluno deve cumprir dentro de um jogo ou quiz.',
    },
    {
      key: 'totalTime',
      label: 'TEMPO INVESTIDO',
      sortable: true,
      searchable: false,
    },
    {
      key: 'performance',
      label: 'RENDIMENTO MÉDIO',
      sortable: true,
      searchable: false,
      tooltip:
        'Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios.',
    },
    { key: 'actions', label: 'Ações', sortable: false },
  ]

  const accessRole = computed(() => {
    const role = store.getters.accessRole
    if (role !== 'NetworkManager') {
      return 'Admin'
    }
    return role
  })

  const tableActions = [
    {
      icon: 'pie_chart',
      tooltip: isEnabled =>
        isEnabled
          ? 'Relatório da turma'
          : 'O relatório será liberado quando pelo menos 1 aluno tiver jogado.',
      isEnabled: item => item.totalTime,
      color: 'text-primary',
      action: data => {
        router.push({
          name: `dashboardStudents${accessRole.value}`,
          params: {
            institutionId: institutionId.value,
            classId: data.classId,
          },
        })
      },
    },
  ]

  watch([schoolYear, month], () => {
    store.commit('moduleDashboardClassesPerformance/setParams', {
      Page: 1,
    })

    listTableRef.value.resetPage()
    store.dispatch('moduleDashboardClassesPerformance/fetch')
  })

  const generatingExcel = ref(false)

  const exportToExcel = () => {
    generatingExcel.value = true

    const params = {
      InstitutionId: institutionId.value,
      SerieId: schoolYear.value.id,
      month: month.value.id,
      ClassesIds:
        selectedData.value.batchAction === 2
          ? null
          : selectedData.value.value.map(classe => classe.classId),
    }

    getNetworkManagerPerformanceReportClassesExcel(params)
      .then(response => {
        const fileName = 'Relatório de Acessos Turmas.xlsx'
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