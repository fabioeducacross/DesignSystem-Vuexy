<template>
  <ESelect
    :value="internalValue"
    :options="computedOptions"
    :label="label"
    :track-by="value"
    :multiple="isMultiple"
    :loading="busy || internalBusy"
    :clearable="isClearable"
    :close-on-select="closeOnSelect"
    :disabled="!computedOptions.length && !api"
    :searchable="true"
    :paginated="!!api"
    :page="data.page"
    :total-pages="data.totalPages"
    placeholder="selectAnOption"
    @input="handleInput"
    @nextPage="handleNextPage"
  >
    <!-- Slot: noOptions -->
    <template #noOptions>
      <slot name="no-options">
        <span>{{ noOptionsMessage }}</span>
      </slot>
    </template>

    <!-- Slot: option (com badge) -->
    <template #option="optionData">
      <slot name="option" v-bind="optionData">
        <span>
          {{ optionData[label] }}
          <b-badge
            v-if="showBadgeRule(optionData)"
            class="ml-50"
            pill
            variant="light-primary"
            :class="isSelectedBadge(optionData) ? 'bg-white text-primary' : ''"
          >
            {{ optionData.serieName || (optionData.serie && optionData.serie.name) }}
          </b-badge>
        </span>
      </slot>
    </template>

    <!-- Slot: selected-option (com badge) -->
    <template #selected-option="optionData">
      <slot name="selected-option" v-bind="optionData">
        <span>
          {{ optionData[label] }}
          <b-badge v-if="showBadgeRule(optionData)" class="ml-50" pill variant="light-primary">
            {{ optionData.serieName || (optionData.serie && optionData.serie.name) }}
          </b-badge>
        </span>
      </slot>
    </template>
  </ESelect>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { getData } from '@/services/admin-context/components/select.service'
import { ref, computed, watch, onMounted } from 'vue'

// Props
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: 'name',
  },
  value: {
    type: String,
    default: 'id',
  },
  selectAll: {
    type: Boolean,
    default: false,
  },
  showBadge: {
    type: Boolean,
    default: false,
  },
  allSelected: {
    type: Boolean,
    default: false,
  },
  selectionName: {
    type: String,
    default: '',
  },
  isMultiple: {
    type: Boolean,
    default: false,
  },
  reduce: {
    type: Function,
    default: item => item,
  },
  api: {
    type: String,
    default: undefined,
  },
  busy: {
    type: Boolean,
    default: false,
  },
  params: {
    type: String,
    default: undefined,
  },
  firstOption: {
    type: Object,
    default: undefined,
  },
  isClearable: {
    type: Boolean,
    default: false,
  },
  deselectFromDropdown: {
    type: Boolean,
    default: false,
  },
  closeOnSelect: {
    type: Boolean,
    default: true,
  },
  setSelected: {
    type: [Function, Array, Object],
    default: undefined,
  },
  selected: {
    type: [String, Number, Object, Array],
    default: undefined,
  },
})

// Emits
const emit = defineEmits(['input'])

// Reactive state
const internalValue = ref(null)
const internalBusy = ref(false)
const noOptionsMessage = ref('Nenhuma opção disponível')
const data = ref({
  data: [],
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
})

/**
 * Computa as opções incluindo firstOption se fornecido
 * Altera mensagem de firstOption quando não há opções
 */
const computedOptions = computed(() => {
  const opts = props.api ? data.value.data : props.options

  // Lógica de firstOption com mensagem dinâmica
  if (props.firstOption) {
    const firstOpt = { ...props.firstOption }

    // Se não há outras opções, altera mensagem
    if (!opts.length) {
      firstOpt[props.label] = 'Nenhuma turma encontrada'
    }

    return [firstOpt, ...opts]
  }

  return opts
})

/**
 * Determina se deve mostrar badge baseado em showBadge prop
 */
const showBadgeRule = option => {
  if (props.showBadge) {
    return option.serieName || (option.serie && option.serie.name)
  }
  return false
}

/**
 * Verifica se a option está selecionada (para styling do badge)
 */
const isSelectedBadge = option => {
  if (!internalValue.value) return false

  if (props.isMultiple && Array.isArray(internalValue.value)) {
    return internalValue.value.some(item => {
      const itemReduced = props.reduce(item)
      const optionReduced = props.reduce(option)
      return itemReduced === optionReduced
    })
  }

  const valueReduced = props.reduce(internalValue.value)
  const optionReduced = props.reduce(option)
  return valueReduced === optionReduced
}

