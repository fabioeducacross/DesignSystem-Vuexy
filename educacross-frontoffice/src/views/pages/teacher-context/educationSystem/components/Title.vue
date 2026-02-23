<template>
  <b-card v-show="hasBookSelected" no-body>
    <b-card-body class="d-flex flex-col flex-md-row align-items-center" :class="cardBodyClasses">
      <!-- Book and Subject Information -->
      <div class="d-flex align-items-center gap-2">
        <Subjects :key="`subject-${subject.id}`" :subject-id="subject.id" :size="24" />
        <span class="mb-0 font-bold font-16">
          {{ bookDisplayName }}
        </span>
      </div>

      <!-- Mission Information (only shown when mission is selected) -->
      <span v-show="hasMissionSelected" class="mb-0 text-primary font-bold font-16">
        {{ missionDisplayName }}
      </span>
    </b-card-body>
  </b-card>
</template>

<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import useFilters from '@/store/filters/useFilters'
import { computed } from 'vue'

const { subject, book, mission } = useFilters()

const hasBookSelected = computed(() => {
  return !!(book.value && book.value.id)
})

const hasMissionSelected = computed(() => {
  return !!(mission.value && mission.value.id)
})

const bookDisplayName = computed(() => {
  return book.value?.name || ''
})

const missionDisplayName = computed(() => {
  return mission.value?.name || ''
})

const cardBodyClasses = computed(() => {
  return {
    'justify-content-between': hasMissionSelected.value,
    'justify-content-center': !hasMissionSelected.value,
  }
})
</script>