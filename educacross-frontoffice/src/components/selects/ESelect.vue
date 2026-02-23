<template>
  <!-- Main container for the custom select component -->
  <div
    ref="refContainer"
    :class="{ disabled: disabled }"
    :style="`--e-select-variant: ${variant}`"
    class="relative cursor-pointer"
  >
    <!-- Dropdown Selector/Trigger Area -->
    <div
      role="combobox"
      :aria-expanded="opened.toString()"
      aria-haspopup="listbox"
      :aria-disabled="disabled ? 'true' : undefined"
      tabindex="0"
      :class="{ 'is-invalid': state === false }"
      class="e-select-container form-control"
      @click="switchDrop"
      @keydown.escape="close"
      @keydown.enter.prevent="switchDrop"
      @keydown.space.prevent="switchDrop"
    >
      <!-- Slot for Single Selected Option Display (When multiple is false) -->
      <slot
        v-if="!multiple && !isEmpty"
        name="selected-option"
        v-bind="{ ...internalSelectedOptions[0] }"
      >
        <!-- Display Label of the Selected Option -->
        <span class="selected-option-single" @click.stop="opened ? null : open()">
          {{ getLabel(internalSelectedOptions[0]) }}
        </span>
      </slot>

      <!-- Placeholder Display (when no option is selected) -->
      <span v-show="_options.length !== 0 && selectedLength === 0" class="text-muted">{{
          $t(placeholder)
        }}</span>
      <span v-show="isEmpty">
        <slot name="noOptions">
          <span>Sem Opções</span>
        </slot>
      </span>

      <!-- Badge Display (when options are selected and multiple is true) -->
      <div
        v-show="selectedLength && multiple"
        v-b-tooltip.hover="$t('clickToSeeSelectedOptions')"
        class="selected-options-badge cursor-pointer mw-100"
        @click.stop="openModal"
      >
        <b-badge :variant="variant" class="mw-100">
          <span class="d-flex align-items-center font-normal mw-100">
            <div v-if="isAllSelected">
              <slot name="allOptionsLabel">
                <span>Todas as opções selecionadas</span>
              </slot>
            </div>
            <span v-else-if="selectedLength === 1" class="text-truncate">
              {{ getLabel(internalSelectedOptions[0]) }}
            </span>
            <span v-else>
              <slot :selectedLength="selectedLength" name="selectedOptionsCountLabel">
                {{
                  $tc(`selectedOptionsCount.${gender}`, selectedLength, {
                    value: selectedLength,
                    prefix: $t(prefix),
                  })
                }}
              </slot>
            </span>
            <span
              v-if="canClearOption"
              class="material-symbols-outlined clear-button ml-1 cursor-pointer"
              @click.stop="clear"
            >
              close
            </span>
          </span>
        </b-badge>
      </div>

      <!-- Icons Container (for clear and drop-down icons) -->
      <div :class="{ 'mr-2': state === false }" class="icon-container">
        <!-- Clear Selected Option Icon -->

        <!-- Dropdown Icon (with rotation if opened) -->
        <span
          v-if="!loading"
          :class="{ 'revert-drop-icon': opened }"
          class="material-symbols-outlined drop-icon"
        >
          expand_more
        </span>

        <b-spinner v-else class="mr-50" small />
      </div>
    </div>

    <!-- Options List Container -->
    <Transition>
      <ul ref="refUl" role="listbox" :class="{ opened: opened }" class="options-container">
        <!-- Search Input (if searchable is true) -->
        <div v-show="searchable" class="option-searchable">
          <b-input-group class="input-group-merge">
            <template #prepend>
              <b-input-group-text id="searchQueryIcon" class="d-flex" @click="focusQueryInput">
                <span class="material-symbols-outlined" style="font-size: 21px"> search </span>
              </b-input-group-text>
            </template>
            <!-- Search Input Field -->
            <b-form-input
              ref="refSearchInput"
              v-model="search"
              autocomplete="off"
              class="d-inline-block"
              debounce="500"
              type="text"
              :placeholder="$t(searchPlaceholder)"
            />
          </b-input-group>
        </div>

        <!-- "No Results Found" Message -->
        <li
          v-if="!_options.length && !hasNextPage && !loading"
          class="option option-padding-single"
        >
          {{ $t('noResultsFound') }}
        </li>

        <li
          v-if="multiple && _options.length > 0 && !loading"
          role="option"
          data-testid="select-all-option"
          aria-label="Selecionar todos os itens"
          :aria-selected="isAllSelected.toString()"
          tabindex="-1"
          :class="isAllSelected || isIndeterminate ? selectedClass : null"
          class="option option-padding-multiple"
          @click="toggleSelectAll"
          @keydown.enter.prevent="toggleSelectAll"
          @keydown.space.prevent="toggleSelectAll"
        >
          <!-- <b-form-checkbox :checked="isAllSelected" :indeterminate="isIndeterminate">
          </b-form-checkbox> -->
          <EFormCheck
            :checked="isAllSelected"
            :indeterminate="isIndeterminate"
            indeterminate-class="text-primary"
          />
          <span>
            <slot name="selectAll"> {{ $t(`selectAll.${gender}`) }} </slot>
          </span>
        </li>

        <!-- Iterating Through Available Options -->
        <li
          v-for="option in _options"
          v-show="isVisibleOption(option)"
          :key="option.hash"
          role="option"
          :aria-selected="internalSelectedOptions.some(o => isSameOption(o, option)).toString()"
          :aria-disabled="option.disabled ? 'true' : undefined"
          tabindex="-1"
          :class="[
            internalSelectedOptions.some(o => isSameOption(o, option)) ? selectedClass : null,
            multiple ? 'option-padding-multiple' : 'option-padding-single',
          ]"
          class="option"
          @click.stop="toggleSelection(option)"
          @keydown.enter.prevent="toggleSelection(option)"
          @keydown.space.prevent="toggleSelection(option)"
        >
          <EFormCheck
            v-if="multiple"
            :checked="internalSelectedOptions.some(o => isSameOption(o, option))"
            :indeterminate="option.indeterminate"
            :disabled="option.disabled"
            @click.stop="toggleSelection(option)"
          />
          <slot name="option" v-bind="option"> {{ getLabel(option) }}</slot>
        </li>

        <!-- Loading Indicator -->
        <li
          v-if="hasNextPage && paginated"
          ref="refLoadingOption"
          v-b-visible="observer"
          class="option"
        >
          {{ $t('loading') }}...
        </li>
      </ul>
    </Transition>

    <!-- Modal for Displaying Selected Options (when multiple is true) -->
    <Portal :disabled="!usePortalOnModal" to="modals">
      <b-modal
        v-model="selectedModalOpen"
        :title="tableTitle"
        centered
        hide-footer
        no-close-on-backdrop
        no-close-on-esc
        size="lg"
        static
        @hidden="emitInput('closeModal')"
      >
        <slot name="modal-content">
          <ListTableLocalSorting
            :data-table="orderedInternalSelectedOptions"
            :per-page-default="5"
            :per-page-options="[5, 10]"
            :table-columns="externalTableColumns"
          >
            <template #cell(actions)="{ item }">
              <span
                v-if="selectedLength && canRemoveOption"
                class="material-symbols-outlined ml-auto text-danger cursor-pointer"
                @click="toggleSelection(item)"
              >
                close
              </span>
            </template>
          </ListTableLocalSorting>
        </slot>
      </b-modal>
    </Portal>
  </div>
