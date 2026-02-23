<template>
  <div
    :class="{ expand: isVerticalMenuCollapsed }"
    class="footer position-fixed bottom-0 left-0 right-0 fixed-footer-wrapper"
  >
    <HelpChat v-model="isHelpChatOpen" />
    <div id="actions-footer" ref="footerRef">
      <portal-target
        :class="{ 'hide-portal': isHelpChatOpen }"
        name="fixed-sticky-footer-destination"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import HelpChat from '@/components/global/HelpChat.vue'
import store from '@/store'
import debounce from 'lodash/debounce'
import { emitter } from '@/eventBus'

const footerRef = ref(null)
const appContent = ref(null)
const footerElement = ref(null)
const isHelpChatOpen = ref(false)

const isVerticalMenuCollapsed = computed(
  () => store.state.verticalMenu.isVerticalMenuCollapsed,
)

const setFixedFooterVarHeight = height => {
  document.documentElement.style.setProperty('--fixed-footer-var-height', `${height}px`)
}

const setFooterPadding = () => {
  if (!footerRef.value) {
    setFixedFooterVarHeight(0)
    return
  }

  const selfHeight = footerRef.value.getBoundingClientRect().height
  setFixedFooterVarHeight(selfHeight)

  const footerHeight =
    selfHeight + parseFloat(getComputedStyle(footerRef.value).paddingBottom) + 12

  if (appContent.value) {
    appContent.value.style.minHeight = `calc(100% - 80px - ${footerHeight}px)`
  }

  if (footerElement.value) {
    footerElement.value.style.paddingBottom = `${footerHeight}px`
  }
}

const debouncedSetFooterPadding = debounce(setFooterPadding, 200)
const rObserver = new ResizeObserver(debouncedSetFooterPadding)

onUnmounted(() => {
  if (appContent.value) {
    appContent.value.style.minHeight = ''
    appContent.value = null
  }

  if (footerElement.value) {
    footerElement.value.style.paddingBottom = ''
    footerElement.value = null
  }

  rObserver.disconnect()
})

const onMountedFooter = () => {
  appContent.value = document.querySelector('.app-content')
  footerElement.value = document.querySelector('footer.footer')

  if (footerRef.value) {
    rObserver.observe(footerRef.value)
  }
}

emitter.on('mounted:footer', onMountedFooter)

onUnmounted(() => {
  emitter.off('mounted:footer', onMountedFooter)
})
</script>

<style lang="scss" scoped>
@import 'src/@core/scss/base/bootstrap-extended/include';
@import 'src/@core/scss/base/components/include';

.fixed-footer-wrapper {
  z-index: 998;
  left: $menu-collapsed-width;
  box-shadow: 0px -6px 14px 0px #00000029;

  &.expand {
    left: $menu-expanded-width;
  }
}

@media (max-width: 1199px) {
  .fixed-footer-wrapper {
    left: 0;

    &.expand {
      left: 0;
    }
  }
}
</style>

<style>
@media (max-width: 425px) {
  .hide-portal {
    display: none;
  }
}
</style>