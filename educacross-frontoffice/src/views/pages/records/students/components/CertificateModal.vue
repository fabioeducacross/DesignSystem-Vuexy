<template>
  <section v-if="months.length" id="certificate-modal">
    <form-wizard
      ref="refFormWizard"
      color="#7367F0"
      :title="null"
      :subtitle="null"
      :navigation="false"
      finish-button-text="Submit"
      back-button-text="Previous"
      hide-buttons
      class="checkout-form-wizard steps-transparent"
    >
      <tab-content title="Tipo" :before-change="beforeTabTypeSwitch">
        <b-row>
          <b-col cols="12">
            <label for="cerificate-type">Escolha o tipo de certificado *</label>
            <ESelect
              id="cerificate-type"
              v-model="certificateType"
              class="mb-1"
              :options="certificateTypeOptions"
              label="name"
              :clearable="false"
              :searchable="false"
            >
              <template #no-options> Nenhum dado encontrado. </template>
              <template #option="data">
                <span v-if="data.disabled">
                  {{ data.name }}
                  <b-badge pill variant="light-secondary">{{ data.disabledText }}</b-badge>
                </span>
                <span v-else>
                  {{ data.name }}
                </span>
              </template>
            </ESelect>
          </b-col>
          <b-col cols="12" md="6">
            <b-button block variant="outline-danger" @click="closeModal"> Cancelar </b-button>
          </b-col>
          <b-col v-if="certificateType.type === 1" cols="12" md="6">
            <b-button :disabled="busy" block variant="primary" @click="generateCertificate">
              <b-spinner v-if="busy" small class="mr-50" /> Gerar
            </b-button>
          </b-col>
          <b-col v-else cols="12" md="6">
            <b-button block variant="primary" @click="formWizardNextStep"> Próximo </b-button>
          </b-col>
        </b-row>
      </tab-content>

      <template v-if="certificateType.type === 2">
        <tab-content title="Módulo">
          <b-form-group
            :label="$t('Escolha uma área de conhecimento e seu respectivo módulo') + ' *'"
            label-for="subject"
          >
            <b-row>
              <b-col cols="auto">
                <SelectSubject :fetch-on-mounted="false" :show-label="false" />
              </b-col>
              <b-col cols>
                <ESelect
                  v-model="filter.module"
                  class="mb-1"
                  :options="schoolModule"
                  label="name"
                  :clearable="false"
                  :searchable="false"
                >
                  <template #no-options> Nenhum dado encontrado. </template>
                </ESelect>
              </b-col>
            </b-row>
          </b-form-group>

          <b-row>
            <b-col cols="12" md="6">
              <b-button block variant="outline-primary" @click="formWizardBackStep">
                Voltar
              </b-button>
            </b-col>

            <b-col cols="12" md="6">
              <b-button block variant="primary" @click="formWizardNextStep"> Próximo </b-button>
            </b-col>
          </b-row>
        </tab-content>
        <tab-content title="Período">
          <b-row>
            <b-col cols="12">
              <b-form-group :label="$t('Defina um período') + ' *'" label-for="months">
                <ESelect
                  v-model="filter.month"
                  class="mb-1"
                  :options="months"
                  label="name"
                  :clearable="false"
                  :searchable="false"
                >
                  <template #no-options> Nenhum dado encontrado. </template>
                </ESelect>
              </b-form-group>
            </b-col>
            <b-col v-if="showInfo" cols="12">
              <b-alert show variant="primary">
                <div class="alert-body font-normal">
                  <div class="d-flex align-items-center">
                    <span class="material-symbols-outlined mr-50" style="font-size: 16px">
                      info
                    </span>
                    <div class="flex-grow-1">
                      <span>
                        Você está gerando certificados de desempenho para o
                        <span class="font-bold">{{ name }}</span
                        >, no módulo de <span class="font-bold">{{ filter.module.name }}</span> de
                        <span class="font-bold">{{ subject.name }}</span
                        >, no período de <span class="font-bold">{{ filter.month.name }}</span
                        >. Tem certeza que deseja gerar?.
                      </span>
                    </div>
                  </div>
                </div>
              </b-alert>
            </b-col>
            <b-col cols="12" md="6">
              <b-button block variant="outline-primary" @click="formWizardBackStep">
                Voltar
              </b-button>
            </b-col>

            <b-col cols="12" md="6">
              <b-button
                :disabled="busy"
                block
                variant="primary"
                @click="prepareGenerateCertificate"
              >
                <b-spinner v-if="busy" small class="mr-50" /> Gerar
              </b-button>
            </b-col>
          </b-row>
        </tab-content>
      </template>
      <template #step="props">
        <wizard-step :tab="props.tab" :transition="props.transition" :index="props.index">
        </wizard-step>
      </template>
    </form-wizard>
  </section>
  <section v-else>
    <div class="d-flex justify-content-center">
      <img src="@/assets/images/pdf-progress/error.png" alt="" />
    </div>
    <div class="mt-4">
      <h3 class="h3 font-weight-normal text-center mb-1">
        O boletim é gerado no final do mês, retorne em Fevereiro.
      </h3>
      <div class="d-flex justify-content-center">
        <b-button class="my-1 btn-md" variant="primary" @click="closeModal"> OK </b-button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { can } from '@/@core/libs/acl/utils'
