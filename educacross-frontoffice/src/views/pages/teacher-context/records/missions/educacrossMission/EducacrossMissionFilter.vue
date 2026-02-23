<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed, ref, watch, onMounted } from 'vue'

const search = computed(() => store.getters['EducacrossMissionsModule/searchTerm'])
const series = computed(() => store.getters['EducacrossMissionsModule/series'])
const serie = computed(() => store.getters['EducacrossMissionsModule/serie'])
const loadingFilter = computed(() => store.getters['EducacrossMissionsModule/loadingFilter'])
const loading = computed(() => store.getters['EducacrossMissionsModule/loading'])
const seriePage = computed(() => store.getters['EducacrossMissionsModule/seriesParamsPage'])
const serieTotalPages = computed(
  () => store.getters['EducacrossMissionsModule/seriesParamsTotalPages'],
)
const { subject } = useFilters()

const text = ref('')
const searchQueryRef = ref(null)
let searchDebounceTimer = null

const changeSerie = value => {
  store.commit('EducacrossMissionsModule/page', 1)
  store.commit('EducacrossMissionsModule/serie', value)
  store.dispatch('EducacrossMissionsModule/fetchData')
}

const changeSearch = value => {
  store.commit('EducacrossMissionsModule/page', 1)
  store.commit('EducacrossMissionsModule/searchTerm', value)
  store.dispatch('EducacrossMissionsModule/fetchData')
}

const serieNextPage = () => {
  store.dispatch('EducacrossMissionsModule/fetchSeries')
}

watch(text, newValue => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }
  searchDebounceTimer = setTimeout(() => {
    changeSearch(newValue)
  }, 500)
})

watch(
  subject,
  () => {
    store.commit('EducacrossMissionsModule/seriesParamsPage', 0)
    store.commit('EducacrossMissionsModule/seriesParamsTotalPages', 1)
    store.commit('EducacrossMissionsModule/page', 1)
    store.commit('EducacrossMissionsModule/loading', true)
    store.dispatch('EducacrossMissionsModule/fetchSeries')
  },
  { deep: true },
)
</script>

<template>
  <b-card>
    <b-row>
      <b-col cols="auto">
        <SelectSubject />
      </b-col>
      <b-col cols>
        <b-form-group label="Ano escolar" label-for="serie">
          <ESelect
            name="serie"
            :options="series"
            :loading="loadingFilter"
            :disabled="loadingFilter || loading"
            label="name"
            :value="serie"
            :page="seriePage"
            :total-pages="serieTotalPages"
            paginated
            @input="changeSerie"
            @nextPage="serieNextPage"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6" lg="8">
        <b-form-group label-for="button">
          <template #label> &nbsp;</template>
          <b-input-group>
            <template #prepend>
              <b-input-group-text
                id="searchQueryIcon"
                class="d-none d-md-flex"
                @click="searchQueryRef?.$el?.focus()"
              >
                <span class="material-symbols-outlined"> search </span>
              </b-input-group-text>
            </template>
            <b-form-input
              ref="searchQueryRef"
              v-model="text"
              class="d-inline-block searchQuery"
              placeholder="Pesquisar"
              type="text"
              :disabled="loadingFilter"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<style lang="scss" scoped>
  .searchQuery {
    @media (min-width: 768px) {
      border-left: 0;
      padding-left: 0;
    }
  }

  #searchQueryIcon {
    .material-symbols-outlined {
      font-size: 18px;
    }
  }
</style>
