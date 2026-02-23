<template>
  <div
    :class="`d-flex mission-modal p-1 ${
      type === 1 ? 'individual' : type === 2 ? 'coletivo' : 'mix'
    }`"
  >
    <h2
      class="tx-color text-center title-collectiveMission"
      style="display: flex; align-items: center; align-self: center; justify-content: center"
    >
      <activity-icon :type="type" /><span>
        {{ $t(`Missions${$utilTeacherService.activityType.formatText(type)}`) }}
      </span>
    </h2>
    <p v-if="type === 1" class="text-center color-grayTheme">
      {{ $t('individualGameDescription') }}
    </p>
    <p v-else-if="type === 2" class="text-center color-grayTheme">
      {{ $t('collectiveGameDescription') }}
    </p>
    <p v-else class="text-center color-grayTheme">
      {{ $t('mixedGameDescription') }}
    </p>
    <div class="hr" />

    <!-- Content -->

    <div class="mission-content">
      <div class="mission-visualization">
        <h2 class="title-collectiveMission text-center text-color-theme">
          {{ $t('missionPreview') }}
        </h2>
        <div class="mission-activities">
          <span
            class="material-symbols-outlined text-color-theme cursor-pointer"
            :class="{ 'chevron-icon-disabled ': disableChevronLeft }"
            @click="changeSelectedActivityByChevron('back')"
          >
            arrow_back_ios
          </span>
          <div
            v-for="(activity, indexActivity) in formatedMission"
            :key="indexActivity"
            :class="{ 'activity-selected': activity.selected }"
          >
            <img
              :src="activity.imageUrl"
              alt="activity"
              @click="changeSelectedActivityByImg(activity)"
            />
          </div>

          <span
            class="material-symbols-outlined cursor-pointer"
            :class="{ 'chevron-icon-disabled': disableChevronRight }"
            @click="changeSelectedActivityByChevron('advance')"
          >
            arrow_forward_ios
          </span>
        </div>
        <b-badge
          v-if="activeMissionType"
          pill
          :class="`situation-chip ${activeMissionType === 1 ? 'bg-individual' : 'bg-coletivo'}`"
          :variant="activeMissionType === 1 ? 'danger' : 'primary'"
        >
          <div class="d-flex align-items-center justify-content-center">
            <activity-icon :type="activeMissionType" color="#fff" :size="12.8" class="mr-50" />
            {{ $utilTeacherService.activityType.formatText(activeMissionType) }}
          </div>
        </b-badge>

        <div v-if="activeMissionType === 2">
          <h3 class="subtitle-collectiveMission color-grayTheme">{{ $t('teacherView') }}</h3>
          <div class="tablet-container">
            <img
              src="@/assets/images/teacher-context/school-context/devices/iPad.png"
              alt="tablet"
            />
            <img :src="teacherImageToShow" alt="teacherImg" />
          </div>
        </div>

        <div>
          <h3 class="subtitle-collectiveMission color-grayTheme">{{ $t('studentView') }}</h3>
          <div class="phone-container">
            <img
              src="@/assets/images/teacher-context/school-context/devices/iPhone.png"
              alt="phone"
            />
            <img :src="studentImageToShow" alt="studentImg" />
          </div>
        </div>
      </div>
      <div class="missison-steps">
        <div>
          <h2 class="title-collectiveMission text-color-theme">{{ $t('dynamicStepByStep') }}</h2>
          <div v-for="(step, indexStep) in getSteps" :key="indexStep" class="dynamic-steps">
            <span
              class="material-symbols-outlined text-color-theme"
              :style="`font-size: ${dynamicsSteps[step].size} ;`"
            >
              {{ dynamicsSteps[step].icon }}
            </span>
            <p class="text-collectiveMission color-grayTheme mb-0">
              {{ $t(dynamicsSteps[step].description) }}
            </p>
          </div>
        </div>
        <b-button
          id="button-loading-startMission"
          ref="loadableButtonStartMission"
          type="filled"
          class="w-full mt-10"
          variant="primary"
          :disabled="loadingButton"
          @click="deepLinkAndToken()"
        >
          <b-spinner v-show="loadingButton" small variant="white" class="mr-50" />
          {{ $t('startMission') }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import ActivityIcon from '../components/ActivityIcon.vue'
import {
  getAutenticateGuide,
  getGuideResume,
} from '@/services/teacher-context/guides/Guides.Service'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton } from 'bootstrap-vue'

// Props
const props = defineProps({
  guideId: { type: Number, required: true },
  type: { type: Number, required: true },
})

// Emits (none explicitly used, but could be defined as necessary)
// const emit = defineEmits([])

const { classe } = useFilters()

// Reactive state
import { ref, computed, onMounted } from 'vue'

// Mission list and state for active selection
const mission = ref([
  {
    imageUrl: '',
    selected: false,
    studentViewImageUrl: '',
    teacherViewImageUrl: '',
  },
])

const missionGuideLink = ref('')
const teacherImageToShow = ref('')
const studentImageToShow = ref('')
const loadingButton = ref(false)
const activeMissionType = ref(null)

const matchMedia = window.matchMedia('(max-width:500px)')
const isMobileScreen = ref(false)
const globalClassId = ref(0)

const dynamicsSteps = [
  {
    icon: 'account_circle',
    size: '32px',
    description: 'simultaneousPlay',
  },
  {
    icon: 'language',
    size: '32px',
    description: 'recommendationMobileComputer',
  },
  {
    icon: 'cast',
    size: '32px',
    description: 'playSimultaneouslyInstructions',
  },
  {
    icon: 'phone_iphone',
    size: '32px',
    description: 'ensureChildrenLoggedIn',
  },
  {
    icon: 'track_changes',
    iconPack: 'feather',
    size: '32px',
    description: 'stimulateCorrectAnswers',
  },
  {
    icon: 'open_in_full',
    size: '32px',
    description: 'expandGameTheme',
  },
  {
    icon: 'favorite_border',
    size: '32px',
    description: 'provideLightFunMoment',
  },
]

// Steps array - not used directly in template, but could be if needed
const steps = ref([])

// Computed: steps to display based on mission type
const getSteps = computed(() => {
  if (props.type === 1) {
    return [1, 3, 5]
  }
  if (props.type === 2) {
    return [0, 1, 2, 3, 5]
  }
  return [1, 2, 3, 5]
})

// Computed: format the visible mission activities (carousel behavior)
const formatedMission = computed(() => {
  const arr = []
  if (mission.value.length >= 3 || isMobileScreen.value) {
    if (mission.value.length >= 3 && !isMobileScreen.value) {
      mission.value.forEach((el, i) => {
        // max 3 items for desktop
        if (el.selected) {
          if (i !== 0 && i !== mission.value.length - 1) {
            arr.push(mission.value[i - 1], el, mission.value[i + 1])
          } else if (i === 0) {
            arr.push(el, mission.value[i + 1], mission.value[i + 2])
          } else if (i === mission.value.length - 1) {
            arr.push(mission.value[i - 2], mission.value[i - 1], el)
          }
        }
      })
    } else if (isMobileScreen.value) {
      // only selected one for mobile
      mission.value.forEach(el => {
        if (el.selected) arr.push(el)
      })
    }
    return arr
  }
  // less than 3 items (desktop)
  return mission.value
})

const disableChevronLeft = computed(() => {
  return !!(mission.value[0] && mission.value[0].selected)
})
const disableChevronRight = computed(() => {
  return !!(
    mission.value[mission.value.length - 1] && mission.value[mission.value.length - 1].selected
  )
})

// Util for toast errors
const showToastErrors = errorsArray => {
  errorsArray.message.forEach(elementError => {
    // $toast uses global mixin, access via `this.$toast` in Vue 2; in script setup, access in template or inject
    // Here, using global property
    window.vm?.$toast?.({
      component: Toast,
      props: {
        title: 'Atenção',
        icon: 'AlertTriangleIcon',
        text: elementError,
        variant: 'danger',
      },
    })
  })
}

// API call: get the collective guide resume
const getCollectiveGuideResume = async () => {
  await getGuideResume(props.guideId, globalClassId.value)
    .then(({ data }) => {
      data.forEach((element, index) => {
        if (index === 0) {
          element.selected = true
          putHelpImagesToShow(element)
        } else {
          element.selected = false
        }
      })
      mission.value = data
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = window.vm
        ? window.vm.$utilTeacherService.handleFormatErrors(errors)
        : []
      showToastErrors(errorsArray)
    })
}

// API call: fetch the guide link and open deeplink
const getCollectiveGuideResumeGuideLink = async () => {
  loadingButton.value = true
  await getAutenticateGuide(props.guideId, globalClassId.value)
    .then(({ data }) => {
      missionGuideLink.value = import.meta.env.VITE_APP_DEEPLINK_URL + data.guideLinkUrl
      loadingButton.value = false
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = window.vm
        ? window.vm.$utilTeacherService.handleFormatErrors(errors)
        : []
      showToastErrors(errorsArray)
      loadingButton.value = false
    })
}

// Switch selected activity by clicking image
const changeSelectedActivityByImg = activity => {
  mission.value = mission.value.map(el => {
    el.selected = false
    return el
  })
  activity.selected = true
  putHelpImagesToShow(activity)
}

// Chevron: next/back activity selection
const changeSelectedActivityByChevron = direction => {
  const sign = direction === 'back' ? -1 : 1
  let indexSelectedActivity = 0
  indexSelectedActivity = mission.value.findIndex(el => el.selected)

  const selectNextOrPreviousActivity = index => {
    mission.value[index].selected = !mission.value[index].selected
    mission.value[index + sign].selected = !mission.value[index + sign].selected
    putHelpImagesToShow(mission.value[index + sign])
  }

  if (indexSelectedActivity !== 0 && indexSelectedActivity < mission.value.length - 1) {
    selectNextOrPreviousActivity(indexSelectedActivity)
  } else if (
    indexSelectedActivity === 0 &&
    direction === 'advance' &&
    mission.value.length > 1
  ) {
    selectNextOrPreviousActivity(indexSelectedActivity)
  } else if (
    indexSelectedActivity === mission.value.length - 1 &&
    direction === 'back' &&
    mission.value.length > 1
  ) {
    selectNextOrPreviousActivity(indexSelectedActivity)
  }
}

// Set images for teacher/student preview and mission type
const putHelpImagesToShow = element => {
  teacherImageToShow.value = element.teacherViewImageUrl
  studentImageToShow.value = element.studentViewImageUrl
  activeMissionType.value = element.type
}

// Open deeplink and token
const deepLinkAndToken = async () => {
  await getCollectiveGuideResumeGuideLink()
  window.open(missionGuideLink.value, '_blank')
}

// Responsive setup
onMounted(() => {
  if (window.innerWidth <= 500) isMobileScreen.value = true
  if (matchMedia.addEventListener) {
    matchMedia.addEventListener('change', media => {
      if (media.matches) {
        isMobileScreen.value = true
      } else {
        isMobileScreen.value = false
      }
    })
  }
  globalClassId.value = classe.value.ClassId

  getCollectiveGuideResume()
})

// Expose template-accessible functions and refs
// (All refs/computed are directly accessible in <template>)
</script>

<style lang="scss" scoped>
  .mission-modal {
    display: flex;
    flex-direction: column;
  }
  .title-collectiveMission {
    font-weight: 500;
    font-size: 28px;
    line-height: 36px;
    margin-bottom: 2rem;
  }

  .subtitle-collectiveMission {
    font-weight: 600;
    font-size: 15px;
    line-height: 24px;
  }

  .title-collectiveMission,
  .subtitle-collectiveMission {
    text-align: center;
  }

  .text-collectiveMission {
    font-size: 14px;
    line-height: 24px;
  }

  .text-orange {
    color: var(--primary);
  }

  .bg-orange {
    background: var(--primary) !important;
  }

  .individual {
    .tx-color {
      color: #f26f21 !important;
    }

    .bg-color {
      background: #f26f21 !important;
    }
  }

  .bg-individual {
    background: #f26f21 !important;
    color: #fff !important;
  }

  .coletivo {
    .tx-color {
      color: #0d6efd !important;
    }

    .bg-color {
      background: #0d6efd !important;
    }
  }

  .bg-coletivo {
    background: #0d6efd !important;
    color: #fff !important;
  }

  .mix {
    .tx-color {
      color: #28c76f !important;
    }

    .bg-color {
      background: #28c76f !important;
    }
  }

  .hr {
    border: 0;
    height: 1px;
    background: #e2e2e3;

    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  .mission-content {
    display: flex;
    flex-wrap: wrap;

    margin-bottom: 2rem;

    .mission-visualization {
      display: flex;
      flex-direction: column;

      flex: 1;

      margin-right: 1rem;
    }

    .missison-steps {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;

      margin-left: 1rem;
    }

    .situation-chip {
      max-width: 6.5rem;
      width: 100%;

      margin: 0 auto 1.5rem auto;
    }
  }

  @mixin deviceContainer($width, $top, $left) {
    position: relative;
    top: 0;
    left: 0;

    img:first-child {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
    }

    img:last-child {
      position: absolute;
      width: $width;
      top: $top;
      left: $left;
    }
  }

  .tablet-container {
    @include deviceContainer(83%, 17.4%, 8.6%);
  }

  .phone-container {
    @include deviceContainer(71%, 11%, 14.5%);
  }

  .mission-activities {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 2rem;

    > div {
      padding: 6px;
      height: 116px;
      border-radius: 5px;
      border: 2px solid transparent;
      &.activity-selected {
        border: 2px solid rgba(var(--primary), 1);
      }

      &.activity-selected-individual {
        border: 2px solid rgba(#f26f21, 1);
      }

      img {
        cursor: pointer;
        width: 100px;
        height: 100px;
      }
    }
  }

  .chevron-icon {
    align-self: center;
    font-size: 24px;
    cursor: pointer;
  }

  .chevron-icon-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .dynamic-steps {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding: 16px;
    border: 1px solid #e2e2e3;

    gap: 0.5rem;
  }

  #button-loading-startMission {
    margin-bottom: 1.875rem;
  }

  @media (max-width: 992px) {
    .mission-content {
      flex-direction: column;
    }
  }
</style>