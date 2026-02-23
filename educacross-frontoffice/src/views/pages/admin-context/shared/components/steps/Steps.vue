<template>
  <div>
    <div class="steps-header">
      <button class="back-button" @click="goBack">
        <feather-icon icon="ArrowLeftIcon" size="24" />
      </button>
      <div class="steps-breadcrumb">
        <div
          v-for="(step, index) in stepsBreadcrumb"
          :key="index"
          :class="`step ${step.class}`"
        >
          <span
            size="sm"
            class="step-number"
            @click="navigation ? goToStep(index) : null"
          >
            {{ index + 1 }}
          </span>
          <span size="sm" class="step-title">
            {{ step.title }}
          </span>

          <div v-if="index < steps.length - 1" class="stroke" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

  const props = defineProps({
    steps: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    },
    navigation: {
      type: Boolean,
      required: false,
      default: true,
    },
  })

  const emit = defineEmits(['go-to-step'])

  const stepsBreadcrumb = computed(() =>
    props.steps.map((step, index) => {
      let classe = ''
      if (index < props.currentStep || props.currentStep === props.steps.length - 1) {
        classe = 'passed'
      } else if (index === props.currentStep) {
        classe = 'active'
      }

      return {
        title: step.title,
        class: classe,
      }
    })
  )

  const goToStep = (step) => {
    emit('go-to-step', step)
  }

  const goBack = () => {
    window.history.go(-1)
  }

  const ajusteStepsAling = () => {
    const button = document.getElementsByClassName('back-button')[0]
    const steps = document.getElementsByClassName('steps-breadcrumb')[0]

    if (button && steps) {
      const buttonWidth = button.offsetWidth / 2
      steps.style.transform = `translateX(-${buttonWidth}px)`
    }
  }

  onMounted(() => {
    ajusteStepsAling()
  })
</script>

<style lang="scss">
  @import '@/assets/scss/variables/_variables.scss';

  .steps-header {
    display: flex;
    align-items: center;

    box-shadow: none;

    .back-button {
      padding-left: 0.4rem;
      width: 40px;
      height: 40px;

      background: $white;
      border: 1px solid $color-gary-themeligth-border;

      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.04);
      border-radius: 10px;

      color: #82868b;
    }

    .steps-breadcrumb {
      justify-self: center;

      display: flex;

      margin: 0 auto;
    }

    .stroke {
      flex: 1;

      border-top: 1px solid $color-gray-themeLight;

      height: 0px;
      width: 3rem;

      margin: 0 1.5rem;
    }

    .step {
      display: flex;
      align-items: center;

      color: $color-gray-themeLight;
    }

    .step-number {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      padding: 0px;
      width: 24px;
      height: 24px;
      border: 2px solid $color-gray-themeLight;
      border-radius: 5px;
      margin-right: 0.5rem;

      background: #efefef;

      color: $color-gray-themeLight;
      font-weight: bold;

      cursor: pointer;
    }

    .active {
      background: transparent;
      .step-number {
        background: #7367f0;

        border: none;

        color: #fff;
      }
      .step-title {
        color: #5e5873;
        font-weight: bold;
      }
    }

    .passed {
      .step-number {
        background: #28c76f;

        border: none;

        color: #fff;
      }
      .step-title {
        color: #5e5873;
        font-weight: bold;
      }
    }
  }
</style>