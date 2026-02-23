<template>
  <div id="dynamicTable">
    <div v-if="totalLicenses && usedLicenses" class="licenses color-grayTheme column-order">
      <span
        ><span style="font-weight: bold">
          Licenças Consumidas: {{ formatNumber(usedLicenses) }}
        </span>
        de <span style="font-weight: bold">{{ formatNumber(totalLicenses) }}</span></span
      >
      <span
        ><span style="font-weight: bold">{{
          formatNumber(filterListByTab(tabIndex).length)
        }}</span>
        acessos de
        {{ labelName }}
      </span>
    </div>
    <div class="mb-1">
      <div class="table-options-container gap-5">
        <table-actions
          v-if="massActions && showActions"
          class="table-actions"
          :mass-actions="massActions"
          :button-name="buttonName"
          :selecteds="selected"
          @click-button="createClick()"
        />

        <table-filter
          v-if="showFilter"
          :search-drop="searchDrop"
          :show-list-by-card="showListByCard"
          class="ml-auto table-filter column-order"
          @change-show-list-by-card="toggleListByCard"
          @setSearchTerm="setSearchTerm"
          @setClassFilter="setClassName"
        />
        <b-row
          v-if="hasImportButton && hasAdminPermission"
          class="d-flex align-items-center justify-content-end"
        >
          <b-col cols="12" md="4" sm="12" lg="12">
            <b-button
              v-if="
                ($route.meta.importButton.permissions &&
                  $can(
                    $route.meta.importButton.permissions.action,
                    $route.meta.importButton.permissions.resource,
                  )) ||
                !$route.meta.importButton.permissions
              "
              class="w-full"
              variant="primary"
              type="filled"
              @click="$route.meta.importButton.click"
            >
              {{ importButtonText }}
            </b-button>
          </b-col>
        </b-row>
      </div>
    </div>

    <div>
      <b-tabs v-if="tabs" v-model="tabIndex">
        <b-tab v-for="tab in tabs" :key="tab.key" :title="tab.name" @click="changeTab(tab.name)" />
      </b-tabs>

      <template v-if="!oldPaginate">
        <template v-if="massSelected && paginationProp?.total / paginationProp?.pageSize > 1">
          <select-all-component
            v-if="allSelected && selected.length > 0"
            v-model="allSelectedInMass"
            :selected-number="selected.length"
            :used-licenses="paginationProp?.total"
            :role="role"
            :search-filter-message="className"
            :search-term-message="searchTerm"
            @massSelect="massSelect($event)"
          />
        </template>
      </template>
      <template v-else>
        <template v-if="massSelected && !paginationProp && rows / perPage > 1">
          <select-all-component
            v-if="allSelected && selected.length > 0"
            v-model="allSelectedInMass"
            :selected-number="selected.length"
            :used-licenses="data.length"
            :role="role"
            :search-filter-message="className"
            :search-term-message="searchTerm"
            @massSelect="massSelect($event)"
          />
        </template>
      </template>
      <b-table
        ref="selectableTable"
        :fields="config.tableFields"
        :items="data"
        :per-page="showPagination ? perPage : filterListByTab(tabIndex).length"
        :current-page="currentPage"
        :filter="searchTerm"
        select-mode="multi"
        responsive
        selectable
        show-empty
        :busy="busy"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        @row-selected="onRowSelected"
        @filtered="onFiltered"
      >
        <template v-slot:empty>
          <h4>{{ noDataMessage }}</h4>
        </template>
        <template v-slot:emptyfiltered>
          <h4>Nenhum dado encontrado</h4>
        </template>
        <template v-slot:table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle" variant="primary" />
          </div>
        </template>
        <template v-if="hasSelectAllRows" #head(selected)>
          <b-form-checkbox
            :id="`checkAll-${role}`"
            v-model="allSelected"
            name="checkAll"
            :indeterminate="indeterminate"
            aria-describedby="students"
            aria-controls="students"
            @change="toggleAll"
          />
        </template>
        <template #head(status)="item">
          <div class="d-flex align-items-center justify-content-center gap-2">
            <span>{{ item.label }}</span>
            <b-icon id="tooltipTriggerIcon" class="mr-1" icon="info-circle" />
          </div>
          <b-tooltip target="tooltipTriggerIcon" :title="tooltipStatusMessage" placement="top" />
        </template>
        <template v-if="hasSelectAllRows" #cell(selected)="item">
          <b-form-checkbox
            :id="`check-${role}-${item.index}`"
            name="check"
            :checked="item.rowSelected"
            @change="selectRow(item.index, item.rowSelected)"
          />
        </template>
        <template #cell()="data">
          <component
            :is="data.field.componentNameTag"
            v-if="data.field.componentNameTag"
            :content="data.item"
            :is-card="showListByCard"
          />
          <template v-else>
            <span class="word-break">{{ data.value }}</span>
          </template>
        </template>
        <template #cell(actions)="data">
          <div v-if="actions" class="d-flex gap-1" @click.stop>
            <div v-for="action in actions" :key="action.id">
              <component
                :is="action.componentName"
                v-if="action.componentName"
                v-b-tooltip.hover.top="runActionLabel(action.label, data.item)"
                :content="data.item"
                @action="action.action"
              />
              <feather-icon
                v-else
                v-show="!action.showBy || action.showBy(data.item)"
                v-b-tooltip.hover.top="runActionLabel(action.label, data.item)"
                :icon="action.icon"
                :variant="action.color"
                :label="action.label"
                class="customFeather"
                :class="{ disabled: verifyDisabled(action.disabled, data.item) }"
                @click="
                  action.name === 'edit'
                    ? editClick(data.item)
                    : verifyDisabled(action.disabled, data.item)
                    ? null
                    : action.action(data.item)
                "
              />
            </div>
          </div>
        </template>
      </b-table>
      <template v-if="oldPaginate">
        <b-pagination
          v-if="showPagination && !paginationProp && data.length > 0"
          v-model="currentPage"
          first-number
          last-number
          class="pagination"
          hide-goto-end-buttons
          :total-rows="rows"
          :per-page="perPage"
          @input="resetCheckbox"
        />
      </template>
      <template v-else>
        <b-pagination
          v-if="showPagination && paginationProp"
          v-model="paginationProp.currentPage"
          first-number
          last-number
          class="pagination"
          hide-goto-end-buttons
          :total-rows="paginationProp.total"
          :per-page="paginationProp.pageSize"
          @change="handleChangePage"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import SelectAllComponent from '@components/SelectAll'
