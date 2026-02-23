<template>
  <b-modal
    v-model="modelValue"
    centered
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    size="xl"
    static
    title="Detalhes da Missão"
    @close="closeModal"
  >
    <template #modal-header>
      <button v-if="renderWebgl" class="back" @click="renderWebgl = false">
        <span class="material-symbols-outlined" style="font-size: 16px">arrow_back</span>
      </button>
      <button class="close" @click="closeModal">
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <div v-if="!renderWebgl" class="mission-book-details">
      <b-overlay :show.sync="loading" no-wrap class="w-100 h-100"></b-overlay>
      <section v-if="mission">
        <b-row align-v="start" class="mb-1">
          <b-col
            cols="12"
            :lg="mission.guideAnnotation ? '5' : '12'"
            :xl="mission.guideAnnotation ? '4' : '12'"
          >
            <div class="d-flex flex-column justify-content-between mb-1">
              <h1 class="text-primary">{{ mission.guideName }}</h1>
              <div v-if="classId && getVariantByRule(mission.status, 'guideStatus')" class="mb-2">
                <b-badge
                  pill
                  :variant="`light-${getVariantByRule(mission.status, 'guideStatus').variant}`"
                >
                  {{ getVariantByRule(mission.status, 'guideStatus').label }}
                </b-badge>
              </div>
              <div class="d-flex align-items-center gap-2 mb-2">
                <Subjects :subject-id="mission.subjectId" :size="24" />
                <span class="m-0 font-bold">{{ mission.bookName }}</span>
              </div>
              <div
                v-if="!mission.isPlus"
                v-b-tooltip.hover="
                  mission.status !== EEducationSystemGuideStatus.Started
                    ? 'Função desabilitada, pois essa missão não está em andamento'
                    : ''
                "
              >
                <b-button
                  v-if="$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
                  variant="primary"
                  class="d-flex align-items-center justify-content-center gap-2"
                  :disabled="
                    mission.status !== EEducationSystemGuideStatus.Started || loadingButton
                  "
                  :class="{
                    'opacity-50 cursor-default':
                      mission.status !== EEducationSystemGuideStatus.Started,
                  }"
                  @click="playGuide"
                >
                  <b-spinner v-if="loadingButton" small variant="white" class="mr-50" />
                  <span v-else class="material-symbols-outlined" style="font-size: 20px">
                    play_circle
                  </span>
                  Jogar missão
                </b-button>
              </div>
            </div>
          </b-col>
          <b-col v-if="mission.guideAnnotation" cols="12" lg="7" xl="8">
            <section class="px-lg-3">
              <div>
                <h4 class="text-body">{{ $t('Objetivos da missão') }}</h4>
                <p>
                  {{ mission.guideAnnotation }}
                </p>
              </div>
            </section>
          </b-col>
        </b-row>
        <hr />
        <div v-if="mission.isPlus">
          <h4 class="text-primary">Turnos da missão</h4>
          <div id="mission-book-details-rounds" class="cards-round-slide my-2">
            <div class="swiper-container" ref="swiperRounds">
              <div class="swiper-wrapper">
                <div
                  v-for="(item, index) in mission.rounds"
                  :key="index"
                  class="swiper-slide"
                  style="width: 175px"
                >
                  <div
                    class="d-flex flex-column align-items-center h-100 w-100"
                    :class="index === currentRound ? 'active-slide' : ''"
                  >
                    <h6
                      class="text-center uppercase"
                      :class="index === currentRound ? 'text-primary' : 'text-body'"
                    >
                      Turno {{ item.round }}
                    </h6>

                    <b-card
                      body-class="p-75 d-flex flex-column"
                      bg-variant="transparent"
                      class="flex-grow-1 activity-item"
                      :class="index === currentRound ? 'active' : 'shadow-none cursor-pointer'"
                      @click="selectRound(index)"
                    >
                      <b-img-lazy
                        :src="getRoundImage(item)"
                        :alt="item.thematicName"
                        width="100"
                        height="100"
                        class="mb-75 mx-auto"
                      />

                      <b-card-text class="text-center text-body text-wrap font-bold">
                        {{ item.thematicName }}
                      </b-card-text>
                      <div
                        v-if="index !== currentRound"
                        class="mt-auto d-flex justify-content-center"
                      >
                        <span class="material-symbols-outlined text-primary cursor-pointer">
                          visibility
                        </span>
                      </div>
                    </b-card>
                    <div v-if="index !== currentRound" class="activity-item-footer"></div>
                  </div>
                </div>
              </div>
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
          </div>
        </div>
        <div v-else>
          <h4 class="text-primary">Jogos da missão</h4>
          <div id="mission-book-details-rounds" class="cards-round-slide my-2">
            <div class="swiper-container" ref="swiperActivities">
              <div class="swiper-wrapper">
                <div
                  v-for="(item, index) in mission.activities"
                  :key="index"
                  class="swiper-slide"
                  style="width: 175px"
                >
                  <div
                    class="d-flex flex-column align-items-center h-100 w-100"
                    :class="index === selectedActivity ? 'active-slide' : ''"
                  >
                    <h6
                      class="text-center uppercase"
                      :class="index === selectedActivity ? 'text-primary' : 'text-body'"
                    >
                      Jogo {{ index + 1 }}
                    </h6>

                    <b-card
                      body-class="p-75 d-flex flex-column"
                      bg-variant="transparent"
                      class="flex-grow-1 activity-item"
                      :class="index === selectedActivity ? 'active' : 'shadow-none cursor-pointer'"
                      @click="selectActivity(index)"
                    >
                      <b-img-lazy
                        :src="item.imageUrl ? item.imageUrl : SubjectEnum[mission.subjectId].image"
                        :alt="item.thematicName"
                        width="100"
                        height="100"
                        class="mb-75 mx-auto"
                      />
                      <div
                        v-if="index !== selectedActivity"
                        class="mt-auto d-flex justify-content-center"
                      >
                        <span class="material-symbols-outlined text-primary cursor-pointer">
                          visibility
                        </span>
                      </div>
                    </b-card>
                    <div v-if="index !== selectedActivity" class="activity-item-footer"></div>
                  </div>
                </div>
              </div>
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
          </div>
        </div>

        <div v-if="mission.isPlus && mission.rounds && mission.rounds[currentRound]">
          <h1 class="text-primary">{{ mission.rounds[currentRound].topicName }}</h1>

          <p class="mb-0">
            Objeto do conhecimento:
            <span class="text-primary font-semibold">
              {{ mission.rounds[currentRound].objectOfKnowledgeName }}
            </span>
          </p>
          <p class="mb-0">
            Temática:
            <span class="text-primary font-semibold">
              {{ mission.rounds[currentRound].thematicName }}
            </span>
          </p>
          <p class="mb-2">
            Habilidades relacionadas:
            <span class="text-primary font-semibold d-inline-flex gap-1">
              <DescriptorTag
                :descriptor="mission.rounds[currentRound].descriptor"
                :subject-id="mission.subjectId"
              />
            </span>
          </p>
          <div v-if="mission.rounds[currentRound].type === 0">
            <div class="mb-2">
              <b-button
                v-if="$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
                variant="primary"
                class="d-flex align-items-center justify-content-center gap-2"
                :disabled="loadingButton"
                @click="playActivity(mission.rounds[currentRound].activity)"
              >
                <b-spinner v-if="loadingButton" small variant="white" class="mr-50" />
                <span v-else class="material-symbols-outlined" style="font-size: 20px">
                  play_circle
                </span>
                Jogar jogo
              </b-button>
            </div>
            <h4 class="text-body mb-0">Ação no jogo</h4>
            <p class="mb-2">{{ mission.rounds[currentRound].activity.learningObjective }}</p>
            <h4 class="text-body mb-0">Avaliação de aprendizagem</h4>
            <p class="mb-2">{{ mission.rounds[currentRound].activity.avaliation }}</p>
            <h4 class="text-body mb-0">Orientações Didáticas</h4>
            <p class="mb-2">{{ mission.rounds[currentRound].activity.orientation }}</p>

            <div>
              <div class="d-flex align-items-center justify-content-between py-1">
                <div>
                  <h4 class="font-normal text-primary">{{ $t('imageGallery') }}</h4>
                </div>
                <div>
                  <b-button class="p-0 mr-50" type="button" variant="outline-primary" @click="prev">
                    <span class="material-symbols-outlined">chevron_left</span>
                  </b-button>
                  <b-button class="p-0" type="button" variant="outline-primary" @click="next">
                    <span class="material-symbols-outlined">chevron_right</span>
                  </b-button>
                </div>
              </div>

              <b-carousel ref="myCarousel" indicators>
                <b-carousel-slide
                  v-for="(slide, index) in slidesRoundActivity"
                  :key="`parent-${index}`"
                >
                  <template #img>
                    <b-row>
                      <b-col
                        v-for="(imgsrc, childIndex) in slide"
                        :key="`child-${childIndex}`"
                        class="mb-3"
                        cols="12"
                        md="6"
                      >
                        <b-card-group>
                          <b-card :img-src="imgsrc" img-top no-body overlay />
                        </b-card-group>
                      </b-col>
                    </b-row>
                  </template>
                </b-carousel-slide>
              </b-carousel>
            </div>
          </div>
          <div v-else>
            <h4 v-if="mission.rounds[currentRound].question" class="text-primary">
              Exemplos de questões:
            </h4>

            <b-row v-if="currentQuestion" class="match-height">
              <b-col cols="12" md="5">
                <b-card border-variant="gray" class="border">
                  <div>
                    <h6 class="text-center text-primary text-uppercase">Proposta</h6>
                    <div>
                      <QuestionContent
                        v-if="currentQuestion.enunciations.EnunciationThree"
                        :content="currentQuestion.enunciations.EnunciationThree"
                      />
                      <QuestionContent
                        v-if="currentQuestion.enunciations.EnunciationTwo"
                        :content="currentQuestion.enunciations.EnunciationTwo"
                      />
                      <QuestionContent :content="currentQuestion.enunciations.EnunciationOne" />
                    </div>
                  </div>
                </b-card>
              </b-col>
              <b-col cols="12" md="7">
                <b-card border-variant="gray" class="border">
                  <h6 class="text-center text-primary text-uppercase">ALTERNATIVAS</h6>
                  <div>
                    <div v-for="(alternative, index) in currentQuestion.alternatives" :key="index">
                      <QuestionAlternative :alternative="alternative" />
                    </div>
                  </div>
                </b-card>
              </b-col>
            </b-row>

            <b-pagination
              v-if="mission.rounds[currentRound].question"
              v-model="currentPage"
              :per-page="1"
              :total-rows="mission.rounds[currentRound].question.length"
              first-number
              last-number
              next-class="next-item"
              prev-class="prev-item"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </div>
        </div>

        <div v-else-if="mission.activities">
          <h1 class="text-primary">{{ mission.activities[selectedActivity].name }}</h1>

          <p class="mb-0">
            Temática:
            <span class="text-primary font-semibold">
              {{ mission.activities[selectedActivity].thematicName }}
            </span>
          </p>
          <p class="mb-2">
            Habilidades relacionadas:
            <span class="text-primary font-semibold d-inline-flex gap-1">
              <DescriptorTag
                v-for="descriptor in mission.activities[selectedActivity].descriptors"
                :key="descriptor.id"
                :descriptor="descriptor"
                :subject-id="mission.subjectId"
              />
            </span>
          </p>
          <div class="mb-2">
            <b-button
              v-if="$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
              variant="primary"
              class="d-flex align-items-center justify-content-center gap-2"
              :disabled="loadingButton"
              @click="playActivity(mission.activities[selectedActivity])"
            >
              <b-spinner v-if="loadingButton" small variant="white" class="mr-50" />
              <span v-else class="material-symbols-outlined" style="font-size: 20px">
                play_circle
              </span>
              Jogar jogo
            </b-button>
          </div>

          <h4 class="text-body mb-0">Ação no jogo</h4>
          <p class="mb-2">{{ mission.activities[selectedActivity].learningObjective }}</p>
          <h4 class="text-body mb-0">Avaliação de aprendizagem</h4>
          <p class="mb-2">{{ mission.activities[selectedActivity].avaliation }}</p>
          <h4 class="text-body mb-0">Orientações Didáticas</h4>
          <p class="mb-2">{{ mission.activities[selectedActivity].orientation }}</p>

          <div>
            <div class="d-flex align-items-center justify-content-between py-1">
              <div>
                <h4 class="font-normal text-primary">{{ $t('imageGallery') }}</h4>
              </div>
              <div>
                <b-button class="p-0 mr-50" type="button" variant="outline-primary" @click="prev">
                  <span class="material-symbols-outlined">chevron_left</span>
                </b-button>
                <b-button class="p-0" type="button" variant="outline-primary" @click="next">
                  <span class="material-symbols-outlined">chevron_right</span>
                </b-button>
              </div>
            </div>

            <b-carousel ref="myCarousel" indicators>
              <b-carousel-slide v-for="(slide, index) in slides" :key="`parent-${index}`">
                <template #img>
                  <b-row>
                    <b-col
                      v-for="(imgsrc, childIndex) in slide"
                      :key="`child-${childIndex}`"
                      class="mb-3"
                      cols="12"
                      md="6"
                    >
                      <b-card-group>
                        <b-card :img-src="imgsrc" img-top no-body overlay />
                      </b-card-group>
                    </b-col>
                  </b-row>
                </template>
              </b-carousel-slide>
            </b-carousel>
          </div>
        </div>
      </section>
    </div>
    <iframe
      v-else
      id="webglIframe"
      :src="`${urlWebgl}index.html?v=${uuidv4()}&token=${token}`"
      allow="camera; microphone"
      frameborder="1"
      marginheight="px"
      marginwidth="320px"
      name="Game name"
      scrolling="no"
      style="border: 0px #000000 none; width: 100%; height: 85vh"
    />
  </b-modal>
