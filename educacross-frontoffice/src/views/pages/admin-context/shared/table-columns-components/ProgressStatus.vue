<template>
  <div class="progress-wrapper">
    <b-card-text class="mb-0">
      {{ totalActivities }} de {{ content.activities }} jogos finalizados
    </b-card-text>
    <b-progress
      v-model="content.completionPercentage"
      class="w-50"
      height="0.6rem"
      max="100"
      variant="success"
    />
  </div>
</template>

<script setup>
import { BCardText, BProgress } from 'bootstrap-vue'

const props = defineProps({
  content: {
    type: Object,
    default: () => {},
  },
})

const totalActivities = ref(0)

const calcTotalActivities = () => {
  totalActivities.value = 0
  if (props.content && props.content.activities && props.content.completionPercentage != null) {
    totalActivities.value = Math.floor(
      (props.content.activities * props.content.completionPercentage) / 100
    )
  }
}

watch(
  () => props.content,
  () => {
    totalActivities.value = 0
    calcTotalActivities()
  },
  { immediate: true }
)
</script>