</template>

<script setup>
import EFormCheck from '@/components/form/EFormCheck.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { emitter } from '@/eventBus'
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  toRef,
  watch,
  watchEffect,
} from 'vue'
import objectHash from 'object-hash'

const props = defineProps({
  value: {
    type: [String, Number, Object, Array],
    default: null,
  },
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: [String, undefined],
    default: 'name',
  },
  trackBy: {
    type: [String, undefined],
    default: undefined,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary',
  },
  state: {
    type: [String, Boolean],
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  closeOnSelect: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'selectAnOption',
  },
  paginated: {
    type: Boolean,
    default: false,
  },
  page: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  prefix: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    default: 'F',
  },
  tableColumns: {
    type: Array,
    default: () => [],
  },
  tableTitle: {
    type: String,
    default: 'Opções selecionadas',
  },
  searchPlaceholder: {
    type: String,
    default: '',
  },
  usePortalOnModal: {
    type: Boolean,
    default: false,
  },
  skipInitialRequest: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['input', 'nextPage', 'change', 'close', 'input:page', 'clear', 'closeModal'])

const refContainer = ref(null)

const opened = ref(false)
const search = ref(null)
const externalValue = toRef(props, 'value')
const externalTableColumns = ref(props.tableColumns)

const page = ref(0)
const totalPages = ref(1)
const selectedModalOpen = ref(false)
const refLoadingOption = ref(null)
const refSearchInput = ref(null)
const internalSelectedOptions = ref([])
const orderedInternalSelectedOptions = computed(() => {
  return [...internalSelectedOptions.value].sort((a, b) =>
    getLabel(a).localeCompare(getLabel(b)),
  )
})
const valueUpdated = ref(false)

