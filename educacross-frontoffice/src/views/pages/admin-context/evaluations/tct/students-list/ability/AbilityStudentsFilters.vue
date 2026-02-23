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
              <b-row>
                <b-col cols="12" md="4">
                  <b-skeleton type="text" class="w-100" height="64px" />
                </b-col>
                <b-col cols="12" md="4">
                  <b-skeleton type="text" class="w-100" height="64px" />
                </b-col>
                <b-col cols="12" md="4">
                  <b-skeleton type="text" class="w-100" height="64px" />
                </b-col>
              </b-row>
            </template>

            <b-row>
              <b-col cols="12" md="4">
                <label for="school-group">Matriz/currículo</label>
                <ESelect
                  v-model="selectedEducationalOrganizationId"
                  :options="educationalOrganizationOptions"
                  label="name"
                  :loading="educationalOrganizationLoading"
                  :placeholder="
                    educationalOrganizationLoading || educationalOrganizationOptions.length
                      ? 'Selecione a matriz'
                      : 'Matriz não vinculada'
                  "
                  @change="setEducationalOrganization"
                />
              </b-col>
              <b-col cols="12" md="4">
                <label for="school-group">Temática</label>
                <ESelect
                  v-model="selectedKnowledgeAxes"
                  :options="knowledgeAxesOptions"
                  label="name"
                  :loading="knowledgeAxesLoading"
                  placeholder="Selecione a temática"
                />
              </b-col>
              <b-col cols="12" md="4">
                <label for="school-student">Aluno</label>
                <ESelect
                  v-model="selectedstudent"
                  :options="classOptions"
                  label="name"
                  placeholder="Selecione o aluno"
                  :loading="loadingClass"
                  :total-pages="classTotalPages"
                  :page="classPage"
                  paginated
                  @nextPage="fetchClassData"
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
import SelectInfinityScroll from '@/components/selects/SelectInfinityScroll.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import {
  getEvaluationEducationalOrganization,
  getEvaluationStudentsLabel,
} from '@/services/shared/evaluations/Evaluation.Service.js'
import { getKnowledgeaxesFilterOptions } from '@/services/teacher-context/knowledgeaxes/Knowledgeaxes.service.js'
import useFilters from '@/store/filters/useFilters'
import sortObjectListByKey from '@/utils/sort'
import { useEvaluation } from '@/views/pages/admin-context/evaluations/useEvaluation'
import { ref, watch, computed } from 'vue'
import vSelect from 'vue-select'

// Props
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  examesOptions: {
    type: Array,
    required: false,
  },
})

// Emits
const emit = defineEmits(['input'])

const { subject, classe } = useFilters()
const { detailsSerieId } = useEvaluation()

const evaluationId = router.currentRoute.params.evaluationId
const classId = router.currentRoute.params.classId || classe.value.ClassId

const classesParams = computed(() => {
  return {
    id: evaluationId,
    ClassId: classId,
  }
})

const educationOrganizationFirstOption = {
  id: null,
  name: 'Todas as matrizes/currículos',
}
const selectedEducationalOrganizationId = ref(null)
const educationalOrganizationOptions = ref([])
const educationalOrganizationLoading = ref(false)

const selectedKnowledgeAxes = ref({ name: 'Todas as temáticas', id: null })
const knowledgeAxesOptions = ref([])
const knowledgeAxesLoading = ref(true)

const selectedstudent = ref({
  id: null,
  name: 'Todos os alunos',
})
const params = ref([])

const emitFilter = () => {
  emit('input', {
    EducationalOrganizationId: selectedEducationalOrganizationId.value?.id,
    StudentId: selectedstudent.value.id || null,
    SubjectId: subject.value.id,
    KnowledgeAxisId: selectedKnowledgeAxes.value.id || null,
  })
}

const setEducationalOrganization = () => {
  getKnowledgeaxesOptions()
}

watch(selectedstudent, (newVal, oldVal) => {
  if (newVal.id !== oldVal.id) {
    emitFilter()
  }
})

watch(selectedKnowledgeAxes, (newVal, oldVal) => {
  if (newVal.id !== oldVal.id) {
    emitFilter()
  }
})

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

      selectedEducationalOrganizationId.value = educationalOrganizationOptions.value[0]
    })
    .finally(() => {
      educationalOrganizationLoading.value = false
      getKnowledgeaxesOptions()
    })
}

watch(subject, () => {
  educationalOrganizationFetch()
})

const getKnowledgeaxesOptions = () => {
  knowledgeAxesLoading.value = true
  getKnowledgeaxesFilterOptions({
    educationalOrganizationId: selectedEducationalOrganizationId.value?.id,
  }).then(response => {
    knowledgeAxesOptions.value = [{ name: 'Todas as temáticas', id: null }, ...response.data]
    selectedKnowledgeAxes.value = knowledgeAxesOptions.value[0]
    knowledgeAxesLoading.value = false
    emitFilter()
  })
}

// Todas as temáticas

const classOptions = ref([])
const classPage = ref(1)
const classTotalPages = ref(1)
const loadingClass = ref(true)

const PER_PAGE_DEFAULT = 10

const fetchClassData = async (ctx = {}) => {
  const { search, page } = ctx
  classPage.value = page
  loadingClass.value = true

  const { data } = await getEvaluationStudentsLabel(evaluationId, {
    page: classPage.value,
    search,
    pageSize: PER_PAGE_DEFAULT,
    ...classesParams.value,
  })

  classTotalPages.value = data.totalPages

  if (classPage.value === 1) {
    classOptions.value = []
    classOptions.value.push({ name: 'Todos os alunos', id: null })
  }

  classOptions.value.push(...data.data)
  loadingClass.value = false
}
</script>