</template>

<script setup>
import DescriptorTag from '@/components/descriptors/DescriptorTag.vue'
import Subjects from '@/components/subjects/subjects.vue'
import { EEducationSystemGuideStatus } from '@/consts/EEducationSystemGuideStatus.js'
import {
  EQuestionTypeAlternative,
  EQuestionTypeAlternativeResult,
  EQuestionTypeEnunciation,
} from '@/consts/EQuestionType'
import { SubjectEnum } from '@/consts/SubjectEnum.js'
import { getVariantByRule } from '@/consts/legends'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { getEducationSystemBookGuideDetail } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import { getActivitiesToken } from '@/services/teacher-context/activities/Activities.service.js'
import { getAutenticateGuide } from '@/services/teacher-context/guides/Guides.Service'
import useFilters from '@/store/filters/useFilters'
import { uuidv4 } from '@/utils/utils'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import QuestionAlternative from '@/views/pages/reading-expedition/units/student/components/QuestionAlternative.vue'
import QuestionContent from '@/views/pages/reading-expedition/units/student/components/QuestionContent.vue'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { $themeBreakpoints } from '@themeConfig'
import debounce from 'lodash/debounce'
import { ref, computed, onUnmounted, onMounted, watch } from 'vue'

// PROPS
const props = defineProps({
  guideId: { type: Number, required: false, default: null },
  value: { type: Boolean },
})

