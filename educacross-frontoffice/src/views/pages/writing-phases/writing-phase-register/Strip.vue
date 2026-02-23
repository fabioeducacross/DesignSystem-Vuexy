<script setup>
import BadgeStatus from '@/components/badge/BadgeStatus.vue'
import { getVariantByRule } from '@/consts/legends'
import { writingPhaseEnum } from '@/consts/legends/writingPhasesEnum'
import { useWritingPhaseRegister } from '@/views/pages/writing-phases/writing-phase-register/useWritingPhaseResgister'
import Vue, { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'

const {
  currentPhase,
  loading,
  currentPhaseIndex,
  qtdPhases,
  irregularPhases,
  writingPhasesWritten,
  nextPhase,
  prevPhase,
} = useWritingPhaseRegister()
const { proxy } = getCurrentInstance()

const currentPhaseIsValid = computed(
  () =>
    irregularPhases.value.findIndex(
      p => p.writingStagesTestId === currentPhase.value.writingStagesTestId,
    ) === -1,
)

const enablePopoverBadge = () => {
  if (currentPhaseIsValid.value || tempNewStage.value) return
  proxy.$root.$emit('bv::show::popover', 'popover-badge')
}

const disablePopoverBadge = () => {
  proxy.$root.$emit('bv::hide::popover', 'popover-badge')
}

const enablePopoverControls = () => {
  proxy.$root.$emit('bv::show::popover', 'popover-controls')
}

const disablePopoverControls = () => {
  proxy.$root.$emit('bv::hide::popover', 'popover-controls')
}

const refModalConfirmPhaseChange = ref(null)

const enumItems = writingPhaseEnum.slice(1, writingPhaseEnum.length)
const tempNewStage = ref(null)

const variant = ref({})

const noApply = ref(true)

const handleChangeStage = value => {
  refModalConfirmPhaseChange.value.hide()
  Vue.set(currentPhase.value, 'stage', value)
  tempNewStage.value = null
}

const handleClickStage = value => {
  tempNewStage.value = value
  refModalConfirmPhaseChange.value.show()
}

const handleCloseModalChangeStage = () => {
  tempNewStage.value = null
  refModalConfirmPhaseChange.value.hide()
}

watch(
  () => currentPhase.value,
  () => {
    if (!currentPhase.value) return
    noApply.value = currentPhase.value.stage === 0

    Vue.set(variant, 'value', getVariantByRule(currentPhase.value.stage, 'writingPhaseEnum'))
  },
  { deep: true },
)

watch([irregularPhases, currentPhaseIndex], () => {
  if (currentPhaseIsValid.value) {
    disablePopoverBadge()
    if (irregularPhases.value.length > 0) {
      enablePopoverControls()
    }
  } else {
    enablePopoverBadge()
    disablePopoverControls()
  }
})

onMounted(() => {
  disablePopoverBadge()
  disablePopoverControls()
})
</script>

<template>
  <b-card v-if="currentPhase" :bg-variant="noApply ? '' : variant.variant" no-body>
    <b-card-body class="d-flex justify-content-between align-items-center gap-4 flex-wrap">
      <h4 class="mb-0 order-1" :class="noApply ? 'text-primary' : 'text-white'">
        {{ currentPhase.name }}
      </h4>
      <div
        id="badge-popover"
        class="d-flex flex-1 flex-md-grow-0 align-items-center justify-content-between justify-content-md-center gap-2 order-3 order-md-2"
      >
        <h4 class="mb-0 md:whitespace-no-wrap" :class="noApply ? 'text-body' : 'text-white'">
          Fase do aluno:
        </h4>

        <b-dropdown
          id="stages-change"
          variant="link"
          toggle-class="text-decoration-none p-0"
          no-caret
          boundary="viewport"
          boundary-padding="10"
          @show="disablePopoverBadge"
          @hide="enablePopoverBadge"
        >
          <template v-slot:button-content>
            <b-badge v-if="!noApply" variant="white" class="bg-white" size="sm">
              <span
                class="material-symbols-outlined align-middle font-weight-bold"
                :class="`text-${variant.variant}`"
                style="font-size: 17px"
                >person_edit</span
              >
              <span class="align-middle" :class="`text-${variant.variant}`">
                {{ variant.text }}</span
              >
            </b-badge>
            <b-badge v-else variant="dashed-danger" style="border-style: dashed">
              <span
                class="material-symbols-outlined align-text-bottom font-weight-bold"
                style="font-size: 17px"
                >person_edit</span
              >
              <span> AVALIAR</span>
            </b-badge>
          </template>
          <b-dropdown-item
            v-for="(legend, index) in enumItems"
            :key="index"
            :active="currentPhase.stage === index + 1"
            active-class="bg-primary bg-lighten-5"
            @click="handleClickStage(index + 1)"
          >
            <b-badge :variant="`outline-${legend.variant}`" active pill>
              {{ legend.text }}
            </b-badge>
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <b-popover
        id="popover-badge"
        :disabled="true"
        variant="primary"
        target="badge-popover"
        placement="top"
        title="Professor, comece por aqui"
      >
        Clique em <b class="text-primary">avaliar</b> e indique a fase mais adequada para este
        aluno. Avaliar a fase do aluno é obrigatório para o salvar os dados.
      </b-popover>
      <div v-if="qtdPhases > 1" id="controls-container" class="phase-controls order-2 order-md-3">
        <div
          v-show="currentPhaseIndex > 0"
          class="rounded"
          :class="noApply ? 'border-primary' : 'border-white'"
          @click="prevPhase"
        >
          <span
            class="material-symbols-outlined font-14 font-weight-bold"
            :class="noApply ? 'text-primary' : 'text-white'"
            >arrow_back_ios
          </span>
        </div>
        <div
          v-show="currentPhaseIndex < qtdPhases - 1"
          class="rounded"
          :class="noApply ? 'border-primary' : 'border-white'"
          @click="nextPhase"
        >
          <span
            class="material-symbols-outlined font-14 text-white font-weight-bold"
            :class="noApply ? 'text-primary' : 'text-white'"
            >arrow_forward_ios</span
          >
        </div>
      </div>
      <b-popover
        id="popover-controls"
        :disabled="true"
        variant="primary"
        target="controls-container"
        placement="bottom"
        title="Atenção"
      >
        Alguma aplicação contém dados, mas a fase do aluno não foi avaliada. Use as
        <b class="text-primary">setas de navegação</b> para voltar ou avançar. Avaliar a fase do
        aluno é obrigatório para o salvar os dados.
      </b-popover>
    </b-card-body>

    <b-modal
      ref="refModalConfirmPhaseChange"
      centered
      static
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      body-class="text-center"
    >
      <section v-if="currentPhase" class="text-center mb-2">
        <span
          class="material-symbols-outlined font-weight-bolder text-warning"
          style="font-size: 80px"
          >error</span
        >
        <h3 class="font-weight-bolder text-body mb-2">
          Você confirma essa avaliação para <br /><b class="text-primary">{{
            writingPhasesWritten.name
          }}</b>
          ?
        </h3>
        <div class="d-flex flex-column flex-md-row gap-2">
          <div class="text-center flex-1 px-2 py-1 d-flex flex-column">
            <h6 class="text-body font-weight-bolder">AVALIAÇÃO ATUAL:</h6>

            <span class="material-symbols-outlined mt-auto">stat_minus_3</span>
            <br />
            <b-badge v-if="!currentPhase.stage" variant="outline-na" pill> NÃO AVALIADO </b-badge>
            <BadgeStatus
              v-else
              :value="currentPhase.stage"
              enum="writingPhaseEnum"
              :pill="!currentPhase.stage"
              :badge-class="`whitespace-normal`"
            />
          </div>

          <div
            v-if="tempNewStage"
            class="h100 text-center flex-1 text-primary border-primary rounded px-2 py-1 d-flex flex-column"
          >
            <h6 class="text-primary font-weight-bolder">TROCAR POR:</h6>
            <span class="material-symbols-outlined mt-auto">stat_minus_3</span>
            <br />
            <BadgeStatus
              :value="tempNewStage"
              enum="writingPhaseEnum"
              :pill="false"
              :badge-class="`whitespace-normal`"
            />
          </div>
        </div>
      </section>
      <section class="d-flex justify-content-center w-100 gap-2 mb-1">
        <b-button variant="outline-danger" :disabled="loading" @click="handleCloseModalChangeStage">
          Cancelar
        </b-button>
        <b-button variant="primary" :disabled="loading" @click="handleChangeStage(tempNewStage)">
          <b-spinner v-show="loading" show small />
          Confirmar
        </b-button>
      </section>
    </b-modal>
  </b-card>
</template>

<style scoped lang="scss">
  .phase-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.3rem;

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      padding: 4px;
    }
  }
</style>
<style>
  #stages-change .dropdown-item.active,
  #stages-change .dropdown-item:active {
    background: rgba(115, 103, 240, 0.12);
  }
</style>