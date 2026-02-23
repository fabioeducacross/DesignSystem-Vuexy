<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getClassesV2 } from '@/services/shared/classes/Classes.service'
import { getEducationSystemSeriesLabel } from '@/services/shared/educationSystem/EducationSystem.Service'
import useFilters from '@/store/filters/useFilters'
import {useEducationSystemBooks} from '@/views/pages/teacher-context/educationSystem/books/useEducationSystemBooks'
import { ref, watch } from 'vue'

const emit = defineEmits(['filters'])

const { subject, institution, isAdmin, serie } = useFilters()
const { educationSystemId } = useEducationSystemBooks()

const yearFirstOption = { name: 'Todos os anos escolares', id: null }
const classesFirstOption = { name: 'Todas as turmas', id: null }

const loadingYears = ref(false)
const yearsOptions = ref([])
serie.value = yearFirstOption

const classesFilter = ref(classesFirstOption)

const loadingClasses = ref(false)
const classPage = ref(1)
const classTotalPages = ref(1)
const classesList = ref([])

const onlyInProgress = ref(false)

const changeSerie = value => {
  serie.value = value
  classPage.value = 1
  classesFilter.value = classesFirstOption

  emitFilter()
  getClasses()
}

const getSeries = () => {
  loadingYears.value = true
  getEducationSystemSeriesLabel(educationSystemId.value, {
    InstitutionId: institution.value.id,
    SubjectId: subject.value.id,
  })
    .then(({ data }) => {
      yearsOptions.value = data
      yearsOptions.value.unshift(yearFirstOption)
    })
    .finally(() => {
      loadingYears.value = false
    })
}

const classsNextPage = ctx => {
  classPage.value = ctx.page
  getClasses()
}

const getClasses = async () => {
  loadingClasses.value = true
  const response = await getClassesV2({
    institutionId: institution.value.id,
    subjectId: subject.value.id,
    serieIds: serie.value.id,
    Page: classPage.value,
  })

  if (response.status === 200) {
    if (classPage.value === 1) {
      classesList.value = [classesFirstOption]
      classTotalPages.value = response.data.totalPages
    }

    classesList.value = [...classesList.value, ...response.data.data]
  } else {
    classesList.value = []
    classPage.value = 1
  }

  loadingClasses.value = false
}

const emitFilter = () => {
  emit('filters', {
    SerieId: serie.value.id,
    ClassId: classesFilter.value.id,
    OnlyInProgress: onlyInProgress.value,
  })
}

if (isAdmin.value) {
  watch(subject, () => {
    getSeries()
  })
}
</script>

<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject :fetch-on-mounted="false" />
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Ano Escolar" label-for="school-year">
          <ESelect
            id="school-year"
            v-model="serie"
            :options="yearsOptions"
            :clearable="false"
            :searchable="false"
            :loading="loadingYears"
            :disabled="loadingYears"
            responsive
            @change="changeSerie"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Turma" label-for="classes">
          <ESelect
            id="classes"
            v-model="classesFilter"
            :options="classesList"
            :clearable="false"
            :searchable="false"
            :loading="loadingClasses"
            :disabled="loadingClasses"
            paginated
            :page="classPage"
            :total-pages="classTotalPages"
            @nextPage="classsNextPage"
            @change="emitFilter"
          >
            <template v-slot:no-options> Nenhuma turma encontrada</template>
            <template v-slot:selected-option="item">
              <div class="d-flex gap-2">
                <span>{{ item.name }}</span>
                <b-badge v-if="item.serie" pill variant="light-primary">
                  {{ item.serie.name }}
                </b-badge>
              </div>
            </template>
            <template v-slot:option="item">
              <div class="d-flex gap-2">
                <span>{{ item.name }}</span>
                <b-badge v-if="item.serie" pill variant="light-primary">
                  {{ item.serie.name }}
                </b-badge>
              </div>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" class="d-flex justify-content-end">
        <b-form-checkbox
          v-model="onlyInProgress"
          switch
          inline
          button-variant="primary"
          @change="emitFilter"
        >
          Exibir somente dados de missão em andamento.
        </b-form-checkbox>
      </b-col>
    </b-row>
  </b-card>
</template>
