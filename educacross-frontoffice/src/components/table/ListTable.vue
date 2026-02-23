<template>
  <div>
    <b-card no-body :class="{ 'card-border': border }">
      <slot name="header" />
      <div v-if="showControls" class="m-2">
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="auto"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>{{ $t('show') }}</label>
            <v-select
              v-model="perPage"
              :options="perPageOptions"
              :clearable="false"
              :searchable="false"
              class="per-page-selector d-inline-block mx-50"
            />
          </b-col>

          <b-col v-if="itemView === 'grid-view'" md="auto">
            <slot name="card-view-order" />
          </b-col>

          <!-- Search -->
          <b-col cols="12" md>
            <b-row align-h="end" align-v="center">
              <b-col v-if="showSearchQueryInput" style="max-width: 520px">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      id="searchQueryIcon"
                      @click="focusSearch"
                    >
                      <span class="material-symbols-outlined"> search </span>
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    ref="searchQueryRef"
                    v-model="searchQuery"
                    class="d-inline-block searchQuery"
                    :placeholder="$t(searchPlaceholder)"
                    debounce="500"
                    :type="searchType"
                  />
                </b-input-group>
              </b-col>
              <b-col v-if="showViewSelection" cols="auto">
                <b-form-radio-group
                  v-model="itemView"
                  class="list item-view-radio-group opacity-50"
                  buttons
                  size="sm"
                  button-variant="outline-secondary"
                >
                  <b-form-radio
                    v-for="option in itemViewOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    <feather-icon :icon="option.icon" size="18" />
                  </b-form-radio>
                </b-form-radio-group>
              </b-col>
              <b-col v-if="!!exportToExcel" cols="12" sm="auto">
                <b-button
                  variant="outline-primary"
                  size="sm"
                  class="w-100 mt-2 mt-sm-0 d-flex align-items-center"
                  :class="{ 'cursor-not-allowed': generatingExcel || loading }"
                  style="height: 38px"
                  :disabled="generatingExcel || loading"
                  @click="exportToExcel"
                >
                  <div class="d-flex align-items-center justify-content-center gap-2">
                    <b-spinner v-if="generatingExcel" small></b-spinner>
                    <span
                      v-if="!generatingExcel"
                      class="material-symbols-outlined"
                      style="font-size: 22px"
                    >
                      ios_share
                    </span>
                    <span>Exportar em Excel</span>
                  </div>
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <div class="overflow-hidden w-100">
        <b-skeleton-table
          v-show="itemView === 'list-view'"
          :columns="tableColumns.length"
          :rows="perPage"
          :class="{ 'd-none': !loading }"
        />
      </div>
      <b-table
        v-show="itemView === 'list-view'"
        id="list-table"
        ref="refListTable"
        :class="{ 'd-none': loading }"
        class="position-relative"
        thead-tr-class="thead-row"
        :tbody-tr-class="rowClass"
        :items="dataTable"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :empty-text="emptyText"
        show-empty
        no-local-sorting
        :sticky-header="stickyHeader"
        :sort-by="sortBy"
        :sort-desc="isSortDirDesc"
        @sort-changed="sortChange"
      >
        <template #head="item">
          <div
            v-b-tooltip.html
            :title="$t(item.field.tooltip)"
            class="d-inline-flex align-items-center gap-1 font-weight-bolder text-uppercase"
            :class="item.field.labelClass"
          >
            {{ $t(item.label) }}
            <span
              v-if="item.field.tooltip"
              class="material-symbols-outlined head-icon-info"
              style="font-size: 16px"
            >
              info
            </span>
          </div>
        </template>
        <template #empty>
          <div class="d-flex flex-column align-items-center">
            <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
            <span class="text-center text-primary font-bold" v-html="$t(emptyText)"></span>
          </div>
        </template>
        <template v-for="slotName in scopedSlotNames" v-slot:[slotName]="slotScope">
          <slot :name="slotName" v-bind="slotScope" />
        </template>
      </b-table>

      <div v-show="itemView === 'list-view' && totalData" class="px-1 pt-1 mb-1 border-t">
        <ListTablePagination
          :value="currentPage"
          :total-data="totalData"
          :per-page="perPage"
          @input="changePage"
        />
      </div>
      <!-- end table-view -->
    </b-card>
    <!-- grid-view -->
    <div v-show="itemView === 'grid-view'" v-if="showViewSelection || itemView === 'grid-view'">
      <b-skeleton-wrapper :loading="loading" class="w-100">
        <template #loading>
          <div class="h-100">
            <b-row class="match-height">
              <b-col
                v-for="index in Math.floor(12 / columns)"
                :key="index"
                sm="12"
                md="6"
                :lg="columns"
                class="mb-2"
              >
                <b-skeleton type="card" height="300px" class="w-100 rounded" />
              </b-col>
            </b-row>
          </div>
        </template>
        <b-row class="match-height">
          <b-col v-for="(data, index) in dataTable" :key="index" sm="12" md="6" :lg="columns">
            <slot name="card" :data="data" />
          </b-col>
          <b-col v-if="!dataTable.length" class="text-center mb-2">
            <div class="d-flex flex-column align-items-center">
              <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
              <span class="text-center" v-html="$t(emptyText)"></span>
            </div>
          </b-col>
        </b-row>
      </b-skeleton-wrapper>
      <b-card v-show="totalData">
        <ListTablePagination
          v-show="totalData"
          :value="currentPage"
          :total-data="totalData"
          :per-page="perPage"
          @input="changePage"
        />
      </b-card>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, useSlots } from 'vue'
