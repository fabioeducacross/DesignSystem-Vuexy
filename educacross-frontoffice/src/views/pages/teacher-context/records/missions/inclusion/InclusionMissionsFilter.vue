<template>
  <b-card>
    <b-row>
      <b-col cols="auto">
        <SelectSubject />
      </b-col>
      <b-col cols>
        <b-form-group label="Ano Escolar" label-for="educationSystem">
          <ESelect
            :value="selectedSeries"
            :options="seriesOptions"
            label="name"
            placeholder="Selecione o livro"
            :loading="loadingSeries"
            :total-pages="seriesTotalPages"
            :page="seriesPage"
            paginated
            @nextPage="fetchSeriesData"
            @input="changeSeries"
          >
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col cols="12" md>
        <b-form-group label-for="button">
          <template v-slot:label> &nbsp;</template>
          <b-input-group>
            <template v-slot:prepend>
              <b-input-group-text
                id="searchQueryIcon"
                class="d-none d-md-flex"
                @click="$refs.searchQueryRef.$el.focus()"
              >
                <span class="material-symbols-outlined"> search </span>
              </b-input-group-text>
            </template>
            <b-form-input
              ref="searchQueryRef"
              :value="search"
              class="d-inline-block searchQuery"
              placeholder="Pesquisar"
              debounce="500"
              type="text"
              @input="changeSearch"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getSeries } from '@/services/shared/serie/Serie.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { watch, computed, ref } from 'vue'

const search = computed(() => store.getters['inclusionMissionsModule/search'])
const changeSearch = value => {
  store.commit('inclusionMissionsModule/search', value)
}
const selectedSeries = computed(() => store.getters['inclusionMissionsModule/selectedSeries'])

const seriesOptions = ref([])
const seriesPage = ref(1)
const seriesTotalPages = ref(1)
const loadingSeries = ref(true)

const { subject } = useFilters()

const fetchSeriesData = async (ctx = {}) => {
  const { page } = ctx
  seriesPage.value = page || 1
  loadingSeries.value = true

  const { data } = await getSeries({
    Subjects: subject.value.id,
    Page: seriesPage.value,
  })

  seriesTotalPages.value = data.totalPages

  if (seriesPage.value === 1) {
    seriesOptions.value = []
    seriesOptions.value.push({ name: 'Todos', id: null })
  }

  seriesOptions.value.push(...data.data)
  loadingSeries.value = false
}

const changeSeries = value => {
  store.commit('inclusionMissionsModule/selectedSeries', value)
}

store.dispatch('inclusionMissionsModule/fetchData')

watch(
  [subject],
  () => {
    store.commit('inclusionMissionsModule/selectedSeries', { name: 'Todos', id: null })
    fetchSeriesData()
  },
  { deep: true },
)
</script>

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