<script setup>
import '@/@core/scss/vue/libs/vue-wizard.scss'
import ImportStudentsWizardStep1 from '@/views/pages/records/students/import/import-wizard/Step1.vue'
import ImportStudentsWizardStep2 from '@/views/pages/records/students/import/import-wizard/Step2.vue'
import ImportStudentsWizardStep3 from '@/views/pages/records/students/import/import-wizard/Step3.vue'
import { useImportStudents } from '@/views/pages/records/students/import/useImportStudents'
import { FormWizard, TabContent, WizardStep } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

const { refFormWizard, EStep, step } = useImportStudents()
</script>

<template>
  <FormWizard
    id="import-wizard"
    ref="refFormWizard"
    color="#7367F0"
    :title="null"
    :subtitle="null"
    :navigation="false"
    hide-buttons
    class="checkout-form-wizard steps-transparent h-100"
  >
    <TabContent title="Importação">
      <ImportStudentsWizardStep1 v-if="step === EStep.STEP_1" />
    </TabContent>
    <TabContent title="Validação">
      <ImportStudentsWizardStep2 v-if="step === EStep.STEP_2" />
    </TabContent>
    <TabContent title="Conclusão" class="h-100">
      <ImportStudentsWizardStep3 v-if="step === EStep.STEP_3" />
    </TabContent>
  </FormWizard>
</template>

<style>
  #import-wizard .wizard-tab-content {
    box-shadow: none !important;
    padding-top: 0.5rem;
    height: 90%;
  }

  #import-wizard .wizard-navigation {
    height: 90%;
  }

  #import-wizard .wizard-nav-pills {
    pointer-events: none;
    justify-content: center;
  }
</style>