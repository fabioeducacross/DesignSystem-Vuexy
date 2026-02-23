<template>
  <SimpleTab>
    <b-card>
      <b-form autocomplete="off">
        <b-row>
          <b-col v-if="isNetworkManager" cols="12" md>
            <b-form-group id="escola" label="Escola" label-for="instituition">
              <ESelect
                v-model="institution"
                class="filter-chooser filter-items whitespace-no-wrap"
                label="name"
                :options="institutionList"
                placeholder="Selecione uma instituição"
                :clearable="false"
                :loading="institutionListLoading"
                @input="handleChangeInstitution"
              >
                <template v-slot:no-options> Nenhuma escola encontrada </template>
              </ESelect>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="auto">
            <SelectSubject :fetch-on-mounted="false" />
          </b-col>
          <b-col cols="12" sm>
            <b-form-group label="Turma" label-for="classes">
              <ESelect
                v-model="filters.class"
                class="filter-chooser filter-items"
                label="name"
                :options="classes"
                placeholder="Todas as turmas"
                :clearable="false"
                :disabled="classesLoading"
                :loading="classesLoading"
                :total-pages="classesTotalpages"
                paginated
                @input="handleOverview"
                @nextPage="fetchClasses"
              >
                <template v-slot:no-options> Nenhuma turma encontrada </template>
                <template v-slot:selected-option="{ name, serieName }">
                  <span class="d-flex align-items-center gap-1">
                    {{ name }}
                    <SchoolYearBadge v-if="serieName" class="select-badge" :text="serieName" />
                  </span>
                </template>
                <template v-slot:option="data">
                  <span class="d-flex flex-wrap align-items-center gap-1">
                    <span class="margin-badge">{{ data.name }}</span>
                    <SchoolYearBadge
                      v-if="data.serieName"
                      class="badge-badge"
                      :text="data.serieName"
                      :selected="filters.class.classId === data.classId"
                    />
                  </span>
                </template>
              </ESelect>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6" lg>
            <b-form-group label="Mês inicial" label-for="monthBegin">
              <ESelect
                v-model="filters.monthBegin"
                class="filter-chooser filter-items"
                label="name"
                :options="filteredBeginMonths()"
                placeholder="Selecione um mês"
                :clearable="false"
                @input="handleOverview"
              >
                <template v-slot:no-options> Nenhum mês encontrado </template>
              </ESelect>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6" lg>
            <b-form-group label="Mês final" label-for="monthEnd">
              <ESelect
                v-model="filters.monthEnd"
                class="filter-chooser filter-items"
                label="name"
                :options="filteredEndMonths()"
                placeholder="Selecione um mês"
                :clearable="false"
                @input="handleOverview"
              >
                <template v-slot:no-options> Nenhum mês encontrado </template>
              </ESelect>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="12" lg="auto" class="ml-auto">
            <b-form-group label-for="submit">
              <template v-slot:label>
                <span>&nbsp;</span>
              </template>
              <b-button variant="outline-primary" class="w-100" @click="exportToExcel">
                Exportar em excel
              </b-button>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card v-if="!subject?.id" class="no-data-card">
      <b-row class="no-data-container">
        <b-col cols="12" class="d-flex flex-column align-items-center justify-content-center">
          <img src="@/assets/images/belinha/confusion.svg" alt="No data" class="no-data-image" />
          <p class="no-data-text">Selecione uma disciplina para visualizar os dados</p>
        </b-col>
      </b-row>
    </b-card>
    <b-row v-else>
      <b-col cols="12" md>
        <b-overlay :show="loading">
          <bar-chart
            info="Calcula-se o engajamento com base na quantidade de jogos finalizados pelos alunos da turma, seja os completando ou perdendo vidas.
      <br>
      <br>
        35 ou mais jogos: Avançado
        <br>
        20 - 34 jogos: Adequado
        <br>
        10 - 19 jogos: Básico
        <br>
        0 - 9 jogos: Baixo"
            title="Engajamento mensal dos alunos"
            :series="info.engagementByMonth?.series || []"
            :categories="info.engagementByMonth?.categories || []"
            :chart-name="info.engagementByMonth?.chartName || ''"
            :colors="info.engagementByMonth?.colors || []"
          />
        </b-overlay>
      </b-col>
      <b-col lg="6" md="12">
        <b-overlay :show="loading">
          <donut-chart
            info="Engajamento geral das turmas de acordo com o
          período selecionado no filtro.
          <br />
          <br />
          Avançado: 90% - 100
          <br />
          Adequado: 75% - 89%
          <br />
          Básico: 50% - 74%
          <br />
          Baixo: 0% - 49%"
            title="Engajamento geral das turmas"
            :series="info.engagementClass?.series || []"
            :labels="info.engagementClass?.labels || []"
            :colors="info.engagementClass?.colors || []"
            :chart-name="info.engagementClass?.chartName || ''"
            :subtitle="filters.class.name + infoCharts"
          />
        </b-overlay>
      </b-col>
      <b-col lg="6" md="12">
        <b-overlay :show="loading">
          <donut-chart
            info="Calcula-se o engajamento com base na quantidade de jogos finalizados pelos alunos da turma, seja os completando ou perdendo vidas.
