<template>
  <div v-if="data" class="d-flex flex-column h-100">
    <div class="mb-1">
      <h3 :class="`mb-0 ${data.enabled ? 'text-primary' : 'text-body'}`">
        {{ data.applyName }}
      </h3>
      <p v-if="data.createdAt" class="mb-0 font-bold text-body">
        {{ data.createdAt | formattedDate }}
      </p>
    </div>

    <div class="px-1 py-50 rounded mb-2" :class="`bg-light-${dataVariant.variant}`">
      <p class="mb-0 font-bold text-body">Fase mais identificada:</p>
      <div class="d-flex">
        <b-badge
          pill
          :variant="`${dataVariant.variant}`"
          class="text-uppercase px-2 py-25 d-flex align-items-center justify-content-center gap-1"
        >
          <span v-if="dataVariant.icon" class="material-symbols-outlined" style="font-size: 14px">
            {{ dataVariant.icon }} </span
          >{{ dataVariant.text }}
        </b-badge>
      </div>
    </div>

    <div
      v-if="data.blocked && $can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
      class="d-flex flex-column align-items-center justify-content-center flex-grow-1"
    >
      <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
      <span class="text-center mb-2"> Esta aplicação ainda não está liberada. </span>

      <b-button class="block-button shadow-none cursor-default">
        <span class="d-flex align-items-center gap-1">
          <span class="material-symbols-outlined"> lock</span>
          Bloqueado
        </span>
      </b-button>
    </div>

    <div
      v-else-if="!data.enabled && $can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
      class="d-flex flex-column align-items-center justify-content-center flex-grow-1"
    >
      <b-img src="@/assets/images/belinha/regua.svg" class="mb-1" />
      <span class="text-center mb-2">
        <span class="font-bold text-success">Esta aplicação está liberada!</span><br />
        Deseja fazer agora?
      </span>

      <b-button variant="success" :disabled="loading" @click="openOrientationModal(data)">
        <span class="d-flex align-items-center gap-1">
          <span class="material-symbols-outlined"> task_alt</span>
          Aplicar
        </span>
      </b-button>
    </div>

    <div
      v-else-if="!data.enabled && !$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
      class="d-flex flex-column align-items-center justify-content-center flex-grow-1"
    >
      <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
      <span class="text-center mb-2"> {{ notAppliedMessage }} </span>
    </div>

    <div v-else-if="data.enabled">
      <p class="mb-0 font-bold text-body text-center">Alunos por fase</p>

      <div class="d-flex justify-content-center">
        <e-charts
          :option="options"
          autoresize
          :style="{ maxWidth: '230px', height: '230px' }"
        />
      </div>

      <div class="d-flex justify-content-center flex-wrap gap-2">
        <b-badge
          v-for="(item, index) in writingPhaseEnum"
          :key="index"
          :variant="`outline-${item.variant}`"
          class="mb-50 uppercase py-0"
          active
          pill
        >
          <span class="font-10">
            {{ item.badgeLabel }}
          </span>
        </b-badge>
      </div>

      <div
        v-if="!can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)"
        class="d-flex flex-column align-items-center mt-2"
      >
        <b-button
          v-if="data.writingStagesTestId"
          variant="primary"
          :disabled="loading"
          @click.stop="openOrientationModal(data)"
        >
          <span
            v-if="data.writingStagesTestId && !can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
            class="d-flex align-items-center gap-1"
          >
            <span v-show="!loading" class="material-symbols-outlined">visibility</span>
            <b-spinner v-show="loading" small />
            Prévia do teste
          </span>

          <span v-else class="d-flex align-items-center gap-1">
            <span v-show="!loading" class="material-symbols-outlined"> explore</span>
            <b-spinner v-show="loading" small />
            Orientações da aplicação
          </span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import { EWritingStages, writingPhaseEnum } from '@/consts/legends/writingPhasesEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { can } from '@core/libs/acl/utils'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// Register ECharts components
