<template>
  <section>
    <ListTableLocalSorting
      ref="refList"
      :table-columns="tableColumnsFiltered"
      :per-page-options="[10, 25, 50]"
      :per-page-default="10"
      :data-table="institutions"
      :total-data="totalData"
      :loading="isLoading"
      search-placeholder="Pesquisar por escola"
    >
      <template
        v-for="(field, index) in proficiencyV2WithNotCompleted"
        #[`head(${field.key})`]="{}"
      >
        <span :key="index" class="material-symbols-outlined">
          {{ field.icon }}
        </span>
      </template>

      <template
        v-for="(field, index) in proficiencyV2WithNotCompleted"
        #[`cell(${field.key})`]="{ value, item }"
      >
        <span :key="index" v-b-tooltip.hover.top="`${item[field.studentKey]} alunos`">
          {{ value | formatNumber }}%
        </span>
      </template>

      <template #cell(auditor)="{ item }">
        <div v-if="item.hasAuditor" class="progress-cell">
          <ProgressBarHorizontalV2
            show-values
            :value="item.studentsAudited"
            height="12px"
            :get-variant="getColorsEnum"
            :max="item.students"
            values-divisor=" de "
          >
            <template v-slot:description>
              <span> alunos</span>
            </template>
          </ProgressBarHorizontalV2>
        </div>
        <div v-else class="text-muted">
          <b-badge :variant="`light-secondary`" pill> DESABILITADA </b-badge>
        </div>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
          <span
            v-b-tooltip.hover.top="'Relatório da escola'"
            class="material-symbols-outlined text-primary cursor-pointer"
            @click="openReport(item)"
          >
            pie_chart
          </span>
        </div>
      </template>
    </ListTableLocalSorting>
  </section>
</template>

<script setup>
import { useSchoolsReport } from './useSchoolsReport.js'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { proficiencyV2WithNotCompleted } from '@/consts/ReadingMeterV2ProficiencyEnum'
import { getVariantByRule } from '@/consts/legends/index.js'
import { computed, ref } from 'vue'

// refs and stores
const refList = ref(null)
const { institutions, isLoading, openInstitutionReport, hasAnyAuditor } = useSchoolsReport()

const totalData = computed(() => institutions.value.length)

const getColorsEnum = value => {
  return getVariantByRule(value, 'progress')
}

const getCellClass = (value, key, item) => {
  const keyMapping = {
    proficient: 'adequate',
    advenced: 'advanced',
  }

  const proficiencys = proficiencyV2WithNotCompleted.filter(
    proficiency => proficiency.key !== key,
  )

  const isHighest = proficiencys.every(proficiency => {
    const apiKey = keyMapping[proficiency.key] || proficiency.key
    return value > (item[apiKey] || 0)
  })

  if (isHighest) {
    const proficiency = proficiencyV2WithNotCompleted.find(
      proficiency => proficiency.key === key,
    )
    return `bg-light-${proficiency.variant}`
  }
  return ''
}

const openReport = item => {
  openInstitutionReport(item.id)
}

const tableColumns = computed(() => {
  const proficiencys = proficiencyV2WithNotCompleted.map(item => {
    return {
      key: item.key,
      label: item.icon,
      sortable: true,
      thClass: `bg-${item.variant} text-white th-head-arrow-white`,
      tdClass: (value, key, row) => getCellClass(value, key, row),
      thStyle: { width: '64px' },
    }
  })

  return [
    { key: 'name', label: 'ESCOLA', sortable: true, searchable: true, tdClass: 'font-bold' },
    {
      key: 'students',
      label: 'Total de alunos',
      sortable: true,
      tooltip: 'Alunos habilitados a fazer o teste.',
    },
    ...proficiencys,
    {
      key: 'tooltip',
      label: '',
      sortable: false,
      tooltip: 'Percentual de alunos em cada faixa de proficiência.',
      thStyle: { width: '60px' },
    },
    {
      key: 'auditor',
      label: 'auditoria',
      tooltip: 'Relatórios validados e editados por uma pessoa auditora.',
    },
    {
      key: 'actions',
      label: 'AÇÕES',
      sortable: false,
      thStyle: { width: '100px' },
    },
  ]
})

const tableColumnsFiltered = computed(() => {
  if (hasAnyAuditor.value) {
    return tableColumns.value
  }
  return tableColumns.value.filter(column => column.key !== 'auditor')
})
</script>

<style lang="scss">
  .th-head-arrow-white {
    background-image: url(@/assets/images/arrows/arrows-white.svg) !important;
  }
</style>