import {
  BFormCheckbox,
  BPagination,
  BSpinner,
  BTab,
  BTabs,
  CardPlugin,
  LayoutPlugin,
  TablePlugin,
} from 'bootstrap-vue'
import Vue from 'vue'
import { formatNumber } from '@/filters/filters'

const AuthorNameWithPhoto = () => import('../../table-columns-components/AuthorNameWithPhoto.vue')
const Classes = () => import('../../table-columns-components/Classes.vue')
const Date = () => import('../../table-columns-components/Date.vue')
const EmailStatus = () => import('../../table-columns-components/EmailStatus.vue')
const EmailStatusError = () => import('../../table-columns-components/EmailStatusError.vue')
const EnabledStatus = () => import('../../table-columns-components/EnabledStatus.vue')
const ImportStatus = () => import('../../table-columns-components/ImportStatus.vue')
const InitialsList = () => import('../../table-columns-components/InitialsList.vue')
const InitialsWithName = () => import('../../table-columns-components/InitialsWithName.vue')
const LearningTime = () => import('../../table-columns-components/LearningTime.vue')
const MissionType = () => import('../../table-columns-components/MissionType.vue')
const NameClasses = () => import('../../table-columns-components/NameClasses')
const NameListWithPhoto = () => import('../../table-columns-components/NameListWithPhoto.vue')
const NameWithPhoto = () => import('../../table-columns-components/NameWithPhoto.vue')
const PercentageStatus = () => import('../../table-columns-components/PercentageStatus.vue')
const PerformaceBarWithLabel = () => import('../../table-columns-components/PerformaceBarWithLabel.vue')
const ProgressBar = () => import('../../table-columns-components/ProgressBar.vue')
const ProgressBarWithLabel = () => import('../../table-columns-components/ProgressBarWithLabel.vue')
const ProgressStatus = () => import('../../table-columns-components/ProgressStatus.vue')
const Status = () => import('../../table-columns-components/Status.vue')
const StudentNameBold = () => import('../../table-columns-components/StudentNameBold.vue')
const ValidInvalidRow = () => import('../../table-columns-components/ValidInvalidRow.vue')
const Pagination = () => import('../pagination/Pagination.vue')
const TableActions = () => import('../table-actions/TableActions.vue')
const TableFilter = () => import('../table-filter/TableFilter.vue')
const SponsorEmail = () => import('../../table-columns-components/SponsorEmail.vue')
const UserName = () => import('../../table-columns-components/UserName.vue')
const TableListInitialsTeacher = () => import('../../table-columns-components/TableListInitialsTeacher.vue')
const LanguageActionSelector = () => import('../../table-columns-components/LanguageActionSelector.vue')

