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
                <b-form-group label="Prova" label-for="evaluation">
                  <ESelect
                    :value="selectedSerie"
                    :options="evaluationSeries"
                    @change="setSelectedSeries"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md>
                <label for="educational-organization">Matriz/currículo</label>
                <ESelect
                  v-model="selectedEducationalOrganizationId"
                  input-id="educational-organization"
                  :options="educationalOrganizationOptions"
                  label="name"
                  :clearable="false"
                  :searchable="false"
                  :loading="educationalOrganizationLoading"
                  responsive
                  :placeholder="
                    educationalOrganizationLoading || educationalOrganizationOptions.length
                      ? 'Selecione a matriz'
                      : 'Matriz não vinculada'
                  "
                >
                  <template #no-options> Matriz não vinculada </template>
                </ESelect>
              </b-col>
              <b-col cols="12" md>
                <label for="school-group">Grupo de Escolas</label>
                <ESelect
                  id="school-group"
                  label="name"
                  :value="networkGroup"
                  :options="networkGroups"
                  :clearable="false"
                  @input="setNetworkGroups"
                >
                </ESelect>
              </b-col>
            </b-row>
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
import { getNetworkGroupsEvaluationNetworkManager } from '@/services/shared/network-groups/NetworkGroups.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import sortObjectListByKey from '@/utils/sort'
import { useEvaluation } from '@/views/pages/admin-context/evaluations/useEvaluation'
import { ref, watch } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['input'])

const { evaluationSeries } = useEvaluation()
const selectedSerie = ref(null)

const evaluationId = router.currentRoute.params.evaluationId
const { subject, networkGroup } = useFilters()
const selectedEducationalOrganizationId = ref(null)

const educationalOrganizationLoading = ref(false)

const params = ref([])

const educationalOrganizationFirstOption = {
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
      NetworkGroupId: networkGroup.value.id || null,
      SerieId: selectedSerie.value.id,
    })
  }
}

watch([selectedEducationalOrganizationId], () => {
  emitFilter()
})

const educationalOrganizationFetch = () => {
  educationalOrganizationLoading.value = true
  getEvaluationEducationalOrganization(evaluationId, {
    subjectId: subject.value.id,
    SerieId: selectedSerie.value.id,
  })
    .then(response => {
      educationalOrganizationOptions.value = [
        educationalOrganizationFirstOption,
        ...sortObjectListByKey(response.data, 'name'),
      ]
      selectedEducationalOrganizationId.value = educationalOrganizationOptions.value[0]
      emitFilter()
    })
    .finally(() => {
      educationalOrganizationLoading.value = false
    })
}

watch(subject, () => {
  educationalOrganizationFetch()
})

const networkGroups = ref([])

getNetworkGroupsEvaluationNetworkManager(evaluationId).then(response => {
  networkGroups.value = response.data
  networkGroups.value.unshift({
    id: null,
    name: 'Todos os grupos',
  })
  networkGroup.value = networkGroups.value[0]
})

const setNetworkGroups = value => {
  networkGroup.value = value
  emitFilter()
}

const setSelectedSeries = value => {
  selectedSerie.value = value
  educationalOrganizationFetch()
}

watch(evaluationSeries, newValue => {
  selectedSerie.value = newValue[0]
})
</script>
