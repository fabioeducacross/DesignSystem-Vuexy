<template>
  <b-card v-if="!isTeacher">
    <b-row>
      <b-col v-if="isNetworkManager" cols="12" sm="2">
        <b-form-group label="Grupo de Escolas" label-for="school-group-select">
          <ESelect
            id="school-group-select"
            :value="networkGroup"
            :options="networkGroups"
            label="name"
            track-by="id"
            :clearable="false"
            :searchable="false"
            @input="setNetworkGroup"
          />
        </b-form-group>
      </b-col>
      <b-col v-if="isNetworkManager" cols="12" sm="4">
        <b-form-group label="Escola" label-for="school-select">
          <ESelect
            id="school-name"
            :value="selectedInstitution"
            class="filter-chooser filter-items"
            label="name"
            track-by="id"
            :options="institutionList"
            :clearable="false"
            :loading="institutionListLoading"
            @input="handleInstitutionChange"
          >
            <template #noOptions>
              <span>Nenhuma Escola encontrada</span>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" sm="2">
        <b-form-group label="Ano escolar" label-for="year-select">
          <ESelect
            id="serie-select"
            :value="selectedSerie"
            :options="series"
            label="name"
            track-by="id"
            :clearable="false"
            :searchable="false"
            @input="handleSerieChange"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" sm>
        <b-form-group label="Turma" label-for="class-select">
          <select-infinity-scroll
            :value="classeValue"
            api="/v2/classes/label"
            close-on-select
            class="filter-chooser filter-items"
            :father-params="classesParams"
            :await-father-params="true"
            select-first
            :first-option="{ name: 'Todas as turmas', id: null }"
            :disabled="isNetworkManager && !institutionId"
            @input="setClasse"
          ></select-infinity-scroll>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectInfinityScroll from '@/components/selects/SelectInfinityScroll.vue'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { useEvents } from '@/views/events/useEvents.js'
import { ref, watch, computed, onMounted } from 'vue'

const { classe } = useFilters()
const {
  networkGroup,
  setNetworkGroup,
  networkGroupID,
  series,
  serieId,
  setSerieId,
  setClassId,
  institutionId,
  setInstitutionId,
} = useEvents()

const isNetworkManager = store.getters.accessRole === 'NetworkManager'
const isTeacher = store.getters.accessRole === 'Teacher'

const networkGroups = ref([])

if (isNetworkManager) {
  getNetworkGroups()
    .then(response => {
      networkGroups.value = response.data
    })
    .finally(() => {
      networkGroups.value.unshift({
        id: null,
        name: 'Todos',
      })
    })
}

const institutionListLoading = ref(false)
const institutionList = ref([{ name: 'Todos', id: null }])

// Computed para converter institutionId em objeto completo para ESelect
const selectedInstitution = computed(() => {
  return institutionList.value.find(inst => inst.id === institutionId.value) || null
})

// Computed para converter serieId em objeto completo para ESelect
const selectedSerie = computed(() => {
  return series.value.find(s => s.id === serieId.value) || null
})

const handleGetInstitutions = async () => {
  if (isNetworkManager) {
    institutionListLoading.value = true
    try {
      const { data } = await getInstitutions({ NetworkGroupId: networkGroupID.value })
      institutionList.value = [{ name: 'Todos', id: null }, ...data]
    } catch (error) {
      institutionList.value = []
      setClasse({ name: 'Todas as turmas', id: null })
    }
    institutionListLoading.value = false
  }
}

handleGetInstitutions()

watch([networkGroupID], () => {
  setInstitutionId(null)
  handleGetInstitutions()
})

watch([series], () => {
  if (series.value.length > 0) {
    if (!isTeacher) {
      setSerieId(series.value[0].id)
    }
  }
})

if (isTeacher) {
  setSerieId(classe.value.SerieId)
  setClassId(classe.value.ClassId)
}

onMounted(() => {
  if (series.value.length > 0 && !serieId.value) {
    setSerieId(series.value[0].id)
  }
  if ((isNetworkManager && serieId.value) || isTeacher) {
    store.dispatch('eventsRankingStudents/fetch')
  }
})

// Handler adaptador para Institution - converte objeto para ID
const handleInstitutionChange = institution => {
  setInstitutionId(institution?.id || null)
  setClasse({ name: 'Todas as turmas', id: null })
}

// Handler adaptador para Serie - converte objeto para ID
const handleSerieChange = serie => {
  setSerieId(serie?.id || null)
}

const classesParams = computed(() => {
  if (!serieId.value) return null
  if (isNetworkManager && !institutionId.value) return null
  return {
    serieIds: serieId.value,
    InstitutionId: institutionId.value,
  }
})

const classeValue = ref({ name: 'Todas as turmas', id: null })

const setClasse = value => {
  classeValue.value = value
  setClassId(value.id)
}
</script>

<style lang="scss" scoped></style>
