<template>
  <b-card>
    <b-row>
      <b-col>
        <b-form-group label-for="largeInput">
          <b-form-input
            id="largeInput"
            v-model="searchQuery"
            placeholder="Pesquisar por título do livro ou autor"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md="auto">
        <div
          v-b-tooltip.hover="
            `Essa ação será refletida para todos os alunos
e em todos os livros da Biblioteca.`
          "
          class="d-flex align-items-center justify-content-center gap-2 form-control rounded text-muted cursor-pointer mb-1"
          :class="{ 'border-success': enableBookAudio }"
          @click.prevent.stop.capture="changeEnableBookAudio"
        >
          <span
            v-if="!loadingBookAudio"
            class="material-symbols-outlined"
            :class="{ 'text-success': enableBookAudio }"
            style="font-size: 20px"
          >
            volume_up
          </span>
          <b-spinner v-show="loadingBookAudio" small />
          <span :class="{ 'text-success': enableBookAudio }">Permitir áudio nos livros</span>
          <b-form-checkbox
            v-model="enableBookAudio"
            class="custom-control-success book-custom-switch"
            switch
          >
            <span class="switch-icon-left">
              <feather-icon icon="CheckIcon" />
            </span>
            <span class="switch-icon-right">
              <feather-icon icon="XIcon" class="text-muted" />
            </span>
          </b-form-checkbox>
        </div>
      </b-col>
      <b-col md="auto">
        <b-form-group>
          <b-dropdown
            v-b-tooltip="
              disableMassActions
                ? `Selecione dois ou mais livros para
ativar essa funcionalidade.`
                : null
            "
            variant="outline-primary"
            text="Ações em lote"
            block
            :disabled="disableMassActions"
          >
            <b-dropdown-item variant="success" @click="switchEnable(true)">
              <span
                class="material-symbols-outlined"
                style="font-size: 12px; vertical-align: middle"
              >
                task_alt
              </span>
              Habilitar todos
            </b-dropdown-item>
            <b-dropdown-item variant="danger" @click="switchEnable(false)">
              <span
                class="material-symbols-outlined"
                style="font-size: 12px; vertical-align: middle"
              >
                disabled_by_default
              </span>
              Desabilitar todos
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-if="filterExpand">
      <b-col cols="12" md="4">
        <b-form-group label-for="author" label="Autor">
          <ESelect
            id="author"
            v-model="filters[0]"
            :loading="loadingFilter"
            :options="filtersOptions[0]"
            multiple
            gender="M"
          >
            <template v-slot:allOptionsLabel>
              <span>Todos os autores</span>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="4">
        <b-form-group label-for="gender" label="Gênero">
          <ESelect
            id="gender"
            v-model="filters[1]"
            :loading="loadingFilter"
            :options="filtersOptions[1]"
            multiple
            gender="M"
          >
            <template v-slot:allOptionsLabel>
              <span>Todos os gêneros</span>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="4">
        <b-form-group label-for="theme" label="Temática">
          <ESelect
            id="theme"
            v-model="filters[2]"
            :loading="loadingFilter"
            :options="filtersOptions[2]"
            multiple
          >
            <template v-slot:allOptionsLabel>
              <span>Todas as temáticas</span>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6">
        <b-form-group label-for="theme" label="Campos de atuação">
          <ESelect
            id="theme"
            v-model="filters[3]"
            :loading="loadingFilter"
            :options="filtersOptions[3]"
            multiple
            gender="M"
          >
            <template v-slot:allOptionsLabel>
              <span>Todos os campos de atuação</span>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6">
        <b-form-group label-for="theme" label="Objetivo de aprendizagem">
          <ESelect
            id="theme"
            v-model="filters[4]"
            :loading="loadingFilter"
            :options="filtersOptions[4]"
            multiple
            gender="M"
          >
            <template v-slot:allOptionsLabel>
              <span>Todos os objetivos de aprendizagem</span>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group v-slot="{ ariaDescribedby }" label="Exibir somente:">
          <b-form-checkbox-group
            v-model="enabled"
            :options="unlockedBookOptions"
            :aria-describedby="ariaDescribedby"
            switches
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>

    <div
      class="text-primary text-center font-weight-bolder cursor-pointer"
      @click="filterExpand = !filterExpand"
    >
      <span
        class="material-symbols-outlined font-weight-bolder"
        style="font-size: 16px; vertical-align: middle"
      >
        {{ filterExpand ? 'filter_alt_off' : 'filter_alt' }}
      </span>
      {{ filterExpand ? 'Menos filtros' : 'Mais filtros' }}
      <span class="material-symbols-outlined font-weight-bolder" style="vertical-align: middle">
        {{ filterExpand ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
      </span>
    </div>
  </b-card>
</template>

<script setup>
import { useMeetBooks } from './useMeetBooks'
import ESelect from '@/components/selects/ESelect.vue'
import axiosIns from '@/libs/axios'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import debounce from 'lodash/debounce'
import { getCurrentInstance, ref, watch } from 'vue'

const { classe } = useFilters()
const {
  checkedItems,
  selectAll,
  filters,
  enabled,
  disableMassActions,

  onlyName,
  filtersOptions,
  loadingFilter,
  searchQuery,
  loadingBookAudio,
  enableBookAudio,
  getFilterObject,
  resetFilters,
  fetchFilters,
  search,
  fetchEnableBookAudio,
  changeEnableBookAudio,
} = useMeetBooks()

const vm = getCurrentInstance().proxy

const titleOptions = ref([])
const authorOptions = ref([])
const genderOptions = ref([])
const thematicOptions = ref([])
const filterExpand = ref(false)

const unlockedBookOptions = [
  { text: 'Livros habilitados', value: true },
  { text: 'Livros não habilitados', value: 0 },
]

const switchEnable = async enabledValue => {
  let booksLibraryId = checkedItems.value
  const filterObj = getFilterObject()

  const classId = classe.value.ClassId

  await axiosIns.put('/v2/book-library', {
    ...filterObj,
    booksLibraryId,
    enabled: enabledValue,
    classId,
    batchAction: selectAll.value ? 2 : 1,
  })

  search()

  checkedItems.value = []
  selectAll.value = false
  booksLibraryId = null

  vm.$toast({
    component: Toast,
    props: {
      title: `Livros ${enabledValue ? 'habilitados' : 'desabilitados'} com sucesso!`,
      icon: 'CheckCircleIcon',
      variant: 'success',
    },
  })
}

watch(
  classe,
  async () => {
    const { SerieId } = classe.value
    resetFilters()

    fetchEnableBookAudio()
    await fetchFilters(SerieId)
  },
  { immediate: true }
)

watch(
  enabled,
  debounce(() => {
    search()
  }, 10)
)

watch(
  searchQuery,
  debounce(() => {
    search()
  }, 1500)
)
</script>

<style lang="scss" scoped>
  .fold-filter {
    height: 0px;
    display: none;

    transition: all 200ms ease-out;

    &.fold-open {
      height: auto;
      display: flex;
    }
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    animation: bounce-in 0.5s;
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    animation: bounce-in 0.5s reverse;
  }
</style>