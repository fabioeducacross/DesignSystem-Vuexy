<template>
  <section>
    <b-alert ref="alertRef" v-b-visible="observer" variant="primary" show>
      <div class="d-flex justify-content-center align-items-center alert-body gap-2">
        <span class="material-symbols-outlined"> emoji_objects </span>
        <span class="underline cursor-pointer" @click="changeSidebar()"
          ><strong>Saiba mais:</strong> entenda os indicadores deste relatório, clicando aqui.</span
        >
      </div>
    </b-alert>
    <b-button
      :class="{ visible: showButton }"
      variant="primary"
      class="fixed-button"
      @click="changeSidebar()"
    >
      <span class="material-symbols-outlined"> emoji_objects </span>
    </b-button>
    <WritingPhaseRegisterSideBarInfo :show-text-more="false" />
  </section>
</template>

<script setup>
import WritingPhaseRegisterSideBarInfo from '@/views/pages/writing-phases/components/SideBarInfo.vue'
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'

const vm = getCurrentInstance().proxy

const changeSidebar = () => {
  vm.$bus.emit('changeSidebar')
}

const alertRef = ref(null)
const isVisible = ref(true)
const isObscured = ref(false)

const observer = value => {
  isVisible.value = value
}

const isElementObscured = el => {
  const rect = el.getBoundingClientRect()

  const bottomY = rect.bottom
  const topElement = document.elementFromPoint(rect.left + rect.width / 2, bottomY - 1)

  return topElement !== el && !el.contains(topElement)
}

const handleScroll = () => {
  if (isVisible.value) {
    isObscured.value = isElementObscured(alertRef.value.$el)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const showButton = computed(() => {
  return !isVisible.value || isObscured.value
})
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';
  @import '@/@core/scss/base/bootstrap-extended/_variables.scss';

  .fixed-button {
    z-index: 9;
    position: fixed;
    top: calc(#{$navbar-height} + #{$content-padding});
    right: calc(#{$content-padding});
    width: 44px;
    height: 48px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;

    &.visible {
      transition: opacity 0.5s ease-in-out;
      opacity: 1;
    }
  }
</style>