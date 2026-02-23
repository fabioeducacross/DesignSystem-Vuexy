<template>
  <Tab :current-tab="0" :tab-title="title" :tabs="tabs" tab-title-icon="school">
    <template v-slot:tab-content-0>
      <Index />
    </template>
  </Tab>
</template>

<script setup>
  import Tab from '@/components/tab/Tab.vue'
  import store from '@/store'
  import Index from '@/views/pages/test-fluency/narrative-complexity/students/Index.vue'

  const tabs = [{ title: 'Visão geral' }]
  const title = store.getters.accessUserData.InstitutionName
</script>

<style lang="scss" scoped></style>