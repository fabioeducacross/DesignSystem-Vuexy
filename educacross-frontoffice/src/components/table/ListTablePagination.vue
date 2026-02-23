<template>
  <b-row>
    <b-col
      v-if="showEntries"
      cols="12"
      :sm="forceResposive ? 12 : 6"
      class="d-flex align-items-center justify-content-center justify-content-sm-start mb-1 mb-sm-0"
      :class="forceResposive ? 'justify-content-sm-center mb-sm-1' : ''"
    >
      <span
        class="text-muted"
        v-html="
          $t('ShowingEntries', {
            from: formatNumber(perPage * (value - 1) + (totalData ? 1 : 0)),
            to: formatNumber(endItem),
            of: formatNumber(totalData),
          })
        "
      >
      </span>
    </b-col>
    <!-- Pagination -->
    <b-col
      cols="12"
      :sm="forceResposive ? 12 : 6"
      class="d-flex align-items-center justify-content-center justify-content-sm-end"
      :class="forceResposive ? 'justify-content-sm-center' : ''"
    >
      <b-pagination
        :value="value"
        :total-rows="totalData"
        :per-page="perPage"
        first-number
        last-number
        class="mb-0"
        prev-class="prev-item"
        next-class="next-item"
        @change="handleChange"
      >
        <template #prev-text>
          <feather-icon icon="ChevronLeftIcon" size="18" />
        </template>
        <template #next-text>
          <feather-icon icon="ChevronRightIcon" size="18" />
        </template>
      </b-pagination>
    </b-col>
  </b-row>
</template>

<script setup>
import { computed } from 'vue'
import { formatNumber } from '@/filters/filters'

// Props
const props = defineProps({
  value: {
    required: true,
    type: Number,
  },
  totalData: {
    required: true,
    type: Number,
  },
  perPage: {
    required: true,
    type: Number,
  },
  forceResposive: {
    type: Boolean,
    default: false,
  },
  showEntries: {
    type: Boolean,
    default: true,
  },
})

// Emits
const emit = defineEmits(['input'])

// Computed
const endItem = computed(() => {
  let item = props.value * props.perPage
  if (item > props.totalData) {
    item = props.totalData
  }
  return item
})

// Methods
const handleChange = val => {
  emit('input', val)
}
</script>

<style lang="scss" scoped></style>