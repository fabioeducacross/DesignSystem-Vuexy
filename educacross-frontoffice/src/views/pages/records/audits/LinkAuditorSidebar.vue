<template>
  <b-sidebar
    :visible="isVisible"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    body-class="d-flex flex-column"
    width="400px"
    shadow
    no-close-on-backdrop
    no-close-on-esc
    backdrop
    no-header
    right
    @hidden="prepareToCancel"
    @shown="openSidebar"
  >
    <div v-if="!loading" class="d-flex flex-column flex-grow-1">
      <div
        class="d-flex justify-content-between align-items-center content-sidebar-header bg-white px-2 py-1"
      >
        <h6 class="mb-0">Vincular</h6>

        <span
          class="material-symbols-outlined cursor-pointer"
          style="font-size: 16px"
          @click="prepareToCancel"
        >
          close
        </span>
      </div>

      <section class="p-2">
        <b-form autocomplete="off" @submit.prevent>
          <b-form-group label="Auditor" label-for="class-name-input">
            <b-form-input
              id="class-name-input"
              v-model="form.name"
              v-b-tooltip.hover.top="'Não é possível editar esse campo.'"
              readonly
              type="text"
            />
          </b-form-group>

          <b-form-group label="E-mail do auditor" label-for="class-email-input">
            <b-form-input
              id="class-email-input"
              v-model="form.email"
              v-b-tooltip.hover.top="'Não é possível editar esse campo.'"
              type="text"
              readonly
            />
          </b-form-group>

          <b-form-group label="Avaliação selecionada" label-for="class-email-input">
            <b-form-input
              id="class-email-input"
              v-model="form.evaluationName"
              v-b-tooltip.hover.top="'Não é possível editar esse campo.'"
              type="text"
              readonly
            />
          </b-form-group>

          <b-form-group label="Escolas" label-for="school-select">
            <template v-slot:label>
              <span class="d-flex align-items-center">
                Escolas
                <b-icon
                  v-b-tooltip.hover.top="
                    'São elegíveis para vínculo apenas as escolas que fizeram a avaliação selecionada e ainda não foram vinculadas à um auditor.'
                  "
                  icon="info-circle"
                  class="ml-auto"
                />
              </span>
            </template>
            <ESelect
              id="school-select"
              :value="form.schools"
              :options="schoolOptions"
              :placeholder="'Selecione uma ou mais escolas'"
              :page="institutionFetchParams.Page"
              :total-pages="institutionFetchParams.TotalPages"
              :loading="loadingInstitutions"
              label="name"
              :clearable="true"
              multiple
              paginated
              use-portal-on-modal
              @next-page="fetchInstitutions"
              @change="setSchoolsSelected"
            >
              <template v-slot:noOptions>
                <span>Nenhuma Escola encontrada</span>
              </template>
              <template v-slot:allOptionsLabel> Selecionar todas </template>
              <template v-slot:option="{ name, disabled }">
                <span :style="{ opacity: disabled ? 0.5 : 1 }">
                  {{ name }}
                </span>
              </template>
            </ESelect>
          </b-form-group>
        </b-form>
      </section>
    </div>

    <b-overlay :show.sync="loading" no-wrap class="w-100 h-100"></b-overlay>

    <template v-slot:footer="{}">
      <div id="footer" class="d-flex align-items-center p-2 gap-2 justify-content-center">
        <b-button variant="outline-danger" @click="prepareToCancel"> Cancelar</b-button>
        <b-button variant="primary" @click="save">
          <b-spinner v-show="loadingAction" small variant="light" class="mr-50" />
          Salvar
        </b-button>
      </div>
    </template>
    <ModalConfirm
      v-model="openConfirmExit"
      :callback-confirm="cancel"
      icon-variant="orange"
      confirm-variant="danger"
      cancel-variant="outline-primary"
      label-confirm="Sair e perder"
    >
      <h4 class="text-body">Tem certeza que deseja sair?</h4>
      <p>
        <span class="text-primary font-bold">Suas ações não foram salvas.</span> Ao sair, você
        perderá as alterações realizadas.
      </p>
    </ModalConfirm>
  </b-sidebar>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { useEvaluationReport } from '@/views/pages/reading-meter-V2/evaluation-report/useEvaluationReport.js'
