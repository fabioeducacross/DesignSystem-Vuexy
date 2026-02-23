<template>
  <div class="btn-scroll-to-top" :class="{ show: y > 250 }">
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      class="btn-icon"
      @click="scrollToTop"
    >
      <feather-icon icon="ArrowUpIcon" size="16" />
    </b-button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { BButton } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

const y = ref(window.scrollY)

const onScroll = () => {
  y.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const scrollToTop = () => {
  const rootEle = document.documentElement
  rootEle.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

defineExpose({})
</script>

<script>
import { BButton } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BButton,
  },
}
</script>

<style lang="scss" scoped>
  .btn-scroll-to-top {
    position: fixed;
    bottom: 5%;
    right: 30px;
    z-index: 99;

    opacity: 0;
    transition: all 0.5s ease;

    &.show {
      opacity: 1;
    }
  }
</style>