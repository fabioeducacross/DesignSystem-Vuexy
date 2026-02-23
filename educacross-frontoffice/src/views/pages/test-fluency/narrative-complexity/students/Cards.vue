<template>
  <b-skeleton-wrapper :loading="loading" class="w-100">
    <template v-slot:loading>
      <b-row align-v="center" class="match-height">
        <b-col v-for="i in 3" :key="i" cols="12" lg="4">
          <b-skeleton type="card" height="350px" class="w-100 rounded mb-1"></b-skeleton>
        </b-col>
      </b-row>
    </template>

    <b-row class="match-height">
      <b-col v-for="(item, index) in data" :key="index" cols="12" lg="4">
        <b-card :border-variant="item.enabled ? 'primary' : ''">
          <ApplicationCardContent :data="item" @reload="fetch" />
        </b-card>
      </b-col>
    </b-row>
  </b-skeleton-wrapper>
</template>

<script setup>
import store from '@/store'
import ApplicationCardContent from '@/views/pages/test-fluency/narrative-complexity/components/ApplicationCardContent.vue'
import { computed } from 'vue'

const data = computed(() => store.getters['narrativeComplexityStudents/cards'])

const loading = computed(() => store.getters['narrativeComplexityStudents/loading'])

const fetch = () => {
  store.dispatch('narrativeComplexityStudents/fetch')
}
</script>

<style lang="scss" scoped></style>