<template>
  <b-card no-body :class="{ open: visible }" @mouseenter="collapseOpen" @mouseleave="collapseClose">
    <b-card-header
      :class="{ collapsed: !visible }"
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
      <b-card-body>
        <slot />
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import { BCard, BCardHeader, BCardBody, BCollapse } from 'bootstrap-vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['visible'])

const visible = ref(false)
const collapseItemID = ref('')
const instance = getCurrentInstance()
const parent = instance.proxy.$parent
const openOnHover = parent.hover

const accordion = computed(() =>
  parent.accordion ? `accordion-${parent.collapseID}` : null
)

const updateVisible = val => {
  visible.value = val
  emit('visible', val)
}
const collapseOpen = () => {
  if (openOnHover) updateVisible(true)
}
const collapseClose = () => {
  if (openOnHover) updateVisible(false)
}

onMounted(() => {
  collapseItemID.value = uuidv4()
  visible.value = props.isVisible
})
</script>