<template>
  <div>
    <div class="ranking-config-filters">
      <b-form-group id="classes-group" class="filters-options" label="Ano escolar">
        <ESelect
          v-model="serie"
          class="filter-chooser filter-items"
          label="name"
          :options="series"
          placeholder="Selecione um ano escolar"
          @input="handleGetClassesConfig"
        >
          <template #noOptions> Nenhum ano escolar encontrado </template>
        </ESelect>
      </b-form-group>
      <div class="filters-options d-flex align-items-center">
        <b-input-group size="md" class="flex-grow-2 search-input">
          <b-input-group-prepend class="search-preppend d-none d-sm-flex">
            <b-button variant="outline-secondary" type="button" class="py-0 px-2 br-0">
              <feather-icon icon="SearchIcon" size="18" />
            </b-button>
          </b-input-group-prepend>
          <b-form-input
            v-model="searchTerm"
            type="text"
            placeholder="Pesquisar"
            class="bl-0 h-100"
          />
        </b-input-group>
      </div>
    </div>
    <div class="wrapper">
      <ranking-card-config
        v-for="classe in filteredClassConfig"
        :key="classe.classId"
        :data="classe"
        @classConfig="updateConfig"
      />
    </div>
  </div>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import {
  editClassConfig,
  getClassesConfig as getClassesConfigService,
} from '@/services/shared/config/Config.Service'
import RankingCardConfig from '@/views/pages/admin-context/shared/components/ranking-card-config/RankingCardConfig.vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton, BFormGroup, BFormInput, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue'
import { ref, computed, onMounted } from 'vue'

const classConfig = ref([])
const serie = ref('')
const series = [
  {
    id: 1,
    name: 'Todas',
  },
  {
    id: 2,
    name: '1 Ano',
  },
  {
    id: 3,
    name: '2 Ano',
  },
  {
    id: 4,
    name: '3 Ano',
  },
  {
    id: 5,
    name: '4 Ano',
  },
  {
    id: 6,
    name: '5 Ano',
  },
]
const searchTerm = ref('')

const filteredClassConfig = computed(() => {
  if (searchTerm.value !== '') {
    return classConfig.value.filter(classe => classe.name.includes(searchTerm.value))
  }
  return classConfig.value
})

const handleGetClassesConfig = async () => {
  await getClassesConfigService().then(response => {
    if (serie.value.id !== 1) {
      classConfig.value = response.data.classConfig
      classConfig.value = classConfig.value.filter(classe =>
        classe.name.includes(serie.value.name),
      )
    } else {
      classConfig.value = response.data.classConfig
    }
  })
}

onMounted(() => {
  handleGetClassesConfig()
  serie.value = series[0]
})

const updateConfig = async data => {
  await editClassConfig(data.id, data).then(() => {
    // $toast is not available in <script setup>, so use global method if available
    // Assume we have access to globalProperties. Otherwise,
    // If in main.js: app.config.globalProperties.$toast = function
    // For now, assume window.$toast is injected globally (for migration)
    if (typeof window.$toast === 'function') {
      window.$toast({
        component: Toast,
        props: {
          text: 'Configuracao atualizada com sucesso',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
    }
  })
}
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: space-between;
  }

  @import '@/assets/scss/variables/_variables.scss';

  .dropdown-options {
    margin-left: auto;

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .search-preppend > button {
    background: $white !important;
    border-color: $color-gray-themeLight !important;
    color: $color-gray-themeLight !important;
    border-right: none !important;
  }

  .table-filter input {
    border-color: $color-gray-themeLight !important;
  }

  .ranking-config-filters {
    display: flex;
    justify-content: space-between;
  }

  .filters-options {
    width: 20%;
  }

  .search-input {
    height: 40px;
  }

  @media (max-width: 600px) {
    .ranking-config-filters {
      display: flex;
      flex-direction: column;
    }

    .filters-options {
      width: 27.9rem;
      margin-bottom: 0.5rem;
    }

    .filters-form {
      display: flex;
      flex-direction: column;
    }

    .filters-form-items {
      margin-bottom: 1rem;
    }

    .custom-button-margin {
      margin-top: 1rem;
    }
  }
</style>
