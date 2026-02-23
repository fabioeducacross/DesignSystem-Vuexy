<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject />
      </b-col>
      <b-col cols="12" sm="12" md>
        <b-form-group label="Módulo" label-for="module">
          <MultipleDropdown
            :data="subjectModules"
            :loading="loadingSubjectModules"
            :selected="parentModule"
            :selected-children="childModule"
            empty-text="Sem módulos"
            @change="setSelectedModule"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" sm="12" md>
        <b-form-group label="Período" label-for="month">
          <ESelect
            id="month"
            v-model="period"
            :options="months"
            label="name"
            :clearable="false"
            :searchable="false"
            responsive
            @change="fetchDashboard"
          />
        </b-form-group>
      </b-col>

      <b-col
        v-if="isTeacher && $can(ACTION.READ, PERMISSION.MODULE.CUSTOM_MISSIONS)"
        cols="12"
        sm="12"
        md="2"
      >
        <b-form-group label-for="button">
          <template v-slot:label>
            <span class="d-none d-md-inline-block"> &nbsp;</span>
          </template>
          <div class="d-flex align-items-center justify-content-end">
            <b-button class="w-100" variant="primary" size="sm" @click="redirectToCustomMission">
              <div class="d-flex align-items-center justify-content-center gap-1">
                <span class="material-symbols-outlined">add_circle</span>
                <span class="font-bold">Nova Missão</span>
              </div>
            </b-button>
          </div>
        </b-form-group>
      </b-col>
    </b-row>

    <div class="w-100 d-flex flex-column flex-md-row justify-content-start gap-2">
      <span>Exibir:</span>
      <div class="d-flex align-items-center">
        <b-form-radio v-model="viewMode" name="viewMode" :value="1" class="radio-inline">
          <span class="text-body">Todos os alunos</span>
        </b-form-radio>
      </div>
      <div class="d-flex align-items-center">
        <b-form-radio v-model="viewMode" name="viewMode" :value="2" class="radio-inline">
          <span class="text-body">Somente alunos que jogaram</span>
        </b-form-radio>
      </div>
      <div class="d-flex align-items-center">
        <b-form-radio v-model="viewMode" name="viewMode" :value="3" class="radio-inline">
          <span class="text-body">Somente alunos que não jogaram</span>
        </b-form-radio>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'StudentDashboardFilter',
}
</script>

<script setup>
import {useDashboardStudents} from '../useDashboardStudents.js'
import ESelect from '@/components/selects/ESelect.vue'
import MultipleDropdown from '@/components/selects/MultipleDropdown.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { getMonthList } from '@/utils/date.js'
import { watch } from 'vue'

// Use Vue Router composables for reactivity
import { useRoute, useRouter } from 'vue-router/composables'
const route = useRoute()
const router = useRouter()

const { classe, institution, period, parentModule, childModule, subject } = useFilters()
const {
  loadingSubjectModules,
  subjectModules,
  viewMode,
  fetchSubjectModules,
  fetchDashboard,
  serieId,
} = useDashboardStudents()

if (!parentModule.value.id)
  parentModule.value = {
    id: null,
    name: 'Todos os módulos',
  }

const isTeacher = store.getters.accessRole === 'Teacher'

if (!isTeacher) {
  classe.value = { ClassId: route.params.classId }
  institution.value = { id: route.params.institutionId }
}

const setSelectedModule = (item, child) => {
  parentModule.value = item
  childModule.value = child
  fetchDashboard()
}

const months = [
  {
    id: null,
    name: 'Todo o período',
  },
  ...getMonthList(),
]

if (!period.value?.id) period.value = { id: null, name: 'Todo o período' }

const setMonth = month => {
  period.value = month
}

const redirectToCustomMission = () => {
  router.push({ name: 'newMissionsTeacher' })
}

watch(serieId, (next, prev) => {
  if (next !== prev) fetchSubjectModules()
})

watch(subject, () => {
  fetchDashboard()
})
</script>

<style lang="scss">
  #dropdown-button-subject-parent {
    .btn {
      padding: 0;
      border-color: #d8d6de !important;
    }
  }

  #dropdown-dropright-item-1 {
    .btn {
      border-color: transparent !important;
    }
  }
</style>

<style lang="scss" scoped>
  .select-subject-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
  }

  .select-subject-wrapper-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>