<br><br>
35 ou mais jogos: Avançado
<br>
20 - 34 jogos: Adequado
<br>
10 - 19 jogos: Básico
<br>
0 - 9 jogos: Baixo"
            title="Engajamento geral dos alunos"
            :series="info.engagementStudent?.series || []"
            :labels="info.engagementStudent?.labels || []"
            :colors="info.engagementStudent?.colors || []"
            :chart-name="info.engagementStudent?.chartName || ''"
            :subtitle="getClassName(filters.class) + infoCharts"
          />
        </b-overlay>
      </b-col>
      <b-col lg="6" md="12">
        <b-overlay :show="loading">
          <bar-chart
            info="Calcula-se o desempenho com base nos acertos / erros dos alunos nos
      jogos que ele tenha acessado em todos os módulos da Educacross disponíveis para ele acessar.
      <br><br>
      90% - 100%: Avançado
      <br>
      70% - 89%: Adequado
      <br>
50% - 69%: Básico
<br>
0% - 49%: Baixo"
            title="Desempenho geral dos alunos"
            :series="info.performanceByMonth?.series || []"
            :categories="info.performanceByMonth?.categories || []"
            :chart-name="info.performanceByMonth?.chartName || ''"
            :colors="info.performanceByMonth?.colors || []"
          />
        </b-overlay>
      </b-col>
      <b-col lg="6" md="12">
        <b-overlay :show="loading">
          <bar-chart
            info="Quantidade de jogos acessados pelos alunos que foram ou não finalizados.
      <br><br>

<strong>Jogos não finalizados</strong> são aqueles em que o aluno saiu do jogo antes de realizar todos os desafios.
<br><br>

<strong>Jogos finalizados</strong> são aqueles em que o aluno jogou todos os desafios propostos, independente de ter acertado ou não. "
            title="Quantidade de jogos jogados"
            :series="info.playedActivitiesByMonth?.series || []"
            :categories="info.playedActivitiesByMonth?.categories || []"
            :chart-name="info.playedActivitiesByMonth?.chartName || ''"
            :colors="info.playedActivitiesByMonth?.colors || []"
          />
        </b-overlay>
      </b-col>
      <b-col lg="6" md="12">
        <b-overlay :show="loading">
          <donut-chart
            info="Porcentagem de alunos que acessaram o aplicativo Educacross nos sistemas operacionais Android (celulares e tablets), Windows (computador e navegador), Apple (iPhone, iPad ou computador MacOS) ou Linux (computador)."
            title="Acesso por Dispositivos"
            :series="info.accessPlatform?.series || []"
            :labels="info.accessPlatform?.labels || []"
            :colors="info.accessPlatform?.colors || []"
            :chart-name="info.accessPlatform?.chartName || ''"
          />
        </b-overlay>
      </b-col>
      <b-col lg="6" md="12">
        <b-overlay :show="loading">
          <donut-chart
            info="Porcentagem de alunos que acessaram a Educacross em cada período do dia.
          <br><br>

