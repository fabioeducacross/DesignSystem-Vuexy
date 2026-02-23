<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject />
      </b-col>
      <b-col cols>
        <b-form-group label="Sistema de Ensino" label-for="educationSystem">
          <ESelect
            :value="selectedEducationSystem"
            label="name"
            :options="educationSystemOptions"
            :clearable="false"
            :disabled="loadingGetEducationSystem"
            name="educationSystem"
            @input="changeEducationSystem"
          >
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col cols="12" md>
        <b-form-group label="Livro" label-for="livro">
          <ESelect
            :value="selectedBook"
            :options="bookOptions"
            label="name"
            placeholder="Selecione o livro"
            :loading="loadingBook"
            :total-pages="bookTotalPages"
            :page="bookPage"
            :disabled="loadingGetEducationSystem"
            paginated
            @nextPage="fetchBookData"
            @input="changeBook"
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
import { getEducationSystemInfo } from '@/services/shared/educationSystem/EducationSystem.Service'
import { getBooks } from '@/services/teacher-context/books/Books.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed, ref, watch } from 'vue'

const { classe, subject } = useFilters()

const selectedEducationSystem = computed(
  () => store.getters['booksMissionsModule/selectedEducationSystem'],
)
const educationSystemOptions = ref([])
const loadingGetEducationSystem = ref(true)

const changeEducationSystem = value => {
  store.commit('booksMissionsModule/selectedBook', { name: 'Todos', id: null })
  store.commit('booksMissionsModule/selectedEducationSystem', value)
  fetchBookData()
  store.dispatch('booksMissionsModule/fetchData')
}

const getEducationSystems = async () => {
  loadingGetEducationSystem.value = true
  const params = {
    SerieId: store.getters['booksMissionsModule/serieId'],
    SubjectId: store.getters['booksMissionsModule/subjectId'],
  }
  await getEducationSystemInfo(params)
    .then(response => {
      educationSystemOptions.value = response.data

      if (
        !selectedEducationSystem.value?.id ||
        !educationSystemOptions.value.find(
          item => item.id === selectedEducationSystem.value.id,
        )
      ) {
        store.commit(
          'booksMissionsModule/selectedEducationSystem',
          educationSystemOptions.value[0],
        )
      }
    })
    .finally(() => {
      loadingGetEducationSystem.value = false
    })
}

const selectedBook = computed(() => store.getters['booksMissionsModule/selectedBook'])

const bookOptions = ref([])
const bookPage = ref(1)
const bookTotalPages = ref(0)
const loadingBook = ref(true)

const fetchBookData = async (ctx = {}) => {
  if (!selectedEducationSystem.value?.id) {
    loadingBook.value = false
    return
  }
  const { page } = ctx
  bookPage.value = page || 1
  loadingBook.value = true

  const { data } = await getBooks({
    EducationSystemId: selectedEducationSystem.value.id || null,
    SubjectId: subject.value.id,
    SerieId: store.getters['booksMissionsModule/serieId'],
  })

  bookTotalPages.value = data.totalPages

  if (bookPage.value === 1) {
    bookOptions.value = []
    bookOptions.value.push({ name: 'Todos', id: null })
  }

  bookOptions.value.push(...data.data)
  loadingBook.value = false
}

const changeBook = value => {
  store.commit('booksMissionsModule/selectedBook', value)
  store.dispatch('booksMissionsModule/fetchData')
}
const setParams = () => {
  store.commit('booksMissionsModule/subjectId', subject.value.id)
  store.commit('booksMissionsModule/classId', classe.value.ClassId)
  store.commit('booksMissionsModule/serieId', classe.value.SerieId)
}

setParams()

watch(
  [subject],
  async () => {
    const oldSerieId = store.getters['booksMissionsModule/serieId']
    const oldSubjectId = store.getters['booksMissionsModule/subjectId']
    const oldselectedEducationSystem =
      store.getters['booksMissionsModule/selectedEducationSystem']

    setParams()
    await getEducationSystems()

    if (
      classe.value.SerieId !== oldSerieId ||
      subject.value.id !== oldSubjectId ||
      !oldselectedEducationSystem ||
      oldselectedEducationSystem.id !== selectedEducationSystem.value?.id ||
      bookTotalPages.value === 0
    ) {
      store.commit('booksMissionsModule/selectedBook', { name: 'Todos', id: null })
      fetchBookData()
    }

    store.dispatch('booksMissionsModule/fetchData')
  },
  { deep: true },
)
</script>

<style lang="scss" scoped></style>