import { ref, watch, getCurrentInstance, reactive } from 'vue'

// Props
const props = defineProps({
  auditorData: {
    type: Object,
    required: false,
  },
})

const vm = getCurrentInstance().proxy

const {
  selectedEvaluation,
  assingAuditorToSchool,
  getEvaluationAudits,
  fetchInstitutionsFromEvaluation,
} = useEvaluationReport()

const defaultForm = () => ({
  evaluationName: '',
  name: '',
  email: '',
  schools: [],
})

const institutionFetchParams = reactive({
  Page: 0,
  TotalPages: 0,
  PageSize: 10,
})
const loadingInstitutions = ref(true)

const loading = ref(false)
const busy = ref(true)
const loadingAction = ref(false)

const openConfirmExit = ref(false)

const form = ref(defaultForm())
const isVisible = ref(false)

const schoolOptions = ref([])

const resetForm = () => {
  Object.assign(form.value, defaultForm())
}
const closeSidebar = () => {
  isVisible.value = false
  vm.$bus.emit('showConfirmExit', false)

  schoolOptions.value = []
  institutionFetchParams.Page = 0
  institutionFetchParams.TotalPages = 0

  resetForm()
}

const prepareToCancel = () => {
  if (form.value.schools.length > 0) {
    openConfirmExit.value = true
  } else {
    closeSidebar()
  }
}

const cancel = () => {
  closeSidebar()
  openConfirmExit.value = false
}

const setSchoolsSelected = value => {
  if (Array.isArray(value)) {
    form.value.schools = value
  } else if (value && typeof value === 'object') {
    form.value.schools = [value]
  } else {
    form.value.schools = []
  }

  if (form.value.schools.length > 0) {
    vm.$bus.emit('showConfirmExit', true)
    busy.value = false
  } else {
    vm.$bus.emit('showConfirmExit', false)
    busy.value = true
  }
}

const save = async () => {
  loadingAction.value = true
  const params = {
    auditorId: props.auditorData.id,
    institutionsIds: form.value.schools.map(school => school.id),
  }
  try {
    await assingAuditorToSchool(params)
  } finally {
    closeSidebar()
    getEvaluationAudits()
    loadingAction.value = false
  }
}

const fetchInstitutions = async (ctx = {}) => {
  institutionFetchParams.Page = ctx.page

  loadingInstitutions.value = true
  const { data } = await fetchInstitutionsFromEvaluation(
    selectedEvaluation.value,
    institutionFetchParams,
  )
  let apiInstitutions = data.data

  const auditorInstitutions = props.auditorData.institutions

  apiInstitutions = apiInstitutions.map(institution => {
    if (
      auditorInstitutions.some(auditorInstitution => auditorInstitution.id === institution.id)
    ) {
      // Remove disable to allow proper display of already linked institutions on ESelect
      return {
        name: institution.name,
        id: institution.id,
      }
    }

    return {
      name: institution.name,
      id: institution.id,
      disabled: !institution.enabled,
    }
  })

  schoolOptions.value.push(...apiInstitutions)
  institutionFetchParams.TotalPages = data.totalPages

  loadingInstitutions.value = false
}

const openSidebar = async () => {
  await fetchInstitutions()

  form.value.schools = props.auditorData.institutions
}

watch(
  () => props.auditorData,
  async newValue => {
    if (!newValue.id) return

    loading.value = true

    resetForm()

    form.value.email = newValue.email
    form.value.name = newValue.name
    form.value.evaluationName = newValue.evaluationName

    isVisible.value = true
    loading.value = false
  },
)

</script>

<style lang="scss" scoped>
  #footer {
    border-top: 1px #d3d3d3 solid;
  }
</style>