Períodos considerados no gráfico:
<br>
Manhã: 06h às 11h59
<br>
Tarde: 12h às 17h59
<br>
Noite: 18h às 23h59
<br>
Madrugada: 00h às 05h59."
            title="Acessos por Período"
            :series="info.accessPeriod?.series || []"
            :labels="info.accessPeriod?.labels || []"
            :colors="info.accessPeriod?.colors || []"
            :chart-name="info.accessPeriod?.chartName || ''"
          />
        </b-overlay>
      </b-col>
    </b-row>
  </SimpleTab>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SimpleTab from '@/components/tab/SimpleTab.vue'
import { formatNumber } from '@/filters/filters'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import { getOverview } from '@/services/shared/reports/Report.service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import BarChart from '@/views/pages/admin-context/shared/components/charts/BarChart'
import DonutChart from '@/views/pages/admin-context/shared/components/charts/DonutChart'
import multiSelectCheckbox from '@/views/pages/admin-context/shared/components/multi-select/MultiSelectCheckbox.vue'
import SchoolYearBadge from '@components/SchoolYearBadge'
import * as Excel from 'exceljs/dist/exceljs.min'
import { saveAs } from 'file-saver'
import { computed, reactive, ref, watch } from 'vue'
import VSelect from 'vue-select'

// Filters/composables
const { subject, fetchSubjects, institution } = useFilters()

const classesLoading = ref(true)
const classes = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  if (!subject.value.id) {
    classesLoading.value = false
    return
  }

  try {
    const { data } = await getClassesV2Label({
      Page: classesPage.value,
      SubjectId: subject.value.id,
      institutionId: institution.value.id,
    })

    const options = data.data

    if (classesPage.value === 1) {
      classes.value = []
      filters.value.class = options[0] || {}
    }

    classes.value.push(...options)
    classesTotalpages.value = data.totalPages
    classesLoading.value = false
  } catch (error) {
    classes.value = []
  }
}

const generateMonths = () => {
  const length = new Date().getMonth() + 1
  const monthsList = Array.from({ length }, (item, i) => {
    const str = new Date(0, i).toLocaleString('pt-BR', { month: 'long' })
    const capitalized = str[0].toUpperCase() + str.slice(1)
    return {
      name: capitalized,
      id: i + 1,
    }
  })

  return monthsList
}

const loading = ref(true)

const monthList = generateMonths()
const institutionList = ref([])
const institutionListLoading = ref(true)
const infoCharts = ref('')
const info = reactive({
  engagementByMonth: {
    chartName: '',
    series: [],
    colors: [],
    categories: [],
  },
  engagementClass: {
    chartName: '',
    series: [],
    labels: [],
    colors: [],
  },
  engagementStudent: {
    chartName: '',
    series: [],
    labels: [],
    colors: [],
  },
  performanceByMonth: {
    chartName: '',
    series: [],
    colors: [],
    categories: [],
  },
  playedActivitiesByMonth: {
    chartName: '',
    series: [],
    colors: [],
    categories: [],
  },
  accessPlatform: {
    chartName: '',
    series: [],
    labels: [],
    colors: [],
  },
  accessPeriod: {
    chartName: '',
    series: [],
    labels: [],
    colors: [],
  },
})
const sheetData = {}
const filters = ref({
  subjectId: subject.value.id,
  class: {},
  monthBegin: monthList[0],
  monthEnd: monthList[monthList.length - 1],
  InstitutionId: null,
})

const userRole = computed(() => {
  return store.getters.accessRole
})

const isNetworkManager = computed(() => {
  return userRole.value === 'NetworkManager'
})

const getClassName = classe => {
  return classe.name
}

const commonChartColors = ['#00BDB8', '#8BC728', '#FFB443', '#FE5153']

const createDefaultChartState = (chartName) => {
  const isBarChart = ['engagementByMonth', 'performanceByMonth', 'playedActivitiesByMonth'].includes(chartName)
  return {
    chartName,
    series: [],
    colors: commonChartColors,
    ...(isBarChart ? { categories: [] } : { labels: [] }),
  }
}

