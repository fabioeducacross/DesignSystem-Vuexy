<template>
  <section>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div v-show="isOpen" ref="content" class="expand-content">
        <slot />
      </div>
    </transition>

    <slot name="footer" />

    <div class="d-flex justify-content-center">
      <button
        type="button"
        class="btn btn-link p-0 font-bold"
        :aria-expanded="isOpen"
        @click="toggle"
      >
        <span class="material-symbols-outlined align-middle font-16">
          {{ isOpen ? 'filter_alt_off' : 'filter_alt' }}
        </span>
        <span class="align-middle font-semibold font-14">
          {{ isOpen ? 'Menos filtros' : 'Mais filtros' }}
        </span>
        <span class="material-symbols-outlined align-middle font-16">
          {{ isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
        </span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(props.modelValue)
const content = ref(null)

watch(
  () => props.modelValue,
  newVal => {
    isOpen.value = newVal
  }
)

watch(isOpen, newVal => {
  emit('update:modelValue', newVal)
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const beforeEnter = el => {
  el.style.maxHeight = '0'
  el.style.opacity = '0'
  el.style.overflow = 'hidden'
}

const enter = el => {
  const height = `${el.scrollHeight}px`
  el.style.maxHeight = height
  el.style.opacity = '1'
}

const afterEnter = el => {
  el.style.maxHeight = ''
  el.style.opacity = ''
  el.style.overflow = ''
}

const beforeLeave = el => {
  el.style.maxHeight = `${el.scrollHeight}px`
  el.style.opacity = '1'
  el.style.overflow = 'hidden'
}

const leave = el => {
  el.style.maxHeight = '0'
  el.style.opacity = '0'
}

const afterLeave = el => {
  el.style.maxHeight = ''
  el.style.opacity = ''
  el.style.overflow = ''
}
</script>

<style scoped>
.expand-content {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}
</style>