/**
 * Handler para input do ESelect
 * ESelect emite objetos, então precisamos aplicar reduce se fornecido
 */
const handleInput = value => {
  internalValue.value = value

  // Aplicar reduce se fornecido
  let emittedValue = value

  if (value === null || value === undefined) {
    emittedValue = props.isMultiple ? [] : null
  } else if (props.reduce) {
    if (props.isMultiple && Array.isArray(value)) {
      emittedValue = value.map(item => props.reduce(item))
    } else {
      emittedValue = props.reduce(value)
    }
  }

  emit('input', emittedValue)
}

/**
 * Handler para nextPage do ESelect (paginação)
 */
const handleNextPage = async ({ page }) => {
  if (!props.api) return

  internalBusy.value = true

  try {
    const queryParams = `?page=${page}&pageSize=${data.value.pageSize}${props.params || ''}`
    const response = await getData(props.api, queryParams)

    if (response && response.data) {
      data.value.page = response.data.page
      data.value.total = response.data.total
      data.value.totalPages = response.data.totalPages
      data.value.data.push(...response.data.data)
    }
  } finally {
    internalBusy.value = false
  }
}

/**
 * Carrega dados iniciais da API
 */
const fetchInitialData = async () => {
  if (!props.api) return

  internalBusy.value = true

  try {
    const response = await getData(props.api, props.params)
    if (response && response.data) {
      data.value = response.data
      executeSetSelected()
    }
  } finally {
    internalBusy.value = false
  }
}

/**
 * Converte valor (primitives ou objetos) para objetos completos
 */
const convertToObjects = valueToConvert => {
  if (!valueToConvert) return null

  const opts = computedOptions.value

  if (props.isMultiple && Array.isArray(valueToConvert)) {
    return opts.filter(opt =>
      valueToConvert.some(val => {
        if (typeof val === 'object') {
          return val[props.value] === opt[props.value]
        }
        return val === opt[props.value]
      }),
    )
  }

  // Single selection
  if (typeof valueToConvert === 'object') {
    return valueToConvert
  }

  return opts.find(opt => opt[props.value] === valueToConvert) || null
}

/**
 * Executa a lógica de setSelected prop
 */
const executeSetSelected = () => {
  if (!props.setSelected) return

  let selectedValue

  if (typeof props.setSelected === 'function') {
    // Função recebe data e retorna valor
    selectedValue = props.setSelected(data.value)
  } else if (Array.isArray(props.setSelected)) {
    // Array de objetos (já no formato correto)
    selectedValue = props.setSelected
  } else if (typeof props.setSelected === 'object') {
    // Objeto único
    selectedValue = props.setSelected
  }

  internalValue.value = selectedValue
  handleInput(selectedValue)
}

/**
 * Watch para sincronizar valor externo com interno
 * Converte primitives de volta para objetos quando necessário
 */
watch(
  () => props.selected,
  newValue => {
    if (!newValue) {
      internalValue.value = props.isMultiple ? [] : null
      return
    }

    // Aguardar options carregarem antes de converter
    if (computedOptions.value.length === 0) {
      return
    }

    internalValue.value = convertToObjects(newValue)
  },
  { immediate: false },
)

/**
 * Watch para mudanças em options (quando não usa API)
 */
watch(
  () => props.options,
  newOptions => {
    if (!props.api && newOptions) {
      // Sincronizar valor selecionado com novas options
      if (props.selected) {
        internalValue.value = convertToObjects(props.selected)
      }
      executeSetSelected()
    }
  },
  { deep: true },
)

/**
 * Watch para mudanças em computedOptions (incluindo quando API carrega)
 */
watch(computedOptions, newOptions => {
  // Quando options carregam, converter selected para objetos
  if (newOptions.length > 0 && props.selected) {
    internalValue.value = convertToObjects(props.selected)
  }
})

onMounted(() => {
  if (props.api) {
    fetchInitialData()
  } else {
    // Inicializar com valor externo se fornecido
    if (props.selected) {
      internalValue.value = convertToObjects(props.selected)
    }
    executeSetSelected()
  }
})
</script>