// BootstrapVue plugins (side effect, legacy)
Vue.use(LayoutPlugin).use(CardPlugin).use(TablePlugin)

// Props
const props = defineProps({
  data: { type: Array, required: true },
  role: { type: String, required: true },
  actions: { type: Array, required: false, default: null },
  config: { type: Object },
  massActions: { type: Array, default: null, required: false },
  buttonName: { type: String, default: null },
  searchDrop: { type: String, default: null },
  labelName: { type: String, default: null },
  totalLicenses: { type: Number, default: null },
  usedLicenses: { type: Number, default: null },
  showActions: { type: Boolean, default: true },
  showFilter: { type: Boolean, default: true },
  showBy: { type: String, default: '' },
  pagination: { type: Object, default: null },
  tabs: { type: Array, default: null },
  perPage: { type: Number, default: 10, required: false },
  busy: { type: Boolean, default: false },
  modalEdit: { type: Boolean, default: false },
  showPagination: { type: Boolean, default: true, required: false },
  hasSelectAllRows: { type: Boolean, default: false, required: false },
  massSelected: { type: Boolean, default: false },
  paginationProp: { type: Object, required: false },
  oldPaginate: { type: Boolean, default: false },
  noDataMessage: { type: String, default: 'No momento não temos dados para esse relatório' },
  tooltipStatusMessage: {
    type: String,
    require: false,
    default: 'Status referente ao vínculo do cadastro',
  },
})

// Emits
const emit = defineEmits([
  'setSelecteds',
  'allItensSelected',
  'orderBy',
  'fetch-data',
  'event',
  'edit',
])

