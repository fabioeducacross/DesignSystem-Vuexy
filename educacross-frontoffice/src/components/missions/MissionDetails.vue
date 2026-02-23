<template>
  <b-overlay :show="loading" opacity="1" rounded="md">
    <h1 class="text-primary text-center mb-2">{{ guide.guideName }}</h1>
    <div class="d-flex justify-content-center mb-2">
      <b-badge
        v-if="guide.guideActivityType"
        class="d-flex align-items-center"
        pill
        :class="guide.guideActivityType === 2 ? 'bg-coletiva' : 'bg-individual'"
      >
        <div class="d-flex align-items-center gap-1">
          <ActivityIcon :type="guide.guideActivityType" color="#fff" :size="14" />
          {{ proxy.$utilTeacherService.activityType.formatText(guide.guideActivityType) }}
        </div>
      </b-badge>
    </div>

    <b-row class="match-height">
      <b-col cols="12" lg="6">
        <b-card border-variant="light-gray shadow-none d-flex flex-column">
          <div class="title font-weight-bold">Turma:</div>
          <p class="text-primary m-0 font-weight-bold">{{ arrayToString(guide.classes) }}</p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6">
        <b-card border-variant="light-gray shadow-none d-flex flex-column">
          <div class="title font-weight-bold">Duração:</div>
          <p class="text-primary m-0 font-weight-bold">
            {{ guide.startDate }} a {{ guide.endDate }}
          </p>
        </b-card>
      </b-col>
      <b-col cols="12">
        <b-card border-variant="light-gray shadow-none d-flex flex-column">
          <div class="title font-weight-bold">Alunos:</div>
          <p class="text-primary m-0 font-weight-bold">
            {{ studentsInfo }}
          </p>
        </b-card>
      </b-col>
      <b-col cols="12">
        <b-card border-variant="light-gray shadow-none d-flex flex-column">
          <div class="title font-weight-bold">Ranking da missão:</div>
          <p class="text-primary m-0 font-weight-bold">
            {{ guide.rankingEnabled ? 'Habilitado' : 'Desabilitado' }}
          </p>
        </b-card>
      </b-col>

      <b-col cols="12">
        <div class="d-flex justify-content-center">
          <div class="mission-visualization-container">
            <MissionVisualization :data="guide.activities" />
          </div>
        </div>
      </b-col>

      <b-col cols="12">
        <div class="d-flex justify-content-center">
          <div
            v-b-tooltip.hover="
              guide.situation !== EGuideSituation.Started
                ? 'Função desabilitada, pois essa missão não está em andamento'
                : ''
            "
          >
            <b-button
              variant="primary"
              class="py-1 px-4"
              :disabled="guide.situation !== EGuideSituation.Started"
              :class="{
                'opacity-50 cursor-default': guide.situation !== EGuideSituation.Started,
              }"
              @click="playGuide"
            >
              <b-spinner v-show="loadingButton" small variant="white" class="mr-50" />
              Jogar missão
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script setup>
import MissionVisualization from '@/components/missions/MissionVisualization.vue'
import { EGuideSituation } from '@/consts/missionsEnum.js'
import { arrayToString } from '@/filters/filters.js'
import {
  getAutenticateGuide,
  getGuideDetails,
} from '@/services/teacher-context/guides/Guides.Service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ActivityIcon from '@/views/pages/teacher-context/shared/components/ActivityIcon.vue'
import { computed, ref, onMounted, getCurrentInstance } from 'vue'

// Props
const props = defineProps({
  guideId: { type: Number, required: true },
})

// Internal instance to access global properties
const { proxy } = getCurrentInstance()

const loading = ref(false)
const guide = ref({})

// Classe from filter store
const { classe } = useFilters()

const getMissionDetails = async () => {
  if (!props.guideId) return
  loading.value = true
  try {
    const { data } = await getGuideDetails(props.guideId)
    if (data.activities) {
      data.activities[0].selected = true
    }
    guide.value = data
  } catch (error) {
    const { errors } = error?.response?.data || {}
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
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getMissionDetails()
})

const studentsInfo = computed(() => {
  if (!guide.value.students && !guide.value.classes?.length) return ''
  if (
    guide.value.classes &&
    (guide.value.classes?.length > 1 || !guide.value.students?.length)
  )
    return 'Todos os alunos'

  return arrayToString(guide.value.students)
})

const loadingButton = ref(false)
const playGuide = async () => {
  loadingButton.value = true
  try {
    const { data } = await getAutenticateGuide(props.guideId, classe.value.ClassId)
    if (data.guideLinkUrl) {
      window.open(import.meta.env.VITE_APP_DEEPLINK_URL + data.guideLinkUrl, '_blank')
    }
  } catch (error) {
    const { errors } = error?.response?.data || {}
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
  } finally {
    loadingButton.value = false
  }
}

const GET_NAME = getWhitelabelConfig('Name')
</script>

<style lang="scss" scoped>
.title {
  color: #5e5873;
}
.mission-visualization-container {
  max-width: 480px;
}
</style>