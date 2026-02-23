<template>
  <b-row class="match-height h-full" align-v="stretch">
    <b-col cols="12" md="auto">
      <b-card>
        <SelectSubject :fetch-on-mounted="false" />
      </b-card>
    </b-col>
    <b-col cols="12" md>
      <b-card>
        <b-skeleton-wrapper :loading="loading">
          <template v-slot:loading>
            <b-row>
              <b-col cols="12" md="3">
                <b-skeleton type="text" class="w-100" height="50px" />
              </b-col>
              <b-col cols="12" md="3">
                <b-skeleton type="text" class="w-100" height="50px" />
              </b-col>
              <b-col cols="12" md="3">
                <b-skeleton type="text" class="w-100" height="50px" />
              </b-col>
              <b-col cols="12" md="3">
                <b-skeleton type="text" class="w-100" height="50px" />
              </b-col>
            </b-row>
          </template>
          <b-row>
            <b-col cols="12" md="auto">
              <b-form-group label="Ano escolar" label-for="school-year">
                <ESelect
                  id="school-year"
                  v-model="schoolYear"
                  :options="schoolYears"
                  label="name"
                  :clearable="false"
                  :searchable="false"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md>
              <b-form-group label="Livro" label-for="subject-select">
                <ESelect
                  v-model="book"
                  name="subject-select"
                  :options="bookOptions"
                  placeholder="Selecione o livro"
                  :close-on-select="true"
                  paginated
                  :total-pages="bookTotalPages"
                  :page="bookCurrentPage"
                  :loading="loadingBooks"
                  @nextPage="handleBookNextPage"
                >
                  <template v-slot:noOptions>
                    <span>Nenhum livro encontrado</span>
                  </template>
                  <template v-slot:option="item">
                    <div>
                      <span class="mr-50"> {{ item.name }} </span>
                      <b-badge pill variant="light-primary">{{ item.serieName }}</b-badge>
                    </div>
                  </template>
                </ESelect>
              </b-form-group>
            </b-col>
            <b-col cols="12" md>
              <b-form-group label="Missão" label-for="mission">
                <ESelect
                  v-model="missionFilter"
                  name="mission"
                  :options="missionOptions"
                  paginated
                  :total-pages="missionsTotalPages"
                  :page="missionsCurrentPage"
                  :loading="loadingMissions"
                  placeholder="Selecione a missão"
                  :close-on-select="true"
                >
                  <template v-slot:noOptions>
                    <span>Nenhuma missão encontrada</span>
                  </template>
                </ESelect>
              </b-form-group>
            </b-col>
            <b-col cols="12" md>
              <b-form-group label="Grupo de Escolas" label-for="network-group">
                <ESelect
                  id="network-group"
                  v-model="networkGroupFilter"
                  :options="networkGroups"
                  label="name"
                  :clearable="false"
                  :searchable="false"
                  responsive
                />
              </b-form-group>
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
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import axiosIns from '@/libs/axios'
import router from '@/router'
import { getEducationSystemSeriesLabel } from '@/services/shared/educationSystem/EducationSystem.Service'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { debounce } from 'lodash'
import { computed, ref, watch } from 'vue'
import vSelect from 'vue-select'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['input'])

const { subject, fetchSubjectsWithParams, moduleId } = useFilters()

const educationSystemId = router.currentRoute.params.educationSystemId
const institutionId = router.currentRoute.params.institutionId

fetchSubjectsWithParams({
  institutionId,
  moduleId: moduleId.value,
  educationSystemId,
})

const schoolYears = ref([])
const schoolYear = computed({
  get() {
    return store.getters['educationSystemReportTabsRoot/year']
  },
  set(val) {
    store.commit('educationSystemReportTabsRoot/setYear', val)

    bookTotalPages.value = 1
    bookCurrentPage.value = 1
    bookSearch.value = ''

    getBooks()
  },
})

const networkGroups = ref([])
const networkGroupFilter = ref({ name: 'Todos', id: null })

const missionFilter = computed({
  get() {
    return store.getters['educationSystemReportTabsRoot/mission']
  },
  set(val) {
    store.commit('educationSystemReportTabsRoot/setMission', val)
  },
})
const missionOptions = ref([])
const loadingMissions = ref(false)
const missionsTotalPages = ref(1)
const missionsCurrentPage = ref(1)
const missionSearch = ref('')