import store from '@/store'
import { computed, ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'

// Reactive state
const selected = ref([])
const checked = ref(true)
const unchecked = ref(false)
const allSelectedInMass = ref(false)
const indeterminate = ref(false)
const showListByCard = ref(true)
const viewModeChanged = ref(false)
const searchTerm = ref('')
const tabIndex = ref(0)
const currentPage = ref(1)
const className = ref('')
const classId = ref(null)
const studentEdit = ref(false)
const countFilteredRows = ref(0)
const clearMassSelect = ref(false)
const currentTab = ref('Todos')
const sortBy = ref('')
const sortDesc = ref(false)
const inputValue = ref('')
const allSelected = ref(false)

// Table ref
const selectableTable = ref(null)

// Router and route
const router = useRouter()
const route = useRoute()

// Computed
const hasImportButton = computed(() => {
  return route.meta.importButton
})

const hasAdminPermission = computed(() => {
  const roleComputed = store.getters.accessRole
  return roleComputed === 'Secretariat'
})

const importButtonText = computed(() => {
  return route.meta.importButton?.text
})

const rows = computed(() => {
  if (searchTerm.value.length > 0) {
    return countFilteredRows.value
  }
  return filterListByTab(tabIndex.value).length
})

const showEmpty = computed(() => {
  return filterListByTab(tabIndex.value).length === 0 && !props.busy
})

const showSelectAllComponent = computed(() => {
  return classId.value || searchTerm.value
})

// Watchers
watch(selected, () => {
  updateAllSelected()
  emit('setSelecteds', selected.value)
})

watch(allSelectedInMass, (value) => {
  emit('allItensSelected', value)
})

watch(() => props.data, () => {
  updateAllSelected()
  if (allSelectedInMass.value) {
    // Using nextTick to emulate async
    setTimeout(() => {
      toggleAll(true)
      allSelectedInMass.value = true
    }, 0)
  }
})

watch(sortBy, () => {
  handleEmitSort(!sortDesc.value)
})

watch(sortDesc, () => {
  handleEmitSort(!sortDesc.value)
})

watch(allSelected, () => {
  emit('allItensSelected', clearMassSelect.value)
})

// Created logic
onMounted(() => {
  studentEdit.value = props.modalEdit
  // User role from store
  // This isn't used directly, keeping legacy
  // userRole = store.getters.accessRole

  // Compute componentNameTag for tableFields and cardFields
  props.config.tableFields.forEach(field => {
    if (field.componentName) {
      field.componentNameTag = field.componentName
        .match(/[A-Z][a-z]+/g)
        .join('-')
        .toLowerCase()
    }
  })

  props.config.cardFields.forEach(field => {
    if (field.componentName) {
      field.componentNameTag = field.componentName
        .match(/[A-Z][a-z]+/g)
        .join('-')
        .toLowerCase()
    }
  })
})

// Methods
function clearSelected() {
  if (selectableTable.value && selectableTable.value.clearSelected) {
    selectableTable.value.clearSelected()
  }
  allSelected.value = false
  allSelectedInMass.value = false
}

function updateAllSelected() {
  allSelected.value =
    selected.value.length === props.data.length && props.data.length > 0
}

function handleEmitSort(ascending) {
  if (props.tabs) {
    const clickedTab = props.tabs.find(tab => tab.name === currentTab.value)
    emit('orderBy', {
      status: clickedTab.key,
      searchTerm: searchTerm.value,
      classId: classId.value,
      orderBy: sortBy.value,
      ascending: ascending.toString(),
    })
  } else {
    emit('orderBy', {
      searchTerm: searchTerm.value,
      classId: classId.value,
      orderBy: sortBy.value,
      ascending: ascending.toString(),
    })
  }
}

function handleChangePage(currentPg) {
  if (props.tabs) {
    const clickedTab = props.tabs.find(tab => tab.name === currentTab.value)
    emit('fetch-data', {
      status: clickedTab.key,
      searchTerm: searchTerm.value,
      classId: classId.value,
      orderBy: sortBy.value,
      ascending: `${!sortDesc.value}`,
      currentPage: currentPg,
    })
  } else {
    emit('fetch-data', {
      searchTerm: searchTerm.value,
      classId: classId.value,
      orderBy: sortBy.value,
      ascending: `${!sortDesc.value}`,
      currentPage: currentPg,
    })
  }
}

function resetCheckbox() {
  allSelected.value = false
}

function runActionLabel(label, data) {
  if (label instanceof Function) {
    return label(data)
  }
  return label
}

function verifyDisabled(disabled, data) {
  if (disabled instanceof Function) {
    return disabled(data)
  }
  if (typeof disabled === 'boolean') {
    return disabled
  }
  return false
}

function onFiltered(filteredData) {
  countFilteredRows.value = filteredData.length
}

function filterListByTab(option) {
  switch (option) {
    case 0:
      if (className.value === '' || className.value === 'Todas as turmas') {
        return props.data
      }
      return props.data.filter(table => table.className === className.value)
    case 1:
      if (className.value === '' || className.value === 'Todas as turmas') {
        return props.data.filter(table => table.status === 'Ativo')
      }
      return props.data.filter(
        table => table.status === 'Ativo' && table.className === className.value,
      )
    case 2:
      if (className.value === '' || className.value === 'Todas as turmas') {
        return props.data.filter(table => table.status === 'Pendente')
      }
      return props.data.filter(
        table => table.status === 'Pendente' && table.className === className.value,
      )
    case 3:
      if (className.value === '' || className.value === 'Todas as turmas') {
        return props.data.filter(table => table.status === 'Rejeitado')
      }
      return props.data.filter(
        table => table.status === 'Rejeitado' && table.className === className.value,
      )
    default:
      return props.data
  }
}

function setSearchTerm(term) {
  if (term !== inputValue.value) {
    inputValue.value = term
    searchTerm.value = term
    handleChangePage(1)
  }
}

function setClassName({ classe }) {
  className.value = classe.name
  classId.value = classe.classId
  handleChangePage(1)
}

function setClassFilter(term) {
  searchTerm.value = term
  handleChangePage(1)
}

function onRowSelected(items) {
  selected.value = items
}

function selectRow(index, selectedRow = false) {
  if (selectableTable.value) {
    if (selectedRow) {
      if (selectableTable.value.unselectRow) {
        selectableTable.value.unselectRow(index)
      }
      allSelectedInMass.value = false
    } else {
      if (selectableTable.value.selectRow) {
        selectableTable.value.selectRow(index)
      }
    }
  }
}

function getColorToStatus(status) {
  switch (status) {
    case 'Ativo':
      return 'success'
    case 'Pendente':
      return 'warning'
    case 'Recusado':
      return 'danger'
    default:
      return ''
  }
}

function toggleAll(value) {
  if (selectableTable.value) {
    if (value) {
      if (selectableTable.value.selectAllRows) {
        selectableTable.value.selectAllRows()
      }
    } else {
      if (selectableTable.value.clearSelected) {
        selectableTable.value.clearSelected()
      }
    }
  }
}

function toggleListByCard(status) {
  if (status === showListByCard.value) {
    return
  }
  showListByCard.value = status
  const selectedInner = selected.value
  setTimeout(() => {
    if (selectableTable.value) {
      if (selectableTable.value.clearSelected) {
        selectableTable.value.clearSelected()
      }
      selectedInner.forEach(item => {
        if (selectableTable.value.selectRow) {
          selectableTable.value.selectRow(props.data.indexOf(item))
        }
      })
    }
  }, 0)
}

function isMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  ) {
    return true
  }
  return false
}