import '@/@core/scss/vue/libs/vue-wizard.scss'
import ESelect from '@/components/selects/ESelect.vue'
import { ModulesEnum } from '@/consts/admin-context/enums/modules.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getSubjectModules } from '@/services/shared/reports/Report.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date'
import { ref, watch, computed, getCurrentInstance } from 'vue'
import { FormWizard, TabContent, WizardStep } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

// Props
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})

// Emits
const emit = defineEmits(['close-modal'])

// Instance
const vm = getCurrentInstance().proxy

const { subject, fetchSubjectsWithParams, loading } = useFilters()

const isTeacher = store.getters.accessRole === 'Teacher'

const loadingSubject = ref(false)
const months = getMonthList()
const schoolModule = ref([])

const certificateTypeOptions = [
  {
    type: 1,
    name: 'Participação',
  },
]

if (vm.$can(ACTION.READ, PERMISSION.GENERAL.BETA_FEATURES)) {
  certificateTypeOptions.push({
    type: 2,
    name: 'Desempenho',
    disabled: !props.data.serieId,
    disabledText: 'Desabilitado. Para este relatório filtre apenas 1 (um) ano escolar.',
  })
}

const certificateType = ref(certificateTypeOptions[0])

const certificateTypeEnum = {
  1: {
    pdfTitle: 'Certificados de Participação',
    typeName: 'Participação',
  },
  2: {
    pdfTitle: 'Certificados de Desempenho',
    typeName: 'Desempenho',
  },
}

const filter = ref({
  month: months[months.length - 1],
  module: schoolModule.value[0] || {},
  averageClass: false,
})

const busy = ref(false)
const showInfo = ref(false)

// FORM WIZARD refs and actions
const refFormWizard = ref(null)
const formWizardBackStep = () => {
  showInfo.value = false
  refFormWizard.value.prevTab()
}
const formWizardNextStep = () => {
  refFormWizard.value.nextTab()
}

const closeModal = () => {
  emit('close-modal')
}

const fetchModules = () => {
  if (subject.value?.id) {
    getSubjectModules({
      SerieId: props.data.serieId,
      SubjectId: subject.value.id,
    }).then(({ data }) => {
      schoolModule.value = data.filter(
        item =>
          item.id === ModulesEnum.CustomMissions || item.id === ModulesEnum.EducationSystems,
      )
      filter.value.module = schoolModule.value[0] || null
    })
  }
}

const prepareGenerateCertificate = () => {
  if (!showInfo.value) {
    showInfo.value = true
  } else {
    generateCertificate()
  }
}

const generateCertificate = () => {
  const routeName = isTeacher ? 'certificates' : 'certificatesAdmin'
  router.push({
    name: routeName,
    params: {
      studentsIds: props.data.studentsIds,
      module: filter.value.module?.id,
      pdfTitle: certificateTypeEnum[certificateType.value.type].pdfTitle,
      subjectId: subject.value.id,
      month: filter.value.month.id,
      serieId: props.data.serieId,
      certificateType: certificateType.value.type,
      batchAction: props.data.batchAction,
      status: props.data.status,
      classId: props.data.classId,
    },
  })
}

watch(
  subject,
  () => {
    fetchModules()
  },
  { deep: true },
)

const name = computed(() =>
  props.data.studentName ? props.data.studentName : props.data.serieName,
)

const beforeTabTypeSwitch = () => {
  if (!loadingSubject.value && certificateType.value.type) {
    fetchSubjectsWithParams({
      serieId: props.data.serieId,
    })
    loadingSubject.value = true
  }
  return true
}
</script>

<style lang="scss">
  #certificate-modal {
    .vue-form-wizard .wizard-tab-content {
      padding-top: 0;
    }
    .wizard-tab-content {
      box-shadow: none;
      background-color: none;
      border-radius: 0;
    }
  }
</style>