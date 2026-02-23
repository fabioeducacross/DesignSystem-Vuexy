<template>
  <section v-if="months.length">
    <h2 class="h2 font-weight-normal text-center mb-1">
      Escolha a área de conhecimento e o mês que deseja gerar o boletim
    </h2>

    <b-overlay
      :show="loading"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
      class="d-flex flex-column w-full"
    >
      <div class="mb-1">
        <SelectSubject full-width />
      </div>

      <ESelect
        v-model="filter.module"
        class="mb-1"
        :options="schoolModule"
        label="name"
        track-by="id"
        :clearable="false"
      >
        <template #noOptions> Nenhum dado encontrado. </template>
      </ESelect>

      <ESelect
        v-model="filter.month"
        class="mb-1"
        :options="months"
        label="name"
        :clearable="false"
      >
        <template #noOptions> Nenhum dado encontrado. </template>
      </ESelect>

      <b-form-checkbox
        v-model="filter.averageClass"
        class="custom-control-primary mb-1"
        :value="true"
      >
        Média da turma
      </b-form-checkbox>

      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        class="w-full"
        :disabled="busy"
        @click="generateStudentReport"
      >
        <b-spinner v-if="busy" small />

        Gerar
      </b-button>
    </b-overlay>
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
import ESelect from '@/components/selects/ESelect.vue'
import { ModulesEnum } from '@/consts/admin-context/enums/modules.js'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import {
  getSubjectModules,
  getReportStudentReportCard,
} from '@/services/shared/reports/Report.service.js'
import useFilters from '@/store/filters/useFilters.js'
import { getMonthList } from '@/utils/date'
import { ref, watch } from 'vue'
import Ripple from 'vue-ripple-directive'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['close-modal'])

const loading = ref(true)
const { institution, classe, subject } = useFilters()

classe.value = { ClassId: props.data.id }

const months = getMonthList()
const schoolModule = ref([])

const filter = ref({
  month: months[months.length - 1],
  module: schoolModule.value[0] || null,
  averageClass: false,
})

const busy = ref(false)

watch(subject, () => {
  if (subject.value?.id) {
    getSubjectModules({
      InstitutionId: institution.value.id,
      SubjectId: subject.value.id,
      SerieId: props.data.serie.id,
    }).then(({ data }) => {
      schoolModule.value = data.filter(
        item =>
          item.id === ModulesEnum.CustomMissions || item.id === ModulesEnum.EducationSystems,
      )
      filter.value.module = schoolModule.value[0] || null
      loading.value = false
    })
  }
})

const generateStudentReport = () => {
  busy.value = true

  const params = {
    AverageClass: filter.value.averageClass,
    Module: filter.value.module ? filter.value.module.id : null,
    Month: filter.value.month.id,
    SubjectId: subject.value.id,
    ClassId: props.data.id,
  }

  getReportStudentReportCard(params)
    .then(async res => {
      const students = res.data

      await router.push({
        name: 'studentReportTeacher',
        params: {
          students,
          pdfTitle: 'Boletins',
          subjectId: subject.value.id,
          average: filter.value.averageClass,
          month: `${filter.value.month.name} de ${new Date().getFullYear()}`,
          module: filter.value.module ? filter.value.module.id : null,
        },
      })
    })
    .finally(() => {
      busy.value = false
    })
}

const closeModal = () => {
  emit('close-modal')
}
</script>
