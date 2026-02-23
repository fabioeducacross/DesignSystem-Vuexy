<template>
  <b-card no-body :class="[border ? 'card-border' : '', cardClass]">
    <div v-for="(legend, i) in legends" :key="`${i}-itemEnum`">
      <b-card-body
        class="text-sm"
        :class="{
          'pb-0': i < legends.length - 1,
          'pt-0': i !== 0,
        }"
      >
        <div class="d-flex justify-content-center align-items-center gap-2 flex-wrap">
          <div v-if="legend.text">{{ $t(legend.text) }}:</div>
          <div v-for="(item, j) in legend.enum" :key="`${i}-${j}-item`">
            <slot name="enum-component" :value="item">
              <SemaphoreStatus :status-enum="item">
                <span>{{ $t(item.text) }}</span>
              </SemaphoreStatus>
            </slot>
          </div>
        </div>
        <p
          v-for="(item, j) in legend.enum"
          v-show="item.legend"
          :key="`${i}-${j}-legend`"
          class="mt-1 mb-0"
          v-html="$t(item.legend)"
        ></p>
      </b-card-body>
      <hr v-if="i < legends.length - 1" />
    </div>
  </b-card>
</template>

<script setup>
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'

const props = defineProps({
  legends: {
    type: Array,
    required: true,
  },
  border: {
    required: false,
    default: false,
    type: Boolean,
  },
  cardClass: {
    required: false,
    default: '',
    type: String,
  },
})
</script>

<style lang="scss" scoped>
.card-border {
  border: 1px solid #d8d6de;
  box-shadow: none;
}
</style>