const oldSelectedOptionsHash = ref('')
const newSelectedOptionsHash = computed(() => objectHash(internalSelectedOptions.value))

/**
 * Compare two options for equality
 * Uses trackBy prop if provided, otherwise falls back to hash comparison
 */
const isSameOption = (option1, option2) => {
  if (props.trackBy) {
    return option1[props.trackBy] === option2[props.trackBy]
  }
  return option1.hash === option2.hash
}

/**
 * Hash cache para otimizar performance com datasets grandes
 * WeakMap permite garbage collection automática de opções antigas
 * @see Issue #10 - Testes de Performance Instáveis
 */
const hashCache = new WeakMap()

const getOptionHash = option => {
  if (!hashCache.has(option)) {
    hashCache.set(option, objectHash(option))
  }
  return hashCache.get(option)
}

// eslint-disable-next-line no-underscore-dangle
const _options = computed(() => props.options.map(o => ({ ...o, hash: getOptionHash(o) })))

/**
 * Otimizado: O(n²) → O(n) usando Set
 * @see Issue #10 - Testes de Performance Instáveis
 */
const isAllSelected = computed(() => {
  if (!_options.value.length) return false

  // Criar Set de hashes selecionados (O(n))
  const selectedHashes = new Set(internalSelectedOptions.value.map(o => o.hash))

  // Single loop (O(n))
  const selectableOptions = _options.value.filter(o => !o.disabled && !o.indeterminate)

  return selectableOptions.every(o => o.indeterminate || selectedHashes.has(o.hash))
})

const isIndeterminate = ref(false)
const isFirstRequest = ref(true)

let scrollTop = 0
const refUl = ref(null)

const selectedLength = computed(() => {
  return internalSelectedOptions.value.length
})

const isEmpty = computed(() => {
  return _options.value.length === 0 && !props.loading
})

const requestPage = () => {
  emit('nextPage', {
    search: search.value,
    page: page.value,
    totalPages: totalPages.value,
  })
}

const observer = isVisible => {
  if (!isVisible) return

  const target = refLoadingOption.value
  scrollTop = target.offsetParent.scrollTop

  page.value += 1
  requestPage()
}

const scrollToLastItem = async () => {
  await nextTick()
  if (refUl.value) {
    requestAnimationFrame(() => {
      refUl.value.scrollTop = scrollTop
    })
  }
}

const focusQueryInput = async () => {
  await nextTick()
  if (refSearchInput.value) {
    refSearchInput.value.focus()
  }
}

const selectedClass = computed(() => {
  return `selected bg-light-${props.variant}`
})

const canRemoveOption = computed(() => {
  if (props.clearable) return true

  return selectedLength.value > 1
})

const canClearOption = computed(() => {
  return selectedLength.value && props.clearable
})

/** @returns {String} */
const getLabel = option => {
  const label = props.label
  if (typeof option !== 'object') return option

  return option[label]
}

/**
 * Otimizado: Cache de toLowerCase para evitar recalcular 1000x
 * @see Issue #10 - Testes de Performance Instáveis
 */
const isVisibleOption = (() => {
  let cachedSearch = ''
  let cachedSearchLower = ''

  return option => {
    if (!search.value || props.paginated) return true

    // Cache de search.toLowerCase()
    if (cachedSearch !== search.value) {
      cachedSearch = search.value
      cachedSearchLower = cachedSearch.toLowerCase()
    }

    return getLabel(option).toLowerCase().includes(cachedSearchLower)
  }
})()

const isSelected = option => {
  return internalSelectedOptions.value.some(selected => isSameOption(selected, option))
}

const hasNextPage = computed(() => {
  if (!props.paginated) return false
  return page.value < totalPages.value
})

