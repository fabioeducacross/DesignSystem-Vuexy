<template>
  <b-row>
    <b-col>
      <div>
        <MeetGamesFilter v-model="params" />
      </div>
    </b-col>
    <b-col cols="12">
      <b-overlay :show="loadingGetActivities">
        <div
          class="iconsContainer-chooseHowShowActivity d-flex align-items-center justify-content-end"
        >
          <span
            class="material-symbols-outlined cursor-pointer"
            :class="{
              'text-primary': showActivitiesWithoutCard,
              'opacity-50 cursor-not-allowed': loadingGetActivities,
            }"
            style="font-size: 30px"
            @click="changeActivitiesView('tag')"
          >
            view_module
          </span>
          <span
            class="material-symbols-outlined cursor-pointer"
            :class="{
              'text-primary': !showActivitiesWithoutCard,
              'opacity-50 cursor-not-allowed': loadingGetActivities,
            }"
            style="font-size: 30px"
            @click="changeActivitiesView('card')"
          >
            list
          </span>
        </div>
        <div
          v-if="activities.data.length === 0 && !loadingGetActivities"
          class="col w-100 vs-input--label color-patternTwo mt-1 mb-1"
        >
          <p class="text-center">Não há jogos para a combinação de filtros selecionados!</p>
        </div>
        <div v-else>
          <activity-tag
            v-if="showActivitiesWithoutCard"
            :key="activityTagKey"
            :data="activities.data"
            :subject-id="subjectId"
            class="mt-1"
            :educational-organization-id="params.educationalOrganizationIds"
            @modal-been-closed="activityTagKey += 1"
          />
          <activity-card
            v-else
            :data="activities.data"
            :subject-id="subjectId"
            :educational-organization-id="params.educationalOrganizationIds"
          />
        </div>
        <div class="d-flex flex-row w-100 justify-content-center">
          <b-pagination
            v-model="currentActivityPage"
            first-number
            last-number
            :per-page="activities.pageSize"
            :total-rows="activities.total"
          />
        </div>
      </b-overlay>
    </b-col>
  </b-row>
</template>

<script setup>
import ActivityCard from '../../shared/components/ActivityCard.vue'
import ActivityTag from '../../shared/components/ActivityTag.vue'
import { getActivities as getActivitiesService } from '@/services/teacher-context/activities/Activities.service.js'
import MeetGamesFilter from '@/views/pages/teacher-context/library/meet-games/MeetGamesFilter.vue'
import { BPagination } from 'bootstrap-vue'
import store from '@/store'

import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'

// Activities state
const activities = reactive({
  currentPage: 0,
  currentPageSize: 0,
  data: [],
  orderBy: [],
  pageSize: 0,
  total: 0,
  totalPages: 0,
})

const currentActivityPage = ref(1)
const showActivitiesWithoutCard = ref(true)
const loadingGetActivities = ref(true)
const activityTagKey = ref(0)
const params = ref({})
const matchMedia = window.matchMedia('(max-width:1200px)')
let matchMediaHandler = null

const subjectId = computed(() => {
  return store.getters['filters/subject']?.id
})

const getActivities = inputParams => {
  loadingGetActivities.value = true

  // Calculate pageSize depending on view
  const pageSize = showActivitiesWithoutCard.value ? 48 : 12

  getActivitiesService({
    pageSize,
    page: currentActivityPage.value,
    ...inputParams,
  })
    .then(response => {
      const { data } = response
      // Copy new activities properties (shallow)
      Object.assign(activities, data)
    })
    .finally(() => {
      loadingGetActivities.value = false
    })
}

const filterActivities = () => {
  if (!loadingGetActivities.value) {
    getActivities(params.value)
  }
}

const resetCurrentActivityPage = () => {
  currentActivityPage.value = 1
}

const changeActivitiesView = param => {
  if (!loadingGetActivities.value) {
    resetCurrentActivityPage()
    if (param === 'tag') {
      if (!showActivitiesWithoutCard.value) {
        showActivitiesWithoutCard.value = true
        filterActivities()
      }
    } else if (param === 'card') {
      if (showActivitiesWithoutCard.value) {
        showActivitiesWithoutCard.value = false
        filterActivities()
      }
    }
  }
}

// Watch currentActivityPage to load activities
watch(currentActivityPage, () => {
  getActivities(params.value)
})

// Watch params to reset page and load activities
watch(params, () => {
  currentActivityPage.value = 1
  getActivities(params.value)
})

// Responsive handler
onMounted(() => {
  if (window.innerWidth <= 1200) showActivitiesWithoutCard.value = false
  matchMediaHandler = media => {
    if (media.matches) {
      changeActivitiesView('card')
    } else {
      changeActivitiesView('tag')
    }
  }
  matchMedia.addEventListener('change', matchMediaHandler)
})

onUnmounted(() => {
  if (matchMediaHandler) {
    matchMedia.removeEventListener('change', matchMediaHandler)
  }
})

</script>

<style lang="scss" scoped>
  .label-checkbox {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;

    color: #7367f0;
  }

  .label-filter {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }

  .title-explore {
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;
  }

  .text-explore {
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
  }

  .input-line {
    margin-bottom: 1rem;
  }

  .input-element {
    margin-right: 1rem;
    max-width: 32.5%;
  }

  @media (max-width: 991px) {
    .responsive-columns {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .responsive-texts {
      padding-top: 1rem;
    }

    .input-element {
      margin-right: 0;
      max-width: 100%;
    }
  }

  @media (max-width: 767px) {
    .mobile-size {
      margin-top: 10px;
    }
  }
</style>
<style>
  .btn-full-width {
    width: 100%;
  }

  .btn-container {
    display: flex;
    align-items: flex-end;
  }
</style>