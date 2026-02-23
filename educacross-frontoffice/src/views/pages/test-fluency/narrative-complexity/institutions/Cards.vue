<template>
  <div>
    <TabCards
      :items="data"
      :loading="loading"
      :current-item="applyId"
      key-id="apply"
      :md="4"
      :sm="12"
      @click="onCardClick"
    >
      <template v-slot:item="{ item }">
        <ApplicationCardContent :data="item" />
      </template>
    </TabCards>
  </div>
</template>

<script setup>
import TabCards from '@/components/tab/TabCards.vue'
import store from '@/store'
import ApplicationCardContent from '@/views/pages/test-fluency/narrative-complexity/components/ApplicationCardContent.vue'
import { computed, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy

const loading = computed(() => store.getters['narrativeComplexityInstitutions/loadingCards'])
const data = computed(() => store.getters['narrativeComplexityInstitutions/cards'])
const applyId = computed(() => store.getters['narrativeComplexityInstitutions/applyId'])

const onCardClick = item => {
  if (!item.enabled) return
  store.commit('narrativeComplexityInstitutions/applyId', item.apply)
  store.commit('narrativeComplexityInstitutions/resetParams')
  vm.$bus.emit('resetPage')
  store.dispatch('narrativeComplexityInstitutions/fetch')
}
</script>

<style lang="scss" scoped></style>