const emitInput = event => {
  if (oldSelectedOptionsHash.value === newSelectedOptionsHash.value) return

  oldSelectedOptionsHash.value = newSelectedOptionsHash.value

  let optionsToEmit = internalSelectedOptions.value

  if (optionsToEmit instanceof Array) {
    optionsToEmit = optionsToEmit.map(option => {
      const o = { ...option }
      delete o.hash
      return o
    })
  } else if (optionsToEmit) {
    optionsToEmit = { ...optionsToEmit }
    delete optionsToEmit.hash
  }

  if (!props.multiple) {
    optionsToEmit = optionsToEmit[0]
  }

  emit('input', optionsToEmit)
  if (event) {
    emit(event, optionsToEmit)
  }
}

const toggleSelection = option => {
  if (props.disabled) return
  if (option.disabled) return

  let newSelectedOptions

  if (isSelected(option)) {
    if (!canRemoveOption.value) return

    // Remove the option, but do not close the dropdown in multiple mode
    newSelectedOptions = internalSelectedOptions.value.filter(o => !isSameOption(o, option))
  } else if (props.multiple) {
    // Add the option
    newSelectedOptions = [...internalSelectedOptions.value, option]
  } else {
    newSelectedOptions = [option]
  }

  internalSelectedOptions.value = newSelectedOptions

  // Update isIndeterminate based on partial selection
  isIndeterminate.value =
    newSelectedOptions.length > 0 && newSelectedOptions.length < _options.value.length

  valueUpdated.value = true

  // Ensure the dropdown does not close when in multiple selection mode
  if (props.multiple) {
    return
  }

  // Close the dropdown if it is not multiple mode and closeOnSelect is true
  if (!props.multiple && props.closeOnSelect) {
    close()
  }
}

const clear = () => {
  if (props.disabled) return

  search.value = null
  internalSelectedOptions.value = []
  isIndeterminate.value = false

  if (!opened.value) {
    emitInput('change')
    emitInput('input')
    emitInput('clear')
  }
}

const onOpenEvent = () => {
  if (opened.value) {
    close()
  }
}

const open = () => {
  if (props.disabled || _options.length === 0) return
  emitter.emit('ESelectOpened')
  opened.value = true

  emitter.on('ESelectOpened', onOpenEvent)

  focusQueryInput()
}

const close = () => {
  opened.value = false
  search.value = null

  emitter.off('ESelectOpened', onOpenEvent)

  emit('close')

  if (valueUpdated.value) {
    emitInput('change')
    valueUpdated.value = false
  }
}

const switchDrop = () => {
  if (props.disabled) {
    opened.value = false
    return
  }

  if (opened.value) {
    close()
  } else {
    open()
  }
}

const clickOutsideHandler = e => {
  if (!refContainer.value) return
  if (!refContainer.value.contains(e.target) && opened.value) {
    close()
  }
}

const openModal = () => {
  selectedModalOpen.value = true
}

const closeModal = () => {
  selectedModalOpen.value = false

  emitInput('closeModal')
}

const toggleSelectAll = () => {
  valueUpdated.value = true

  if (isAllSelected.value && !props.clearable) {
    // If all are currently selected and clearable is false, keep the first option selected
    const firstOption = [_options.value[0]]
    internalSelectedOptions.value = firstOption
    isIndeterminate.value = true
  } else if (isAllSelected.value) {
    // If all are currently selected and clearable is true, deselect all
    isIndeterminate.value = false
    internalSelectedOptions.value = []
  } else {
    // Otherwise, select all
    const allOptions = _options.value
    isIndeterminate.value = false
    internalSelectedOptions.value = allOptions.filter(
      option => !option.disabled && !option.indeterminate,
    )
  }
}

const scrollToTop = () => {
  if (refUl.value) {
    refUl.value.scrollTop = 0
  }
}

onMounted(() => {
  document.addEventListener('click', clickOutsideHandler, true)
})

onUnmounted(() => {
  document.removeEventListener('click', clickOutsideHandler, true)
  // Cleanup do emitter para prevenir memory leak
  emitter.off('ESelectOpened', onOpenEvent)
})

watch(search, () => {
  if (props.paginated) {
    // Skip the first request if skipInitialRequest is true
    if (isFirstRequest.value && props.skipInitialRequest) {
      isFirstRequest.value = false
      return
    }

    isFirstRequest.value = false
    page.value = 1
    totalPages.value = 1

    requestPage()
  }
})

