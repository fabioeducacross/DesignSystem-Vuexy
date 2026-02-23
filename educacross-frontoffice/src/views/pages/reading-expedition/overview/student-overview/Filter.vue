<template>
  <section>
    <b-card>
      <b-row>
        <b-col cols="auto" md class="mb-1 mb-md-0">
          <div class="w-100 d-flex flex-md-row flex-col justify-content-start gap-2">
            <span>Escolha a forma de exibição:</span>
            <div class="d-flex align-items-center">
              <b-form-radio v-model="viewMode" name="viewMode" :value="1" class="radio-inline">
                <span class="text-body">Engajamento</span>
              </b-form-radio>
            </div>
            <div class="d-flex align-items-center">
              <b-form-radio v-model="viewMode" name="viewMode" :value="2" class="radio-inline">
                <span class="text-body">Desempenho</span>
              </b-form-radio>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row>
        <b-col>
          <b-form-group :label="$t('schoolYear')" label-for="schoolYear">
            <ESelect
              id="schoolYear"
              label="name"
              :value="serie"
              :options="schoolYearOptions"
              :clearable="false"
              :loading="schoolYearLoading"
              :disabled="schoolYearLoading"
              placeholder="selectOneSchoolYearLabel"
              @input="setSchoolYear"
            >
              <template v-slot:no-options> {{ $t('schoolYearNotFound') }} </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group :label="$t('Turmas')" label-for="classes">
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
  </section>
</template>

<script>
export default {
  name: 'OverviewFilter'
}
</script>

<script setup>
  import ESelect from '@/components/selects/ESelect.vue'
  import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
  import { getReadingExpeditionSeries } from '@/services/shared/reading-expedition/reading-expedition.service.js'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters'
  import { ref, watch } from 'vue'


const viewMode = ref(store.getters['readingExpeditionModuleOverviewStudentDetails/viewMode'])

const { classe, serie } = useFilters()

watch([viewMode], () => {
  store.commit('readingExpeditionModuleOverviewStudentDetails/viewMode', viewMode.value)
  store.commit('readingExpeditionModuleOverviewStudentDetails/reset')
  store.dispatch('readingExpeditionModuleOverviewStudentDetails/fetchDashboard').then(() => {
    store.dispatch('readingExpeditionModuleOverviewStudentDetails/fetch')
  })
})

// ano escolar
serie.value = {}
const schoolYearLoading = ref(true)
const schoolYearOptions = ref([])

const setSchoolYear = value => {
  serie.value = value
  fetchClasses({ fetch: true })
}

const fetchSchoolYear = async () => {
  schoolYearLoading.value = true

  try {
    const { data } = await getReadingExpeditionSeries()

    const options = data

    schoolYearOptions.value = options

    if (options.length) {
      setSchoolYear(options[0])
    } else {
      serie.value = null
      setNoClasses()
    }
  } catch (error) {
    schoolYearOptions.value = []
    setNoClasses(true)
  }

  schoolYearLoading.value = false
}

classe.value = { name: 'Todas as turmas', id: null }
const classesLoading = ref(false)
const classes = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const setclasses = value => {
  classe.value = value
  store.dispatch('readingExpeditionModuleOverviewStudentDetails/fetchDashboard').then(() => {
    store.dispatch('readingExpeditionModuleOverviewStudentDetails/fetch')
  })
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  if (!serie.value.id) {
    classesLoading.value = false
    return
  }

  try {
    const { data } = await getClassesV2Label({
      SerieIds: [serie.value.id],
      Page: classesPage.value,
    })

    const options = data.data

    if (classesPage.value === 1) {
      if (!options.length) {
        classesLoading.value = false
        setNoClasses()
        return
      }
      setclasses({ name: 'Todas as turmas', id: null })
      classes.value = [{ name: 'Todas as turmas', id: null }]
    }

    classes.value.push(...options)
    classesTotalpages.value = data.totalPages
    classesLoading.value = false
  } catch (error) {
    setNoClasses()
    classesLoading.value = false
  }
}

const setNoClasses = () => {
  classes.value = []
  classe.value = null
  store.dispatch('readingExpeditionModuleOverviewStudentDetails/fetchDashboard')
  store.dispatch('readingExpeditionModuleOverviewStudentDetails/fetch')
}

fetchSchoolYear()
</script>