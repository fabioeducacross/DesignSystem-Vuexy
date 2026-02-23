<template>
  <div class="min-vh-100">
    <div
      class="d-flex flex-column-reverse flex-md-row justify-content-center justify-content-md-between align-items-md-baseline flex-nowwrap"
    >
      <div
        class="tabs-row d-md-flex"
        :class="tabs.length > 1 ? 'd-flex' : 'd-none'"
      >
        <a
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab-link d-flex align-items-center gap-1"
          :style="`--offset: -10px; --index: ${index}; z-index: ${activeTab === index ? tabs.length : tabs.length - index}`"
          :class="{
            active: activeTab === index,
            ['hover:bg-' + tab.variant + ' text-' + tab.variant]:
              tab.variant && activeTab !== index,
            ['bg-' + tab.variant]: tab.variant && activeTab === index,
          }"
          @click="setActive(tab)"
        >
          <span v-if="tab.icon" class="material-symbols-outlined tab-icon">
            {{ tab.icon }}
          </span>
          {{ tab.title }}
        </a>
      </div>
      <div class="d-lg-flex">
        <div v-if="lastUpdated" class="d-none d-lg-block mr-1">
          <span>
            Atualizado em: {{ formatDate(lastUpdated) }} às
            {{ formatTime(lastUpdated) }}
          </span>
        </div>
        <div
          v-if="tabTitle"
          class="d-flex align-items-center justify-content-center justify-content-md-end mb-50 mb-md-0 gap-1 tab-title text-primary font-bold text-uppercase"
        >
          <span v-if="tabTitleIcon" class="material-symbols-outlined">
            {{ tabTitleIcon }}
          </span>
          {{ tabTitle }}
        </div>
      </div>
    </div>

    <div
      class="tab-line"
      :class="tabs.length > 1 ? 'd-block' : 'd-none d-md-block'"
    />

    <div v-if="lastUpdated" class="d-block d-lg-none mb-1">
      <span>
        Atualizado em: {{ formatDate(lastUpdated) }} às
        {{ formatTime(lastUpdated) }}
      </span>
    </div>

    <slot name="default" />
  </div>
</template>

<script setup>
import formatDate from '@/utils/date.js'
import { formatTime } from '@/utils/time.js'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

// Props
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  currentTab: {
    type: Number,
    default: 0,
  },
  tabTitle: {
    type: String,
    required: false,
    default: '',
  },
  lastUpdated: {
    type: String,
    required: false,
    default: '',
  },
  tabTitleIcon: {
    type: String,
    required: false,
    default: '',
  },
})

const route = useRoute()
const router = useRouter()

// Helper: get tab index from meta.tabIndex
const getTabIndexFromMeta = route => {
  if (route.meta && typeof route.meta.tabIndex === 'number') {
    return route.meta.tabIndex
  }
  return null
}

// Helper: get tab index from meta.activeTab (matches route name in tabs)
const getTabIndexFromActiveTabMeta = route => {
  if (route.meta && route.meta.activeTab) {
    return props.tabs.findIndex(tab => tab.route.name === route.meta.activeTab)
  }
  return -1
}

// Helper: find tab index by route name (matches directly or in children)
const getTabIndexFromRouteName = routeName => {
  return props.tabs.findIndex(
    tab =>
      tab.route.name === routeName ||
      (tab.route.children &&
        tab.route.children.some(child => child.name === routeName))
  )
}

// Get the current tab index from the current route
const activeTab = computed(() => {
  const tabIndexFromMeta = getTabIndexFromMeta(route)
  if (tabIndexFromMeta !== null) {
    return tabIndexFromMeta
  }

  const tabIndexFromActiveTabMeta = getTabIndexFromActiveTabMeta(route)
  if (tabIndexFromActiveTabMeta !== -1) {
    return tabIndexFromActiveTabMeta
  }

  return getTabIndexFromRouteName(route.name)
})

// Change active tab (push new route)
const setActive = tab => {
  if (route.name !== tab.route.name) {
    router.push(tab.route)
  }
}

// Watch for invalid activeTab (-1), auto-correct to first tab if so
watch(
  () => activeTab.value,
  (val) => {
    if (val === -1 && props.tabs && props.tabs.length > 0) {
      setActive(props.tabs[0])
    }
  }
)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables/_variables.scss';

.tab-line {
  border: 1px solid $primary;

  height: 1px;
  width: 100%;

  margin-bottom: 1rem;
}
.tabs-row {
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: thin;

  .tab-link {
    display: inline-block;
    position: relative;

    padding: 14px 24px 10px 24px;

    border-radius: 15px 15px 0 0;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);

    cursor: pointer;
    color: $color-gray-themeBodyText;
    text-decoration: none;
    background: $white;

    transform: translateX(calc(var(--index) * var(--offset)));

    white-space: nowrap;
    .tab-icon {
      font-size: 18px;
    }

    &:hover {
      color: $white !important;
      background-color: $primary;
    }

    &.active {
      background: $primary;
      color: $white;
      //font-weight: 700;

      z-index: 1;
    }
  }
}
</style>