<template>
  <div>
    <div v-for="(legend, i) in legends" :key="`${i}-itemEnum`">
      <div
        class="text-sm"
        :class="{
          'pb-0': i < legends.length - 1,
          'pt-0': i !== 0
        }"
      >
        <div class="d-flex justify-content-center gap-2 flex-wrap">
          <div>{{ legend.text }}</div>
          <div v-for="(item, j) in legend.enum" :key="`${i}-${j}-item`">
            <slot name="enum-component" :value="item">
              <SemaphoreStatus :status-enum="item" size="pdf">
                <span class="font-10">{{ item.text }}</span>
              </SemaphoreStatus>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'

const props = defineProps({
  legends: {
    type: Array,
    required: true,
  },
})
</script>