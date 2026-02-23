<template>
  <b-card
    no-body
    :class="[{ open: visible }, cardClass]"
    @mouseenter="collapseOpen"
    @mouseleave="collapseClose"
  >
    <b-card-header
      :class="[{ collapsed: !visible, left }, cardHeaderClass]"
      :aria-expanded="visible ? 'true' : 'false'"
      :aria-controls="collapseItemID"
      role="tab"
      data-toggle="collapse"
      @click="updateVisible(!visible)"
    >
      <slot name="header">
        <span class="lead collapse-title">{{ title }}</span>
      </slot>
    </b-card-header>

    <b-collapse :id="collapseItemID" v-model="visible" :accordion="accordion" role="tabpanel">
      <b-card-body :class="bodyClass">
        <slot />
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  cardClass: {
    type: String,
    required: false,
    default: '',
  },
  cardHeaderClass: {
    type: String,
    required: false,
    default: '',
  },
  bodyClass: {
    type: String,
    required: false,
    default: '',
  },
  left: {
    type: Boolean,
    required: false,
    default: false,
  },
})

// Emits
const emit = defineEmits(['visible'])

// Reactive state
const visible = ref(false)
const collapseItemID = ref('')
const openOnHover = ref(false)

// Accordion computed
const accordion = computed(() => {
  return null
})

const collapseOpen = () => {
  if (openOnHover.value) updateVisible(true)
}

const collapseClose = () => {
  if (openOnHover.value) updateVisible(false)
}

const updateVisible = (val = true) => {
  visible.value = val
  emit('visible', val)
}

// Lifecycle
onMounted(() => {
  collapseItemID.value = uuidv4()
  visible.value = props.isVisible
})
</script>

<style lang="scss" scoped>
.collapse-icon {
  .card-header {
    &.left {
      padding: 1rem 1rem 1rem 3.8rem;
    }
  }
  [data-toggle='collapse'] {
    &.left {
      &:after {
        left: 1.5rem;
        right: auto;
      }
    }
  }
}
</style>