<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import useFilters from '@/store/filters/useFilters'
import { useCustomMissionV2 } from '@/views/pages/teacher-context/records/missions/customMissionV2/useCustomMissionV2'
import Vue, { computed, watch } from 'vue'

const {
  filtersItems,
  itemsFilters,
  filtersLoadingList,
  searchTopic,
  resultListQTD,
  getSeries,
  getMatrices,
  getAbilities,
  getKnowledgeObjects,
  getThemes,
  updateTabContent,
  openWarningDifferentSubject,
  subjectPending,
  someItemsSelected,
  gamesTab,
  questionsTab,
} = useCustomMissionV2()
const { subject } = useFilters()
const subjectOrg = { ...subject.value }

const isAbilitiesMultiple = computed(() => {
  return itemsFilters.value.matrix.id !== null
})

const resetFilter = () => {
  Vue.set(subject, 'value', subjectOrg)
  searchTopic.value = ''
  getSeries()
}

const changeSubject = () => {
  gamesTab.value.currentPage = 1
  questionsTab.value.currentPage = 1
  if (someItemsSelected()) {
    subjectPending.value = subject.value
    openWarningDifferentSubject.value = true
    return
  }
  getSeries()
}

watch(
  () => itemsFilters.value.serie,
  async () => {
    await getMatrices()
  }
)

watch(
  () => itemsFilters.value.matrix,
  async () => {
    await getThemes()
  }
)

watch(
  () => itemsFilters.value.theme,
  async () => {
    await getKnowledgeObjects()
  }
)

watch(
  () => itemsFilters.value.knowledgeObject,
  async () => {
    await getAbilities()
  }
)

getSeries()
</script>

<template>
  <b-card>
    <b-form>
      <b-row>
        <b-col cols="auto">
          <SelectSubject @input="changeSubject" />
        </b-col>
        <b-col class="flex-1" md>
          <b-form-group label="Ano Escolar" label-for="serie">
            <ESelect
              id="serie"
              v-model="itemsFilters.serie"
              :loading="filtersLoadingList[0]"
              :options="filtersItems.series"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md>
          <b-form-group label="Matriz/Currículo" label-for="matrix">
            <ESelect
              id="matrix"
              v-model="itemsFilters.matrix"
              :loading="filtersLoadingList[1]"
              :options="filtersItems.matrices"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="4">
          <b-form-group label="Temática" label-for="theme">
            <ESelect
              id="theme"
              v-model="itemsFilters.theme"
              :loading="filtersLoadingList[2]"
              :options="filtersItems.themes"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="4">
          <b-form-group label="Objeto do Conhecimento" label-for="knowledge">
            <ESelect
              id="knowledge"
              v-model="itemsFilters.knowledgeObject"
              :loading="filtersLoadingList[3]"
              :options="filtersItems.knowledgeObjects"
            >
              <template v-slot:noOptions>
                <span>Nenhum Objeto foi encontrado</span>
              </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="4">
          <b-form-group label="Habilidades" label-for="abilities">
            <ESelect
              id="abilities"
              v-model="itemsFilters.ability"
              :loading="filtersLoadingList[4]"
              :options="filtersItems.abilities"
              :multiple="isAbilitiesMultiple"
              @change="updateTabContent"
            >
              <template v-slot:noOptions>
                <span>Nenhuma habilidade foi encontrada</span>
              </template>
              <template v-slot:allOptionsLabel> Todas as habilidades</template>
              <template v-slot:selectedOptionsCountLabel="{ selectedLength }">
                <span> {{ selectedLength }} habilidades selecionadas</span>
              </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" lg="10" md="8">
          <b-form-group>
            <b-form-input
              v-model="searchTopic"
              maxlength="100"
              placeholder="Pesquisar por conteúdo"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" lg="2" md="4">
          <b-form-group>
            <b-button block variant="primary" @click="updateTabContent">Pesquisar</b-button>
          </b-form-group>
        </b-col>
        <b-col>
          <div class="d-flex justify-content-end gap-2">
            <div>
              <b class="align-middle">{{ resultListQTD }}</b>
              <span class="align-middle"> resultados</span>
            </div>
            <b-link variant="primary" @click="resetFilter">
              <span class="material-symbols-outlined align-middle"> cancel </span>
              <span class="align-middle">Limpar Filtros</span>
            </b-link>
          </div>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>