// v-model
const emit = defineEmits(['update:value', 'input'])

const modelValue = computed({
  get: () => props.value,
  set: val => emit('update:value', val),
})

// USE FILTERS
const { subject, classe } = useFilters()
const loading = ref(true)
const renderWebgl = ref(false)
const urlWebgl = `${import.meta.env.VITE_APP_BLOB}webgl/${import.meta.env.VITE_APP_WEBGL}/`
const token = ref(null)

const mission = ref(null)
const currentPage = ref(1)

const swiperRounds = ref(null)
const swiperActivities = ref(null)
let swiperRoundsInstance = null
let swiperActivitiesInstance = null

const initSwiper = (container, swiperRef) => {
  if (!container.value) return

  let perPage = 8

  if (window.innerWidth <= $themeBreakpoints.sm) {
    perPage = 1
  } else if (window.innerWidth < $themeBreakpoints.lg) {
    perPage = 2
  } else if (window.innerWidth < $themeBreakpoints.xl) {
    perPage = 3
  }

  const showNavigation = perPage !== 8

  if (swiperRef) {
    swiperRef.destroy(true, true)
  }

  return new Swiper(container.value, {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 24,
    navigation: showNavigation
      ? {
          nextEl: container.value.querySelector('.swiper-button-next'),
          prevEl: container.value.querySelector('.swiper-button-prev'),
        }
      : false,
    allowTouchMove: showNavigation,
  })
}

