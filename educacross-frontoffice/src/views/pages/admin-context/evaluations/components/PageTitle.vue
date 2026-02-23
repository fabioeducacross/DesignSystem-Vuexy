<template>
  <b-card>
    <b-skeleton-wrapper :loading="isLoading">
      <template v-slot:loading>
        <b-skeleton type="text" class="w-100 mb-0" height="50px" />
      </template>
      <div class="d-flex flex-md-row align-items-center justify-content-start gap-4">
        <div v-if="subjectsIds" class="d-flex gap-1">
          <Subjects
            v-for="subject in subjectsIds"
            :key="subject"
            :subject-id="subject"
            :size="24"
          />
        </div>
        <h4 class="font-bold text-body text-sm mb-0">{{ title }}</h4>

        <span v-if="startDate" class="point-circle d-none d-md-block" />
        <div v-if="startDate">
          <span class="text-sm"
            >Período de {{ formatDate(startDate) }} a {{ formatDate(endDate) }}</span
          >
        </div>

        <b-badge v-if="status" pill :variant="statusEnum[status].variant">
          {{ statusEnum[status].label }}
        </b-badge>
      </div>
    </b-skeleton-wrapper>
  </b-card>
</template>

<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import formatDate from '@/utils/date.js'
import { formatTime } from '@/utils/time.js'

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: false,
  },
  title: {
    type: [String, undefined],
  },
  startDate: {
    type: String || undefined,
    required: false,
  },
  endDate: {
    type: String || undefined,
    required: false,
  },
  status: {
    type: Number || undefined,
    required: false,
  },
  statusEnum: {
    type: Object || undefined,
    required: false,
  },
  lastUpdate: {
    type: String || undefined,
    required: false,
  },
  subjectsIds: {
    type: Array || undefined,
    required: false,
  },
})

</script>
<style lang="scss" scoped>
  .point-circle {
    border-radius: 50%;
    background: #82868b;
    width: 4px;
    height: 4px;
  }
</style>