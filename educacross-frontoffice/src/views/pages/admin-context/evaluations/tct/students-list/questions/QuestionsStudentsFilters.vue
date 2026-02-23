<template>
  <section>
    <b-row class="match-height">
      <b-col cols="12" lg="auto">
        <b-card>
          <SelectSubject :fetch-on-mounted="false" />
        </b-card>
      </b-col>

      <b-col cols="12" lg>
        <b-card>
          <b-skeleton-wrapper :loading="isLoading">
            <template v-slot:loading>
              <b-skeleton type="text" class="w-100 mb-2" height="50px" />
            </template>
            <b-row class="mb-1">
              <b-col cols="12" md>
                <label for="educational-organization">Matriz/currículo</label>
                <ESelect
                  :value="selectedEducationalOrganizationId"
                  input-id="educational-organization"
                  :options="educationalOrganizationOptions"
                  label="name"
                  :loading="educationalOrganizationLoading"
                  :placeholder="
                    educationalOrganizationLoading || educationalOrganizationOptions.length
                      ? 'Selecione a matriz'
                      : 'Matriz não vinculada'
                  "
                  @change="setOrganization"
                >
                  <template v-slot:no-options> Matriz não vinculada </template>
                </ESelect>
              </b-col>
            </b-row>
            <div class="w-100 d-flex flex-row justify-content-start gap-2">
              <span>Escolha a forma de exibição da tabela:</span>
              <div class="d-flex align-items-center">
                <b-form-radio
                  v-model="exhibition"
                  name="exhibition"
                  :value="1"
                  class="radio-inline"
                >
                  <span class="text-body">Por questão</span>
                </b-form-radio>
              </div>
              <div class="d-flex align-items-center">
                <b-form-radio
                  v-model="exhibition"
                  name="exhibition"
                  :value="2"
                  class="radio-inline"
                >
                  <span class="text-body">Por aluno</span>
                </b-form-radio>
              </div>
            </div>
          </b-skeleton-wrapper>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getEvaluationEducationalOrganization } from '@/services/shared/evaluations/Evaluation.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import sortObjectListByKey from '@/utils/sort'
import { useEvaluation } from '@/views/pages/admin-context/evaluations/useEvaluation'
import { ref, watch } from 'vue'
import vSelect from 'vue-select'

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['input'])

const { detailsSerieId } = useEvaluation()
const evaluationId = router.currentRoute.params.evaluationId
const { subject } = useFilters()
const selectedEducationalOrganizationId = ref(null)
const educationalOrganizationLoading = ref(false)
const exhibition = ref(1)
const params = ref([])

const educationOrganizationFirstOption = {
  id: null,
  name: 'Todas as matrizes/currículos',
}
const educationalOrganizationOptions = ref([])

const emitFilter = () => {
  if (subject.value.id) {
    store.commit('evaluations/setSubjectId', subject.value.id)
    emit('input', {
      EducationalOrganization: selectedEducationalOrganizationId.value,
      SubjectId: subject.value.id,
      exhibition: exhibition.value,
    })
  }
}

const educationalOrganizationFetch = () => {
  educationalOrganizationLoading.value = true
  getEvaluationEducationalOrganization(evaluationId, {
    subjectId: subject.value.id,
    SerieId: detailsSerieId.value,
  })
    .then(response => {
      educationalOrganizationOptions.value = [
        educationOrganizationFirstOption,
        ...sortObjectListByKey(response.data, 'name'),
      ]
      selectedEducationalOrganizationId.value =
        educationalOrganizationOptions.value[0] || null
    })
    .finally(() => {
      educationalOrganizationLoading.value = false
      emitFilter()
    })
}

const setOrganization = value => {
  selectedEducationalOrganizationId.value = value
  emitFilter()
}

watch(subject, () => {
  educationalOrganizationFetch()
})

watch(exhibition, () => {
  emitFilter()
})
</script>