const currentRound = ref(0)

const selectRound = round => {
  currentRound.value = round
  currentPage.value = 1
}
const selectedRound = computed(() => {
  if (mission.value && mission.value.rounds && mission.value.rounds[currentRound.value]) {
    return mission.value.rounds[currentRound.value]
  }
  return null
})
const currentQuestion = computed(() => {
  if (
    mission.value &&
    mission.value.rounds &&
    mission.value.rounds[currentRound.value] &&
    mission.value.rounds[currentRound.value].question
  ) {
    return mission.value.rounds[currentRound.value].question[currentPage.value - 1]
  }
  return null
})

const selectedActivity = ref(0)

const selectActivity = activity => {
  selectedActivity.value = activity
}

const slidesRoundActivity = computed(() => {
  try {
    if (
      !mission.value ||
      !mission.value.isPlus ||
      !mission.value.rounds[currentRound.value] ||
      mission.value.rounds[currentRound.value].type !== 0
    )
      return []
    const image1 =
      mission.value.rounds[currentRound.value].activity.activityImageUrl
    const image2 =
      mission.value.rounds[currentRound.value].activity.helpImageUrl

    return [[image1, image2]]
  } catch (error) {
    return []
  }
})

const slides = computed(() => {
  if (
    !mission.value ||
    mission.value.isPlus ||
    !mission.value.activities ||
    mission.value.activities.length === 0
  )
    return []

  const image1 =
    mission.value.activities[selectedActivity.value].activityImageUrl
  const image2 =
    mission.value.activities[selectedActivity.value].helpImageUrl

  return [[image1, image2]]
})