function createClick() {
  emit('event', 'create-click')
}

function editClick(data) {
  if (props.modalEdit) {
    emit('edit', data)
  } else {
    router.push({
      name: 'editStudentAdmin',
      params: {
        studentId: data.id,
      },
    })
  }
}

function massSelect(value) {
  clearMassSelect.value = !clearMassSelect.value
  emit('allItensSelected', clearMassSelect.value)
  if (value) {
    toggleAll(clearMassSelect.value)
  }
}

function changeTab(value) {
  const clickedTab = props.tabs.find(tab => tab.name === value)
  allSelected.value = false
  currentTab.value = value
  emit('fetch-data', {
    status: clickedTab.key,
    searchTerm: searchTerm.value,
    classId: classId.value,
    currentPage: 1,
  })
}
</script>

<style lang="scss">
  #dynamicTable {
    .disabled {
      color: #e6e6e6;
      cursor: not-allowed !important;
    }
    table {
      padding: 0 !important;
      border-collapse: separate;
      border-spacing: 0 1rem;
      .custom-checkbox {
        width: fit-content;
        margin: auto;
      }
      thead {
        tr {
          th {
            border: none !important;
            padding: 10px 15px !important;
            font-size: 16px !important;
            color: #2c2c2c !important;
            font-weight: 400 !important;
          }
        }
      }
      tbody {
        tr {
          background: #fff;

          &.b-table-row-selected {
            box-shadow: 0 0 1px 0 rgba(110, 99, 232, 1) !important;
            // transform: translate(0) !important;
            //background: rgba(110, 99, 232, 0.05) !important;
          }
          &:hover {
            // z-index: 200;
            // transform: translateY(-4px);
          }
        }
      }
    }

    .table-options-container {
      display: flex;
    }

    @media (max-width: 1024px) {
      .table-options-container {
        flex-direction: column;
        justify-content: flex-start;
      }
    }

    .b-table-empty-row {
      background: inherit;
      box-shadow: none;
      text-align: center;
    }
  }
</style>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';
  .card {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 1 30%;

    padding: 1.5rem 1rem 1.5rem 1rem;
    margin: 0.75rem 0.5rem;

    min-width: 300px;

    box-shadow: none;

    &:hover {
      box-shadow: 0 2px 8px rgba(0 0 0 / 14%);
    }
  }

  .word-break {
    word-break: break-word;
  }

  .pagination {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
  }
  .grid {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .content-data {
    padding-left: 1.5rem;

    & > div {
      width: fit-content;
    }

    &:nth-child(2) {
      flex-grow: 2;
      align-self: center;
    }
  }

  .customFeather {
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-3px);
    }
  }

  // .icon-tab-action {
  //   margin: 5px 1px !important;
  // }

  .classes-count {
    border-radius: 50%;
    padding: 0 0.5rem;
  }

  .action-exclude a {
    color: $danger;

    &:hover {
      background: rgba($danger, 0.12);
      color: $danger;
    }
  }

  .licenses {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.5rem;
  }

  @media (max-width: 655px) {
    .card {
      margin-left: 0rem;
      margin-right: 0rem;
    }
  }

  @media (max-width: 600px) {
    .column-order {
      display: flex;
      flex-direction: column;
    }

    .selects {
      width: 27.5rem;
      margin-right: 0.5rem;
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

    .table-options {
      .table-filter {
        width: 100% !important;
        margin-top: 0.5rem;
        margin-left: 0 !important;
      }
    }

    @media (max-width: 414px) {
      .table-options {
        width: 100% !important;
        .table-filter {
          display: flex;
          flex-direction: row;
          align-items: center !important;
          justify-content: flex-start !important;
          margin: 0.5rem 0 0 0 !important;
          padding: 0 !important;
        }
      }
      .selects {
        width: 100% !important;
      }
      .table-actions {
        display: flex;
        flex-direction: row;
        width: 100% !important;
      }
    }
  }
</style>