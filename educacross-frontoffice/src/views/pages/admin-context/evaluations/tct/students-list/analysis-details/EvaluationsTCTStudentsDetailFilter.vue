<template>
  <b-row class="match-height">
    <b-col cols="12" lg="auto">
      <b-card>
        <!-- <ExamesFilterRequired :value="subjectId" :data="examesOptions" @input="setSubjectId" /> -->
        <SelectSubject :fetch-on-mounted="false" />
      </b-card>
    </b-col>
    <b-col cols="12" lg>
      <b-card>
        <b-row>
          <!-- This is where the v-select will be -->

          <b-col cols="12" md>
            <b-form-group label="Selecione a matriz" label-for="school-group">
              <ESelect
                id="school-group"
                v-model="selectedEducationalOrganization"
                :options="educationalOrganizationOptions"
                label="name"
                :clearable="false"
                :searchable="false"
                :loading="loading"
                :placeholder="
                  loading || educationalOrganizationOptions.length
                    ? 'Selecione a matriz'
                    : 'Matriz não vinculada'
                "
                @input="setEducationalOrganizationId"
              >
                <template #noOptions> Matriz não vinculada </template>
              </ESelect>
            </b-form-group>
          </b-col>

          <!-- This is where the b-button will be -->
          <b-col cols="12" md="auto">
            <b-form-group label-for="button">
              <template v-slot:label> &nbsp;</template>
              <span v-b-tooltip.hover.top="`Esta funcionalidade não está disponível no momento`">
                <b-button variant="primary" disabled class="d-flex align-items-center gap-2">
                  <span class="material-symbols-outlined" style="font-size: 14px"> lock </span>Gerar
                  revisão automática
                </b-button>
              </span>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getEvaluationEducationalOrganization } from '@/services/shared/evaluations/Evaluation.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import sortObjectListByKey from '@/utils/sort'
import ExamesFilterRequired from '@/views/pages/admin-context/evaluations/components/ExamesFilterRequired'
import { useEvaluation } from '@/views/pages/admin-context/evaluations/useEvaluation'
import { computed, ref, watch } from 'vue'

const emit = defineEmits(['input'])

const { detailsSerieId } = useEvaluation()
const educationalOrganizationOptions = ref([])

const { subject, subjects } = useFilters()
const examesOptions = computed(() => [...store.getters['evaluations/exames']])

const educationalOrganizationDefaultOption = {
  id: null,
  name: 'Todas as matrizes/currículos',
}
const selectedEducationalOrganization = ref(educationalOrganizationDefaultOption)

const fetchEvaluationEducationalOrganization = () => {
  getEvaluationEducationalOrganization(router.currentRoute.params.evaluationId, {
    subjectId: subject.value.id,
    SerieId: detailsSerieId.value,
  }).then(response => {
    educationalOrganizationOptions.value = [
      educationalOrganizationDefaultOption,
      ...sortObjectListByKey(response.data, 'name'),
    ]

    setEducationalOrganizationId(educationalOrganizationOptions.value[0])
  })
}

const setSubjectId = () => {
  const subjectId = subject.value.id
  store.commit('evaluations/setSubjectId', subjectId)
  fetchEvaluationEducationalOrganization()
}

const educationalOrganizationId = computed(
  () => store.getters['EvaluationTCTStudentsDetail/filters'].educationalOrganizationId,
)

const setEducationalOrganizationId = (selected = selectedEducationalOrganization.value) => {
  selectedEducationalOrganization.value = selected

  emit('input', {
    educationalOrganization: selectedEducationalOrganization.value,
    subjectId: subject.value.id,
  })

  store.commit('EvaluationTCTStudentsDetail/filters', {
    educationalOrganizationId: selectedEducationalOrganization.value.id,
  })

  store.dispatch('EvaluationTCTStudentsDetail/fetchData')
}

watch(subject, () => {
  setSubjectId()
})

watch(examesOptions, () => {
  subjects.value = examesOptions.value
})

const loading = computed(() => store.getters['EvaluationTCTStudentsDetail/loading'])
</script>
