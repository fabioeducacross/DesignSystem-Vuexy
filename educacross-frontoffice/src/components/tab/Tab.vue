<template>
  <div>
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
          class="tab-link"
          :style="`--offset: -10px; --index: ${index}; z-index: ${
            activeTab === index ? tabs.length : tabs.length - index
          }`"
          :class="{ active: activeTab === index }"
          @click="setActive(index)"
        >
          {{ tab.title }}
        </a>
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

    <div
      class="tab-line"
      :class="tabs.length > 1 ? 'd-block' : 'd-none d-md-block'"
    />
    <div v-for="(tab, index) in tabs" :key="'content' + index">
      <slot v-if="activeTab === index" :name="`tab-content-${index}`" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

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
  tabTitleIcon: {
    type: String,
    required: false,
    default: '',
  },
})

// Emits
const emit = defineEmits(['update:currentTab'])

// State
const activeTab = ref(props.currentTab)

// Methods
const setActive = index => {
  activeTab.value = index
  emit('update:currentTab', index)
}

// Watchers
watch(
  () => props.currentTab,
  newVal => {
    activeTab.value = newVal
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

    &:hover {
      color: $white;
      background-color: $primary;
    }

    &.active {
      background: $primary;
      color: $white;

      z-index: 1;
    }
  }
}
</style>