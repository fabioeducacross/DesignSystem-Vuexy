<template>
  <b-skeleton-wrapper :loading="loading">
    <template v-slot:loading>
      <b-skeleton height="15vh" />
      <hr />
      <b-skeleton height="60vh" />
    </template>
    <div class="d-flex flex-column align-items-center w-100 mb-2">
      <h1 class="text-primary mb-1">
        {{ guideData.guideName }}
      </h1>
      <p v-if="guideData.start !== '-' && guideData.expiration !== '-'">
        Período de duração: {{ guideData.start }} à {{ guideData.expiration }}
      </p>

      <div class="mb-2">
        <b-badge pill :variant="guideData.enabled ? 'light-success' : 'light-danger'">
          {{ guideData.enabled ? 'Em andamento' : 'Finalizada' }}
        </b-badge>
      </div>

      <div class="d-flex flex-column flex-lg-row align-items-center w-100 justify-center gap-4">
        <div class="d-flex flex-column align-items-center">
          <p class="progress-legend">
            {{ guideData.finishedActivities | formatNumber }} de
            {{ guideData.totalActivities | formatNumber }} jogos finalizados
          </p>
          <b-progress
            class="w-100"
            :value="guideData.finishedActivities"
            :max="guideData.totalActivities"
            variant="success"
            height="5px"
          />
        </div>
        <div class="separator d-none d-lg-block"></div>
        <div class="d-flex align-items-center time-learn">
          <feather-icon icon="WatchIcon" class="modal-icon text-primary mr-1" />
          <div>
            <p class="legend m-0">Tempo de aprendizagem</p>
            <p class="h4 text-primary m-0">
              {{ guideData.time }}
            </p>
          </div>
        </div>
      </div>

      <hr class="w-100" />
      <div class="d-flex flex-column align-items-center">
        <div class="modal-carousel">
          <div class="mission-activities d-flex align-items-center">
            <feather-icon
              class="mr-1"
              style="width: 24px; height: 24px; cursor: pointer"
              :style="
                activitySelected === mission[0].index ? 'opacity: 0.5; cursor: not-allowed;' : ''
              "
              icon="ChevronLeftIcon"
              @click="prevActivitie"
            />
            <div class="acitivities-list">
              <div class="d-flex">
                <div
                  v-for="(activity, index) in showMissions"
                  :key="index"
                  class="d-flex flex-column align-items-center justify-content-center active-image-container m-1"
                >
                  <div
                    class="d-flex align-items-center justify-content-center imageCardWrapper mb-1"
                    :class="activitySelected === activity.index ? 'activate' : 'disabled'"
                  >
                    <img
                      alt="activity"
                      :src="activity.activityImageUrl"
                      class="activityImage"
                      @click="activitySelected = activity.index"
                    />
                  </div>
                  <b-badge v-if="activity.finished === true" variant="light-success">
                    Finalizou
                  </b-badge>
                  <b-badge v-else-if="activity.finished === false" variant="light-warning">
                    Não finalizou
                  </b-badge>
                  <b-badge v-else variant="light-danger"> Não jogou </b-badge>
                </div>
              </div>
            </div>
            <feather-icon
              class="ml-1"
              style="width: 24px; height: 24px; cursor: pointer"
              :style="
                activitySelected === mission[mission.length - 1].index
                  ? 'opacity: 0.5; cursor: not-allowed;'
                  : ''
              "
              icon="ChevronRightIcon"
              @click="nextActivitie"
            />
          </div>
        </div>
      </div>
      <div class="w-100 d-flex flex-column justify-start">
        <h1 class="text-primary">
          {{ currentActivitieData.activityName }}
        </h1>
        <template v-if="currentActivitieData.learningObjective">
          <h4>Ação no jogo</h4>
          <p>{{ currentActivitieData.learningObjective }}</p>
        </template>
        <template v-if="currentActivitieData.orientation">
          <h4>Orientações Didáticas</h4>
          <p>{{ currentActivitieData.orientation }}</p>
        </template>
        <template v-if="currentActivitieData.avaliation">
          <h4>Avaliação de Aprendizagem</h4>
          <p>{{ currentActivitieData.avaliation }}</p>
        </template>
        <template v-if="currentActivitieData.descriptors">
          <h4>{{ currentActivitieData.educationalOrganizationName }}</h4>
          <div class="d-flex flex-wrap descriptorsList">
            <div
              v-for="(descriptor, index) in currentActivitieData.descriptors"
              :key="index"
              class="pr-1 mr-1"
            >
              <p class="mb-0 small">
                <span class="font-weight-bold">
                  {{ index }}
                </span>
              </p>
              <div class="d-flex flex-nowrap gap-2">
                <div v-for="(item, index) in descriptor" :key="index">
                  <b-badge pill variant="math">{{ item.name }}</b-badge>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </b-skeleton-wrapper>
