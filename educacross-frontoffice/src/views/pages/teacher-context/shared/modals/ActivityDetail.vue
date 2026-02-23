<template>
  <div>
    <section v-if="!renderWebgl" class="pt-2 px-1">
      <b-row align-v="start" class="mb-1">
        <b-col class="" cols="12" lg="5" xl="4">
          <div class="d-flex align-items-strech gap-4 mb-1">
            <div>
              <b-img
                :src="activityDetail.imageUrl"
                alt="activity"
                width="100"
                height="100"
                class="img-activity"
                style="object-fit: cover; background-color: #f0f0f0;"
              />
            </div>
            <div class="d-flex flex-column justify-content-between">
              <h1 class="text-primary">{{ activityDetail.activityName }}</h1>

              <div v-if="activityDetail.activityLevel">
                <b-badge variant="primary" class="align-top" pill>
                  Nível {{ activityDetail.activityLevel }}
                </b-badge>
              </div>

              <span
                v-if="
                  !$utilTeacherService.subjects.isMultiliteracy(subjectId) &&
                  $utilTeacherService.subjects.isMath(subjectId)
                "
              >
                {{ $t('islandLocation') }}:
                <span class="font-bold text-primary">{{ activityDetail.area }}</span>
              </span>
            </div>
          </div>
          <div>
            <b-button
              v-if="!$utilTeacherService.activityType.isCollective(activityDetail.type)"
              class="d-flex align-items-center gap-2 justify-content-center w-100 mb-1"
              variant="primary"
              @click="emit('update:render-webgl', true)"
            >
              <span class="material-symbols-outlined" style="font-size: 22px">play_circle</span>
              <span>{{ $t('play') }}</span>
            </b-button>

            <b-button
              v-if="activityDetail.classPlanFile && userType === 'Educacross'"
              class="d-flex align-items-center gap-2 justify-content-center w-100"
              variant="primary"
              @click="downloadClassPlan(activityDetail.classPlanFile)"
            >
              <span class="material-symbols-outlined" style="font-size: 22px">picture_as_pdf</span>
              <span>{{ $t('downloadLessonPlan') }} </span>
            </b-button>
          </div>
          <hr />
          <p>{{ $t('containsSkills') }}:</p>
          <div
            v-for="(educationalOrganization, index) in activityDetail.educationalOrganizations"
            :key="index"
            class="mb-1"
          >
            <div class="mb-1">
              <div class="mb-50">
                <span class="font-bold text-primary">{{ educationalOrganization.name }}</span>
              </div>

              <div
                v-for="(descriptor, keyDes, index) in educationalOrganization.descriptors"
                :key="index"
                class="mb-2"
              >
                <BadgeWithDescription
                  :axis-name="keyDes"
                  :data="descriptor"
                  :subject-id="subjectId"
                />
              </div>
            </div>
          </div>
          <!-- <hr />
          <div>
            <p>Adequado aos seguintes critérios de acessibilidade e jogabilidade:</p>
            <div>
              <div class="mb-50">
                <b-badge pill variant="primary">
                  <div class="d-flex align-items-center gap-1">
                    <span class="material-symbols-outlined" style="font-size: 15px">
                      visibility_off
                    </span>

                    <span>Baixa visão</span>
                  </div>
                </b-badge>
              </div>
              <div>
                <ul>
                  <li class="d-flex align-items-center gap-3">
                    <div class="dot-list"></div>
                    <span>Volume e Som</span>
                  </li>
                  <li class="d-flex align-items-center gap-3">
                    <div class="dot-list"></div>
                    <span class="">Audiodescrição</span>
                  </li>
                </ul>
              </div>
              <b-badge pill variant="primary">
                <div class="d-flex align-items-center gap-1">
                  <span class="material-symbols-outlined" style="font-size: 15px">
                    hearing_disabled
                  </span>

                  <span class="">Deficiência auditiva</span>
                </div>
              </b-badge>
            </div>
          </div> -->
        </b-col>
        <b-col cols="12" lg="7" xl="8">
          <section class="px-lg-3">
            <div>
              <h4>{{ $t('gameAction') }}</h4>
              <p>
                {{ activityDetail.learningObjective }}
              </p>
            </div>
            <div v-if="!$utilTeacherService.subjects.isMultiliteracy(subjectId)">
              <h4>{{ $t('learningAssessment') }}</h4>
              <p>
                {{ activityDetail.avaliation }}
              </p>
            </div>
            <div v-if="activityDetail.orientation">
              <h4>{{ $t('teachingGuidelines') }}</h4>
              <p class="text-black">
                {{ activityDetail.orientation }}
              </p>
            </div>
            <div v-if="$utilTeacherService.subjects.isMultiliteracy(subjectId)">
              <h4>{{ $t('learningRights') }}</h4>
              <p class="text-black">
                {{ $t('learningRightsExplanation') }}
              </p>
            </div>
          </section>
        </b-col>
      </b-row>
      <hr />
      <div>
        <div class="d-flex align-items-center justify-content-between py-1">
          <div>
            <h4 class="font-normal text-primary">{{ $t('imageGallery') }}</h4>
          </div>
          <div>
            <b-button class="p-0 mr-50" type="button" variant="outline-primary" @click="prev">
              <span class="material-symbols-outlined"> chevron_left </span>
            </b-button>
            <b-button class="p-0" type="button" variant="outline-primary" @click="next">
              <span class="material-symbols-outlined"> chevron_right </span>
            </b-button>
          </div>
        </div>

        <b-carousel ref="myCarousel" indicators>
          <b-carousel-slide v-for="(slide, index) in slides" :key="`parent-${index}`">
            <template v-slot:img>
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
    </section>
    <iframe
      v-else
      id="webglIframe"
      :src="`${urlWebgl}index.html?v=${uuidv4()}&token=${activityDetail.token}`"
      allow="camera; microphone"
      frameborder="1"
      marginheight="px"
      marginwidth="320px"
      name="Game name"
      scrolling="no"
      style="border: 0px #000000 none; width: 100%; height: 85vh"
    />
  </div>
