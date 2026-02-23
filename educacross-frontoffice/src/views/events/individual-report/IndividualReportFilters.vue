<template>
  <b-row v-if="!isTeacher" class="match-height h-full" align-v="stretch">
    <b-col cols="12" md>
      <b-card>
        <b-skeleton-wrapper :loading="loading">
          <template v-slot:loading>
            <b-row>
              <b-col cols="12" md="6">
                <b-skeleton type="text" class="w-100" height="50px" />
              </b-col>
              <b-col cols="12" md="6">
                <b-skeleton type="text" class="w-100" height="50px" />
              </b-col>
            </b-row>
          </template>
          <b-row>
            <b-col v-if="!isCoordinator" cols="12" md="6" class="mb-md-0 mb-2">
              <b-form-group :label="$t('schoolYear')" label-for="schoolYear">
                <ESelect
                  id="schoolYear"
                  label="name"
                  :value="serie"
                  :options="series"
                  :clearable="false"
                  @input="setEventSerie"
                >
                </ESelect>
              </b-form-group>
            </b-col>
            <b-col cols="12" :md="isCoordinator ? '12' : '6'" class="mb-md-0 mb-2">
              <b-form-group label="Turma" label-for="class-select">
                <select-infinity-scroll
                  :value="classeValue"
                  api="/v2/classes/label"
                  close-on-select
                  class="filter-chooser filter-items"
                  :father-params="classesParams"
                  :await-father-params="true"
                  select-first
                  :first-option="{ name: 'Todas as turmas', id: null }"
                  @input="setClasse"
                ></select-infinity-scroll>
              </b-form-group>
              <!-- <b-form-group :label="$t('selectClassLabel')" label-for="class">
                <ESelect
                  v-model="classValue"
                  :disabled="loading"
                  :options="classOptions"
                  name="class"
                  label="name"
                  placeholder="selectClassLabel"
                  :page="classPage"
                  :total-pages="classTotalPages"
                  :loading="loading"
                  paginated
                  searchable
                  @nextPage="fetchClass"
                >
                  <template v-slot:no-options> {{ $('noClassFound') }} </template>
                </ESelect>
              </b-form-group> -->
            </b-col>
          </b-row>
        </b-skeleton-wrapper>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectInfinityScroll from '@/components/selects/SelectInfinityScroll.vue'
import axiosIns from '@/libs/axios'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { useEvents } from '@/views/events/useEvents.js'
import { computed, ref, watch } from 'vue'
import vSelect from 'vue-select'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const { subject, classe } = useFilters()
const { series, serie, setEventSerie, serieId, setSerieId, setClassId, institutionId } =
  useEvents()

const role = store.getters.accessRole

const isCoordinator = role === 'Coordinator'
const isNetworkManager = role === 'NetworkManager'
const isTeacher = role === 'Teacher'

const classesParams = computed(() => {
  if (!serie && !isCoordinator) return null
  if (isNetworkManager && !institutionId.value) return null
  return {
    serieIds: serie.value?.id,
    InstitutionId: institutionId.value,
  }
})

const classeValue = ref({ name: 'Todas as turmas', id: null })

const loadingClasses = ref(false)
const classValue = ref(null)
const classApi = '/v2/classes/label'
const classPage = ref(1)
const classTotalPages = ref(1)
const classOptions = ref([])

const fetchClass = async (ctx = {}) => {
  if (!serie.value && !isCoordinator) return

  const { search, page } = ctx

  if (page === 1) classOptions.value = []

  loadingClasses.value = true

  const { data } = await axiosIns.get(classApi, {
    params: {
      subjectId: isTeacher ? subject.value.id : null,
      serieIds: serie.value?.id,
      page,
      pageSize: 5,
      ClassName: search,
    },
  })

  const options = data.data
  classOptions.value.push(...options)

  if (!classValue.value) {
    classValue.value = options[0]
  }

  classTotalPages.value = data.totalPages

  loadingClasses.value = false
}

const setClasse = value => {
  classeValue.value = value
  setClassId(value.id)
}

if (isTeacher) {
  setSerieId(classe.value.SerieId)
  setClassId(classe.value.ClassId)
}

watch([series], () => {
  if (series.value.length > 0 && !serieId.value) {
    if (!isTeacher && !isCoordinator) {
      setSerieId(series.value[0].id)
      setEventSerie(series.value[0])
    }
  }
})
</script>

<style lang="scss" scoped>
  #school-year {
    min-width: 120px;
  }
</style>