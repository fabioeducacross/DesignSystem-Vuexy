<script setup>
import '@/@core/scss/vue/libs/vue-wizard.scss'
import ImportClassesWizardStep1 from '@/views/pages/records/classes/import/import-wizard/Step1.vue'
import ImportClassesWizardStep3 from '@/views/pages/records/classes/import/import-wizard/Step3.vue'
import { useImportClasses } from '@/views/pages/records/classes/import/useImportClasses'
import { FormWizard, TabContent, WizardStep } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

const { refFormWizard, EStep, step } = useImportClasses()
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
      <ImportClassesWizardStep1 v-if="step === EStep.STEP_1" />
    </TabContent>
    <TabContent title="Conclusão" class="h-100">
      <ImportClassesWizardStep3 v-if="step === EStep.STEP_2" />
    </TabContent>
  </FormWizard>
</template>

<style>
  #import-wizard .wizard-tab-content {
    box-shadow: none !important;
    padding-top: 0.5rem;
    height: 90% !important;
  }

  #import-wizard .wizard-navigation {
    height: 80vh !important;
  }

  #import-wizard .wizard-nav-pills {
    pointer-events: none;
    justify-content: center;
  }
</style>