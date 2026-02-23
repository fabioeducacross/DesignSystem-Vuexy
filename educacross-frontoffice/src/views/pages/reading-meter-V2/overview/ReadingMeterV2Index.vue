<template>
  <div>
    <section v-if="isTeacher">
      <ReadingMeterV2Filter />
      <ReadingMeterV2List />
    </section>
    <Tab v-else :tabs="tabs" :current-tab="0" tab-title-icon="school" :tab-title="title">
      <template v-slot:tab-content-0>
        <section>
          <ReadingMeterV2Filter />
          <ReadingMeterV2List />
        </section>
      </template>
    </Tab>
  </div>
</template>

<script setup>
import ReadingMeterV2Filter from './ReadingMeterV2Filter.vue'
import ReadingMeterV2List from './ReadingMeterV2List.vue'
import { useReadingMeterV2 } from './useReadingMeterV2.js'
import Tab from '@/components/tab/Tab.vue'
import store from '@/store'
import { onBeforeMount } from 'vue'

const { getEvaluations, isTeacher } = useReadingMeterV2()
const tabs = [{ title: 'Visão geral' }]
const title = store.getters.accessUserData.InstitutionName

onBeforeMount(() => {
  getEvaluations()
})
</script>

<style lang="scss" scoped></style>