<template>
  <b-card
    :bg-variant="bgVariant"
    :class="classVariant"
    :border-variant="borderVariant"
    body-class="d-flex flex-column"
  >
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-skeleton-img no-aspect height="150px" />
      </template>
      <h5
        v-b-tooltip.hover.top.html="!hasTooltipIcon ? tooltipText : null"
        class="position-relative mb-1 d-flex justify-content-between"
        :class="titleColor ? titleColor : 'text-body'"
      >
        <span>
          {{ title }}
        </span>
        <span
          v-if="hasTooltipIcon"
          v-b-tooltip.hover.top.html="tooltipText"
          class="material-symbols-outlined dynamic-card-icon-info"
          :class="`${titleColor ? titleColor : 'text-body'} icon`"
          style="margin: 3px 0 0 4px"
        >info</span>
      </h5>
      <ConditionalValueDisplay :value="value" :title-color="titleColor">
        <div class="d-flex flex-column justify-content-center h-100">
          <b-media :right-align="rightAlign" :vertical-align="verticalAlign">
            <template #aside>
              <div
                class="align-item-center justify-content-center icon-container rounded-md d-none d-lg-flex"
                :class="iconBackground"
              >
                <span
                  class="material-symbols-outlined"
                  :class="`${iconClass ? iconClass : titleColor} icon`"
                >{{ icon }}</span>
                <slot name="aside"></slot>
              </div>
            </template>
            <b-card-text class="card-text h4">
              <slot name="description"></slot>
            </b-card-text>
          </b-media>
        </div>
        <template #empty="slotScope">
          <slot name="empty" v-bind="slotScope" />
        </template>
      </ConditionalValueDisplay>
      <slot name="footer"></slot>
    </b-skeleton-wrapper>
  </b-card>
</template>

<script setup>
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
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
  iconClass: {
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
  hasTooltipIcon: {
    type: Boolean,
    required: false,
    default: false,
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
  iconSize: {
    type: String,
    required: false,
    default: '8em',
  },
  iconBackground: {
    type: String,
    required: false,
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
  borderVariant: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number, Object, Array, Boolean, Function, null, undefined],
    default: undefined,
  },
})
</script>

<style lang="scss" scoped>
h5 {
  font-weight: 400;
  font-size: 1.15rem;
}

.material-symbols-outlined.dynamic-card-icon-info {
  font-size: 16px;
}

.icon-container {
  height: 78px;
  width: 78px;
}

.icon {
  font-size: 46.67px;
  align-self: center;
}
</style>