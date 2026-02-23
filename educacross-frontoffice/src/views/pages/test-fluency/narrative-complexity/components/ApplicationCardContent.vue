<template>
  <div v-if="data" class="d-flex flex-column h-100">
    <h3 :class="`mb-2 ${data.enabled ? 'text-primary' : 'text-body'}`">
      {{ ENarrativeComplexityTitle[data.apply] }}
    </h3>

    <div class="px-1 py-50 rounded mb-2" :class="`bg-light-${complexityVariant.variant}`">
      <p class="mb-0 font-bold text-body">Complexidade Narrativa</p>
      <div class="d-flex">
        <b-badge
          pill
          :variant="`${complexityVariant.variant}`"
          class="text-uppercase px-2 py-25 d-flex align-items-center justify-content-center gap-1"
        >
          <span
            v-if="complexityVariant.icon"
            class="material-symbols-outlined"
            style="font-size: 14px"
          >
            {{ complexityVariant.icon }} </span
          >{{ complexityVariant.label }}
        </b-badge>
      </div>
    </div>

    <div
      v-if="data.blocked && $can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
      class="d-flex flex-column align-items-center justify-content-center flex-grow-1"
    >
      <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
      <span class="text-center mb-2">
        Esta aplicação ainda não está liberada para a sua turma.
      </span>

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
        Parece que este
        <span class="font-bold text-danger">teste ainda não foi aplicado.</span> Deseja fazer a
        aplicação agora?
      </span>

      <b-button variant="success" @click="confirmApply(data)">
        <span class="d-flex align-items-center gap-1">
          <span class="material-symbols-outlined"> task_alt</span>
          Aplicar à turma
        </span>
      </b-button>
    </div>

    <div
      v-else-if="!data.enabled && !$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
      class="d-flex flex-column align-items-center justify-content-center flex-grow-1"
    >
      <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
      <span class="text-center mb-2"> Esta aplicação não foi realizada por nenhuma turma. </span>
    </div>

    <div v-else-if="data.enabled">
      <p class="mb-0 font-bold text-body">Alunos por categoria</p>

      <PieChart
        tooltip-suffix=" Alunos"
        :data="{
          series,
          colors,
          tooltipLabels,
        }"
      />

      <div v-for="(item, index) in percentileNarrativeComplexityWithNotCompleted" :key="index">
        <div
          v-if="item.studentKey !== 'studentsError' || data[item.studentKey]"
          class="d-flex align-items-center justify-content-between"
        >
          <div class="d-flex align-items-center justify-content-start gap-1">
            <span class="material-symbols-outlined" :class="`${item.textClass}`">
              {{ item.icon }}
            </span>
            <span>{{ item.label }}</span>
          </div>
          <span :class="`font-bold ${item.textClass}`">
            {{ $filters.formatNumber(calcPercent(data[item.studentKey], data.students)) }}%
          </span>
        </div>
      </div>

      <div v-if="!data.finished">
        <div
          v-if="!data.paused && $can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
          class="d-flex flex-column align-items-center mt-2"
        >
          <b-button variant="danger" @click="confirmPause(data)">
            <span class="d-flex align-items-center gap-1">
              <span class="material-symbols-outlined"> pause</span>
              Pausar aplicação
            </span>
          </b-button>
        </div>
        <div
          v-if="data.paused && $can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
          class="d-flex flex-column align-items-center mt-2"
        >
          <b-button variant="success" @click="confirmReApply(data)">
            <span class="d-flex align-items-center gap-1">
              <span class="material-symbols-outlined"> prompt_suggestion</span>
              Retomar aplicação
            </span>
          </b-button>
        </div>
      </div>
    </div>

    <ModalConfirm
      v-model="openApply"
      :busy="loadingAction"
      :callback-confirm="applyNarrativeComplexity"
      label-confirm="Aplicar teste"
    >
      <h4>Tem certeza que deseja aplicar?</h4>
      <p v-if="openApply">
        O teste ficará disponível para
        <span class="text-primary font-bold">{{ data.className }}.</span> Você poderá pausar a
        aplicação do teste a qualquer momento.
      </p>
    </ModalConfirm>

    <ModalConfirm
      v-model="openPause"
      :busy="loadingAction"
      :callback-confirm="pauseNarrativeComplexity"
      label-confirm="Pausar teste"
    >
      <h4>Tem certeza que deseja pausar?</h4>
      <p v-if="openPause">
        O teste será pausado e ficará temporariamente indisponível para
        <span class="text-primary font-bold">{{ data.className }}.</span> Você poderá retomar a
        qualquer momento.
      </p>
    </ModalConfirm>

    <ModalConfirm
      v-model="openReApply"
      :busy="loadingAction"
      :callback-confirm="reapplyNarrativeComplexity"
      label-confirm="Retomar teste"
    >
      <h4>Tem certeza que deseja retomar?</h4>
      <p v-if="openReApply">
        O teste ficará disponível novamente para
        <span class="text-primary font-bold">{{ data.className }}.</span> Você poderá pausar a
        qualquer momento.
      </p>
    </ModalConfirm>
  </div>
