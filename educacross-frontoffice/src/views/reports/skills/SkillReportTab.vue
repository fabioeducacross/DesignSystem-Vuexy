<template>
  <Tab :tabs="tabs" :current-tab="0" tab-title-icon="school" :tab-title="title">
    <template v-slot:tab-content-0>
      <SkillReport />
    </template>
  </Tab>
</template>

<script setup>
import Tab from '@/components/tab/Tab.vue'
import store from '@/store'
import SkillReport from '@/views/reports/skills/SkillReport.vue'

const tabs = [{ title: 'Habilidades' }]
const title = store.getters.accessUserData.InstitutionName
</script>