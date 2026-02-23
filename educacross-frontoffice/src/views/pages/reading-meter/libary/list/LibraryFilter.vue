<template>
  <b-card>
    <b-row>
      <b-col cols="12">
        <b-form-group label="Ano Escolar" label-for="schoolYear">
          <ESelect
            :disabled="schoolYearLoading"
            :value="schoolYear"
            :options="schoolYearOptions"
            :page="schoolYearPage"
            :total-pages="schoolYearTotalpages"
            :loading="schoolYearLoading"
            name="schoolYear"
            placeholder="selectOneSchoolYearLabel"
            label="name"
            @input="setSchoolYear"
          >
            <template v-slot:no-options> {{ $t('schoolYearNotFound') }} </template>
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ReadingFluencyStatusEnum } from '@/consts/ReadingMeterEnum.js'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import store from '@/store'
import { computed, ref, onMounted } from 'vue'

// ano escolar
const schoolYear = computed(() => store.getters['ReadingMeterModule/schoolYear'])
const schoolYearLoading = ref(true)
const schoolYearOptions = ref([])
const schoolYearPage = ref(1)
const schoolYearTotalpages = ref(1)

const setSchoolYear = value => {
  store.commit('ReadingMeterModule/setSchoolYear', value)
  store.dispatch('ReadingMeterModule/fetchBookLibrary')
}

const fetchSchoolYear = async (ctx = {}) => {
  schoolYearLoading.value = true

  const { page } = ctx
  schoolYearPage.value = page || 1

  try {
    const { data } = await getSeries({
      Subjects: store.getters.GET_GLOBAL_SUBJECT_ID,
      Page: schoolYearPage.value,
    })

    const options = data.data

    if (schoolYearPage.value === 1 && !options.length) {
      schoolYearLoading.value = false
      return
    }

    if (schoolYearPage.value === 1) {
      options.unshift({ name: 'Todos', id: null })
      setSchoolYear(options[0])
    }

    schoolYearOptions.value = options
    schoolYearPage.value = data.page
    schoolYearTotalpages.value = data.totalPages
  } catch (error) {
    // setNoClasses(true)
  }

  schoolYearLoading.value = false
}

onMounted(() => {
  fetchSchoolYear()
})

// Status
const statusValue = computed(() => store.getters['ReadingMeterModule/status'])

const statusOptions = computed(() => {
  return [{ text: 'Todos', id: null }, ...ReadingFluencyStatusEnum]
})

const setStatus = value => {
  store.commit('ReadingMeterModule/setStatus', value)
  store.dispatch('ReadingMeterModule/fetchBookLibrary')
}
</script>