use([GridComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer])

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  loading: {
    type: Boolean,
    default: false,
  },
  notAppliedMessage: {
    type: String,
    default: 'Esta aplicação não foi realizada por nenhuma turma.',
  },
})

const emit = defineEmits(['open-orientation-modal'])

const { data } = toRefs(props)

const series = computed(() => {
  const values = [
    {
      name: 'Não Avaliados',
      value: data.value.studentsNotStart,
      label: { show: false },
    },
    {
      name: 'Pré-Silábica',
      value: data.value.studentsPreSyllabic,
      label: { show: false },
    },
    {
      name: 'Silábica Sem Valor Sonoro',
      value: data.value.studentsSyllabicWithoutSoundValue,
      label: { show: false },
    },
    {
      name: 'Silábica Com Valor Sonoro',
      value: data.value.studentsSyllabicWithSoundValue,
      label: { show: false },
    },
    {
      name: 'Silábica-Alfabética',
      value: data.value.studentsSyllabicAlphabetic,
      label: { show: false },
    },
    {
      name: 'Alfabética',
      value: data.value.studentsAlphabetic,
      label: { show: false },
    },
    {
      name: 'Ortográfica',
      value: data.value.studentsOrthographi,
      label: { show: false },
    },
  ]
  if (data.value.studentsError) {
    values.push({ name: '', value: data.value.studentsError, label: { show: false } })
  }
  return values
})

const colors = computed(() => {
  const colors = ['#B4B7BD', '#00BDB9', '#28C76F', '#299459', '#246541', '#7367F0', '#3B2EC2']
  if (data.value.studentsError) {
    colors.push('#D63384')
  }

  return colors
})

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: params => {
        return `${params.marker} ${params.name}: ${params.value} alunos`
      },
    },
    legend: {
      show: false,
      height: '0',
    },
    axisPointer: {
      show: false,
    },
    color: colors.value,
    series: [
      {
        type: 'pie',
        radius: ['50%', '100%'],
        center: ['50%', '50%'],
        startAngle: 180,
        endAngle: 360,
        top: '10px',
        height: '150%',
        data: series.value,
      },
    ],
  }
})

const studentProps = [
  'studentsPreSyllabic',
  'studentsSyllabicWithoutSoundValue',
  'studentsSyllabicWithSoundValue',
  'studentsSyllabicAlphabetic',
  'studentsAlphabetic',
  'studentsOrthographi',
]

const maxProp = computed(() => {
  if (!data.value) return ''

  const statusProp = studentProps.reduce((max, prop) => {
    return data.value[prop] > data.value[max] ? prop : max
  }, studentProps[0])

  if (data.value[statusProp] === 0) return ''
  return statusProp
})

const complexity = computed(() => EWritingStages[maxProp.value])
const dataVariant = computed(() => {
  if (!data.value.enabled || data.value.blocked)
    return {
      variant: 'dark-gray',
      text: 'NÃO REALIZADA',
    }
  if (data.value.paused) {
    return {
      variant: 'info',
      text: 'EM PAUSA',
    }
  }

  if (!complexity.value) {
    return {
      variant: 'secondary',
      text: 'NÃO AVALIADOS',
    }
  }
  return getVariantByRule(complexity.value, 'writingPhaseEnum')
})

const openOrientationModal = data => {
  emit('open-orientation-modal', data)
}
</script>

<style lang="scss" scoped>
  .block-button {
    color: #4b4b4b !important;
    background-color: rgba(108, 117, 125, 0.12) !important;
    border: none !important;
  }

  .auto-height {
    height: auto !important;
  }
</style>
<style lang="scss">
  .echarts {
    height: auto !important;
    width: 100% !important;

    > div {
      margin: 0 auto !important;
      max-width: 100% !important;
      height: auto !important;

      canvas {
        position: relative !important;
        max-width: 100% !important;
        height: auto !important;
      }
    }
  }
</style>