import ListTablePagination from './ListTablePagination'
import MissionMath from '@/assets/icons/mission-icons/MissionMath.vue'
import MissionMathIng from '@/assets/icons/mission-icons/MissionMathIng.vue'
import MissionPort from '@/assets/icons/mission-icons/MissionPort.vue'
import vSelect from 'vue-select'

// Props
const props = defineProps({
  tableColumns: {
    required: true,
    type: Array,
  },
  dataTable: {
    required: true,
    type: Array,
  },
  showViewSelection: {
    required: false,
    type: Boolean,
    default: false,
  },
  totalData: {
    required: true,
    type: Number,
  },
  columns: {
    required: false,
    type: Number,
    default: 4,
  },
  emptyText: {
    required: false,
    type: String,
    default: 'noInformationFound',
  },
  searchPlaceholder: {
    required: false,
    type: String,
    default: 'search',
  },
  searchType: {
    required: false,
    type: String,
    default: 'text',
  },
  perPageOptions: {
    type: Array,
    default: () => [5, 10, 25, 50, 100],
  },
  loading: {
    required: false,
    type: Boolean,
    default: false,
  },
  rowClass: {
    required: false,
    default: 'tbody-row',
  },
  showSearchQueryInput: {
    required: false,
    default: true,
    type: Boolean,
  },
  perPageDefault: {
    type: Number,
    default: 10,
  },
  generatingExcel: {
    required: false,
    default: false,
    type: Boolean,
  },
  exportToExcel: {
    type: Function,
    required: false,
  },
  border: {
    required: false,
    default: false,
    type: Boolean,
  },
  /** @type {{import('vue').PropOptions<'list-view'| 'grid-view'>}} */
  itemViewDefault: {
    type: String,
    default: 'list-view',
    required: false,
  },
  stickyHeader: {
    type: [Boolean, String],
    default: false,
    required: false,
  },
  defaultSortBy: {
    type: String,
    default: '',
  },
  defaultSortDesc: {
    type: Boolean,
    default: false,
  },
  showControls: {
    type: Boolean,
    default: true,
  },
})

// Emits
const emit = defineEmits(['change'])

// Local refs
const refListTable = ref(null)
const searchQueryRef = ref(null)

// State
const itemViewOptions = [
  { icon: 'GridIcon', value: 'grid-view' },
  { icon: 'ListIcon', value: 'list-view' },
]

const itemView = ref(props.itemViewDefault)
const perPage = ref(props.perPageDefault)
const currentPage = ref(1)
const sortBy = ref(props.defaultSortBy)
const isSortDirDesc = ref(props.defaultSortDesc)
const searchQuery = ref('')

// Utility for dynamic scoped slots
const slots = useSlots()
const scopedSlotNames = computed(() => {
  return Object.keys(slots)
})

// Methods
const sortChange = sort => {
  if (sort.sortBy === '') return
  sortBy.value = sort.sortBy
  isSortDirDesc.value = sort.sortDesc
  emitToFetch()
}

const emitToFetch = () => {
  emit('change', {
    perPage: perPage.value,
    currentPage: currentPage.value,
    sortBy: sortBy.value,
    isSortDirDesc: isSortDirDesc.value,
    searchQuery: searchQuery.value,
  })
}

const resetPage = () => {
  currentPage.value = 1
}

const changePage = page => {
  currentPage.value = page
  emitToFetch()
}

watch([perPage, searchQuery], () => {
  currentPage.value = 1
  emitToFetch()
})

// Search icon click: focus input
const focusSearch = () => {
  if (searchQueryRef.value && searchQueryRef.value.$el) {
    searchQueryRef.value.$el.focus()
  }
}

// Expose methods for parent components
defineExpose({
  resetPage,
})
</script>

<style lang="scss" scoped>
.searchQuery {
  border-left: 0;
  padding-left: 0;
}

#searchQueryIcon {
  .material-symbols-outlined {
    font-size: 18px;
  }
}

.per-page-selector {
  width: 90px;
  min-width: 90px;
}

.card-border {
  border: 1px solid #d8d6de;
  box-shadow: none;
}
</style>
<style lang="scss">
#list-table {
  .thead-row {
    th {
      vertical-align: middle !important;

      div {
        text-transform: uppercase;
        font-weight: 600;
      }
    }
  }
}
</style>