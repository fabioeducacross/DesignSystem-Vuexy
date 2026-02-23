<template>
  <Tab
    :current-tab="0"
    :tab-title="title"
    :tabs="tabs"
    :tab-title-icon="icon"
  >
    <template v-slot:tab-content-0>
      <slot />
    </template>
  </Tab>
</template>

<script setup>
import Tab from '@/components/tab/Tab.vue'
import store from '@/store'

// Props
const props = defineProps({
  tabTitle: {
    type: String,
    required: false,
    default: 'Visão geral',
  },
})

// Reactive state
const tabs = [{ title: props.tabTitle }]
const title = store.getters.accessUserData.InstitutionName
const icon = 'school'
</script>

<style lang="scss" scoped></style>