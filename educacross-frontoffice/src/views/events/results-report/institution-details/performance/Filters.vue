<template>
  <b-card>
    <b-row>
      <b-col cols="12" md>
        <b-skeleton-wrapper :loading="isLoading">
          <template v-slot:loading>
            <div>
              <b-row>
                <b-col cols="12">
                  <b-skeleton type="text" class="w-100 mb-0" height="50px"></b-skeleton>
                </b-col>
              </b-row>
            </div>
          </template>
          <div class="mb-1 mb-sm-0">
            <b-form-group :label="$t('schoolYear')" label-for="schoolYear">
              <ESelect
                id="schoolYear"
                label="name"
                :value="serie"
                :options="series"
                :clearable="false"
                :loading="isLoading"
                :disabled="isLoading"
                @input="setEventSerie"
              >
              </ESelect>
            </b-form-group>
          </div>
        </b-skeleton-wrapper>
      </b-col>
      <b-col cols="12" md>
        <b-skeleton-wrapper :loading="isLoading">
          <template v-slot:loading>
            <div>
              <b-row>
                <b-col cols="12">
                  <b-skeleton type="text" class="w-100 mb-0" height="50px"></b-skeleton>
                </b-col>
              </b-row>
            </div>
          </template>
          <div class="mb-1 mb-sm-0">
            <b-form-group
              :label="$t('educationalOrganization')"
              label-for="educationalOrganization"
            >
              <ESelect
                id="educationalOrganization"
                label="name"
                :value="selectedEducationalOrganizationLabel"
                :options="educationalOrganizationsLabels"
                :clearable="false"
                :loading="loadingEducationalOrganization"
                :disabled="loadingEducationalOrganization"
                @input="setSelectedEducationalOrganization"
              >
              </ESelect>
            </b-form-group>
          </div>
        </b-skeleton-wrapper>
      </b-col>
      <b-col cols="12" md>
        <b-skeleton-wrapper :loading="isLoading">
          <template v-slot:loading>
            <div>
              <b-row>
                <b-col cols="12">
                  <b-skeleton type="text" class="w-100 mb-0" height="50px"></b-skeleton>
                </b-col>
              </b-row>
            </div>
          </template>
          <div class="mb-1 mb-sm-0">
            <b-form-group :label="$t('knowledgeAxes')" label-for="knowledgeAxes">
              <ESelect
                id="knowledgeAxes"
                label="name"
                :value="selectedKnowledgeAxes"
                :options="knowledgeAxesOptions"
                :clearable="false"
                :loading="loadingKnowledgeAxes"
                :disabled="loadingKnowledgeAxes"
                @input="setSelectedKnowledgeAxes"
              >
              </ESelect>
            </b-form-group>
          </div>
        </b-skeleton-wrapper>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import store from '@/store'
import { useEvents } from '@/views/events/useEvents.js'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import vSelect from 'vue-select'

const {
  series,
  serie,
  setEventSerie,
  serieId,
  setSerieId,
  loadingEducationalOrganization,
  educationalOrganizationsLabels,
  setSelectedEducationalOrganization,
  selectedEducationalOrganizationLabel,
  loadingKnowledgeAxes,
  knowledgeAxes,
  setSelectedKnowledgeAxes,
  selectedKnowledgeAxes,
} = useEvents()

const isLoading = ref(false)

const knowledgeAxesOptions = computed(() => [
  {
    id: null,
    name: 'Todas',
  },
  ...knowledgeAxes.value,
])

watch([series], () => {
  if (series.value.length > 0) {
    setSerieId(series.value[0].id)
    setEventSerie(series.value[0])
  }
})

watch(serie, (newVal, oldVal) => {
  if (oldVal) {
    if (newVal?.id !== oldVal?.id) {
      store.dispatch('events/fetchEducationalOrganizationsLabels')
    }
  }
})

watch([selectedEducationalOrganizationLabel], () => {
  store.dispatch('events/fetchKnowledgeAxes')
})

onMounted(() => {
  if (series.value.length > 0 && !serieId.value) {
    setSerieId(series.value[0].id)
    setEventSerie(series.value[0])
  }

  store.dispatch('events/fetchEducationalOrganizationsLabels')
})

onUnmounted(() => {
  store.commit('events/setSelectedEducationalOrganization', null)
})
</script>