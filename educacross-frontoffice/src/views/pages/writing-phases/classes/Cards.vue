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
        <ApplicationCardContent :data="item" @open-orientation-modal="openOrientationModal" />
      </template>
    </TabCards>
    <OrientationModal ref="refOrientationModal" />
  </div>
</template>

<script setup>
import TabCards from '@/components/tab/TabCards.vue'
import { useClassesWritingPhase } from '@/views/pages/writing-phases/classes/useClassesWritingPhase'
import ApplicationCardContent from '@/views/pages/writing-phases/components/ApplicationCardContent.vue'
import OrientationModal from '@/views/pages/writing-phases/components/OrientationModal.vue'
import { getCurrentInstance, ref } from 'vue'

const vm = getCurrentInstance().proxy
const previewPhase = ref(null)
const refOrientationModal = ref(null)

const { loadingCards, cards, applyId, fetchClasses } = useClassesWritingPhase()

const orientationDetails = ref({})
const loading = ref(false)

const onCardClick = item => {
  if (!item.enabled) return
  applyId.value = item.apply

  vm.$bus.emit('resetPage')
  fetchClasses()
}

const openOrientationModal = async data => {
  if (loading.value) return

  loading.value = true

  await refOrientationModal.value.show({
    writingStagesTestId: data.writingStagesTestId,
    apply: data.apply,
  })

  loading.value = false
}
</script>

<style lang="scss" scoped></style>