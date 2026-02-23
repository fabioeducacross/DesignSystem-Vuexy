<template>
  <div id="dynamicTablePaginated">
    <div class="overflow">
      <b-tabs v-if="tabs" v-model="tabIndex">
        <b-tab v-for="tab in tabs" :key="tab.key" :title="tab.name" />
      </b-tabs>

      <b-table
        ref="selectableTable"
        :fields="config.tableFields"
        :items="filterListByTab(tabIndex)"
        :filter="searchTerm"
        responsive="sm"
        :busy="busy"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :no-local-sorting="noLocalSorting"
        show-empty
        @row-selected="onRowSelected"
      >
        <template v-slot:empty>
          <h4>No momento não temos dados para esse relatório</h4>
        </template>
        <template v-slot:emptyfiltered>
          <h4>Nenhum dado encontrado</h4>
        </template>
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle" variant="primary" />
          </div>
        </template>
        <template #head(selected)>
          <b-form-checkbox
            :id="`checkAll-${role}`"
            name="checkAll"
            :checked="selectAll"
            @change="toggleAll"
          />
        </template>
        <template #head()="data">
          <span class="head-section">
            {{ data.label }}
            <span
              v-if="data.field.tip"
              v-b-tooltip="data.field.tip"
              class="material-symbols-outlined"
              style="font-size: 20px; margin-left: 5px"
            >
              info
            </span>
          </span>
        </template>

        <template #cell(selected)="item">
          <b-form-checkbox
            :id="`check-${role}-${item.index}`"
            name="check"
            :checked="item.rowSelected"
            @change="onRowSelected(item)"
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
            {{ data.value }}
          </template>
        </template>
        <template #cell(actions)="data">
          <b-container v-if="actions">
            <b-row align-v="center">
              <b-col
                v-for="action in actions"
                :key="action.id"
                cols="auto"
                class="p-0 icon-tab-action"
                @click.stop
              >
                <feather-icon
                  v-if="(!action.showBy || action.showBy(data)) && role !== 'mission'"
                  v-b-tooltip="action.label"
                  :icon="action.icon"
                  :variant="action.color"
                  :label="action.label"
                  :class="`customFeather ${action.class ? action.class : ''}`"
                  :aria-disabled="action.disabled ? action.disabled(data) : false"
                  @click="actionHandler(action, data)"
                />
                <feather-icon
                  v-else
                  v-b-tooltip="runActionLabel(action.label, data.item)"
                  :icon="action.icon"
                  :variant="action.color"
                  :label="action.label"
                  class="customFeather"
                  :class="`customFeather ${action.class ? action.class : ''} ${
                    verifyDisabled(action.disabled, data.item) ? 'disabled' : ''
                  }`"
                  :aria-disabled="
                    action.disabled ? verifyDisabled(action.disabled, data.item) : false
                  "
                  @click="
                    action.name === 'edit'
                      ? editClick(data.item)
                      : verifyDisabled(action.disabled, data.item)
                      ? null
                      : action.action(data.item)
                  "
                />
              </b-col>
            </b-row>
          </b-container>
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        first-number
        last-number
        class="pagination"
        hide-goto-end-buttons
        :total-rows="rows"
        :per-page="perPage"
      />
    </div>
  </div>
</template>

<script setup>
import AuthorNameWithPhoto from '../../table-columns-components/AuthorNameWithPhoto.vue'
import Classes from '../../table-columns-components/Classes.vue'
import Date from '../../table-columns-components/Date.vue'
import Duration from '../../table-columns-components/Duration.vue'
import EmailStatus from '../../table-columns-components/EmailStatus.vue'
import EmailStatusError from '../../table-columns-components/EmailStatusError.vue'
import Enabled from '../../table-columns-components/Enabled.vue'
import EnabledStatus from '../../table-columns-components/EnabledStatus.vue'
import ImageIconBook from '../../table-columns-components/ImageIconBook.vue'
import ImportStatus from '../../table-columns-components/ImportStatus.vue'
import InitialsList from '../../table-columns-components/InitialsList.vue'
import InitialsWithName from '../../table-columns-components/InitialsWithName.vue'
import LearningTime from '../../table-columns-components/LearningTime.vue'
import MissionName from '../../table-columns-components/MissionName.vue'
import MissionNameNoType from '../../table-columns-components/MissionNameNoType.vue'
import MissionStatus from '../../table-columns-components/MissionStatus.vue'
import MissionType from '../../table-columns-components/MissionType.vue'
import NameClasses from '../../table-columns-components/NameClasses'
import NameListWithPhoto from '../../table-columns-components/NameListWithPhoto.vue'
import NameWithPhoto from '../../table-columns-components/NameWithPhoto.vue'
import PercentageStatus from '../../table-columns-components/PercentageStatus.vue'
import PerformaceBarWithLabel from '../../table-columns-components/PerformaceBarWithLabel.vue'
import ProgressBar from '../../table-columns-components/ProgressBar.vue'
import ProgressBarWithLabel from '../../table-columns-components/ProgressBarWithLabel.vue'
import ProgressFinished from '../../table-columns-components/ProgressFinished.vue'
import ProgressStatus from '../../table-columns-components/ProgressStatus.vue'
import RankingStatus from '../../table-columns-components/RankingStatus.vue'
import Status from '../../table-columns-components/Status.vue'
import ValidInvalidRow from '../../table-columns-components/ValidInvalidRow.vue'
import Pagination from '../pagination/Pagination.vue'
import TableActions from '../table-actions/TableActions.vue'
import TableFilter from '../table-filter/TableFilter.vue'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import {
  BFormCheckbox,
  BPagination,
  BSpinner,
  BTab,
  BTabs,
  BootstrapVueIcons,
  CardPlugin,
  LayoutPlugin,
  TablePlugin,
} from 'bootstrap-vue'
import Vue from 'vue'

Vue.use(LayoutPlugin)
Vue.use(CardPlugin)
Vue.use(TablePlugin)
Vue.use(BootstrapVueIcons)

const componentRegistry = {
  AuthorNameWithPhoto,
  Classes,
  Date,
  Duration,
  EmailStatus,
  EmailStatusError,
  Enabled,
  EnabledStatus,
  ImageIconBook,
  ImportStatus,
  InitialsList,
  InitialsWithName,
  LearningTime,
  MissionName,
  MissionNameNoType,
  MissionStatus,
  MissionType,
  NameClasses,
  NameListWithPhoto,
  NameWithPhoto,
  PercentageStatus,
  PerformaceBarWithLabel,
  ProgressBar,
  ProgressBarWithLabel,
  ProgressFinished,
  ProgressStatus,
  RankingStatus,
  Status,
  ValidInvalidRow,
}

const toKebabCase = value => {
  if (!value) return null
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

const resolveComponentTag = name => {
  if (!name) return null
  return componentRegistry[name] || toKebabCase(name)
}

// Props
const props = defineProps({
  data: { type: Array, required: true },
  role: { type: String, required: true },
  actions: { type: Array, required: false, default: null },
  config: { type: Object },
  massActions: { type: Array, default: null, required: false },
  buttonName: { type: String, default: null },
  labelName: { type: String, default: null },
  totalLicenses: { type: Number, default: null },
  usedLicenses: { type: Number, default: null },
  showActions: { type: Boolean, default: true },
  showBy: { type: String, default: '' },
  tabs: { type: Array, default: null },
  perPage: { type: Number, default: 10, required: false },
  rows: { type: Number, required: true },
  searchTerm: { type: String, default: '', required: false },
  busy: { type: Boolean, default: false },
  orderByEnum: { type: Array, required: false },
  noLocalSorting: { type: Boolean, default: false },
  orderByExternal: { type: Boolean, default: false },
})

// Emits
const emit = defineEmits([
  'setSelecteds',
  'changePage',
  'orderBy',
  'open-modal',
  'event',
  'edit',
])

// Refs
import { ref, computed, watch, onMounted } from 'vue'

const selectableTable = ref(null)
const selected = ref([])
const checked = ref(true)
const unchecked = ref(false)
const selectAll = ref(false)
const showListByCard = ref(true)
const viewModeChanged = ref(false)
const tabIndex = ref(0)
const currentPage = ref(1)
const sortBy = ref('')
const sortDesc = ref(false)

// Computed
const showEmpty = computed(() => {
  return filterListByTab(tabIndex.value).length === 0 && !props.busy
})

// Watchers
watch(selected, () => {
  emit('setSelecteds', selected.value)
})
watch(currentPage, () => {
  emit('changePage', currentPage.value)
})

watch(sortBy, () => {
  currentPage.value = 1
  let orderByValue = findOrderId(sortBy.value)
  if (props.orderByExternal) {
    orderByValue = sortBy.value
  }
  emit('orderBy', {
    orderBy: orderByValue,
    Ascending: sortDesc.value,
  })
})

watch(sortDesc, () => {
  currentPage.value = 1
  if (props.orderByEnum) {
    let orderByValue = findOrderId(sortBy.value)
    if (props.orderByExternal) {
      orderByValue = sortBy.value
    }
    emit('orderBy', {
      orderBy: orderByValue,
      Ascending: sortDesc.value,
    })
  }
})

// Lifecycle
onMounted(() => {
  props.config.tableFields.forEach(field => {
    field.componentNameTag = resolveComponentTag(field.componentName)
  })

  props.config.cardFields?.forEach(field => {
    field.componentNameTag = resolveComponentTag(field.componentName)
  })
})

// Methods

const runActionLabel = (label, data) => {
  if (label instanceof Function) {
    return label(data)
  }
  return label
}

const verifyDisabled = (disabled, data) => {
  if (disabled instanceof Function) {
    return disabled(data)
  }

  if (typeof disabled === 'boolean') {
    return disabled
  }

  return false
}

const actionHandler = (action, data) => {
  if (action.disabled ? action.disabled(data) : false) {
    return
  }

  if (action.name === 'edit') {
    editClick(data)
    return
  }
  action.action(data)
  emit('open-modal')
}

const findOrderId = (key) => {
  if (!key) {
    return null
  }
  key = key[0].toUpperCase() + key.slice(1)
  if (props.orderByEnum) {
    return props.orderByEnum.indexOf(key)
  }
}

function filterListByTab(option) {
  switch (option) {
    case 0:
      return props.data
    case 1:
      return props.data.filter(professor => professor.status === 'Ativo')
    case 2:
      return props.data.filter(professor => professor.status === 'Pendente')
    case 3:
      return props.data.filter(professor => professor.status === 'Rejeitado')
    default:
      return props.data
  }
}

const onRowSelected = (item) => {
  if (!item.rowSelected) {
    if (selectableTable.value && selectableTable.value.selectRow) {
      selectableTable.value.selectRow(item.index)
    }
    selected.value = item
  } else {
    if (selectableTable.value && selectableTable.value.unselectRow) {
      selectableTable.value.unselectRow(item.index)
    }
  }
  selectAll.value = selected.value.length === props.data.length
}

const toggleAll = (value) => {
  if (selectableTable.value) {
    if (value) {
      selectableTable.value.selectAllRows()
    } else {
      selectableTable.value.clearSelected()
    }
  }
  selectAll.value = value
}

const toggleListByCard = (status) => {
  if (status === showListByCard.value) {
    return
  }

  showListByCard.value = status
  const selectedItems = selected.value
  setTimeout(() => {
    if (selectableTable.value) {
      selectableTable.value.clearSelected()
      selectedItems.forEach(item => {
        selectableTable.value.selectRow(props.data.indexOf(item))
      })
    }
  }, 0)
  selectAll.value = selected.value.length === props.data.length
}

const isMobile = () => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  ) {
    return true
  }
  return false
}

const createClick = () => {
  emit('event', 'create-click')
}

const editClick = (data) => {
  emit('edit', data)
}
</script>

<style lang="scss">
  #dynamicTablePaginated {
    .disabled {
      background: #e8e8e9;
      border-radius: 20px;
      cursor: not-allowed;
    }
    .b-table-empty-row {
      background: inherit;
      box-shadow: none;
    }

    [aria-disabled='true'] {
      cursor: not-allowed !important;
      color: #c9c9c9;
    }

    .overflow {
      overflow: auto;
    }
    table {
      padding: 0 !important;
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      .custom-checkbox {
        width: fit-content;
        margin: auto;
      }
      thead {
        tr {
          th {
            border: none !important;

            & > div {
              white-space: nowrap;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            &:first-child {
              border-top-left-radius: 0.5rem;
              border-bottom-left-radius: 0.5rem;
            }

            &:last-child {
              border-top-right-radius: 0.5rem;
              border-bottom-right-radius: 0.5rem;
            }

            font-size: 16px;
            color: #6e6b7b;
            font-weight: 400;
          }
          transition: all 0.3s ease;
          height: 5rem;
          box-shadow: 0 2px 8px rgb(0 0 0 / 14%);
          z-index: 200;
          background: #fff;
          border-radius: 0.5rem;

          &.b-table-row-selected {
            box-shadow: 0 0 1px 0 rgba(110, 99, 232, 1) !important;
            transform: translate(0) !important;
          }
          &:hover {
            z-index: 200;
            transform: translateY(-4px);
          }
        }
      }
    }

    .head-section {
      display: flex;
      align-items: center;
      font-size: 14px !important;
      color: #2c2c2c !important;
      font-weight: 600 !important;
      white-space: nowrap;
      width: fit-content;
    }

    .head-tooltip {
      cursor: pointer;
      color: #5e5873;

      margin-left: 4px;
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
    width: 32px;
    height: 32px;
    text-align: center;
    transition: all 0.3s ease;
    padding: 4px;
    cursor: pointer;

    &.icon-primary {
      border-radius: 20px;
      background: #7367f0;
      color: #fff;
    }

    &:not(last-child) {
      margin-right: 0.5rem;
    }

    &:hover {
      transform: translateY(-3px);
    }
  }

  .icon-tab-action {
    margin: 5px 1px !important;
  }

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
  @media (max-width: 991px) {
    .table-options {
      .table-filter {
        width: 100%;
        margin-left: 0 !important;
      }

      .table-actions:first-of-type {
        display: none !important;
      }
    }
  }

  @media (max-width: 655px) {
    .card {
      margin-left: 0rem;
      margin-right: 0rem;
    }
  }
</style>