</template>

<script setup>
import PieChart from '@/components/chart/PieChart.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import { percentileNarrativeComplexityWithNotCompleted } from '@/consts/legends/percentileNarrativeComplexityEnum.js'
import {
  ENarrativeComplexityTitle,
  ENarrativeComplexityStatus,
} from '@/consts/narrativeComplexity.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import {
  enableNarrativeComplexity,
  pauseNarrativeComplexity as fetchPauseNarrativeComplexity,
} from '@/services/shared/narrativeComplexity/narrativeComplexity.service.js'
import useFilters from '@/store/filters/useFilters'
import { calcPercent } from '@/utils/number.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { ref, computed, toRefs, getCurrentInstance } from 'vue'

// Props
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})

// Emits
const emit = defineEmits(['reload'])

const vm = getCurrentInstance().proxy
const { classe } = useFilters()
const { data } = toRefs(props)

const series = computed(() => {
  const values = [
    data.value.studentsAboveExpectations,
    data.value.studentsWithinExpectations,
    data.value.studentsBelowExpectations,
    data.value.studentsNotStart,
  ]
  if (data.value.studentsError) {
    values.push(data.value.studentsError)
  }
  return values
})

const colors = computed(() => {
  const colorsArr = ['#7367F0', '#28C76F', '#EA5455', '#B4B7BD']
  if (data.value.studentsError) {
    colorsArr.push('#D63384')
  }
  return colorsArr
})

const tooltipLabels = computed(() => {
  const labelsArr = [
    'Acima do esperado:',
    'Dentro do esperado:',
    'Abaixo do esperado:',
    'Não fizeram:',
  ]
  if (data.value.studentsError) {
    labelsArr.push('Problemas identificados:')
  }
  return labelsArr
})

const studentProps = [
  'studentsAboveExpectations',
  'studentsWithinExpectations',
  'studentsBelowExpectations',
]

const maxProp = computed(() => {
  if (!data.value) return ''

  const statusProp = studentProps.reduce(
    (max, prop) => (data.value[prop] > data.value[max] ? prop : max),
    studentProps[0],
  )

  if (data.value[statusProp] === 0) return ''
  return statusProp
})

const complexity = computed(() => ENarrativeComplexityStatus[maxProp.value])
const complexityVariant = computed(() => {
  if (!data.value.enabled || data.value.blocked)
    return {
      variant: 'status-activate',
      label: 'NÃO REALIZADA',
    }
  if (data.value.paused) {
    return {
      variant: 'status-start',
      label: 'EM PAUSA',
    }
  }
  if (!complexity.value) {
    if (data.value.finished) {
      return {
        variant: 'status-activate',
        label: 'NÃO REALIZADA',
      }
    }
    return {
      icon: 'directions_walk',
      variant: 'status-start',
      label: 'EM ANDAMENTO',
    }
  }
  return getVariantByRule(complexity.value, 'percentileNarrativeComplexityWithNotCompleted')
})

const selected = ref(null)

const openApply = ref(false)
const loadingAction = ref(false)

const confirmApply = _data => {
  selected.value = _data
  openApply.value = true
}

const applyNarrativeComplexity = () => {
  loadingAction.value = true
  enableNarrativeComplexity({
    apply: selected.value.apply,
    classId: classe.value.ClassId,
  })
    .then(() => {
      openApply.value = false
      vm.$toast({
        component: Toast,
        props: {
          title: 'Teste aplicado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      emit('reload')
    })
    .catch(() => {
      openApply.value = false
    })
    .finally(() => {
      loadingAction.value = false
    })
}

const openPause = ref(false)

const confirmPause = _data => {
  selected.value = _data
  openPause.value = true
}

const pauseNarrativeComplexity = () => {
  loadingAction.value = true
  fetchPauseNarrativeComplexity({
    apply: selected.value.apply,
    classId: classe.value.ClassId,
  })
    .then(() => {
      openPause.value = false
      vm.$toast({
        component: Toast,
        props: {
          title: 'Teste pausado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      emit('reload')
    })
    .catch(() => {
      openPause.value = false
    })
    .finally(() => {
      loadingAction.value = false
    })
}

const openReApply = ref(false)

const confirmReApply = _data => {
  selected.value = _data
  openReApply.value = true
}

const reapplyNarrativeComplexity = () => {
  loadingAction.value = true
  enableNarrativeComplexity({
    apply: selected.value.apply,
    classId: classe.value.ClassId,
  })
    .then(() => {
      openReApply.value = false
      vm.$toast({
        component: Toast,
        props: {
          title: 'Teste retomado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      emit('reload')
    })
    .catch(() => {
      openReApply.value = false
    })
    .finally(() => {
      loadingAction.value = false
    })
}

</script>

<style lang="scss" scoped>
  .block-button {
    color: #4b4b4b !important;
    background-color: rgba(108, 117, 125, 0.12) !important;
    border: none !important;
  }
</style>