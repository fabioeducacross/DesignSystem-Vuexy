<template>
  <div>
    <div class="container-missionFeedback">
      <div class="flex flex-col flex-wrap items-center text-center">
        <img
          src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-success.png"
          class="img-feedback"
          alt="belinha"
        />
        <p class="title-missionFeedback color-patternTwo">
          {{ enabled ? $t('missionEnabledSuccess') : $t('missionDisabledSuccess') }}
        </p>
        <div
          v-if="enabled && canViewGuideLink && guideLink"
          class="flex justify-center w-full mt-1"
        >
          <div class="xl:w-7/12 w-full">
            <read-only-input-with-clipboard input-label="Link da missão" :input-data="guideLink" />
          </div>
        </div>
        <div class="boxButton-missionFeedback my-10">
          <b-button
            id="button-loading-enableCustomGuide"
            class=""
            :text-color="buttonTextColor ? buttonTextColor : ''"
            variant="primary"
            type="filled"
            @click="close"
          >
            OK
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import ReadOnlyInputWithClipboard from '../components/ReadOnlyInputWithClipboard.vue'
  import { BButton } from 'bootstrap-vue'

  const props = defineProps({
    enabled: { type: Boolean, default: false },
    buttonTextColor: { type: String, default: '' },
    guideLink: { type: String, default: '' },
    canViewGuideLink: { type: Boolean, default: false },
  })

  const emit = defineEmits(['close-missionsFeedback'])

  const close = () => {
    emit('close-missionsFeedback')
  }
</script>

<style lang="scss" scoped>
  .title-missionFeedback {
    font-weight: 600;
    font-size: 34px;
    line-height: 38px;
  }

  .text-missionFeedback {
    font-size: 16px;
    line-height: 21px;
  }

  .container-missionFeedback {
    padding: 1.2rem;
  }

  .img-feedback {
    width: 246.66px;
    height: 226px;
  }

  .boxButton-missionFeedback {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    button {
      width: 17rem;
    }
  }

  @media (max-width: 1024px) {
    .container-missionFeedback {
      padding: 0;
    }
    .boxButton-missionFeedback {
      button {
        width: 100%;
      }
    }
  }

  @media (max-width: 359px) {
    .img-feedback {
      width: 100%;
      height: auto;
    }
  }
</style>