const getMissions = async () => {
  loadingMissions.value = true

  const { data } = await axiosIns.get(
    `/v1/educationsystems/${educationSystemId}/guides/label`,
    {
      params: {
        SubjectId: subject.value.id,
        BookId: book.value.id || null,
        SerieId: schoolYear.value.id || null,
        page: missionsCurrentPage.value,
        search: missionSearch.value,
      },
    },
  )

  loadingMissions.value = false
  if (data.data.length === 0 && missionsCurrentPage.value === 1) {
    missionOptions.value = []
    return
  }

  if (missionsCurrentPage.value === 1) {
    missionOptions.value = []
    missionOptions.value.push({ name: 'Todas', id: null })
  }

  missionsTotalPages.value = data.totalPages
  missionOptions.value.push(...data.data)
}
const handleMissionNextPage = async ctx => {
  missionsCurrentPage.value = ctx.page
  missionSearch.value = ctx.search
  await getMissions()
}

const bookTotalPages = ref(1)
const bookCurrentPage = ref(1)
const loadingBooks = ref(false)
const bookSearch = ref('')

const book = computed({
  get() {
    return store.getters['educationSystemReportTabsRoot/book']
  },
  set(val) {
    store.commit('educationSystemReportTabsRoot/setBook', val)

    missionSearch.value = ''
    missionsCurrentPage.value = 1
    missionsTotalPages.value = 1
    getMissions()
  },
})

const bookOptions = ref([])

const getBooks = async () => {
  loadingBooks.value = true
  const { data } = await axiosIns.get('/v1/books', {
    params: {
      EducationSystemId: educationSystemId,
      SubjectId: subject.value.id,
      SerieId: schoolYear.value.id || null,
      page: bookCurrentPage.value,
      search: bookSearch.value,
    },
  })

  loadingBooks.value = false
  if (data.data.length === 0 && bookCurrentPage.value === 1) {
    bookOptions.value = []
    await getMissions()
    return
  }

  if (bookCurrentPage.value === 1) {
    bookOptions.value = []
    bookOptions.value.push({ name: 'Todos', id: null })
  }

  bookTotalPages.value = data.totalPages
  bookOptions.value.push(...data.data)
}

const handleBookNextPage = async ctx => {
  bookCurrentPage.value = ctx.page
  bookSearch.value = ctx.search

  await getBooks()
}

const getSeries = () => {
  if (subject.value.id) {
    getEducationSystemSeriesLabel(educationSystemId, {
      SubjectId: subject.value.id,
    }).then(({ data }) => {
      schoolYears.value = data
      schoolYears.value.unshift({ name: 'Todos', id: null })
    })
  }
}

const emitFilter = debounce(() => {
  emit('input', {
    InstitutionId: institutionId,
    SubjectId: subject.value.id || null,
    SerieId: schoolYear.value.id || null,
    BookId: book.value.id || null,
    GuideId: missionFilter.value.id || null,
    NetworkGroupId: networkGroupFilter.value?.id || null,
  })
}, 100)

const fetchNetworkGroups = () => {
  getNetworkGroups().then(response => {
    networkGroups.value = response.data
    networkGroups.value.unshift({
      id: null,
      name: 'Todos',
    })
  })
}

fetchNetworkGroups()

watch(subject, () => {
  schoolYear.value = { name: 'Todos', id: null }
  book.value = { name: 'Todos', id: null }
  missionFilter.value = { name: 'Todas', id: null }
  getSeries()
})

watch([schoolYear, book], ([newSchoolYear, newBook], [oldSchoolYear, oldBook]) => {
  if (newSchoolYear.id !== oldSchoolYear.id) {
    if (book.value.id) {
      book.value = { name: 'Todos', id: null }
    } else {
      missionFilter.value = { name: 'Todos', id: null }
    }
  } else if (newBook.id !== oldBook.id) {
    missionFilter.value = { name: 'Todos', id: null }
  }
})

watch(networkGroupFilter, (oldValue, newValue) => {
  if (!newValue.id && !oldValue.id) return
  emitFilter()
})

watch(missionFilter, () => {
  emitFilter()
})

</script>

<style lang="scss" scoped>
#school-year {
  min-width: 120px;
}
</style>