</template>

<script setup>
import BadgeWithDescription from '../components/BadgeWithDescription.vue'
import errorImage404 from '@/assets/images/errors/image-game-404.svg'
import { getTeacherOrientationsActivitie } from '@/services/teacher-context/activities/Activities.service'
import store from '@/store'
import { uuidv4 } from '@/utils/utils'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { saveAs } from 'file-saver'

const props = defineProps({
  activityId: { type: Number, required: true },
  subjectId: { type: Number, required: true },
  renderWebgl: { type: Boolean, required: true },
  lang: { type: Number, default: 1 },
  educationalOrganizationId: { required: false, type: Number },
})

const emit = defineEmits(['update:render-webgl', 'close-activityDetail'])

import { ref, computed, onMounted, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()


const activityDetail = ref({})
const selectedImage = ref('')
const imageType = ref('')
const urlWebgl = `${import.meta.env.VITE_APP_BLOB}webgl/${import.meta.env.VITE_APP_WEBGL}/`
const imgLoading = ref([true, true, true, true])
const slide = ref(0)
const myCarousel = ref(null)

// Computed: userType
const userType = computed(() => {
  const user = store.getters.accessUserData.User
  return user
})

// Image helpers
const imageLeft = () => {
  if (
    !proxy.$utilTeacherService.activityType.isCollective(activityDetail.value.type)
  ) {
    return activityDetail.value.activityImageUrl
  }
  return activityDetail.value.teacherViewUrl
}

const imageRight = () => {
  if (
    !proxy.$utilTeacherService.activityType.isCollective(activityDetail.value.type)
  ) {
    return activityDetail.value.helpImageUrl
  }
  return activityDetail.value.activityImageUrl
}

// Computed: slides
const slides = computed(() => {
  const left = imageLeft()
  const right = imageRight()
  return [[left, right]]
})

// prev/next for carousel
const prev = () => {
  if (myCarousel.value && myCarousel.value.prev) {
    myCarousel.value.prev()
  }
}
const next = () => {
  if (myCarousel.value && myCarousel.value.next) {
    myCarousel.value.next()
  }
}

// Download lesson plan
const downloadClassPlan = url => {
  saveAs(url, 'Plano de Aula.pdf')
}

// Image loaded handler
const imgLoaded = e => {
  imgLoading.value[e] = false
}

// Errors for image loading
const errorImg = e => {
  if (e) {
    const { naturalWidth, naturalHeight } = e.target
    if (!naturalWidth && !naturalHeight) {
      Object.entries(activityDetail.value).forEach(([key, value]) => {
        if (value === e.target.src) {
          activityDetail.value[key] = getImage()
          if (e.target.id === 'img-left') {
            clickImageLeft()
          }
        }
      })
    }
  }
}

// 404 error image
const getImage = () => errorImage404

const clickImageLeft = () => {
  if (
    !proxy.$utilTeacherService.activityType.isCollective(activityDetail.value.type)
  ) {
    selectedImage.value = imageLeft()
    imageType.value = 'game'
    return
  }
  imageType.value = 'teacherView'
  selectedImage.value = imageLeft()
}

const clickImageRight = () => {
  if (
    !proxy.$utilTeacherService.activityType.isCollective(activityDetail.value.type)
  ) {
    imageType.value = 'howToPlay'
    selectedImage.value = imageRight()
    return
  }
  imageType.value = 'studentView'
  selectedImage.value = imageRight()
}

const gameShowOrNot = tab => {
  if (tab === 'Orientações' && props.renderWebgl) {
    const iframe = document.getElementById('webglIframe')
    if (iframe) {
      iframe.style.position = 'fixed'
      iframe.style.top = '99999px'
    }
  } else if ('Jogar' && props.renderWebgl) {
    const iframe = document.getElementById('webglIframe')
    if (iframe) {
      iframe.style.position = 'unset'
      iframe.style.top = '0'
    }
  }
}

const backPage = () => {
  emit('close-activityDetail')
}

onMounted(() => {
  getTeacherOrientationsActivitie(props.activityId, {
    idiomId: props.lang,
    subjectId: props.subjectId,
    EducationalOrganizationId: props.educationalOrganizationId,
  })
    .then(response => {
      activityDetail.value = response.data

      selectedImage.value = !proxy.$utilTeacherService.activityType.isCollective(
        activityDetail.value.type,
      )
        ? activityDetail.value.activityImageUrl
        : activityDetail.value.teacherViewUrl
      imageType.value = !proxy.$utilTeacherService.activityType.isCollective(
        activityDetail.value.type,
      )
        ? 'game'
        : 'teacherView'
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
})
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';

  p {
    font-size: 16px;
    font-weight: 300;
    line-height: 28px;
  }

  .horizontal-line {
    border-bottom: 1px solid $color-gary-themeligth-border;
    margin: 2rem 0 2rem 0;
  }

  .vertical-line {
    border-right: 1px solid $color-gary-themeligth-border;

    @media (max-width: 992px) {
      border-right: none;
    }
  }

  .name-activity {
    font-size: 24px;
    line-height: 38px;
  }

  .title-activityDetail {
    font-size: 20px;
    line-height: 22px;
  }

  .subtitle-activityDetail {
    font-size: 14px;
    line-height: 19px;
  }

  .name-activity,
  .title-activityDetail,
  .subtitle-activityDetail {
    font-weight: 600;
  }

  .container-activityDetail {
    padding-right: 3rem;
    padding-left: 3rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .container-back {
    font-size: 16px;
    position: relative;
    top: 2rem;
    padding-right: 1rem;

    @media (max-width: 1024px) {
      padding-right: 0;
    }

    .box-back {
      z-index: 9999;
    }
  }

  @media (max-width: 1024px) {
    .container-activityDetail {
      padding: 0;
    }
  }

  .title-activityDetail,
  .subtitle-activityDetail,
  .text-activityDetail {
    color: $color-two;
  }

  .name-activity {
    font-size: 22px;
    line-height: 38px;
  }

  .title-activityDetail {
    font-size: 20px;
    line-height: 22px;
  }

  .subtitle-activityDetail,
  .text-activityDetail {
    font-size: 16px;
  }

  .text-activityDetail {
    font-weight: normal;
  }

  .name-activity,
  .title-activityDetail,
  .subtitle-activityDetail {
    font-weight: 600;
  }

  .activityHeader-box {
    img {
      width: 100px;
      height: 100px;
    }
    @media (min-width: 1500px) {
      .vx-col:first-child {
        width: 16.5% !important;
      }
      .vx-col:last-child {
        width: 83.5% !important;
      }
    }
  }

  ul {
    li {
      display: inline;
      // white-space: nowrap;
    }
  }

  .img-activity {
    display: block;
    width: 100px;
    height: 100px;
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