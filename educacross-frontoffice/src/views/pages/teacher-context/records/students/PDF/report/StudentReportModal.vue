<template>
  <section v-if="months.length">
    <div>
      <span class="font-11">Escolha uma área de conhecimento e seu respectivo módulo*</span>
      <div class="d-flex flex-column align-items-start gap-1">
        <SelectSubject full-width :show-label="false" />
        <ESelect
          v-model="moduleSelected"
          class="w-100 student-report-select"
          :options="schoolModule"
          label="name"
          :clearable="false"
        >
          <template #noOptions> Nenhum dado encontrado. </template>
        </ESelect>
      </div>
    </div>
    <div v-if="educationSystemList.length > 1 && filter.module === 11" class="mb-1">
      <span class="font-11">Escolha o Sistema de Ensino*</span>
      <ESelect
        v-model="educationSystemSelected"
        class="w-100 student-report-select"
        :options="educationSystemList"
        label="name"
        :clearable="false"
      >
        <template #noOptions> Nenhum dado encontrado. </template>
      </ESelect>
    </div>
    <div>
      <span class="font-11">Defina o período*</span>
      <ESelect
        v-model="monthSelected"
        class="mb-1 student-report-select"
        :options="months"
        label="name"
        :clearable="false"
      >
        <template #noOptions> Nenhum dado encontrado. </template>
      </ESelect>
    </div>

    <b-form-checkbox
      v-model="filter.averageClass"
      class="custom-control-primary mb-1"
      :value="true"
    >
      Incluir média da turma.
    </b-form-checkbox>

    <div class="d-flex flex-column flex-md-row justify-content-center gap-1">
      <b-col cols="12" md="6">
        <b-button class="w-100" variant="outline-danger" @click="closeModal"> Cancelar </b-button>
      </b-col>

      <b-col cols="12" md="6">
        <b-overlay
          :show="busy"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
          class="d-inline-block w-full"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="w-full"
            :disabled="busy"
            @click="generateStudentReport"
          >
            Gerar
          </b-button>
        </b-overlay>
      </b-col>
    </div>
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
import { ModulesEnum } from '@/consts/admin-context/enums/modules'
import { ACTION, PERMISSION } from '@/consts/permissions'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getEducationSystemInfo } from '@/services/shared/educationSystem/EducationSystem.Service'
import { getReportStudentReportCard } from '@/services/shared/reports/Report.service.js'
import useFilters from '@/store/filters/useFilters.js'
import { getMonthList } from '@/utils/date'
import { ref, computed, getCurrentInstance, onMounted } from 'vue'
import Ripple from 'vue-ripple-directive'

const props = defineProps({
  studentsIds: {
    type: Array,
    required: true,
  },
  dataModal: {
    type: Object,
  },
})

const emit = defineEmits(['close-modal'])

const { classe, subject, serie } = useFilters()
const vm = getCurrentInstance().proxy
const educationSystemList = ref([])
const educationSystem = ref(undefined)

const fullYear = new Date().getFullYear()

const months = getMonthList().map(item => ({
  ...item,
  name: `${item.name} de ${fullYear}`,
}))

const schoolModule = computed(() =>
  [
    {
      id: ModulesEnum.SchoolMissions,
      name: 'Missões da Escola',
      action: ACTION.READ,
      subject: PERMISSION.MODULE.SCHOOL_MISSIONS,
    },
    {
      id: ModulesEnum.EducationSystemsAchievementRanking,
      name: 'Sistema de Ensino',
      action: ACTION.READ,
      subject: PERMISSION.MODULE.EDUCATION_SYSTEMS,
    },
  ].filter(item => vm.$can(item.action, item.subject)),
)

const filter = ref({
  month: months[months.length - 1]?.id,
  module: schoolModule.value[0]?.id || null,
  educationSystemId: null,
  averageClass: false,
})

const busy = ref(false)

const generateStudentReport = async () => {
  busy.value = true
  let params = {}

  if (props.dataModal) {
    params = {
      ...filter.value,
      subjectId: subject.value?.id,
      classId: props.dataModal.classId,
      serieId: props.dataModal.serieId,
      studentsIds: props.studentsIds,
    }
  } else {
    params = {
      ...filter.value,
      subjectId: subject.value?.id,
      classId: classe.value?.ClassId,
      serieId: serie.value?.serieId,
      studentsIds: props.studentsIds,
    }
  }

  if (params.module !== ModulesEnum.EducationSystemsAchievementRanking) {
    delete params.educationSystemId
  }

  getReportStudentReportCard(params).then(res => {
    const students = res.data
    busy.value = false

    router.push({
      name: 'studentReportTeacher',
      params: {
        students,
        pdfTitle: 'Boletins',
        subjectId: subject.value?.id,
        average: filter.value.averageClass,
        month: `${months[filter.value.month - 1]?.name}`,
        module: filter.value.module,
      },
    })
  })
}

const fetchEducationSystems = () => {
  getEducationSystemInfo().then(response => {
    const { data } = response
    educationSystemList.value = data

    if (data.length) {
      educationSystem.value = data[0].id
      if (!filter.value.educationSystemId) {
        filter.value.educationSystemId = data[0].id
      }
    }
  })
}

const closeModal = () => {
  emit('close-modal')
}

onMounted(() => {
  fetchEducationSystems()
})

const moduleSelected = computed({
  get: () => {
    return schoolModule.value.find(m => m.id === filter.value.module) || null
  },
  set: val => {
    filter.value.module = val ? val.id : null
  },
})

const educationSystemSelected = computed({
  get: () => {
    return (
      educationSystemList.value.find(e => e.id === filter.value.educationSystemId) || null
    )
  },
  set: val => {
    filter.value.educationSystemId = val ? val.id : null
  },
})

const monthSelected = computed({
  get: () => {
    return months.find(m => m.id === filter.value.month) || null
  },
  set: val => {
    filter.value.month = val ? val.id : null
  },
})
</script>

<script>
export default {
  name: 'StudentReportModal',
  directives: {
    Ripple: () => import('vue-ripple-directive'),
  },
}
</script>

<style lang="scss" scoped>
  .student-report-select {
    ::v-deep .e-select-container {
      padding: 8px !important;
    }
  }
</style>
