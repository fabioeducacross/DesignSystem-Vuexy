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
              <b-col cols="12" md="6">
                <b-skeleton type="text" class="w-100 mb-2" height="50px" />
              </b-col>
              <b-col cols="12" md="6">
                <b-skeleton type="text" class="w-100 mb-2" height="50px" />
              </b-col>
            </b-row>
          </template>
          <b-row>
            <b-col cols="12" md class="mb-md-0 mb-2">
              <label for="subject-select">Livro</label>
              <select-infinity-scroll
                :value="bookFilter"
                :father-params="bookParams"
                :first-option="{ name: 'Todos', id: null }"
                placeholder="Selecione o livro"
                :close-on-select="true"
                :api="bookFilterApi"
                @input="setBook"
              >
                <template v-slot:no-options> Nenhum livro encontrado </template>
              </select-infinity-scroll>
            </b-col>
            <b-col cols="12" md class="mb-md-0 mb-2">
              <label for="status-select">Missão</label>

              <select-infinity-scroll
                :value="missionFilter"
                :father-params="missionParams"
                :first-option="{ name: 'Todas', id: null }"
                placeholder="Selecione a missão"
                :close-on-select="true"
                :api="missionFilterApi"
                @input="setMission"
              >
                <template v-slot:no-options> Nenhum livro encontrado </template>
              </select-infinity-scroll>
            </b-col>
          </b-row>
        </b-skeleton-wrapper>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
import SelectInfinityScroll from '@/components/selects/SelectInfinityScroll.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { watch, computed } from 'vue'
import vSelect from 'vue-select'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  serieId: {
    type: [Number, null],
  },
})

// Use useFilters composable
const { subject, fetchSubjectsWithParams, moduleId } = useFilters()

const { educationSystemId, institutionId, classId } = router.currentRoute.params

fetchSubjectsWithParams({
  institutionId,
  moduleId: moduleId.value,
  educationSystemId,
  classId,
})

const missionFilter = computed(() => store.getters['educationSystemReportTabsRoot/mission'])
const setMission = mission => {
  store.commit('educationSystemReportTabsRoot/setMission', mission)
}
const missionFilterApi = `/v1/educationsystems/${educationSystemId}/guides/label`
const missionParams = computed(() => ({
  SubjectId: subject.value.id,
  BookId: bookFilter.value.id || null,
  SerieId: props.serieId,
}))

const bookFilter = computed(() => store.getters['educationSystemReportTabsRoot/book'])
const setBook = book => {
  store.commit('educationSystemReportTabsRoot/setBook', book)
}
const bookFilterApi = `/v1/books/`
const bookParams = computed(() => ({
  EducationSystemId: educationSystemId,
  SubjectId: subject.value.id,
  SerieId: props.serieId,
}))

watch(subject, () => {
  setMission({ name: 'Todas', id: null })
  setBook({ name: 'Todos', id: null })
})
</script>

<style lang="scss" scoped>
  #school-year {
    min-width: 120px;
  }
</style>