</template>

<script setup>
import { getGuidesDetails } from '@/services/responsible-context/guides/Guides.service'
import { formatDate, formattedTime } from '@/utils/utils'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BProgress } from 'bootstrap-vue'

// Props
const props = defineProps({
  id: { type: Number, required: false, default: 0 },
  missionInfo: { type: Object, required: true },
})

// Refs and State
import { ref, computed, onMounted, getCurrentInstance } from 'vue'

const guideData = ref({
  guideName: 'string',
  totalActivities: 0,
  finishedActivities: 0,
  enabled: true,
  time: 0,
})

const mission = ref([
  {
    index: 0,
    activityName: '',
    cardImageUrl: '',
    activityImageUrl: '',
    results: {
      finished: true,
      totalTime: 0,
    },
  },
])

const activitySelected = ref(0)
const studentImageToShow = ref('')
const activeMissionType = ref(null)
const showMissions = ref([])
const loading = ref(true)

// Filter for formatNumber
import { formatNumber } from '@/filters/filters'

// To use $utilTeacherService and $toast from globalProperties ($root)
const { proxy } = getCurrentInstance()

// Computed: currentActivitieData
const currentActivitieData = computed(() => {
  return mission.value.find(element => element.index === activitySelected.value) || {}
})

// Navigation methods for activities
const nextActivitie = () => {
  if (activitySelected.value !== mission.value[mission.value.length - 1].index) {
    const currentItem = showMissions.value.find(
      element => element.index === activitySelected.value,
    )
    if (showMissions.value.indexOf(currentItem) === 3) {
      showMissions.value.shift()
      showMissions.value.push(
        mission.value.find(element => element.index === currentItem.index + 1),
      )
    }
    activitySelected.value += 1
  }
}

const prevActivitie = () => {
  if (activitySelected.value !== mission.value[0].index) {
    const currentItem = showMissions.value.find(
      element => element.index === activitySelected.value,
    )
    if (showMissions.value.indexOf(currentItem) === 0) {
      showMissions.value.pop()
      showMissions.value.unshift(
        mission.value.find(element => element.index === currentItem.index - 1),
      )
    }
    activitySelected.value -= 1
  }
}

// getData method (startup)
const getData = async () => {
  loading.value = true
  await getGuidesDetails(props.id)
    .then(response => {
      // this.guideData = response.data comentado por falta de informação no endpoint
      let totalTime = 0
      response.data.forEach(item => {
        totalTime += item.time
      })

      guideData.value = {
        guideName: props.missionInfo.guideName,
        start: formatDate(props.missionInfo.start),
        expiration: formatDate(props.missionInfo.expiration),
        totalActivities: response.data ? response.data.length : 0,
        finishedActivities: response.data.filter(item => item.finished).length,
        enabled: props.missionInfo.situation !== 'Finalizado',
        activities: response.data,
        time: formattedTime(totalTime),
      }

      mission.value = guideData.value.activities.map((item, index) => {
        item.index = index
        return {
          index,
          ...item,
        }
      })

      showMissions.value = mission.value.filter((item, index) => index < 4)

      activitySelected.value = showMissions.value[0].index
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = proxy.$utilTeacherService.handleFormatErrors(errors)
      errorsArray.message.forEach(elementError => {
        proxy.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    })
    .finally(() => {
      loading.value = false
    })
}

// On mount, fetch data
onMounted(() => {
  getData()
})

// Register the progress component
</script>

<script>
// Register filter for old filter syntax
export default {
  filters: {
    formatNumber,
  },
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';

  .separator {
    background-color: $color-gray-themeBodyText;
    width: 1px;

    height: 40px;
  }

  .descriptorsList > div {
    border-right: 1px solid $color-gray-themeBodyText;
    &:last-child {
      border-right: none;
    }
  }

  .progress-legend,
  .legend {
    font-size: 15px;
    font-weight: 600;
    line-height: 24px;
    color: #6e6b7b;
  }

  .activate {
    border: 2px solid #7367f0;
    border-radius: 5px;

    padding: 7px;
  }

  .disabled {
    border: 2px solid #e2e2e3;
    border-radius: 5px;

    padding: 7px;
  }

  .modal-icon {
    width: 32px;
    height: 32px;
  }

  .activitie-status {
    font-size: 18px;
    font-weight: 700;
    line-height: 2px;
  }

  .imageCardWrapper {
    height: 90px;
    width: 90px;
  }

  .activityImage {
    height: 72px;
  }

  @media (max-width: 850px) {
    .time-learn {
      margin-top: 18px;
    }
  }
</style>