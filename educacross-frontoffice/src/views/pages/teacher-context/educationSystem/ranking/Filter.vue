<script>
export default {
  name: 'EducationSystemRankingFilter',
}
</script>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getEducationSystemGuidesLabel } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import { getBooks } from '@/services/teacher-context/books/Books.service'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date'
import { useEducationSystemRanking } from '@/views/pages/teacher-context/educationSystem/ranking/useEducationSystemRanking'
import { ref, watch } from 'vue'

const { subject, classe, educationSystemId, book, mission } = useFilters()
const { month, bookFirstoption, missionFirstOption, monthFirstOption, fetchRanking } =
  useEducationSystemRanking()

const bookOptions = ref([bookFirstoption])
const bookPage = ref(1)
const bookTotalPages = ref(0)
const bookLoading = ref(true)

const fetchBooks = async (ctx = {}) => {
  const { page } = ctx
  bookPage.value = page || 1
  bookLoading.value = true

  const { data } = await getBooks({
    EducationSystemId: educationSystemId.value,
    SubjectId: subject.value.id,
    SerieId: classe.value.SerieId,
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
  missionLoading.value = true

  const { page } = ctx
  missionPage.value = page || 1

  if (!subject.value.id) return
  try {
    const { data } = await getEducationSystemGuidesLabel(educationSystemId.value, {
      subjectId: subject.value.id,
      bookId: book.value.id,
      SerieId: classe.value.SerieId,
    })

    const options = data.data || []

    if (missionPage.value === 1) {
      missionOptions.value = [missionFirstOption]
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

watch(
  [subject, classe],
  (value, oldValue) => {
    if (value[0].id === oldValue[0].id && value[1].ClassId === oldValue[1].ClassId) return

    const bookHasChanged = book.value.id !== bookFirstoption.id
    bookPage.value = 1
    bookTotalPages.value = 0
    book.value = bookFirstoption
    mission.value = missionFirstOption
    month.value = monthFirstOption

    fetchBooks()
    if (!bookHasChanged) {
      mission.value = missionFirstOption
      fetchMissions()
    }
    fetchRanking()
  },
  { deep: true },
)

const changeBook = async () => {
  if (mission.value.id) mission.value = missionFirstOption
  fetchMissions()
  fetchRanking()
}

fetchBooks()
fetchMissions()
fetchRanking()
</script>

<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject />
      </b-col>
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
      <b-col cols="12" md>
        <b-form-group label="Período" label-for="period">
          <ESelect
            v-model="month"
            :options="monthsSelectOptions"
            label="name"
            :clearable="false"
            @input="fetchRanking"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>