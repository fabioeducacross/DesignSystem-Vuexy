<template>
  <Tab :tabs="tabs" :current-tab="0" tab-title-icon="school" :tab-title="title">
    <template v-slot:tab-content-0>
      <section>
        <EvaluationsListFilter v-model="filters" />
        <EvaluationsListTable :filters="filters" />
      </section>
    </template>
  </Tab>
</template>

<script setup>
  import EvaluationsListFilter from './EvaluationsListFilter.vue'
  import EvaluationsListTable from './EvaluationsListTable.vue'
  import Tab from '@/components/tab/Tab.vue'
  import store from '@/store'
  import { ref } from 'vue'

  const filters = ref({
    status: null,
  })

  const tabs = [{ title: 'Visão geral' }]
  const title = store.getters.accessUserData.InstitutionName
</script>