const myCarousel = ref(null)

const prev = () => {
  if (myCarousel.value && myCarousel.value.prev) myCarousel.value.prev()
}
const next = () => {
  if (myCarousel.value && myCarousel.value.next) myCarousel.value.next()
}

const loadingButton = ref(false)
const missionGuideLink = ref('')

const classId = computed(() => {
  return (classe.value && (classe.value.ClassId || classe.value.id)) || null
})

const getCollectiveGuideResumeGuideLink = async () => {
  try {
    const { data } = await getAutenticateGuide(props.guideId, classId.value)
    missionGuideLink.value =
      import.meta.env.VITE_APP_DEEPLINK_URL + data.guideLinkUrl
  } catch (error) {
    const { errors } = error.response.data
    const errorsArray =
      window.$utilTeacherService &&
      window.$utilTeacherService.handleFormatErrors
        ? window.$utilTeacherService.handleFormatErrors(errors)
        : { message: ['Erro desconhecido'] }
    errorsArray.message.forEach(elementError => {
      if (window.$toast)
        window.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      loadingButton.value = false
    })
  }
}

const playGuide = async () => {
  loadingButton.value = true
  await getCollectiveGuideResumeGuideLink()
  if (missionGuideLink.value) window.open(missionGuideLink.value, '_blank')
  loadingButton.value = false
}

const getEnunciations = item => {
  if (item && Array.isArray(item.content)) {
    return {
      EnunciationOne: item.content.find(
        question => EQuestionTypeEnunciation.EnunciationOne === question.questionType,
      ),
      EnunciationTwo: item.content.find(
        question => EQuestionTypeEnunciation.EnunciationTwo === question.questionType,
      ),
      EnunciationThree: item.content.find(
        question => EQuestionTypeEnunciation.EnunciationThree === question.questionType,
      ),
    }
  }
  return {}
}

const getAlternatives = item => {
  if (item && Array.isArray(item.content)) {
    return item.content
      .filter(question =>
        Object.values(EQuestionTypeAlternative).includes(question.questionType),
      )
      .map(question => {
        question.rightAlternative =
          item.rightAlternative ===
          EQuestionTypeAlternativeResult[question.questionType]
        return question
      })
  }
  return []
}

