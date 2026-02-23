<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject />
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
import { getEducationSystemGuidesLabel } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import { getBooks } from '@/services/teacher-context/books/Books.service'
import useFilters from '@/store/filters/useFilters'
import { useEducationSystemStudents } from '@/views/pages/teacher-context/educationSystem/students/useEducationSystemStudents.js'
import { watch, ref, computed } from 'vue'

const { resetAndfetch } = useEducationSystemStudents()
const { classe, subject, book, mission, educationSystemId } = useFilters()

const missionDefault = { id: null, name: 'Todas as missões' }
const bookDefault = { id: null, name: 'Todos os livros' }

const subjectId = computed(() => subject.value.id)

watch([subjectId, classe], () => {
  book.value = bookDefault
  mission.value = missionDefault
  fetchBooks()
  fetchMissions()
  resetAndfetch()
})

// BOOK
const books = ref([])
const bookLoading = ref(true)
const bookPage = ref(1)
const bookTotalpages = ref(1)

const setBook = value => {
  book.value = value
  mission.value = missionDefault
  fetchMissions()
  resetAndfetch()
}

const fetchBooks = async (ctx = {}) => {
  bookLoading.value = true

  const { page } = ctx
  bookPage.value = page || 1

  if (!subject.value.id) return
  try {
    const { data } = await getBooks({
      EducationSystemId: educationSystemId.value,
      SubjectId: subject.value.id,
      SerieId: classe.value?.SerieId,
      Page: bookPage.value,
    })

    const options = data.data || []

    if (bookPage.value === 1) {
      books.value = [bookDefault]
    }

    books.value.push(...options)
    bookTotalpages.value = data.totalPages
    bookLoading.value = false
  } catch (error) {}
}

const missions = ref([])
const missionLoading = ref(true)
const missionPage = ref(1)
const missionTotalpages = ref(1)

const setMission = value => {
  mission.value = value
  resetAndfetch()
}

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

fetchBooks()
fetchMissions()
resetAndfetch()
</script>

<style lang="scss" scoped></style>