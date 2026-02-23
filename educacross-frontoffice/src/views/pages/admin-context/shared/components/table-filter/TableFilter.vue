<template>
  <div v-if="searchDrop" class="d-flex filter-options" :class="isMobileSize ? 'w-50' : 'w-100'">
    <b-input-group size="lg" class="selects classes w-100">
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
        debounce="600"
        @input="changeSearchTerm"
      />
    </b-input-group>

    <div v-if="false" class="d-flex toggle-list">
      <b-button
        :class="`p-01 ${showListByCard ? 'active' : 'desactive'}`"
        :active="showListByCard"
        active-class="active"
        variant="outline-secondary"
        @click="changeShowListByCard(true)"
      >
        <feather-icon icon="GridIcon" size="18" />
      </b-button>
      <b-button
        :class="`p-01 ${!showListByCard ? 'active' : 'desactive'}`"
        :active="!showListByCard"
        active-class="active"
        variant="outline-secondary"
        @click="changeShowListByCard(false)"
      >
        <feather-icon icon="ListIcon" size="18" />
      </b-button>
    </div>
  </div>
</template>

<script setup>
import SchoolYearBadge from '@components/SchoolYearBadge'
import VSelect from 'vue-select'

// Props
const props = defineProps({
  showListByCard: { type: Boolean, required: true },
  searchDrop: { type: String, default: null },
})

// Emits
const emit = defineEmits(['change-show-list-by-card', 'setSearchTerm', 'setClassFilter'])

// Reactive State
import { ref, onMounted, onUnmounted } from 'vue'

const searchTerm = ref('')
const classList = ref([])
const filters = ref({
  classe: 'Todas as turmas',
})
const classListLoading = ref(false)
const isMobileSize = ref(null)

// Methods
const changeShowListByCard = (status) => {
  emit('change-show-list-by-card', status)
}

let searchTimeout = null
const changeSearchTerm = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    emit('setSearchTerm', searchTerm.value)
  }, 600)
}

const changeClassName = () => {
  emit('setClassFilter', filters.value)
}

const handleResize = () => {
  isMobileSize.value = window.innerWidth > 1024
}

// Lifecycle
onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';

  .dropdown-options {
    margin-left: auto;

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .options-table {
    display: flex;
    justify-content: space-between;
  }

  .p-01 {
    padding: 0.7rem !important;
  }

  .active {
    border-color: $color-gray-themeLight !important;
    color: $primary !important;
    background: $white !important;
  }

  .desactive {
    border-color: $color-gray-themeLight !important;
    color: $color-gray-themeLight !important;
    background: $white !important;
  }

  .toggle-list {
    & > button:first-child {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }

    & > button:last-child {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      border-left: none !important;
    }
  }

  .search-preppend > button {
    background: $white !important;
    border-color: $color-gray-themeLight !important;
    color: $color-gray-themeLight !important;
    border-right: none !important;
    padding: 8px 8px !important;
  }

  .table-filter input {
    border-color: $color-gray-themeLight !important;
  }

  .search-padding {
    padding-top: 0rem;
    padding-left: 0.5rem;
  }

  .selects {
    height: 40px;
  }

  .class-badge {
    display: flex;
    align-items: center;

    .select-badge {
      margin-top: 4px;
      margin-left: 8px !important;
    }
  }

  .class-badge {
    display: flex;
    align-items: center;

    .select-badge {
      margin-top: 4px;
      margin-left: 8px !important;
    }
  }

  @media (max-width: 575px) {
    .table-filter {
      display: flex;
      flex-direction: column !important;
    }

    .classes {
      margin-top: 0.5rem !important;
      margin-bottom: 0.5rem !important;
    }

    .table-filter input {
      border-top-left-radius: 0.357rem !important;
      border-bottom-left-radius: 0.357rem !important;
    }

    .toggle-list {
      display: none !important;
    }

    .tipo-dropdown {
      margin-right: 0 !important;
    }

    .search-padding {
      padding-top: 0rem;
      padding-left: 0rem;
      width: 100% !important;
    }

    .selects {
      width: 100% !important;
      height: 38px;
      margin-right: 0 !important;
    }

    @media (min-width: 600px) and (max-width: 820px) {
      .table-filter {
        display: flex;
        flex-direction: row !important;
        width: 20% !important;
      }

      .selects {
        height: 40px !important;
      }
    }
  }
</style>