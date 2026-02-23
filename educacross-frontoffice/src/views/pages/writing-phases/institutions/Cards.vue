<template>
  <div>
    <TabCards
      :items="cards"
      :loading="loadingCards"
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
  import ApplicationCardContent from '@/views/pages/writing-phases/components/ApplicationCardContent.vue'
  import { useWritingStagesInstitutions } from '@/views/pages/writing-phases/institutions/useWritingStagesInstitutions.js'
  import { watch } from 'vue'

  const { applyId, loadingCards, cards, resetAndfetch } = useWritingStagesInstitutions()

  const onCardClick = item => {
    if (!item.enabled) return
    applyId.value = item.apply
  }

  watch(applyId, () => {
    if (!applyId.value) return
    resetAndfetch()
  })
</script>

<style lang="scss" scoped></style>