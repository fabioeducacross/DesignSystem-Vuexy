<script setup>
import store from '@/store'
import ModuleWritingPhaseRegister from '@/store/pageModules/writing-phases/module-writing-phase-register'
import WritingPhaseRegisterInfo from '@/views/pages/writing-phases/components/Info.vue'
import WritingPhasesLegendEnum from '@/views/pages/writing-phases/components/WritingPhasesLegendEnum.vue'
import WritingPhaseRegisterPoints from '@/views/pages/writing-phases/writing-phase-register/Points.vue'
import WritingPhaseRegisterEvaluationStrip from '@/views/pages/writing-phases/writing-phase-register/Strip.vue'
import WritingPhaseRegisterTitle from '@/views/pages/writing-phases/writing-phase-register/Title.vue'
import WritingPhaseRegisterEvaluationRegister from '@/views/pages/writing-phases/writing-phase-register/form/Register.vue'
import { useWritingPhaseRegister } from '@/views/pages/writing-phases/writing-phase-register/useWritingPhaseResgister'
import { computed, onUnmounted } from 'vue'

const {
  module_name,
  loading,
  irregularPhases,
  qtdPhases,
  formEdited,
  currentPhase,
  getPhases,
  submit,
  goBack,
} = useWritingPhaseRegister()

if (!store.hasModule(module_name)) {
  store.registerModule(module_name, ModuleWritingPhaseRegister)
}

const currentPhaseIsValid = computed(
  () =>
    irregularPhases.value.findIndex(
      p => p.writingStagesTestId === currentPhase.value.writingStagesTestId,
    ) === -1,
)

getPhases()

onUnmounted(() => {
  store.commit(`${module_name}/reset`)
  store.unregisterModule(module_name)
})
</script>

<template>
  <section>
    <WritingPhaseRegisterInfo />
    <WritingPhaseRegisterTitle />
    <WritingPhaseRegisterEvaluationStrip />
    <WritingPhaseRegisterEvaluationRegister />
    <WritingPhaseRegisterPoints v-if="qtdPhases > 1" />
    <WritingPhasesLegendEnum />

    <portal to="fixed-sticky-footer-destination">
      <div class="bg-white p-1 d-flex justify-content-center gap-2">
        <b-button :disabled="loading" variant="outline-danger" @click="goBack"> Cancelar </b-button>
        <div id="button-submit">
          <b-button
            :disabled="loading || !formEdited || irregularPhases.length > 0"
            variant="primary"
            @click="submit"
          >
            Salvar alterações
            <b-spinner v-show="loading" small variant="white" />
          </b-button>
        </div>
        <b-tooltip target="button-submit" :disabled="irregularPhases.length === 0">
          {{
            currentPhaseIsValid
              ? 'Alguma aplicação contém dados, mas a fase do aluno não foi avaliada. Verifique para salvar.'
              : 'Avalie a fase do aluno para salvar.'
          }}
        </b-tooltip>
      </div>
    </portal>
  </section>
</template>