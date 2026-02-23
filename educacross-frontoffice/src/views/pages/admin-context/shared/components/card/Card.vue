<template>
  <b-card class="card">
    <header v-if="showHeader" class="header">
      <h3>{{ params.title }}</h3>
      <span>{{ params.subtitle }}</span>
      <span v-if="params.subtitle2">{{ params.subtitle2 }}</span>
    </header>
    <section class="body">
      <slot />
    </section>
    <div v-if="showFooter" class="footer-c">
      <b-button v-if="params.buttonOne.title" variant="outline-primary" @click="buttonOneClick">
        <feather-icon
          v-if="params.buttonOne.icon"
          :icon="params.buttonOne.icon"
          class="customFeather"
        />
        {{ params.buttonOne.title }}
      </b-button>
      <b-button
        v-if="params.buttonTwo.title && params.pass === 1"
        variant="primary"
        :disabled="buttonRightActivate"
        @click="buttonTwoClick"
      >
        <feather-icon
          v-if="params.buttonTwo.icon"
          :icon="params.buttonTwo.icon"
          class="customFeather"
        />
        <b-spinner v-if="buttonRightSpinner" small />
        {{ params.buttonTwo.title }}
      </b-button>
      <b-button
        v-if="params.buttonTwo.title && params.pass === 2"
        variant="primary"
        :disabled="false"
        @click="buttonTwoClick"
      >
        <feather-icon
          v-if="params.buttonTwo.icon"
          :icon="params.buttonTwo.icon"
          class="customFeather"
        />
        <b-spinner v-if="buttonRightSpinner" small />
        {{ params.buttonTwo.title }}
      </b-button>
    </div>
  </b-card>
</template>

<script setup>
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import { BButton, BCard, BSpinner } from 'bootstrap-vue'

const props = defineProps({
  params: {
    type: Object,
    default: () => ({
      title: '',
      subtitle: '',
      buttonOne: {
        title: '',
        icon: '',
      },
      buttonTwo: {
        title: '',
        icon: '',
        submitted: '',
        spinner: '',
      },
      pass: '',
    }),
    required: false,
  },
  onlyBody: {
    type: Boolean,
    default: false,
    required: false,
  },
  buttonRightSpinner: { type: Boolean, default: false },
  buttonRightActivate: { type: Boolean, default: true },
})

const emit = defineEmits(['button-one-click', 'button-two-click'])

import { computed } from 'vue'

const showHeader = computed(() =>
  props.params.title !== '' || props.params.subtitle !== ''
)

const showFooter = computed(() =>
  props.params.buttonOne.title !== '' || props.params.buttonTwo.title !== ''
)

const buttonOneClick = () => {
  emit('button-one-click', true)
}

const buttonTwoClick = () => {
  emit('button-two-click', true)
}
</script>

<style lang="scss" scoped>
  .card {
    max-width: 28.4rem;
    margin: 2.75rem auto;
  }

  .header {
    text-align: center;
    margin-bottom: 1.25rem;

    & h3 {
      margin: 0 auto;
      font-size: 1.3125rem;
      font-weight: 500;
    }

    & span {
      font-size: 0.875rem;
      font-weight: 400;
      white-space: nowrap;
    }
  }

  .customFeather {
    display: inline;
  }

  .footer-c {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.25 0rem;

    & button {
      flex: 1;

      &:first-child {
        margin-right: 0.25rem;
      }

      &:last-child {
        margin-left: 0.25rem;
      }
    }
  }

  .body {
    padding: 1rem 0;
  }
</style>