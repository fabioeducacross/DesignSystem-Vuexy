<template>
  <div class="mission-visualization d-flex flex-column align-items-center mx-1 mw-100 mb-2">
    <div class="d-flex align-items-center justify-content-evenly mb-1 gap-2">
      <span
        class="material-symbols-outlined cursor-pointer"
        :class="disableChevronLeft ? 'chevron-icon-disabled cursor-not-allowed opacity-50' : ''"
        @click="changeSelectedActivityByChevron('back')"
      >
        arrow_back_ios
      </span>
      <div
        v-for="(activity, indexActivity) in missions"
        :key="indexActivity"
        :class="activity.selected ? 'activity-selected border-primary border-2 p-50 border rounded cursor-pointer' : 'p-50 border rounded cursor-pointer'"
      >
        <img
          :src="activity.imageUrl"
          alt="activity"
          @click="changeSelectedActivityByImg(activity.index)"
        />
      </div>
      <span
        class="material-symbols-outlined cursor-pointer"
        :class="disableChevronRight ? 'chevron-icon-disabled cursor-not-allowed opacity-50' : ''"
        @click="changeSelectedActivityByChevron('advance')"
      >
        arrow_forward_ios
      </span>
    </div>

    <div v-if="activeMission">
      <div v-if="activeMission.type === 2" class="tablet-container">
        <img src="@/assets/images/teacher-context/school-context/devices/iPad.png" alt="tablet" />
        <b-img-lazy :src="activeMission.teacherViewImageUrl" alt="teacherImg" />
      </div>
      <h3 v-if="activeMission.type === 2" class="modal-vision">Visão do Professor</h3>

      <div class="phone-container">
        <img src="@/assets/images/teacher-context/school-context/devices/iPhone.png" alt="phone" />
        <b-img-lazy :src="activeMission.studentViewImageUrl" alt="studentImg" />
      </div>
    </div>

    <h3 class="modal-vision">Visão do Aluno</h3>
  </div>
</template>

<script setup>
import isMobile from 'is-mobile'
import debounce from 'lodash/debounce'
import { computed, ref, watch, onUnmounted } from 'vue'

// Props
const props = defineProps({
  data: { type: Array, default: () => [] },
})

// Reactive state
const navigatorIsMobile = ref(isMobile())

const setIsMobile = () => {
  navigatorIsMobile.value = isMobile()
}

const debouncedSetMobile = debounce(setIsMobile, 200)

// Listen for window resize
window.addEventListener('resize', debouncedSetMobile, { passive: true })
onUnmounted(() => {
  window.removeEventListener('resize', debouncedSetMobile)
})

const activities = ref([])

// Watch for changes to props.data and update activities
watch(
  () => props.data,
  () => {
    activities.value = props.data.map((activity, index) => {
      return { ...activity, index }
    })
  },
  { immediate: true },
)

// Determines if left chevron is disabled
const disableChevronLeft = computed(() => {
  if (activities.value.length === 0) return false
  return activities.value[0].selected
})

// Determines if right chevron is disabled
const disableChevronRight = computed(() => {
  const selectedIndex = activities.value.findIndex(activity => activity.selected)
  if (selectedIndex === -1) return false
  return selectedIndex === activities.value.length - 1
})

// Missions to render (carousel logic)
const missions = computed(() => {
  if (navigatorIsMobile.value) {
    return activeMission.value ? [activeMission.value] : []
  }

  const selectedIndex = activities.value.findIndex(activity => activity.selected)
  const activitiesCount = activities.value.length

  if (activitiesCount > 3 && selectedIndex !== -1) {
    if (selectedIndex === 0) {
      return activities.value.slice(0, 3)
    }
    if (selectedIndex === activitiesCount - 1) {
      return activities.value.slice(-3)
    }
    return activities.value.slice(selectedIndex - 1, selectedIndex + 2)
  }

  return activities.value
})

// Currently selected activity (active mission)
const activeMission = computed(() => {
  return activities.value.find(activity => activity.selected)
})

// Change selected activity by image click
const changeSelectedActivityByImg = indexActivity => {
  activities.value = activities.value.map((el, index) => {
    el.selected = index === indexActivity
    return el
  })
}

// Change selected activity by chevron click
const changeSelectedActivityByChevron = direction => {
  if (direction === 'back' && disableChevronLeft.value) return
  if (direction === 'advance' && disableChevronRight.value) return

  const selectedIndex = activities.value.findIndex(activity => activity.selected)
  if (selectedIndex === -1) return

  const sign = direction === 'back' ? -1 : 1
  const nextIndex = selectedIndex + sign

  if (nextIndex < 0 || nextIndex >= activities.value.length) return

  activities.value = activities.value.map((el, index) => {
    el.selected = index === nextIndex
    return el
  })
}
</script>

<style lang="scss" scoped>
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
</style>