watch(
  () => props.options,
  async (newOptions, oldOptions) => {
    if ((!oldOptions || oldOptions.length === 0) && props.multiple && !props.clearable) {
      toggleSelectAll()
      emitInput('watch options first if')
    }
    if (props.clearable) {
      isIndeterminate.value =
        internalSelectedOptions.value.length > 0 &&
        internalSelectedOptions.value.length < _options.value.length
    }

    if (props.paginated) {
      await nextTick()
      scrollToLastItem()
    }
  },
  {
    deep: true,
  },
)

watch(
  () => props.page,
  () => {
    page.value = props.page
  },
)

watch(
  () => props.totalPages,
  () => {
    totalPages.value = props.totalPages
  },
)

watchEffect(() => {
  emit('input:page', page.value)
})

const onChangeValue = value => {
  if (!value) {
    internalSelectedOptions.value = []
    oldSelectedOptionsHash.value = newSelectedOptionsHash.value
    return
  }

  if (value instanceof Array) {
    internalSelectedOptions.value = value.map(op => {
      return {
        ...op,
        hash: objectHash(op),
      }
    })
    isIndeterminate.value =
      internalSelectedOptions.value.length > 0 &&
      internalSelectedOptions.value.length < _options.value.length

    oldSelectedOptionsHash.value = newSelectedOptionsHash.value

    return
  }

  internalSelectedOptions.value = [
    {
      ...value,
      hash: objectHash(value),
    },
  ]

  oldSelectedOptionsHash.value = newSelectedOptionsHash.value
}

watch(externalValue, () => onChangeValue(externalValue.value), { deep: true })

onChangeValue(externalValue.value)

oldSelectedOptionsHash.value = newSelectedOptionsHash.value

if (!externalTableColumns.value || externalTableColumns.value.length === 0) {
  externalTableColumns.value = [
    {
      key: props.label,
      label: 'Item',
      searchable: true,
    },
  ]
}

// Expose methods for parent component access
defineExpose({
  scrollToTop,
  clear,
  open,
  close,
})
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/core/colors/palette-variables.scss';

@function color($color) {
  @return var(--#{$color});
}

$option-height: 40px;
$option-count: var(--options-count);

.selected-options-text {
  position: absolute;
  top: 0;
  left: 0;

  padding: 10px;

  max-width: calc(100% - 30px);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.selected-option-single {
  max-width: calc(100% - 30px);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.e-select-container {
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 30px;

  flex-wrap: nowrap;
}

.icon-container {
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
}

.clear-button {
  border: none;
  background-color: transparent;

  transition: color 0.2s ease-in-out;

  font-size: 1rem;

  &:hover {
    color: $danger;
  }

  cursor: pointer;
}

.clear-button-badge {
  font-size: 0.9rem;
}

.drop-icon {
  transition: transform 0.2s ease-in-out;

  font-size: 1.5rem;

  &.revert-drop-icon {
    transform: rotate(180deg);
  }
}

.options-container {
  visibility: hidden;
  pointer-events: none;

  position: absolute;
  top: calc(100% + 1px);
  left: 0;

  min-width: 100%;
  max-height: calc(38px * 5);
  overflow-y: auto;
  scroll-behavior: smooth;

  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;

  z-index: 3;

  &.opened {
    visibility: visible;
    pointer-events: all;
  }
}

.option-padding-multiple {
  padding: 0 15px 0 10px;
}

.option-padding-single {
  padding: 0 15px 0 1rem;
}

.option {
  cursor: pointer;
  position: relative;
  min-height: 38px;

  display: flex;
  align-items: center;

  border: 1px solid #fff;
  z-index: 4;
  border-radius: 6px;
  margin-top: 1px;
  margin-bottom: 1px;

  &:hover {
    background-color: #eee;
  }

  &:first-of-type {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &:last-of-type {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  &.selected:hover {
    border-width: 1px;
    border-style: solid;
    border-color: color(--e-select-variant);
  }
}

.option-searchable {
  @extend .option;

  margin: 5px 0;
}

.selected-options-badge {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
}

.disabled,
.disabled .option {
  cursor: not-allowed; // Indicates the disabled state
}
</style>
