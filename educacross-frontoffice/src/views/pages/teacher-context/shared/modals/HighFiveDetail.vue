<template>
  <div>
    <div class="container-highfiveDetail">
      <div class="flex justify-start mt-2">
        <div
          class="flex items-center cursor-pointer box-back mb-3"
          style="border: 1px solid gray; border-radius: 10px; padding: 5px 5px"
          @click="backPage"
        >
          <feather-icon size="24" icon="ArrowLeftIcon" />
        </div>
      </div>
      <p class="title-highfiveDetail color-patternTwo">
        {{ highfiveDetail.projectName }}
      </p>
      <p class="title-highfiveDetail color-patternTwo mt-2">
        {{ highfiveDetail.guideName }}
      </p>
      <b-tabs class="tab-header">
        <b-tab active title="1. Contextualization">
          <div class="mt-2">
            <p class="title-highfiveDetail color-patternThree uppercase">1- Contextualization</p>
            <div
              class="text-highfiveDetail color-patternTwo mt-2"
              v-html="highfiveDetail.annotation"
            />
          </div>
        </b-tab>
        <b-tab title="2. Trigger activity">
          <div class="mt-2">
            <p class="title-highfiveDetail color-patternThree uppercase">2- Trigger Activity</p>
            <p
              v-if="highfiveDetail.activities[0]"
              class="title-highfiveDetail color-patternThree mt-2"
            >
              {{ highfiveDetail.activities[0].name }}
            </p>
            <div v-if="highfiveDetail.activities[0]" class="vx-row mt-4">
              <div class="vx-col w-full lg:w-6/12">
                <img
                  :src="highfiveDetail.activities[0].helpImage"
                  class="w-full"
                  alt="banner-activity"
                />
              </div>
            </div>
            <div class="mt-1">
              <div
                v-if="highfiveDetail.activities[0]"
                class="text-highfiveDetail color-patternTwo"
                v-html="highfiveDetail.activities[0].orientations"
              />
              <p class="text-highfiveDetail color-patternTwo mt-6">
                Important: When the contextualizing game is over, the teacher should invite the
                students to play the other selected games from this guideline on their own, still
                observing the scenery and theme of each game so that it is possible to review and
                practice oral and lexical skills.
              </p>
            </div>
          </div>
        </b-tab>
        <b-tab title="3. Student's games">
          <div class="mt-2">
            <p class="title-highfiveDetail color-patternThree uppercase">3- Students' Games</p>
            <p class="text-highfiveDetail color-patternTwo mt-2">
              The contextualizing game is part of the selected game as well, considering that
              children at this age need independent drills.
            </p>
            <div
              v-for="(activity, indexActivity) in highfiveDetail.activities"
              :key="indexActivity"
              class="mt-2"
            >
              <p class="text-highfiveDetail color-patternTwo">
                {{ activity.name }}
              </p>
              <div class="text-highfiveDetail color-patternTwo" v-html="activity.description" />
              <div class="vx-row mt-2">
                <div v-if="renderWebgl === indexActivity" class="vx-col w-full">
                  <iframe
                    id="webglIframe"
                    :src="urlWebgl.concat(`index.html?v=${uuidv4()}&token=`).concat(activity.token)"
                    style="border: 0px #000000 none; width: 100%; height: 80vh"
                    name="Game name"
                    scrolling="no"
                    frameborder="1"
                    marginheight="px"
                    marginwidth="320px"
                    allow="camera; microphone"
                  />
                </div>
                <div v-else class="vx-col w-full lg:w-6/12">
                  <img :src="activity.helpImage" class="w-full" alt="banner-activity" />
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="4. Analysis and reflection">
          <div class="mt-2">
            <p class="title-highfiveDetail color-patternThree uppercase">
              4- Analysis and Reflection
            </p>
            <div class="mt-2">
              <p class="text-highfiveDetail color-patternTwo">
                During or after the class, it is possible to assess your class performance by
                clicking on the "Report" tab.
              </p>
              <p class="text-highfiveDetail color-patternTwo">
                It is recommended that, by the end of the class, the teacher reviews some concepts
                and vocabularies explored along the development of the games, as well as ask the
                group about the shared experience in class.
              </p>
              <p class="text-highfiveDetail color-patternTwo">
                The interaction and performance analysis is an important tool to reflect on the
                class and the next pedagogical actions.
              </p>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script setup>
import { getHighfiveDetail } from '@/services/responsible-context/guides/Guides.service'
import { uuidv4 } from '@/utils/utils'
import { BTab, BTabs } from 'bootstrap-vue'

const props = defineProps({
  highfiveId: { type: Number, default: 0 },
})

const emit = defineEmits(['close-highfiveDetail'])

const highfiveDetail = ref({
  guideId: 0,
  projectName: '',
  guideName: '',
  annotation: '',
  activities: [
    {
      id: 0,
      name: '',
      orientations: '',
      description: '',
      helpImage: '',
    },
  ],
})

const renderWebgl = ref(undefined)
const urlWebgl = `${import.meta.env.VITE_APP_BLOB}webgl/${import.meta.env.VITE_APP_WEBGL}/`

onMounted(async () => {
  await handleGetHighfiveDetail(props.highfiveId)
})

const handleGetHighfiveDetail = async (id) => {
  await getHighfiveDetail(id).then(response => {
    highfiveDetail.value = response.data
  })
}

const backPage = () => {
  emit('close-highfiveDetail')
}
</script>

<style lang="scss" scoped>
  .title-highfiveDetail {
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;
  }

  .text-highfiveDetail {
    font-size: 14px;
    line-height: 19px;
  }

  .container-highfiveDetail {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  .button-play {
    margin: auto;
    margin-top: 1.5rem;
  }

  @media (max-width: 1024px) {
    .container-highfiveDetail {
      padding: 0;
    }

    .button-play {
      display: none;
    }
  }
</style>