const formatChartData = (data, chartName, colorSet = commonChartColors) => {
  const rawData = data[chartName]
  if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
    return createDefaultChartState(chartName)
  }

  switch (chartName) {
    case 'engagementByMonth':
    case 'performanceByMonth':
    case 'playedActivitiesByMonth': {
      try {
        const months = rawData.map(item => item.month).filter(m => m !== undefined && m !== null)
        const monthNames = formatMonthNames(months)
        const chartSeries = mountSeries(rawData, rawData[0])
        return {
          chartName,
          series: chartSeries || [],
          colors: colorSet,
          categories: monthNames || [],
        }
      } catch (error) {
        console.warn(`Error formatting bar chart data for ${chartName}:`, error)
        return createDefaultChartState(chartName)
      }
    }
    case 'engagementClass':
    case 'engagementStudent':
    case 'accessPlatform':
    case 'accessPeriod': {
      try {
        const donutData = mountSeriesForDonutChart(rawData)
        const modifiedSeries =
          chartName === 'engagementStudent'
            ? donutData.series.map(e => (e || 0) * 100)
            : donutData.series
        return {
          chartName,
          series: modifiedSeries || [],
          labels: donutData.labels || [],
          colors: colorSet,
        }
      } catch (error) {
        console.warn(`Error formatting donut chart data for ${chartName}:`, error)
        return createDefaultChartState(chartName)
      }
    }
    default:
      return createDefaultChartState(chartName)
  }
}

const getColorSetForChart = chartName => {
  switch (chartName) {
    case 'accessPlatform':
      return ['#ADE01C', '#0A81B4', '#43C7FF', '#FAB84A']
    case 'accessPeriod':
      return ['#FBC161', '#E26E02', '#4361FF', '#9351FE']
    default:
      return commonChartColors // commonChartColors is used as the default color set
  }
}

const handleOverview = async () => {
  Object.assign(info, {})
  Object.assign(sheetData, {})

  try {
    loading.value = true
    const response = await getOverview({
      SubjectId: subject.value.id,
      ClassId: filters.value.class.classId,
      MonthI: filters.value.monthBegin.id,
      MonthF: filters.value.monthEnd.id,
      InstitutionId: isNetworkManager.value ? institution.value.id : null,
    })
    const { data } = response

    Object.assign(info, data)
    Object.assign(sheetData, data)

    // Use the abstracted function to process and set chart data
    const chartNames = [
      'engagementByMonth',
      'performanceByMonth',
      'playedActivitiesByMonth',
      'engagementClass',
      'engagementStudent',
      'accessPlatform',
      'accessPeriod',
    ]

    chartNames.forEach(chartName => {
      const colorSet = getColorSetForChart(chartName)
      info[chartName] = formatChartData(data, chartName, colorSet)
    })

    // Handling className and infoCharts value
    const className = filters.value.class.name
    const monthBegin = getMonthName(filters.value.monthBegin)
    const monthEnd = getMonthName(filters.value.monthEnd)
    infoCharts.value = `${className} | ${
      monthBegin === monthEnd ? monthEnd : `${monthBegin} - ${monthEnd}`
    }`
  } finally {
    loading.value = false
  }
}

const filteredBeginMonths = () => {
  return monthList.filter(({ id }) => id <= filters.value.monthEnd.id)
}

const filteredEndMonths = () => {
  return monthList.filter(({ id }) => id >= filters.value.monthBegin.id)
}

