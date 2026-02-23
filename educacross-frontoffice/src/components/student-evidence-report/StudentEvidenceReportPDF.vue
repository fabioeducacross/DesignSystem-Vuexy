<template>
  <div class="evidence-report-body">
    <div class="text-center">
      <h1 class="font-bold">{{ infoPDF.institutionName }}</h1>
      <h1>Relatório de Evidências</h1>
      <p class="font-12 font-bold">
        {{ infoPDF.period }} de {{ getCurrentYear() }}
      </p>
    </div>

    <b-card class="shadow-none border mb-1">
      <p class="font-bold">
        <span class="font-normal">Professor: </span>
        {{ infoPDF.name }}
      </p>
      <p class="font-bold">
        <span class="font-normal">Matriz/Currículo: </span>
        {{ infoPDF.educationalOrganization }}
      </p>
      <p class="font-bold"><span class="font-normal">Módulo:</span> {{ infoPDF.dataType }}</p>
      <p class="font-bold"><span class="font-normal">Turma:</span> {{ infoPDF.className }}</p>
    </b-card>

    <div v-if="infoPDF.dashboard" class="w-100 mb-1">
      <div class="d-flex flex-wrap gap-4 flex-no-wrap">
        <div class="p-50 chart-1 flex-1">
          <h4 class="font-semibold text-center text-body">Rendimento da turma</h4>
          <div>
            <v-chart ref="pie" autoresize :option="donutChart" class="donut-chart" />
          </div>
        </div>
        <div class="p-50 chart-2 flex-1">
          <h4 class="font-semibold text-center text-body">Jogos finalizados</h4>
          <div>
            <v-chart ref="bar" autoresize :option="barChart" class="bar-chart" />
          </div>
        </div>
      </div>
      <div class="border-t w-100 charts-legends-container">
        <LegendEnum :legends="legends" card-class="shadow-none mb-0" />
        <hr class="mt-0" />
        <div class="d-flex align-items-center gap-4 px-1 pb-1">
          <span class="whitespace-no-wrap">Jogos Finalizados:</span>
          <div class="whitespace-normal">
            <div
              v-for="(knowledgeAxis, indexAxis) in infoPDF.dashboard.finishedActivities.knowledgeAxis"
              :key="indexAxis"
              class="inline-block mr-1 whitespace-normal"
            >
              <span class="font-bold">{{ knowledgeAxis.abbreviatedName }}</span> -
              {{ knowledgeAxis.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="infoPDF.dashboard" class="mb-1">
      <b-table-simple
        small
        no-border-collapse
        :data="infoPDF.dashboard.students"
        empty-text="Nenhum dado encontrado."
        show-empty
        class="border rounded"
      >
        <b-thead>
          <b-tr>
            <b-th colspan="6" scope="colgroup" class="text-center border-0 table-header-title">
              Desempenho Geral
            </b-th>
          </b-tr>
          <b-tr>
            <b-th class="border-top-0 border-bottom-0 table-header-row" scope="col">Nome</b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row" scope="col"></b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row text-center" scope="col">
              Jogos
            </b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row text-center" scope="col">
              Jogos finalizados
            </b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row text-center" scope="col">
              rendimento
            </b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row text-center" scope="col">
              tempo investido
            </b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr
            v-for="(student, indexClassPerformance) in infoPDF.dashboard.students"
            :key="indexClassPerformance"
          >
            <b-td class="text-black whitespace-no-wrap">
              {{ student.name }}
            </b-td>
            <b-td class="text-center">
              <b-badge v-if="student.totalTime === 0" variant="light-primary" pill>
                Não há dados para exibir
              </b-badge>
              <b-badge
                v-else
                :variant="getVariantByRule(student.performance, 'learningPerformance').variant"
                pill
              >
                {{ getVariantByRule(student.performance, 'learningPerformance').badgeLabel }}
              </b-badge>
            </b-td>
            <template v-if="student.totalTime > 0">
              <b-td class="text-black text-center">
                {{ formatNumber(student.playedActivities) }}
              </b-td>
              <b-td class="text-black">
                <large-progress-with-percentage
                  :data="student.finishedActivities"
                  enum="evidenceReportFinishedGames"
                />
              </b-td>
              <b-td class="text-black">
                <large-progress-with-percentage
                  :data="student.performance"
                  enum="learningPerformance"
                />
              </b-td>
              <b-td class="text-black text-center">
                {{ formattedTime(student.totalTime) }}
              </b-td>
            </template>
            <template v-else>
              <b-td class="text-black text-center"> -</b-td>
              <b-td class="text-black text-center"> -</b-td>
              <b-td class="text-black text-center"> -</b-td>
              <b-td class="text-black text-center"> -</b-td>
            </template>
          </b-tr>
        </b-tbody>
        <b-tfoot v-if="infoPDF.dashboard.students.some(s => s.totalTime > 0)">
          <b-th :colspan="knowledgeAxis.length + 1" class="bg-white font-normal">
            <LegendEnum :legends="legends" card-class="shadow-none mb-0" />
          </b-th>
        </b-tfoot>
      </b-table-simple>
      <b-table-simple
        small
        no-border-collapse
        :data="infoPDF.dashboard.students"
        empty-text="Nenhum dado encontrado."
        show-empty
        class="border rounded"
      >
        <b-thead>
          <b-tr>
            <b-th
              :colspan="knowledgeAxis.length + 1"
              scope="colgroup"
              class="text-center border-0 table-header-title"
            >
              Desempenho por
              {{ $utilTeacherService.changeTextBySubject('knowledgeAxis', 'singularFirstCapitalLetters') }}
            </b-th>
          </b-tr>
          <b-tr>
            <b-th class="border-top-0 border-bottom-0 table-header-row" scope="col">Nome</b-th>
            <b-th
              v-for="(ka, KAIndex) in knowledgeAxis"
              :key="`ka-${KAIndex}`"
              class="border-top-0 border-bottom-0 table-header-row"
              style="max-width: 90px; word-break: break-all; white-space: normal"
            >
              {{ ka.name }}
            </b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr
            v-for="(student, indexClassPerformance) in infoPDF.dashboard.students"
            :key="indexClassPerformance"
          >
            <b-td class="text-black">
              {{ student.name }}
              <br />
            </b-td>
            <template v-if="student.totalTime > 0">
              <b-td
                v-for="(SKA, SKAIndex) in student.knowledgeAxis"
                :key="`SKA-${indexClassPerformance}-${SKAIndex}`"
                class="text-black"
              >
                <large-progress-with-percentage :data="SKA.performance" />
              </b-td>
            </template>
            <template v-else>
              <b-td
                v-for="(SKA, SKAIndex) in student.knowledgeAxis"
                :key="`SKA-${indexClassPerformance}-${SKAIndex}`"
                class="text-center"
              >
                -
              </b-td>
            </template>
          </b-tr>
        </b-tbody>
        <b-tfoot v-if="infoPDF.dashboard.students.some(s => s.totalTime > 0)">
          <b-th :colspan="knowledgeAxis.length + 1" class="bg-white font-normal">
            <LegendEnum :legends="legends" card-class="shadow-none mb-0" />
          </b-th>
        </b-tfoot>
      </b-table-simple>
    </div>

    <div v-if="infoPDF.classProficiency" class="mb-1">
      <b-table-simple
        small
        no-border-collapse
        class="rounded border-bottom border-left border-right"
      >
        <b-thead>
          <b-tr>
            <b-th colspan="9" class="border-0 text-center table-header-title">
              Habilidades da turma
            </b-th>
          </b-tr>
          <b-tr>
            <b-th class="border-top-0 border-bottom-0 table-header-row">Habilidade</b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row">Rendimento</b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row text-center">Alunos</b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row text-center">Tempo</b-th>
            <b-th
              class="border-top-0 border-bottom-0 border bg-white p-0"
              style="width: 10px"
            ></b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row">Habilidade</b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row">Rendimento</b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row text-center">Alunos</b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row text-center">Tempo</b-th>
          </b-tr>
        </b-thead>
        <b-tbody v-if="infoPDF.classProficiency.slicedDescriptors.length === 0">
          <b-tr>
            <b-td colspan="4" class="text-center">
              <b-badge variant="light-primary" pill> NÃO HÁ DADOS PARA EXIBIR</b-badge>
            </b-td>
            <b-td
              class="bg-white border-top-0 border-bottom-0 border-l border-r p-0"
              style="width: 10px"
            ></b-td>
            <b-td colspan="4" class="text-center">
              <b-badge variant="light-primary" pill> NÃO HÁ DADOS PARA EXIBIR</b-badge>
            </b-td>
          </b-tr>
        </b-tbody>
        <b-tbody v-else>
          <b-tr
            v-for="(descriptor, indexDescriptor) in infoPDF.classProficiency.slicedDescriptors"
            :key="`desc1-${indexDescriptor}`"
          >
            <b-td>
              <span
                v-if="descriptor[0]"
                :id="`${indexDescriptor}-${descriptor[0].tag}`"
                class="text-primary underline cursor-help"
                >{{ descriptor[0].tag }}</span
              >
              <b-popover
                v-if="descriptor[0]"
                :target="`${indexDescriptor}-${descriptor[0].tag}`"
                triggers="hover"
                placement="top"
              >
                <template #title>{{ descriptor[0].tag }}</template>
                {{ descriptor[0].legend }}
              </b-popover>
            </b-td>
            <b-td class="text-black">
              <large-progress-with-percentage
                :data="descriptor[0].performance"
                enum="learningPerformance"
              />
            </b-td>
            <b-td class="text-black text-center">
              {{ formatNumber(descriptor[0].students) }}
            </b-td>
            <b-td class="text-black text-center">
              {{ formattedTime(descriptor[0].time) }}
            </b-td>
            <b-td
              class="bg-white border-top-0 border-bottom-0 border-l border-r p-0"
              style="width: 10px"
            ></b-td>
            <b-td>
              <span
                v-if="descriptor[1]"
                :id="`${indexDescriptor}-${descriptor[1].tag}`"
                class="text-primary underline cursor-help"
                >{{ descriptor[1].tag }}</span
              >
              <b-popover
                v-if="descriptor[1]"
                :target="`${indexDescriptor}-${descriptor[1].tag}`"
                triggers="hover"
                placement="top"
              >
                <template #title>{{ descriptor[1].tag }}</template>
                {{ descriptor[1].legend }}
              </b-popover>
            </b-td>
            <b-td v-if="descriptor[1]" class="text-black">
              <large-progress-with-percentage
                :data="descriptor[1].performance"
                enum="learningPerformance"
              />
            </b-td>
            <b-td v-if="descriptor[1]" class="text-black text-center">
              {{ formatNumber(descriptor[1].students) }}
            </b-td>
            <b-td v-if="descriptor[1]" class="text-black text-center">
              {{ formattedTime(descriptor[1].time) }}
            </b-td>
          </b-tr>
        </b-tbody>
        <b-tfoot
          v-if="infoPDF.classProficiency.slicedDescriptors.length !== 0"
          class="border border-t-0"
        >
          <b-th :colspan="9" class="bg-white p-0 font-normal">
            <LegendEnum :legends="legends" card-class="shadow-none mb-0" />
          </b-th>
        </b-tfoot>
      </b-table-simple>
    </div>

    <div v-if="infoPDF.studentsProficiency.length > 0" class="mb-1">
      <div
        v-for="(student, indexStudent) in infoPDF.studentsProficiency"
        :key="indexStudent"
        :class="{ 'page-break': indexStudent !== 0 }"
      >
        <b-table-simple
          no-border-collapse
          small
          class="rounded border-bottom border-left border-right"
        >
          <b-thead>
            <b-tr>
              <b-th colspan="7" class="border-0 text-center table-header-title">
                Habilidades por aluno:
                <span class="text-primary" style="font-weight: 800">{{ student.name }}</span> •
                tempo investido:
                <span class="text-primary" style="font-weight: 800">{{ formattedTime(student.time) }}</span>
              </b-th>
            </b-tr>
            <b-tr>
              <b-th class="border-top-0 border-bottom-0 table-header-row">Habilidade</b-th>
              <b-th class="border-top-0 border-bottom-0 table-header-row">Rendimento</b-th>
              <b-th class="border-top-0 border-bottom-0 table-header-row text-center">Tempo</b-th>
              <b-th
                class="border-top-0 border-bottom-0 border bg-white p-0"
                style="width: 10px"
              ></b-th>
              <b-th class="border-top-0 border-bottom-0 table-header-row">Habilidade</b-th>
              <b-th class="border-top-0 border-bottom-0 table-header-row">Rendimento</b-th>
              <b-th class="border-top-0 border-bottom-0 table-header-row text-center">Tempo</b-th>
            </b-tr>
          </b-thead>
          <b-tbody v-if="student.slicedDescriptors.length === 0">
            <b-tr>
              <b-td colspan="3" class="text-center">
                <b-badge variant="light-primary" pill> NÃO HÁ DADOS PARA EXIBIR</b-badge>
              </b-td>
              <b-td
                class="bg-white border-top-0 border-bottom-0 border-l border-r p-0"
                style="width: 10px"
              ></b-td>
              <b-td colspan="3" class="text-center">
                <b-badge variant="light-primary" pill> NÃO HÁ DADOS PARA EXIBIR</b-badge>
              </b-td>
            </b-tr>
          </b-tbody>
          <b-tbody v-else>
            <b-tr
              v-for="(descriptor, indexDescriptor) in student.slicedDescriptors"
              :key="`desc1-${indexDescriptor}`"
            >
              <b-td>
                <span
                  v-if="descriptor[0]"
                  :id="`${indexStudent}-${descriptor[0].tag}`"
                  class="text-primary underline cursor-help"
                  >{{ descriptor[0].tag }}</span
                >
                <b-popover
                  v-if="descriptor[0]"
                  :target="`${indexStudent}-${descriptor[0].tag}`"
                  triggers="hover"
                  placement="top"
                >
                  <template #title>{{ descriptor[0].tag }}</template>
                  {{ descriptor[0].legend }}
                </b-popover>
              </b-td>
              <b-td class="text-black">
                <large-progress-with-percentage
                  :data="descriptor[0].performance"
                  enum="learningPerformance"
                />
              </b-td>
              <b-td class="text-black text-center">
                {{ formattedTime(descriptor[0].time) }}
              </b-td>
              <b-td
                class="bg-white border-top-0 border-bottom-0 border-l border-r p-0"
                style="width: 10px"
              ></b-td>
              <b-td>
                <span
                  v-if="descriptor[1]"
                  :id="`${indexStudent}-${descriptor[1].tag}`"
                  class="text-primary underline cursor-help"
                  >{{ descriptor[1].tag }}</span
                >
                <b-popover
                  v-if="descriptor[1]"
                  :target="`${indexStudent}-${descriptor[1].tag}`"
                  triggers="hover"
                  placement="top"
                >
                  <template #title>{{ descriptor[1].tag }}</template>
                  {{ descriptor[1].legend }}
                </b-popover>
              </b-td>
              <b-td v-if="descriptor[1]" class="text-black">
                <large-progress-with-percentage
                  :data="descriptor[1].performance"
                  enum="learningPerformance"
                />
              </b-td>
              <b-td v-if="descriptor[1]" class="text-black text-center">
                {{ formattedTime(descriptor[1].time) }}
              </b-td>
            </b-tr>
          </b-tbody>
          <b-tfoot v-if="student.slicedDescriptors.length !== 0" class="border border-t-0">
            <b-th :colspan="9" class="bg-white p-0 font-normal">
              <LegendEnum :legends="legends" card-class="shadow-none mb-0" />
            </b-th>
          </b-tfoot>
        </b-table-simple>
      </div>
    </div>

    <ul class="list-disc mx-1 d-none d-print-block">
      <li v-for="(subtitle, index) in infoPDF.subtitles" :key="`subtitle-${index}`" class="mb-1">
        {{ subtitle }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { ACCESS_ROLE_ENUM } from '@/consts/accessRoleEnum.js'
import BNCC_AXIS_NAME from '@/consts/admin-context/BNCCAxisName'
import { getVariantByRule } from '@/consts/legends'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
import { proficiency } from '@/consts/legends/proficiencyEnum.js'
import { SubjectEnum } from '@/consts/teacher-context/enums/subjectEnum.js'
import { formatNumber } from '@/filters/filters'
import { formattedTime } from '@/utils/utils'
import LargeProgressWithPercentage from '@/views/pages/admin-context/shared/components/large-progress-with-percentage/LargeProgressWithPercentage.vue'

// ECharts imports
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'

import store from '@/store'
import router from '@/router'

use([CanvasRenderer, GridComponent, TooltipComponent, LegendComponent, BarChart, PieChart])

// Utilities available via prototype (as in Vue 2)
const $utilTeacherService = window.$utilTeacherService || { changeTextBySubject() {} }

// Emits
const emit = defineEmits(['setInfos'])

// Local refs/state
import { ref, onMounted } from 'vue'

const infoPDF = ref({
  institutionName: '',
  name: '',
  period: '',
  educationalOrganization: '',
  dataType: '',
  className: '',
  dashboard: {
    performance: {
      advencedStudents: 0,
      adequateStudents: 0,
      basicStudents: 0,
      belowBasicStudents: 0,
    },
    finishedActivities: {
      knowledgeAxis: [
        { name: '', value: 0 },
        { name: '', value: 0 },
        { name: '', value: 0 },
        { name: '', value: 0 },
        { name: '', value: 0 },
      ],
    },
    students: [
      {
        name: '',
        playedActivities: 0,
        finishedActivities: 0,
        performance: 0,
        totalTime: 0,
        knowledgeAxis: [
          {
            name: '',
            performance: 0,
          },
        ],
      },
    ],
  },
  classProficiency: {
    descriptors: [
      {
        tag: '',
        performance: 0,
        students: 0,
        time: 0,
      },
    ],
    slicedDescriptors: [],
  },
  studentsProficiency: [
    {
      name: '',
      descriptors: [
        {
          tag: '',
          performance: 0,
          students: 0,
          time: 0,
        },
      ],
      slicedDescriptors: [],
    },
  ],
  subtitles: [],
})

const donutChart = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'horizontal',
    center: 'center',
    data: ['Abaixo do Básico', 'Básico', 'Proficiente', 'Avançado'],
    icon: 'circle',
    textStyle: {
      color: ['#EA5455', '#FF9F43', '#28C76F', '#7367F0'],
      fontWeight: 'bold',
    },
    itemWidth: 10,
    itemHeight: 10,
  },
  series: [
    {
      name: 'Rendimento',
      type: 'pie',
      radius: ['30%', '60%'],
      center: ['50%', '48%'],
      color: ['#EA5455', '#FF9F43', '#28C76F', '#7367F0'],
      label: {
        normal: {
          show: true,
          formatter(val) {
            val.percent = `${val.percent}`
            val.percent = val.percent.replace(/[,.]/g, m => (m === ',' ? '.' : ','))
            return `${val.percent}%`
          },
        },
      },
      data: [
        { value: 0, name: 'Abaixo do Básico' },
        { value: 0, name: 'Básico' },
        { value: 0, name: 'Proficiente' },
        { value: 0, name: 'Avançado' },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})

const barChart = ref({
  legend: {
    data: ['% de Jogos Finalizados'],
    textStyle: {
      color: '#71b5ff',
      fontWeight: 'bold',
    },
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
  },
  tooltip: {
    show: false,
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  color: ['#71b5ff'],
  xAxis: {
    type: 'category',
    data: [],
    axisTick: {
      alignWithLabel: false,
      show: true,
      lineStyle: {
        color: '#D8D6DE',
        width: 1,
        type: 'solid',
      },
    },
    axisLine: {
      lineStyle: {
        color: '#D8D6DE',
        width: 1,
        type: 'solid',
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#D8D6DE',
        width: 1,
        type: 'solid',
      },
    },
    axisLabel: {
      color: '#6E6B7B',
      align: 'center',
      fontSize: 8,
      interval: 0,
    },
  },
  yAxis: {
    show: true,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#D8D6DE',
        width: 1,
        type: 'dashed',
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#D8D6DE',
        width: 1,
        type: 'dashed',
      },
    },
    axisLine: {
      lineStyle: {
        color: '#D8D6DE',
        width: 1,
        type: 'solid',
      },
    },
    type: 'value',
    axisLabel: {
      formatter(val) {
        return `${formatNumber(val)}%`
      },
      color: '#6E6B7B',
    },
    max: '100',
  },
  series: [
    {
      name: '% de Jogos Finalizados',
      type: 'bar',
      data: [],
      label: {
        normal: {
          show: true,
          formatter(val) {
            if (val.value > 0) {
              return `${formatNumber(val.value)}%`
            }
            return ''
          },
        },
      },
    },
  ],
})

const bnccAxisName = ref({})
const knowledgeAxis = ref([])
const userRole = ref('')
const legends = ref([accuracyPerformanceLegend])

const classProficiencyFields = [
  {
    key: 'tag',
    label: 'Habilidade',
    thClass: 'align-middle',
  },
  {
    key: 'performance',
    label: 'Rendimento',
    thClass: 'align-middle',
  },
  {
    key: 'students',
    label: 'Alunos',
    thClass: 'align-middle',
  },
  {
    key: 'time',
    label: 'Tempo de aprendizagem',
    thClass: 'align-middle',
    formatter: value => formattedTime(value),
  },
]

const studentsProficiencyFields = [
  {
    key: 'tag',
    label: 'Habilidade',
    thClass: 'align-middle',
  },
  {
    key: 'performance',
    label: 'Desempenho',
    thClass: 'align-middle',
  },
  {
    key: 'time',
    label: 'Tempo de aprendizagem',
    thClass: 'align-middle',
    formatter: value => formattedTime(value),
  },
]

// Method: getCurrentYear
function getCurrentYear() {
  const date = new Date()
  return date.getFullYear()
}

// Method: abbreviatedName
function abbreviatedName(name) {
  const auxName = name.split(' ')
  let n = ''
  auxName.forEach(element => {
    if (element.length > 2) {
      n = `${n}${element[0]
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')}`
    }
  })
  return n
}

// Method: getProficiencyFromPerformance
function getProficiencyFromPerformance(value) {
  return proficiency.find(i => i.rule && i.performanceRule(value)) || proficiency[0]
}

// Method: getDescriptorLegend
function getDescriptorLegend(tag) {
  if (!infoPDF.value.subtitles || !infoPDF.value.subtitles.length) {
    return tag
  }
  const subtitle = infoPDF.value.subtitles.find(
    subtitle => subtitle && subtitle.startsWith(tag),
  )
  if (subtitle) {
    return subtitle.replace(`${tag} -`, '').trim()
  }
  return tag
}

// PDF download method
function downloadPDF() {
  window.print()
}

onMounted(() => {
  const { subjectId } = router.currentRoute.params

  if (router.currentRoute.params && router.currentRoute.params.reportData) {
    infoPDF.value = router.currentRoute.params.reportData || {}

    // Normalize optional sections to avoid undefined access in template
    if (!Array.isArray(infoPDF.value.studentsProficiency)) {
      infoPDF.value.studentsProficiency = []
    }
    infoPDF.value.studentsProficiency = infoPDF.value.studentsProficiency.map(student => {
      const normalizedStudent = { ...student }
      if (!Array.isArray(normalizedStudent.descriptors)) {
        normalizedStudent.descriptors = []
      }
      if (!Array.isArray(normalizedStudent.slicedDescriptors)) {
        normalizedStudent.slicedDescriptors = []
      }
      return normalizedStudent
    })

    if (!infoPDF.value.classProficiency) {
      infoPDF.value.classProficiency = { descriptors: [], slicedDescriptors: [] }
    }
    if (!Array.isArray(infoPDF.value.classProficiency.descriptors)) {
      infoPDF.value.classProficiency.descriptors = []
    }
    if (!Array.isArray(infoPDF.value.classProficiency.slicedDescriptors)) {
      infoPDF.value.classProficiency.slicedDescriptors = []
    }

    if (!infoPDF.value.dashboard) {
      infoPDF.value.dashboard = {
        performance: {},
        finishedActivities: { knowledgeAxis: [] },
        students: [],
      }
    }
    if (!infoPDF.value.dashboard.finishedActivities) {
      infoPDF.value.dashboard.finishedActivities = { knowledgeAxis: [] }
    }
    if (!Array.isArray(infoPDF.value.dashboard.finishedActivities.knowledgeAxis)) {
      infoPDF.value.dashboard.finishedActivities.knowledgeAxis = []
    }
    if (!Array.isArray(infoPDF.value.dashboard.students)) {
      infoPDF.value.dashboard.students = []
    }

    if (!Array.isArray(infoPDF.value.subtitles)) {
      infoPDF.value.subtitles = []
    }
    const students = infoPDF.value.dashboard?.students
    if (students) {
      knowledgeAxis.value = students[0].knowledgeAxis || []
    }
    emit('setInfos', {
      pdfTitle: router.currentRoute.params.pdfTitle,
      massPdf: false,
      moduleBook: router.currentRoute.params.moduleBook,
    })

    if (subjectId === SubjectEnum.math || subjectId === SubjectEnum.mathEnglish) {
      bnccAxisName.value = BNCC_AXIS_NAME('Matematica')
    }
    if (subjectId === SubjectEnum.portuguese) {
      bnccAxisName.value = BNCC_AXIS_NAME('Portugues')
    }
    if (subjectId === SubjectEnum.multiliteracy) {
      bnccAxisName.value = BNCC_AXIS_NAME('LigaDasCorujinhas')
    }

    if (infoPDF.value.dashboard) {
      donutChart.value.series[0].data = [
        {
          value: infoPDF.value.dashboard.performance.belowBasicStudents,
          name: 'Abaixo do Básico',
        },
        {
          value: infoPDF.value.dashboard.performance.basicStudents,
          name: 'Básico',
        },
        {
          value: infoPDF.value.dashboard.performance.adequateStudents,
          name: 'Proficiente',
        },
        {
          value: infoPDF.value.dashboard.performance.advencedStudents,
          name: 'Avançado',
        },
      ]

      infoPDF.value.dashboard.finishedActivities.knowledgeAxis.forEach(element => {
        element.abbreviatedName = abbreviatedName(element.name)
      })

      infoPDF.value.dashboard.finishedActivities.knowledgeAxis.forEach(element => {
        barChart.value.xAxis.data.push(element.abbreviatedName)
        barChart.value.series[0].data.push(element)
      })

      infoPDF.value.dashboard.students.forEach((students, indexStudents) => {
        students.knowledgeAxis.forEach(axis => {
          if (axis.name === bnccAxisName.value.firstAxis) {
            infoPDF.value.dashboard.students[indexStudents].performanceFirstAxis =
              axis.performance
          } else if (axis.name === bnccAxisName.value.secondAxis) {
            infoPDF.value.dashboard.students[indexStudents].performanceSecondAxis =
              axis.performance
          } else if (axis.name === bnccAxisName.value.thirdAxis) {
            infoPDF.value.dashboard.students[indexStudents].performanceThirdAxis =
              axis.performance
          } else if (axis.name === bnccAxisName.value.fourthAxis) {
            infoPDF.value.dashboard.students[indexStudents].performanceFourthAxis =
              axis.performance
          } else if (axis.name === bnccAxisName.value.fifthAxis) {
            infoPDF.value.dashboard.students[indexStudents].performanceFifthAxis =
              axis.performance
          }
        })
      })
    }

    if (infoPDF.value.classProficiency) {
      const halfLength = Math.ceil(infoPDF.value.classProficiency.descriptors.length / 2)

      infoPDF.value.classProficiency.slicedDescriptors = []
      for (let i = 0; i < halfLength; i++) {
        const rowData = []
        rowData.push(infoPDF.value.classProficiency.descriptors[i])
        if (rowData[0]) {
          rowData[0].legend = getDescriptorLegend(rowData[0].tag)
        }
        const secondHalfIndex = halfLength + i
        if (secondHalfIndex < infoPDF.value.classProficiency.descriptors.length) {
          rowData.push(infoPDF.value.classProficiency.descriptors[secondHalfIndex])
          if (rowData[1]) {
            rowData[1].legend = getDescriptorLegend(rowData[1].tag)
          }
        }
        infoPDF.value.classProficiency.slicedDescriptors.push(rowData)
      }
    }

    if (infoPDF.value.studentsProficiency) {
      let halfLength = null
      infoPDF.value.studentsProficiency.forEach(student => {
        halfLength = Math.ceil(student.descriptors.length / 2)
        student.slicedDescriptors = []
        for (let i = 0; i < halfLength; i++) {
          const rowData = []
          rowData.push(student.descriptors[i])
          if (rowData[0]) {
            rowData[0].legend = getDescriptorLegend(rowData[0].tag)
          }
          const secondHalfIndex = halfLength + i
          if (secondHalfIndex < student.descriptors.length) {
            rowData.push(student.descriptors[secondHalfIndex])
            if (rowData[1]) {
              rowData[1].legend = getDescriptorLegend(rowData[1].tag)
            }
          }
          student.slicedDescriptors.push(rowData)
        }
      })
    }
  } else if (router.currentRoute.params.moduleBook) {
    router.push({
      name: 'EducationSystemModules',
      params: { id: router.currentRoute.params.moduleBook },
    })
  } else {
    router.history.go(-1)
  }

  userRole.value = store.getters.accessRole
})

defineExpose({
  downloadPDF,
  getCurrentYear,
  abbreviatedName,
  getProficiencyFromPerformance,
  getDescriptorLegend,
  formatNumber,
  formattedTime,
  getVariantByRule,
  classProficiencyFields,
  studentsProficiencyFields,
  legends,
  ACCESS_ROLE_ENUM,
  knowledgeAxis,
  infoPDF,
  userRole,
  bnccAxisName,
  donutChart,
  barChart,
  $utilTeacherService,
})
</script>

<style lang="scss">
  @import '@/assets/scss/variables/variables';

  .evidence-report-body .table-header-title {
    background: rgba($primary, 0.12) !important;
  }

  .evidence-report-body .table-header-row {
    background-color: #f3f2f7 !important;
  }

  @page {
    width: 992px !important; /* A4 width */
    margin: 40px 40px 80px 40px; /* Attempt to remove browser default print margins */
  }
</style>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/variables';

  .evidence-report-body {
    padding: 1rem 2rem; /* Screen padding */
    color: #000;
    background: #fff;
    width: 992px; /* A4 width */
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box; /* Ensures padding and border are included in the width/height */
  }

  .chart-1,
  .chart-2 {
    border-radius: 8px 8px 0 0;
    border: 1px solid #ebe9f1;
    border-bottom: none;

    width: calc(992px / 2 - 1rem); /* Half of A4 width minus padding */
  }

  .charts-legends-container {
    border-radius: 0 0 8px 8px;
    border: 1px solid #ebe9f1;
  }

  .title-pdfReport {
    font-size: 32px !important;
    margin-top: 1rem !important;
  }

  .subtitle-pdfReport {
    font-size: 20px !important;
  }

  .title-pdfReport,
  .subtitle-pdfReport {
    font-weight: 600;
    line-height: 34px !important;
  }

  .text-pdfReport {
    font-size: 16px !important;
    line-height: 19px !important;
    margin-top: 0.75rem !important;
  }

  .textLegendChart-pdfReport {
    font-size: 14px;
    line-height: 18px;
  }

  .donut-chart {
    width: 100%;
    height: 300px;
  }

  .bar-chart {
    width: 100%;
    height: 300px;
  }

  @page {
    padding: 10pt 0;
    margin: 40px !important;
  }

  @media print {
    .nav-pdfReport {
      display: none;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
      box-shadow: none !important; /* Remove shadows from all elements for print */
    }

    .evidence-report-body {
      /* Inherits width: 210mm; margin-left: auto; margin-right: auto; from base style */
      /* This will center the 210mm wide block within the 210mm wide body */
      padding: 0 !important; /* Remove screen padding, content uses full 210mm width */
      margin: 0 !important; /* Remove any margins */
      /* Ensure no borders or shadows on the main container itself for print */
      border: none !important;
    }
  }
</style>