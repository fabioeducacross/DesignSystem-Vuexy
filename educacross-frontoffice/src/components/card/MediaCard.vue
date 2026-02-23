<template>
  <b-card
    :bg-variant="bgVariant"
    :class="[eventClick ? 'cursor-pointer' : '', classVariant]"
    :border-variant="borderVariant"
    body-class="d-flex flex-column justify-content-center"
    @click="eventClick ? eventClick() : null"
  >
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-skeleton-img no-aspect height="75px" />
      </template>

      <b-media :right-align="rightAlign" :vertical-align="verticalAlign">
        <template #aside>
          <div class="flex-column d-none d-lg-flex">
            <MediaCardIcon v-if="icon" :icon="icon" :variant="variant" />
            <slot name="aside" />
          </div>
        </template>

        <h5 :class="titleColor" class="font-normal">
          {{ $t(title) }}
          <span
            v-if="eventClick"
            v-b-tooltip.hover.top="'Ver detalhes'"
            style="font-size: 16px"
            class="material-symbols-outlined align-middle text-primary cursor-pointer"
            @click="eventClick"
          >
            visibility
          </span>
          <span
            v-if="tooltipText && tooltipText.length > 0"
            v-b-tooltip.hover.top="$t(tooltipText)"
            style="font-size: 16px"
            class="material-symbols-outlined align-middle"
          >
            info
          </span>
        </h5>

        <b-card-text class="card-text h4">
          <slot name="description" />
        </b-card-text>
      </b-media>
    </b-skeleton-wrapper>
  </b-card>
</template>

<script setup>
import MediaCardIcon from '@/components/card/MediaCardIcon.vue'

const props = defineProps({
  bgVariant: {
    type: String,
    default: '',
  },
  titleColor: {
    type: String,
    default: '',
  },
  classVariant: {
    type: String,
    default: '',
  },
  verticalAlign: {
    type: String,
    default: 'center',
  },
  tooltipText: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    required: false,
    default: '',
  },
  rightAlign: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  eventClick: {
    type: Function,
    required: false,
  },
  borderVariant: {
    type: String,
    default: '',
  },
})
</script>