const mountSeries = (tracks, trackNames) => {
  if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
    return []
  }
  if (!trackNames || typeof trackNames !== 'object') {
    return []
  }

  const names = Object.keys(trackNames).filter(key => key !== 'month')
  const data = names.length > 0
    ? names.map(name => {
        const trackData = tracks.map(track => track?.[name] || 0)
        return {
          name: getSeriesNames(name),
          data: trackData,
        }
      })
    : []

  return data.filter(series => series.name !== 'Meses' && series.name !== '')
}
const mountSeriesForDonutChart = trackNames => {
  if (!trackNames || typeof trackNames !== 'object') {
    return { labels: [], series: [] }
  }

  const keys = Object.keys(trackNames).filter(key => trackNames[key] !== undefined && trackNames[key] !== null)
  const labels = keys.map(nameDonut => getSeriesNames(nameDonut)).filter(label => label !== '')
  const series = keys.map(valueDonut => {
    const value = trackNames[valueDonut]
    return typeof value === 'number' ? value : 0
  })

  return { labels, series }
}
const getSeriesNames = name => {
  const names = {
    advenced: 'Avançado',
    suitable: 'Adequado',
    basic: 'Básico',
    bellowBasic: 'Baixo',
    month: 'Meses',
    activitiesFinished: 'Finalizados',
    activitiesNotFinished: 'Não finalizadas',
    accessAndroid: 'Android',
    accessWindows: 'Windows',
    accessApple: 'Apple',
    accessLinux: 'Linux',
    morning: 'Manhã',
    afternoon: 'Tarde',
    night: 'Noite',
    dawn: 'Madrugada',
    '91to100': '91% - 100%',
    '76to90': '76% - 90%',
    '51to75': '51% - 75%',
    '0to50': '0% - 50%',
  }
  return names[name] || ''
}
const getMonthName = month => {
  const months = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro',
  }
  return months[month] || ''
}
const formatMonthNames = months => {
  return months.map(monthList => {
    const name = getMonthName(monthList)
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
  })
}

const handleCreateFilters = async () => {
  institutionListLoading.value = true
  if (userRole.value === 'NetworkManager') {
    await getInstitutions().then(response => {
      institutionList.value = response.data

      if (!institutionList.value[0]) {
        throw new Error('A rede escolar não possui Escolas!')
      }

      institution.value = institutionList.value[0]
      institutionListLoading.value = false
    })
  } else {
    institution.value = { id: store.getters.accessUserData?.InstitutionId }
  }
  fetchSubjects()
}

