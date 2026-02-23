<template>
  <div class="multiselec">
    <button
      type="button"
      class="multiselect-input multiselect-border bg-white"
      @click.stop.prevent="showDropdown ? toggle() : null"
    >
      <span v-if="options.length === 0" class="multi-select-placeholder"> Não possui alunos </span>

      <span v-else-if="selecteds.length === 0" class="multi-select-placeholder">
        {{ placeholder }}
      </span>

      <span v-else-if="selecteds.length === 1" class="multi-select-placeholder">
        {{ selecteds.length }} aluno
      </span>

      <span v-else class="multi-select-placeholder"> {{ selecteds.length }} alunos </span>
    </button>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-show="isOpen" class="options">
        <div v-if="options.length === 0" class="line">
          <span>Não possui alunos</span>
        </div>
        <div v-else-if="showAllSelect" class="line" @click="turnAllCheckbox">
          <input type="checkbox" :checked="allChecked" />
          <span>Todos os Alunos</span>
        </div>
        <div
          v-for="option in options"
          :key="option[value]"
          class="line"
          @click="turnCheckbox(option[value])"
        >
          <input type="checkbox" :checked="selecteds.indexOf(option[value]) > -1" />
          <span>{{ option[label] }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, provide } from 'vue'
import { emitter } from '@/eventBus'

// Props
const props = defineProps({
  placeholder: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  label: { type: String, required: true },
  value: { type: String, required: true },
  showAllSelect: { type: Boolean, default: false },
  showDropdown: { type: Boolean, default: true },
  allSelected: { type: Boolean, default: false },
  markeds: { type: Array, default: () => [] },
})

const emit = defineEmits(['setSelecteds'])

// State
const isOpen = ref(false)
const allChecked = ref(false)
const selecteds = ref([])

// Provide dropdown instance
provide('dropdown', {
  close: () => {
    isOpen.value = false
  },
})

// Methods
const toggle = () => {
  isOpen.value = !isOpen.value
}
const close = () => {
  isOpen.value = false
}
const clickOutListener = evt => {
  // Use $el equivalent: expose root element for $el (see below)
  if (rootEl.value && !rootEl.value.contains(evt.target)) {
    close()
  }
}
const rootCloseListener = vm => {
  // vm is the "dropdown" provided object from other component
  if (vm !== dropdownProvide) {
    close()
  }
}
const turnCheckbox = rowId => {
  const idx = selecteds.value.indexOf(rowId)
  if (idx > -1) {
    selecteds.value.splice(idx, 1)
    allChecked.value = false
  } else {
    selecteds.value.push(rowId)
  }
}
const turnAllCheckbox = () => {
  if (allChecked.value) {
    selecteds.value = []
    allChecked.value = false
  } else {
    props.options.forEach(option => {
      if (selecteds.value.indexOf(option[props.value]) < 0) {
        selecteds.value.push(option[props.value])
      }
    })
    allChecked.value = true
  }
}
const markCheckbox = rowId => {
  if (selecteds.value.indexOf(rowId) === -1) {
    selecteds.value.push(rowId)
  }
}

const dropdownProvide = {
  close,
}
provide('dropdown', dropdownProvide)

// Ref for root element to simulate this.$el
const rootEl = ref(null)

// Watchers
watch(isOpen, value => {
  if (value) {
    emitter.emit('dropdown::open', dropdownProvide)
  }
})

watch(selecteds, () => {
  if (
    selecteds.value.length === props.options.length &&
    props.options.length > 0
  ) {
    allChecked.value = true
  }
  emit('setSelecteds', selecteds.value)
})

watch(
  () => props.options,
  () => {
    allChecked.value = false
    selecteds.value = []
    if (props.allSelected) {
      props.options.forEach(info => {
        if (info[props.value]) {
          markCheckbox(info[props.value])
        } else {
          markCheckbox(info)
        }
      })
    }
  },
  { immediate: true }
)

watch(
  () => props.markeds,
  () => {
    props.markeds.forEach(info => {
      if (info[props.value]) {
        markCheckbox(info[props.value])
      } else {
        markCheckbox(info)
      }
    })
    emit('setSelecteds', selecteds.value)
  },
  { immediate: true }
)

// Lifecycle
onMounted(() => {
  emitter.on('dropdown::open', rootCloseListener)
  document.addEventListener('click', clickOutListener)
})

onUnmounted(() => {
  document.removeEventListener('click', clickOutListener)
  emitter.off('dropdown::open', rootCloseListener)
})

// Expose root element for handling click outside
// Attach to template root element
</script>

<script>
export default {
  // For ref for root element, to support :ref="rootEl" in template
}
</script>

<style lang="scss" scoped>
  .multiselec {
    position: relative;
    width: 100%;
  }

  .multiselect-input {
    width: 100%;
    height: 2.375rem;

    display: flex;
    justify-content: start;
    align-items: center;
  }

  .multiselect-border {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }

  .options {
    position: absolute;
    top: 3rem;
    left: 0;
    width: 100%;
    max-height: 21rem;
    overflow-y: scroll;
    z-index: 9;
    background-color: white;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }

  .options::-webkit-scrollbar {
    display: none;
  }

  .multi-select-placeholder {
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.01rem;
    color: #626262;
    padding-left: 1rem;
  }

  .line {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    cursor: pointer;

    padding: 0.5rem 0 0.5rem 1rem;
  }

  .line:hover {
    background-color: var(--primary);
    color: white;
  }

  .line span {
    padding-left: 1rem;
  }

  @supports (-webkit-appearance: none) or (-moz-appearance: none) {
    input[type='checkbox'] {
      --active: #7367f0;
      --active-inner: white;
      --focus: 1.5px #7367f0;
      --border: #808080;
      --border-hover: #7367f0;
      --background: white;
      --disabled: #f6f8ff;
      --disabled-inner: #e1e6f9;
      -webkit-appearance: none;
      -moz-appearance: none;
      height: 1.5rem;
      outline: none;
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0;
      cursor: pointer;
      border: 1.5px solid var(--bc, var(--border));
      background: var(--b, var(--background));
      transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
      &:after {
        content: '';
        display: block;
        left: 0;
        top: 0;
        position: absolute;
        transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
      }
      &:checked {
        --b: var(--active);
        --bc: var(--active);
        --d-o: 0.3s;
        --d-t: 0.6s;
        --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
      }
      &:disabled {
        --b: var(--disabled);
        cursor: not-allowed;
        opacity: 0.9;
        &:checked {
          --b: var(--disabled-inner);
          --bc: var(--border);
        }
        & + span {
          cursor: not-allowed;
        }
      }
      &:hover {
        &:not(:checked) {
          &:not(:disabled) {
            --bc: var(--border-hover);
          }
        }
      }
      width: 1.5rem;
      &:after {
        opacity: var(--o, 0);
      }
      &:checked {
        --o: 1;
      }
    }
    input[type='checkbox'] {
      border-radius: 2px;
      &:after {
        width: 5px;
        height: 9px;
        border: 2px solid var(--active-inner);
        border-top: 0;
        border-left: 0;
        left: 6px;
        top: 2px;
        transform: rotate(var(--r, 20deg));
      }
      &:checked {
        --r: 43deg;
      }
    }
  }
</style>