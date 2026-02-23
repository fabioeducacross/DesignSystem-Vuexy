<template>
  <div id="stages-change" class="d-flex justify-content-center align-items-center">
    <b-dropdown
      v-if="$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
      variant="link"
      toggle-class="text-decoration-none p-0"
      no-caret
    >
      <template v-slot:button-content>
        <div
          v-if="!currentPhase.writingStages"
          class="d-flex align-items-center justify-content-center"
        >
          <b-badge
            v-if="$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
            variant="dashed-danger"
            :class="`text-uppercase px-2 py-25 d-flex align-items-center justify-content-center gap-1 cursor-pointer`"
          >
            <span :class="`material-symbols-outlined text-danger`" style="font-size: 12px">
              person_edit
            </span>
            AVALIAR
          </b-badge>
        </div>

        <div v-else class="cursor-pointer d-flex align-items-center justify-content-center">
          <BadgeStatus :pill="false" :value="currentPhase.writingStages" enum="writingPhaseEnum" />
        </div>
      </template>
      <b-dropdown-item
        v-for="(legend, index) in enumItems"
        :key="index"
        :active="legend.rule(currentPhase.writingStages)"
        @click="handleClickStage(legend)"
      >
        <b-badge :variant="`outline-${legend.variant}`" active pill>
          {{ legend.text }}
        </b-badge>
      </b-dropdown-item>
    </b-dropdown>

    <div v-else class="d-flex align-items-center justify-content-center">
      <BadgeStatus
        v-if="currentPhase.writingStages"
        :pill="false"
        :value="currentPhase.writingStages"
        enum="writingPhaseEnum"
      />
      <b-badge
        v-else
        pill
        :variant="`outline-na`"
        :class="`text-uppercase px-2 py-25 d-flex align-items-center justify-content-center gap-1`"
      >
        NÃO AVALIADO
      </b-badge>
    </div>

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
      <section class="text-center mb-2">
        <span
          class="material-symbols-outlined font-weight-bolder text-warning"
          style="font-size: 80px"
        >error</span>
        <h3 class="font-weight-bolder text-body mb-2">
          Você confirma essa avaliação para <br /><b class="text-primary">{{ studentName }}</b> ?
        </h3>
        <div class="d-flex flex-column flex-md-row gap-2">
          <div class="text-center flex-1 px-2 py-1 d-flex flex-column">
            <h6 class="text-body font-weight-bolder">AVALIAÇÃO ATUAL:</h6>

            <span class="material-symbols-outlined mt-auto">stat_minus_3</span>
            <br />
            <b-badge v-if="!currentPhase.writingStages" variant="outline-na" pill>
              NÃO AVALIADO
            </b-badge>

            <BadgeStatus
              v-else
              :value="currentPhase.writingStages"
              enum="writingPhaseEnum"
              :pill="!currentPhase.writingStages"
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
              :value="tempNewStage.id"
              enum="writingPhaseEnum"
              :pill="false"
              :badge-class="`whitespace-normal`"
            />
          </div>
        </div>
      </section>
      <section class="d-flex justify-content-center w-100 gap-2 mb-1">
        <b-button
          variant="outline-danger"
          :disabled="loadingChange"
          @click="handleCloseModalChangeStage"
        >
          Cancelar
        </b-button>
        <b-button variant="primary" :disabled="loadingChange" @click="handleChangeStage">
          <b-spinner v-show="loadingChange" show small />
          Confirmar
        </b-button>
      </section>
    </b-modal>
  </div>
</template>

<script setup>
import BadgeStatus from '@/components/badge/BadgeStatus.vue'
import { writingPhaseEnum } from '@/consts/legends/writingPhasesEnum'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { ref } from 'vue'

const props = defineProps({
  currentPhase: {
    type: Object,
    required: true,
  },
  studentName: {
    type: String,
  },
})
const emit = defineEmits(['change'])

const enumItems = writingPhaseEnum.slice(1, writingPhaseEnum.length)

const refModalConfirmPhaseChange = ref(null)
const tempNewStage = ref(null)
const loadingChange = ref(false)

const handleClickStage = value => {
  tempNewStage.value = value
  refModalConfirmPhaseChange.value.show()
}

const handleCloseModalChangeStage = () => {
  tempNewStage.value = null
  refModalConfirmPhaseChange.value.hide()
}

const handleChangeStage = () => {
  emit('change', tempNewStage.value.id)
  handleCloseModalChangeStage()
}
</script>

<style scoped>
  .badge-avaliar {
    border-style: dashed !important;
  }
</style>
<style>
  #stages-change .dropdown-item.active,
  #stages-change .dropdown-item:active {
    background: rgba(var(--primary), 0.12);
  }
</style>