<script>
export default {
  name: 'EducationSystemRankingFilter',
}
</script>

<script setup>
import ExpandableFilterArea from '@/components/filter/ExpandableFilterArea.vue'
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getClassesV2 } from '@/services/shared/classes/Classes.service'
import {
  getEducationSystemGuidesLabel,
  getEducationSystemSeriesLabel,
} from '@/services/shared/educationSystem/EducationSystem.Service.js'
import { getBooks } from '@/services/teacher-context/books/Books.service'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date'
import { useEducationSystemRankingAdmin } from '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemRanking/useEducationSystemRankingAdmin.js'
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

const { subject, educationSystemId, adminInstitutionId, serie, book, mission } = useFilters()
const {
  month,
  monthFirstOption,
  classe,
  bookFirstoption,
  missionFirstOption,
  fetchRanking,
} = useEducationSystemRankingAdmin()

const serieOptions = ref([])
const serieLoading = ref(true)

const route = useRoute()
const router = useRouter()

const { bookId, missionId } = route.params

if (bookId) {
  book.value = { id: bookId, name: '' }
} else {
  book.value = bookFirstoption
}

if (missionId) {
  mission.value = { id: missionId, name: '' }
} else {
  mission.value = missionFirstOption
}

const fetchSeries = async () => {
  serieLoading.value = true

  const response = await getEducationSystemSeriesLabel(educationSystemId.value, {
    SubjectId: subject.value.id,
  })

  if (response.status === 200) {
    serieOptions.value = response.data
    if (
      !serie.value ||
      !serie.value.id ||
      !response.data.some(s => s.id === serie.value.id)
    ) {
      serie.value = response.data[0]
    }
  } else {
    serieOptions.value = []
    serie.value = {}
  }

  classePage.value = 1
  classeTotal.value = 1
  serieLoading.value = false
  fetchClasses()
}

const classeDefaultOption = { name: 'Todas as turmas', value: null }
const classeOptions = ref([])
const classeLoading = ref(true)
classe.value = classeDefaultOption
const classePage = ref(1)
const classeTotal = ref(1)

const fetchClasses = async ctx => {
  if (!serie.value.id || serieLoading.value) return

  if (ctx) classePage.value = ctx.page

  classeLoading.value = true

  const response = await getClassesV2({
    SubjectId: subject.value.id,
    InstitutionId: adminInstitutionId.value,
    SerieIds: serie.value.id,
  })

  if (response.status === 200) {
    if (classePage.value === 1) {
      classeOptions.value = [classeDefaultOption]
      classe.value = classeDefaultOption

      fetchRanking()
    }

    classeTotal.value = response.data.totalPages
    classeOptions.value = [...classeOptions.value, ...response.data.data]
  } else {
    classeOptions.value = [classeDefaultOption]
    classe.value = classeDefaultOption
  }

  classeLoading.value = false
}

const bookOptions = ref([bookFirstoption])
const bookPage = ref(1)
const bookTotalPages = ref(1)
const bookLoading = ref(true)

const fetchBooks = async (ctx = {}) => {
  if (!serie.value.id) return
  const { page } = ctx
  bookPage.value = page || 1
  bookLoading.value = true

  const { data } = await getBooks({
    EducationSystemId: educationSystemId.value,
    SubjectId: subject.value.id,
    SerieId: serie.value.id,
  })

  bookTotalPages.value = data.totalPages

  if (bookPage.value === 1) {
    bookOptions.value = [bookFirstoption]
  }

  bookOptions.value.push(...data.data)
  bookLoading.value = false
}

const missionOptions = ref([])
const missionLoading = ref(true)
const missionPage = ref(1)
const missionTotalpages = ref(1)

