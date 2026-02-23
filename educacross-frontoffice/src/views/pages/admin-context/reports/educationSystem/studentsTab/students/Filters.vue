<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject :fetch-on-mounted="false" />
      </b-col>
      <b-col>
        <b-form-group :label="$t('Livro')" label-for="book">
          <ESelect
            id="book"
            label="name"
            :value="book"
            :options="books"
            :clearable="false"
            :loading="bookLoading"
            :disabled="bookLoading"
            :page="bookPage"
            :total-pages="bookTotalpages"
            @input="setBook"
            @nextPage="fetchBooks"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group :label="$t('Missão')" label-for="mission">
          <ESelect
            id="mission"
            label="name"
            :value="mission"
            :options="missions"
            :clearable="false"
            :loading="missionLoading"
            :disabled="missionLoading"
            :page="missionPage"
            :total-pages="missionTotalpages"
            @input="setMission"
            @nextPage="fetchMissions"
          >
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getEducationSystemGuidesLabel } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import { getBooks } from '@/services/teacher-context/books/Books.service'
import useFilters from '@/store/filters/useFilters'
import { useEducationSystemStudents } from '@/views/pages/admin-context/reports/educationSystem/studentsTab/students/useEducationSystemStudents.js'
import { watch, ref, computed } from 'vue'

const { resetAndfetch, fetchDashboard } = useEducationSystemStudents()
const { serie, classe, subject, book, mission, educationSystemId } = useFilters()

const { classId } = router.currentRoute.params

const missionDefault = { id: null, name: 'Todas as missões' }
const bookDefault = { id: null, name: 'Todos os livros' }

classe.value = { id: classId }
serie.value = { id: null }

const subjectId = computed(() => subject.value.id)
const serieId = computed(() => serie.value.id)

book.value = bookDefault
mission.value = missionDefault

watch([subjectId], () => {
  book.value = bookDefault
  mission.value = missionDefault
  fetchDashboard()
  fetchBooks()
  fetchMissions()
  resetAndfetch()
})

watch([serieId], () => {
  if (!serieId.value) return
  fetchDashboard()
  fetchBooks()
  fetchMissions()
})

// BOOK
const books = ref([])
const bookLoading = ref(true)
const bookPage = ref(1)
const bookTotalpages = ref(1)

const setBook = value => {
  book.value = value
  mission.value = missionDefault
  fetchDashboard()
  fetchMissions()
  resetAndfetch()
}

const fetchBooks = async (ctx = {}) => {
  bookLoading.value = true

  const { page } = ctx
  bookPage.value = page || 1

  if (!subject.value.id || !serie.value.id) {
    bookLoading.value = false
    return
  }
  try {
    const { data } = await getBooks({
      EducationSystemId: educationSystemId.value,
      SubjectId: subject.value.id,
      SerieId: serie.value.id,
      Page: bookPage.value,
    })

    const options = data.data || []

    if (bookPage.value === 1) {
      books.value = [bookDefault]
    }

    books.value.push(...options)
    bookTotalpages.value = data.totalPages
    bookLoading.value = false
  } catch (error) {
    bookLoading.value = false
  }
}

const missions = ref([])
const missionLoading = ref(true)
const missionPage = ref(1)
const missionTotalpages = ref(1)

const setMission = value => {
  mission.value = value
  fetchDashboard()
  resetAndfetch()
}

const fetchMissions = async (ctx = {}) => {
  missionLoading.value = true

  const { page } = ctx
  missionPage.value = page || 1

  if (!subject.value.id || !serie.value.id) {
    missionLoading.value = false
    missions.value = []
    missionTotalpages.value = 0
    return
  }
  try {
    const { data } = await getEducationSystemGuidesLabel(educationSystemId.value, {
      subjectId: subject.value.id,
      bookId: book.value.id,
      SerieId: serie.value.id,
    })

    const options = data.data || []

    if (missionPage.value === 1) {
      missions.value = [missionDefault]
    }

    missions.value.push(...options)
    missionTotalpages.value = data.totalPages
    missionLoading.value = false
  } catch (error) {
    missions.value = []
    missionTotalpages.value = 0
    missionLoading.value = false
  }
}

resetAndfetch()
</script>

<style lang="scss" scoped></style>