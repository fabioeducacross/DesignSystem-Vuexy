<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject />
      </b-col>
      <b-col cols="12" lg="3">
        <b-form-group label="Tipo de compartilhamento" label-for="sharedTypeFilter">
          <ESelect
            :value="selectedMissionType"
            label="name"
            :options="sharedTypeOptions"
            :clearable="false"
            :disabled="false"
            name="sharedTypeFilter"
            @input="changeSelectedMissionType"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" lg="3">
        <b-form-group label="Ano Escolar" label-for="schoolYear">
          <ESelect
            :value="selectedSchoolYear"
            label="name"
            :options="schoolYearOptions"
            :clearable="false"
            :disabled="loadingSchoolYearData"
            :loading="loadingSchoolYearData"
            name="schoolYear"
            @input="changeSelectedSchoolYear"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" lg>
        <b-form-group label-for="searchQuery">
          <template v-slot:label> &nbsp;</template>
          <b-input-group class="mb-0">
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
              v-model="searchQuery"
              class="d-inline-block searchQuery"
              placeholder="Pesquisar"
              debounce="500"
              type="text"
              :disabled="loadingSchoolYearData"
              @keyup="beforeListBySearchQuery"
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
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { watch, computed } from 'vue'

const { subject } = useFilters()

const sharedTypeOptions = computed(
  () => store.getters['sharedMissionsModule/sharedTypeOptions'],
)

const selectedMissionType = computed(() => {
  return store.getters['sharedMissionsModule/selectedMissionType']
})

const changeSelectedMissionType = missionType => {
  store.commit('sharedMissionsModule/setSelectedMissionType', missionType)
}

const schoolYearOptions = computed(() => {
  return store.getters['sharedMissionsModule/schoolYearOptions']
})

const selectedSchoolYear = computed(() => {
  return store.getters['sharedMissionsModule/selectedSchoolYear']
})

const changeSelectedSchoolYear = schoolYear => {
  store.commit('sharedMissionsModule/setSelectedSchoolYear', schoolYear)
}

const loadingSchoolYearData = computed(() => {
  return store.getters['sharedMissionsModule/loadingSchoolYearData']
})

const searchQuery = computed({
  get() {
    return store.getters['sharedMissionsModule/searchQuery']
  },
  set(val) {
    store.commit('sharedMissionsModule/setSearchQuery', val)
  },
})

const beforeListBySearchQuery = () => {
  store.commit('sharedMissionsModule/setCurrentPage', 1)
  store.dispatch('sharedMissionsModule/fetchSharedMissions')
}

watch(
  [subject],
  () => {
    store.commit('sharedMissionsModule/setSelectedSchoolYear', { name: 'Todos', id: null })
    store.commit('sharedMissionsModule/setCurrentPage', 1)
    store.dispatch('sharedMissionsModule/fetchSchoolYearData')
  },
  { deep: true },
)
</script>