const fetch = () => {
  loading.value = true
  getEducationSystemBookGuideDetail({
    GuideId: props.guideId,
    ClassId: classId.value,
  })
    .then(({ data }) => {
      mission.value = data

      if (mission.value.rounds) {
        mission.value.rounds = mission.value.rounds.map(round => {
          if (!round.question) return round
          round.question = round.question.map(question => {
            return {
              ...question,
              enunciations: getEnunciations(question),
              alternatives: getAlternatives(question),
            }
          })
          return round
        })
      }
    })
    .catch(() => {
      mission.value = null
    })
    .finally(() => {
      loading.value = false
    })
}

const getRoundImage = round => {
  if (!mission.value) return ''
  if (round.type === 0) {
    return round.activity && round.activity.imageUrl
      ? round.activity.imageUrl
      : SubjectEnum[mission.value.subjectId] &&
        SubjectEnum[mission.value.subjectId].image
  }
  return round.imageUrl
    ? round.imageUrl
    : SubjectEnum[mission.value.subjectId] &&
      SubjectEnum[mission.value.subjectId].image
}

const handleResize = debounce(() => {
  if (mission.value) {
    if (mission.value.isPlus && swiperRounds.value) {
      swiperRoundsInstance = initSwiper(swiperRounds, swiperRoundsInstance)
    } else if (!mission.value.isPlus && swiperActivities.value) {
      swiperActivitiesInstance = initSwiper(swiperActivities, swiperActivitiesInstance)
    }
  }
}, 200)

window.addEventListener('resize', handleResize, { passive: true })

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (swiperRoundsInstance) {
    swiperRoundsInstance.destroy(true, true)
    swiperRoundsInstance = null
  }
  if (swiperActivitiesInstance) {
    swiperActivitiesInstance.destroy(true, true)
    swiperActivitiesInstance = null
  }
})

onMounted(() => {
  // Intentionally left for any on-mount logic
})

const closeModal = () => {
  renderWebgl.value = false
  emit('input', false)
  emit('update:value', false)
}

const playActivity = activity => {
  loadingButton.value = true
  getActivitiesToken(activity.id, {
    IdiomId: 1,
    SubjectId: mission.value.subjectId,
  })
    .then(({ data }) => {
      token.value = data
      renderWebgl.value = true
    })
    .finally(() => {
      loadingButton.value = false
    })
}

// Fetch when modal is opened
watch(
  () => props.value,
  newValue => {
    if (newValue) {
      fetch()
    }
  },
)

// Re-init swiper when mission is loaded/updates
watch(
  () => mission.value,
  val => {
    if (val) {
      setTimeout(() => {
        if (val.isPlus && swiperRounds.value) {
          swiperRoundsInstance = initSwiper(swiperRounds, swiperRoundsInstance)
        } else if (!val.isPlus && swiperActivities.value) {
          swiperActivitiesInstance = initSwiper(swiperActivities, swiperActivitiesInstance)
        }
      }, 100)
    }
  },
)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables/_variables.scss';

.mission-book-details {
  min-height: 200px;
}

.activity-item {
  border: 1px solid #6e6b7b;
  border-radius: 6px;
  margin-bottom: 15px;
  width: calc(100% - 2px);
  min-height: 200px;
  position: relative;

  &:after {
    content: '';
    background: url('@/assets/images/mission-plus/triangle-bottom.svg');
    background-position: bottom center;
    background-repeat: no-repeat;
    width: 38px;
    height: 20px;
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
  }

  &.active {
    border-color: $primary;
    border-width: 2px;
    box-shadow: 0px 0px 10px 0px rgba(115, 103, 240, 0.65);

    &:after {
      background-image: url('@/assets/images/mission-plus/triangle-bottom-active.svg');
      bottom: -16px;
    }
  }
}

.activity-item-footer {
  height: 30px;
}
</style>

<style lang="scss">
.carousel-indicators > li {
  height: 10px !important;
  width: 10px !important;
  border-radius: 50%;
  background-color: #6e63e8 !important;
}
</style>