const fetchMissions = async (ctx = {}) => {
  if (!serie.value.id) return
  missionLoading.value = true

  const { page } = ctx
  missionPage.value = page || 1

  if (!subject.value.id) return
  try {
    const { data } = await getEducationSystemGuidesLabel(educationSystemId.value, {
      subjectId: subject.value.id,
      bookId: book.value.id,
      SerieId: serie.value?.id,
    })

    const options = data.data || []

    if (missionPage.value === 1) {
      missionOptions.value = [missionFirstOption]
      // mission.value = missionFirstOption
    }

    missionOptions.value.push(...options)
    missionTotalpages.value = data.totalPages
    missionLoading.value = false
  } catch (error) {
    missionOptions.value = []
    missionTotalpages.value = 0
    missionLoading.value = false
  }
}

month.value = monthFirstOption

const monthsSelectOptions = [monthFirstOption, ...getMonthList()]

const changeBook = async () => {
  if (mission.value.id) mission.value = missionFirstOption
  fetchMissions()
  fetchRanking()
}

const setSerie = value => {
  serie.value = value
  classePage.value = 1
  classeTotal.value = 1
  fetchClasses()

  book.value = bookFirstoption
  bookPage.value = 1
  bookTotalPages.value = 1
  fetchBooks()
  fetchMissions()
}

const cleanFilter = () => {
  month.value = monthFirstOption
  serie.value = serieOptions.value[0]
  fetchClasses({ page: 1 })
  classe.value = classeDefaultOption
  bookPage.value = 1
  missionPage.value = 1
  mission.value = missionFirstOption
  fetchBooks()
  fetchMissions()
}
const subjectId = computed(() => subject.value.id)

watch(subjectId, () => {
  book.value = bookFirstoption
  bookPage.value = 1
  bookTotalPages.value = 1
  mission.value = missionFirstOption

  fetchSeries().then(() => {
    fetchBooks()
    fetchMissions()
  })
})

onMounted(() => {
  if (subject.value.id) {
    fetchSeries().then(() => {
      fetchBooks()
      fetchMissions()
    })
  }
})

</script>

<template>
  <b-card>
    <b-row>
      <b-col cols="auto">
        <SelectSubject :fetch-on-mounted="false" />
      </b-col>
      <b-col cols="12" md="auto">
        <b-form-group label="Ano Escolar" label-for="year">
          <ESelect
            :value="serie"
            :options="serieOptions"
            :loading="serieLoading"
            @change="setSerie"
          >
            <template v-slot:selected-option="item">
              <b-badge variant="light-primary" class="mr-1" pill>{{ item.name }}</b-badge>
            </template>
            <template v-slot:option="item">
              <b-badge variant="light-primary" pill>{{ item.name }}</b-badge>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Turma" label-for="classe">
          <ESelect
            v-model="classe"
            :options="classeOptions"
            :total-pages="classeTotal"
            :page.sync="classePage"
            :loading="classeLoading"
            paginated
            @nextPage="fetchClasses"
            @change="fetchRanking"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Período" label-for="period">
          <ESelect
            v-model="month"
            :options="monthsSelectOptions"
            label="name"
            :clearable="false"
            @change="fetchRanking"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <ExpandableFilterArea>
      <b-row>
        <b-col col md>
          <b-form-group label="Livro" label-for="book">
            <ESelect
              id="book"
              v-model="book"
              :options="bookOptions"
              paginated
              :loading="bookLoading"
              :page="bookPage"
              :total-pages="bookTotalPages"
              @next-page="fetchBooks"
              @change="changeBook"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md>
          <b-form-group label="Missão" label-for="mission">
            <ESelect
              id="mission"
              v-model="mission"
              :options="missionOptions"
              :clearable="false"
              :loading="missionLoading"
              :disabled="missionLoading"
              :page="missionPage"
              :total-pages="missionTotalpages"
              @change="fetchRanking"
              @nextPage="fetchMissions"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <div class="w-100 d-flex justify-content-end">
            <b-link
              variant="flat-primary"
              class="d-flex align-items-center p-0 gap-1"
              @click.stop="cleanFilter"
            >
              <span class="material-symbols-outlined"> cancel </span> Limpar busca
            </b-link>
          </div>
        </b-col>
      </b-row>
    </ExpandableFilterArea>
  </b-card>
</template>