const exportToExcel = async () => {
  let rowCount = 0
  const monthBeginArray = monthList.filter(month => month.value === filters.value.monthBegin)
  const monthEndArray = monthList.filter(month => month.value === filters.value.monthEnd)
  const monthBegin = monthBeginArray.map(valueBegin => valueBegin.name)
  const monthEnd = monthEndArray.map(valueEnd => valueEnd.name)
  const monthEndFilter = getMonthName(filters.value.monthEnd)

  const wb = new Excel.Workbook()

  const ws = wb.addWorksheet('Relatório de visão geral')
  ws.properties.defaultColWidth = 30

  if (sheetData.performanceByMonth) {
    const title1 = ws.addRow(['Desempenho Geral dos alunos'])
    rowCount += 1
    ws.mergeCells(`A${rowCount}:E${rowCount}`)
    title1.font = { bold: true, size: 12 }
    title1.alignment = { horizontal: 'center' }

    const subtitle1 = ws.addRow(['', 'Abaixo do básico', 'Básico', 'Adequado', 'Avançado'])
    rowCount += 1
    subtitle1.font = { bold: true, size: 12 }
    subtitle1.alignment = { horizontal: 'center' }

    sheetData.performanceByMonth.forEach(month => {
      const text1 = ws.addRow([
        monthList[month.month - 1].name,
        `${formatNumber(month.bellowBasic)} ${
          month.bellowBasic === 1 ? ' Aluno' : ' Alunos'
        }`,
        `${formatNumber(month.basic)} ${month.basic === 1 ? ' Aluno' : ' Alunos'}`,
        `${formatNumber(month.suitable)} ${month.suitable === 1 ? ' Aluno' : ' Alunos'}`,
        `${formatNumber(month.advenced)} ${month.advenced === 1 ? ' Aluno' : ' Alunos'}`,
      ])
      rowCount += 1
      text1.alignment = { horizontal: 'center' }
    })
  }

  if (sheetData.playedActivitiesByMonth) {
    ws.addRow()
    rowCount += 1

    const title2 = ws.addRow(['Quantidade de Jogos Jogados'])

    rowCount += 1
    ws.mergeCells(`A${rowCount}:C${rowCount}`)
    title2.font = { bold: true, size: 12 }
    title2.alignment = { horizontal: 'center' }

    const subtitle2 = ws.addRow(['', 'Finalizadas', 'Não finalizadas'])
    rowCount += 1
    subtitle2.font = { bold: true, size: 12 }
    subtitle2.alignment = { horizontal: 'center' }

    sheetData.playedActivitiesByMonth.forEach(month => {
      const text2 = ws.addRow([
        monthList[month.month - 1].name,
        formatNumber(month.activitiesFinished),
        formatNumber(month.activitiesNotFinished),
      ])
      rowCount += 1
      text2.alignment = { horizontal: 'center' }
    })
  }

  if (sheetData.engagementClass) {
    ws.addRow()
    rowCount += 1

    const title7 = ws.addRow(['Engajamento geral das turmas'])
    rowCount += 1
    ws.mergeCells(`A${rowCount}:E${rowCount}`)
    title7.font = { bold: true, size: 12 }
    title7.alignment = { horizontal: 'center' }

    const subtitle7 = ws.addRow(['', 'Avançado', 'Adequado', 'Básico', 'Baixo'])
    rowCount += 1
    subtitle7.font = { bold: true, size: 12 }
    subtitle7.alignment = { horizontal: 'center' }

    const text7 = ws.addRow([
      `${monthBegin}-${monthEnd ? monthEndFilter : monthEnd}`,
      `${formatNumber(sheetData.engagementClass.advenced)} Alunos`,
      `${formatNumber(sheetData.engagementClass.suitable)} Alunos`,
      `${formatNumber(sheetData.engagementClass.basic)} Alunos`,
      `${formatNumber(sheetData.engagementClass.bellowBasic)} Alunos`,
    ])
    rowCount += 1
    text7.alignment = { horizontal: 'center' }
  }

  if (sheetData.engagementStudent) {
    ws.addRow()
    rowCount += 1

    const title3 = ws.addRow(['Engajamento geral dos alunos'])
    rowCount += 1
    ws.mergeCells(`A${rowCount}:E${rowCount}`)
    title3.font = { bold: true, size: 12 }
    title3.alignment = { horizontal: 'center' }

    const subtitle3 = ws.addRow(['', 'Avançado', 'Adequado', 'Básico', 'Baixo'])
    rowCount += 1
    subtitle3.font = { bold: true, size: 12 }
    subtitle3.alignment = { horizontal: 'center' }

    const text3 = ws.addRow([
      `${monthBegin}-${monthEnd ? monthEndFilter : monthEnd}`,
      `${formatNumber(sheetData.engagementStudent.advenced)} Alunos`,
      `${formatNumber(sheetData.engagementStudent.suitable)} Alunos`,
      `${formatNumber(sheetData.engagementStudent.basic)} Alunos`,
      `${formatNumber(sheetData.engagementStudent.bellowBasic)} Alunos`,
    ])
    rowCount += 1
    text3.alignment = { horizontal: 'center' }
  }

  if (sheetData.accessPlatform) {
    ws.addRow()
    rowCount += 1

    const title4 = ws.addRow(['Acesso por Dispositivos'])
    rowCount += 1
    ws.mergeCells(`A${rowCount}:E${rowCount}`)
    title4.font = { bold: true, size: 12 }
    title4.alignment = { horizontal: 'center' }

    const subtitle4 = ws.addRow(['', 'Android', 'Windows', 'Apple', 'Linux'])
    rowCount += 1
    subtitle4.font = { bold: true, size: 12 }
    subtitle4.alignment = { horizontal: 'center' }

    const text4 = ws.addRow([
      `${monthBegin}-${monthEnd ? monthEndFilter : monthEnd}`,
      `${formatNumber(sheetData.accessPlatform.accessAndroid)}%`,
      `${formatNumber(sheetData.accessPlatform.accessWindows)}%`,
      `${formatNumber(sheetData.accessPlatform.accessApple)}%`,
      `${formatNumber(sheetData.accessPlatform.accessLinux)}%`,
    ])
    rowCount += 1
    text4.alignment = { horizontal: 'center' }
  }

  if (sheetData.accessPeriod) {
    ws.addRow()
    rowCount += 1

    const title5 = ws.addRow(['Acessos por Período'])
    rowCount += 1
    ws.mergeCells(`A${rowCount}:E${rowCount}`)
    title5.font = { bold: true, size: 12 }
    title5.alignment = { horizontal: 'center' }

    const subtitle5 = ws.addRow(['', 'Manhã', 'Tarde', 'Noite', 'Madrugada'])
    rowCount += 1
    subtitle5.font = { bold: true, size: 12 }
    subtitle5.alignment = { horizontal: 'center' }

    const text5 = ws.addRow([
      `${monthBegin}-${monthEnd ? monthEndFilter : monthEnd}`,
      `${formatNumber(sheetData.accessPeriod.morning)}%`,
      `${formatNumber(sheetData.accessPeriod.afternoon)}%`,
      `${formatNumber(sheetData.accessPeriod.night)}%`,
      `${formatNumber(sheetData.accessPeriod.dawn)}%`,
    ])
    rowCount += 1
    text5.alignment = { horizontal: 'center' }
  }

  if (sheetData.engagementByMonth) {
    const title6 = ws.addRow(['Engajamento mensal dos alunos'])
    rowCount += 1
    ws.mergeCells(`A${rowCount}:E${rowCount}`)
    title6.font = { bold: true, size: 12 }
    title6.alignment = { horizontal: 'center' }

    const subtitle6 = ws.addRow(['', 'Abaixo do básico', 'Básico', 'Adequado', 'Avançado'])
    rowCount += 1
    subtitle6.font = { bold: true, size: 12 }
    subtitle6.alignment = { horizontal: 'center' }

    sheetData.engagementByMonth.forEach(month => {
      const text6 = ws.addRow([
        monthList[month.month - 1].name,
        `${formatNumber(month.bellowBasic)} ${
          month.bellowBasic === 1 ? ' Aluno' : ' Alunos'
        }`,
        `${formatNumber(month.basic)} ${month.basic === 1 ? ' Aluno' : ' Alunos'}`,
        `${formatNumber(month.suitable)} ${month.suitable === 1 ? ' Aluno' : ' Alunos'}`,
        `${formatNumber(month.advenced)} ${month.advenced === 1 ? ' Aluno' : ' Alunos'}`,
      ])
      rowCount += 1
      text6.alignment = { horizontal: 'center' }
    })
  }

  ws.getColumn(1).font = { bold: true, size: 12 }
  ws.getColumn(1).width = 30

  const buf = await wb.xlsx.writeBuffer()
  saveAs(new Blob([buf]), 'Relatório de visão geral.xlsx')
}

