<template>
  <div>
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-row class="flex-nowrap overflow-x-auto match-height">
          <b-col cols="12" :sm="sm" :md="md">
            <b-card>
              <b-skeleton-img no-aspect height="75px" />
            </b-card>
          </b-col>
          <b-col cols="12" :sm="sm" :md="md">
            <b-card>
              <b-skeleton-img no-aspect height="75px" />
            </b-card>
          </b-col>
        </b-row>
      </template>
      <b-row class="flex-nowrap overflow-x-auto match-height">
        <b-col
          v-for="(item, index) in items"
          :key="index"
          cols="12"
          :sm="sm"
          :md="md"
          :class="item[keyId] === currentItem ? 'active' : ''"
        >
          <b-card
            body-class="p-1"
            class="mb-1 cursor-pointer transition-none"
            @click="onClickCard(item)"
          >
            <slot name="item" :item="item"></slot>
          </b-card>
        </b-col>
      </b-row>
    </b-skeleton-wrapper>

    <router-view />
  </div>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: true,
    required: true,
  },
  items: {
    required: true,
    type: Array,
  },
  currentItem: {
    type: Number,
    required: false,
  },
  keyId: {
    type: String,
    required: false,
    default: 'id',
  },
  md: {
    type: Number,
    default: 3,
    required: false,
  },
  sm: {
    type: Number,
    default: 6,
    required: false,
  },
})

const emit = defineEmits(['click'])

const onClickCard = item => {
  if (item[props.keyId] !== props.currentItem) {
    emit('click', item)
  }
}
</script>

<style lang="scss" scoped>
.active {
  .card {
    margin-bottom: 0 !important;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    &::before {
      content: '';
      position: absolute;
      background: transparent;
      bottom: 0;
      left: -0.856rem;
      height: 0.428rem;
      width: 0.856rem;
      border-bottom-right-radius: 0.428rem;
      box-shadow: 0.428rem 0 0 0 #fff;
    }
    &::after {
      content: '';
      position: absolute;
      background: transparent;
      bottom: 0;
      right: -0.856rem;
      height: 0.428rem;
      width: 0.856rem;
      border-bottom-left-radius: 0.428rem;
      box-shadow: -0.428rem 0 0 0 #fff;
    }
  }
  &:first-child {
    .card {
      &::before {
        display: none;
      }
    }
  }
  &:last-child {
    .card {
      &::after {
        display: none;
      }
    }
  }
}
.selected-first {
  border-top-left-radius: 0;
}
.selected-last {
  border-top-right-radius: 0;
}
</style>