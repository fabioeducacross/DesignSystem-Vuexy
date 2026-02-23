<template>
  <b-card>
    <b-row>
      <b-col>
        <b-form-group :label="$t('Turma')" label-for="classes">
          <ESelect
            id="classes"
            label="name"
            :value="classe"
            :options="classes"
            :clearable="false"
            :loading="classesLoading"
            :disabled="classesLoading"
            :page="classesPage"
            :total-pages="classesTotalpages"
            paginated
            @input="setclasses"
            @nextPage="fetchClasses"
          >
            <template v-slot:no-options> {{ $t('classesNotFound') }} </template>
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import useFilters from '@/store/filters/useFilters.js'
import { useEducationSystemMission } from '@/views/pages/admin-context/reports/educationSystem/admin/mission/useEducationSystemMission.js'
import { ref, watch } from 'vue'

const { classe, subject } = useFilters()
const { fetch, serieId, fetchDetails } = useEducationSystemMission()

classe.value = { name: 'Todas as turmas', id: null }

const classesLoading = ref(true)
const classes = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const setclasses = value => {
  classe.value = value
  fetch()
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  if (!subject.value.id || !serieId.value) return
  try {
    const { data } = await getClassesV2Label({
      Page: classesPage.value,
      SubjectId: subject.value.id,
      SerieIds: [serieId.value],
    })

    const options = data.data

    if (classesPage.value === 1) {
      classes.value = [{ name: 'Todas as turmas', id: null }]
    }

    classes.value.push(...options)
    classesTotalpages.value = data.totalPages
    classesLoading.value = false
  } catch (error) {
    classes.value = []
  }
}

watch(serieId, () => {
  fetchClasses()
  fetch()
})

fetchDetails()
</script>

<style lang="scss" scoped></style>