const handleChangeInstitution = async () => {
  loading.value = true
  await fetchSubjects()
  loading.value = false
}

handleCreateFilters()

watch(
  subject,
  async () => {
    if (!subject.value.id) {
      classes.value = []
      filters.value.class = {}
      loading.value = false
      return
    }

    await fetchClasses()
    handleOverview()
  },
  {
    deep: true,
  },
)

</script>

<style lang="scss">
  .vs--searchable.vs__dropdown-toggle {
    height: 40px;
  }
</style>

<style lang="scss" scoped>
  .margin-badge {
    margin-right: 5px;
  }

  .selects {
    width: 15rem;
    margin-right: 0.5rem;
  }

  .filters-form {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: space-between;
  }

  .filters-form-items {
    flex: 1;
    margin: 0px 5px;
    margin-bottom: 20px;
  }

  .filters-wrapper {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .custom-button-margin {
    margin-top: 27px;
  }

  .class-badge {
    display: flex;
    align-items: center;
    margin-top: 2px;
    letter-spacing: 0;
  }

  .no-data-container {
    min-height: 300px;
  }

  .no-data-image {
    max-width: 200px;
    width: 100%;
    height: auto;
    margin-bottom: 24px;
  }

  .no-data-text {
    font-size: 16px;
    text-align: center;
    margin: 0;
  }

  @media (max-width: 900px) {
    .column-order {
      display: flex;
      flex-direction: column;
    }

    .filters-form {
      display: flex;
      flex-direction: column;
    }

    .filters-form-items {
      margin-bottom: 1rem;
    }

    .custom-button-margin {
      margin-top: 1rem;
    }
  }
</style>