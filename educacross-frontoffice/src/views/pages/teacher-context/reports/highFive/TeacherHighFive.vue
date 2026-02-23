<template>
  <div id="TeacherHighFive">
    <b-card class="d-none">
      <SelectSubject />
    </b-card>
    <div class="d-none d-md-flex step-visualization">
      <span class="step-capsule">1. Contextualization</span>
      <div class="step-arrow">
        <span />
      </div>
      <span class="step-capsule">2. Trigger activity</span>
      <div class="step-arrow">
        <span />
      </div>
      <span class="step-capsule">3. Students in action</span>
      <div class="step-arrow">
        <span />
      </div>
      <span class="step-capsule">4. Analysis and reflection</span>
    </div>
    <div>
      <p v-if="!!highfiveMissions.length" class="title-highfiveSchool">
        {{ serieId }}{{ serieId === 1 ? 'st' : serieId === 2 ? 'nd' : serieId === 3 ? 'rd' : 'th' }}
        Grade Projects
      </p>
      <b-overlay :show="loading">
        <div class="d-none d-lg-flex" style="padding: 1rem 2.8rem 1rem 1rem">
          <b-row class="full-width flex-grow-1">
            <b-col cols="6" lg="4" class="flex align-items-center">
              <h5 class="subtitle-educacrossMission color-patternTwo">Script</h5>
            </b-col>

            <b-col cols="6" lg="4" class="align-items-center d-none d-lg-flex">
              <h5 class="subtitle-educacrossMission color-patternTwo">Number of games</h5>
            </b-col>

            <b-col cols="6" lg="2" class="align-items-center d-none d-lg-flex">
              <h5 class="subtitle-educacrossMission color-patternTwo">Status</h5>
            </b-col>

            <b-col cols="6" lg="2" class="align-items-center d-none d-lg-flex">
              <h5 class="subtitle-educacrossMission color-patternTwo">Actions</h5>
            </b-col>
          </b-row>
        </div>
        <app-collapse accordion type="margin" class="mb-2">
          <app-collapse-item
            v-for="(mission, indexMission) in paginationData"
            :key="indexMission"
            :title="mission.missionName"
            body-class="p-0"
          >
            <template v-slot:header>
              <b-row class="full-width flex-grow-1">
                <b-col cols="12" lg="4">
                  <div class="flex align-items-center mb-50">
                    <span class="d-inline d-lg-none font-semibold mr-50">Script:</span>
                    <h4 class="subtitle-proficiency color-patternTwo mb-0 font-normal mr-2">
                      <span> {{ mission.name }} </span>
                    </h4>
                  </div>
                  <div class="d-flex mb-1 mb-lg-0">
                    <img
                      v-if="mission.subject === 'LigaDasCorujinhas'"
                      v-b-tooltip="'Liga das Corujinhas'"
                      src="@/assets/icons/mission-icons/missao-liga.svg"
                      style="padding-right: 3px"
                    />

                    <img
                      v-if="mission.subject === 'Math'"
                      v-b-tooltip="'Matemática'"
                      src="@/assets/icons/mission-icons/missao-math.svg"
                      style="padding-right: 3px"
                    />

                    <img
                      v-if="mission.subject === 'Portuguese'"
                      v-b-tooltip="'Língua Portuguesa'"
                      src="@/assets/icons/mission-icons/missao-portugues.svg"
                      style="padding-right: 3px"
                    />

                    <img
                      v-if="mission.type === 'Collective'"
                      v-b-tooltip="'Missão coletiva'"
                      src="@/assets/icons/mission-icons/missao-coletiva.svg"
                      style="padding-right: 3px"
                    />

                    <img
                      v-b-tooltip="'Missão individual'"
                      src="@/assets/icons/mission-icons/missao-individual.svg"
                      style="padding-right: 3px"
                    />

                    <img
                      v-if="mission.type === 'Mixed'"
                      v-b-tooltip="'Missão mista'"
                      src="@/assets/icons/mission-icons/missao-mista.svg"
                      style="padding-right: 3px"
                    />
                  </div>
                </b-col>
                <b-col cols="12" lg="4" class="flex align-items-center mb-1 mb-lg-0">
                  <span class="d-inline d-lg-none font-semibold mr-50">Number of games:</span>
                  <strong class="">
                    {{ mission.activities.length | formatNumber }}
                  </strong>
                </b-col>
                <b-col cols="12" lg="2" class="flex align-items-center mb-1 mb-lg-0">
                  <span class="d-inline d-lg-none font-semibold mr-50">Status:</span>
                  <enabled-status
                    :content="{
                      enabled: mission.enabled,
                      lang: 'en',
                    }"
                  />
                </b-col>
                <b-col cols="12" lg="2" class="flex align-items-center">
                  <div class="mr-4 actions flex align-items-center">
                    <div
                      v-if="!(GET_NAME === 'Super Ensino Games') && mission.guideLinkUrl"
                      class="mr-1"
                    />
                    <div class="mr-1">
                      <feather-icon
                        v-b-tooltip="'Detalhes da missão'"
                        icon="FileTextIcon"
                        size="24"
                        class="icon-table text-primary"
                        @click.stop="showHighfiveDetail(mission)"
                      />
                    </div>
                    <div v-if="mission.enabled && mission.guideReportId" class="mr-1">
                      <feather-icon
                        v-b-tooltip="'Relatório da Missão'"
                        icon="PieChartIcon"
                        size="24"
                        class="icon-table text-primary"
                        @click.stop="
                          router.push({
                            name: 'HighFiveMissionReport',
                            params: {
                              missionId: mission.guideReportId,
                            },
                          })
                        "
                      />
                    </div>
                    <div v-if="!mission.enabled" class="mr-1">
                      <feather-icon
                        v-b-tooltip="'Habilitar Missão'"
                        icon="CheckCircleIcon"
                        size="24"
                        class="icon-table text-primary"
                        @click.stop="enableAndDisableScript(mission)"
                      />
                    </div>
                    <div v-if="mission.guideLinkUrl && mission.enabled" class="mr-1">
                      <feather-icon
                        v-b-tooltip="'Copiar link da missão'"
                        icon="LinkIcon"
                        class="icon-table text-primary"
                        size="24"
                        @click.stop="copyLink(mission.guideLinkUrl)"
                      />
                    </div>
                    <div v-if="mission.enabled" class="mr-1">
                      <feather-icon
                        v-b-tooltip="'Cancelar Missão'"
                        icon="XCircleIcon"
                        size="24"
                        class="icon-table text-danger"
                        @click.stop="enableAndDisableScript(mission)"
                      />
                    </div>
                  </div>
                </b-col>
              </b-row>
            </template>
            <div class="grayBackground">
              <activity-card :data="mission.activities" :is-highfive="true" />
            </div>
          </app-collapse-item>
        </app-collapse>

        <b-card v-if="paginationData.length > 0">
          <ListTablePagination
            :total-data="highfiveMissions.length"
            :value="currentPage"
            :per-page="itemsPerPage"
            @input="changePage"
          />
        </b-card>
      </b-overlay>
    </div>
    <b-modal
      v-model="activePromptEnableAndDisableScript"
      centered
      size="xl"
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      static
      @close="closePromptEnableAndDisableScript()"
    >
      <enable-and-disable-script
        v-if="activePromptEnableAndDisableScript"
        :mission="selectedMission"
        @close-cancel-mission="closePromptEnableAndDisableScript()"
        @close-cancel-mission-and-refresh="closePromptEnableAndDisableScriptAndRefresh()"
      />
    </b-modal>
    <b-modal
      v-model="activePromptCopyLink"
      centered
      size="lg"
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      static
      @close="closeCopyLinkPrompt()"
    >
      <copy-link v-if="activePromptCopyLink" :mission-link="promptLink" />
    </b-modal>
    <b-modal
      v-model="activePromptStartCollectiveMission"
      centered
      size="lg"
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      static
      @close="activePromptStartCollectiveMission = false"
    >
      <start-collective-mission
        v-if="activePromptStartCollectiveMission"
        :guide-id="selectedMission.id"
      />
    </b-modal>
    <b-modal
      v-model="activePromptHighfiveDetail"
      centered
      size="xl"
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      static
      @close="activePromptHighfiveDetail = false"
    >
      <highfive-detail
        v-if="activePromptHighfiveDetail"
        :highfive-id="selectedMission.id"
        @close-highfiveDetail="activePromptHighfiveDetail = false"
      />
    </b-modal>
  </div>
</template>

<script setup>
import ActivityCard from '../../shared/components/ActivityCard.vue'
import CopyLink from '../../shared/modals/CopyLink.vue'
import EnableAndDisableScript from '../../shared/modals/EnableAndDisableScript.vue'
import HighfiveDetail from '../../shared/modals/HighFiveDetail.vue'
import AppCollapse from '@/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@/components/app-collapse/AppCollapseItem.vue'
import ListTablePagination from '@/components/table/ListTablePagination.vue'
import { SubjectEnum } from '@/consts/SubjectEnum'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getHighFiveMissions } from '@/services/responsible-context/guides/Guides.service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import useFilters from '@/store/filters/useFilters'
import EnabledStatus from '@/views/pages/admin-context/shared/table-columns-components/EnabledStatus.vue'
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router/composables'

const { classe, subject, subjects } = useFilters()
const router = useRouter()

const loading = ref(true)
const highfiveMissions = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(5)

const serieId = computed(() => classe.value.SerieId)

const paginationData = computed(() =>
  currentPage.value === 1
    ? highfiveMissions.value.slice(0, itemsPerPage.value)
    : highfiveMissions.value.slice(
        itemsPerPage.value * (currentPage.value - 1),
        itemsPerPage.value * (currentPage.value - 1) + itemsPerPage.value,
      ),
)

const handleHighfiveMissions = async () => {
  loading.value = true
  currentPage.value = 1

  await getHighFiveMissions({
    classId: classe.value.ClassId,
    subjectId: SubjectEnum[1].value,
  }).then(response => {
    highfiveMissions.value = response.data.map(data => ({
      ...data,
      collapsed: true,
    }))
  })
  loading.value = false
}

const changePage = page => {
  currentPage.value = page
}

const selectedMission = ref({})

const activePromptEnableAndDisableScript = ref(false)

const enableAndDisableScript = mission => {
  selectedMission.value = mission
  activePromptEnableAndDisableScript.value = true
}
const closePromptEnableAndDisableScriptAndRefresh = () => {
  activePromptEnableAndDisableScript.value = false
  selectedMission.value = {}
  handleHighfiveMissions()
}

const closePromptEnableAndDisableScript = () => {
  selectedMission.value = {}
  activePromptEnableAndDisableScript.value = false
}

const activePromptCopyLink = ref(false)
const promptLink = ref('')

const copyLink = link => {
  activePromptCopyLink.value = true
  promptLink.value = import.meta.env.VITE_APP_DEEPLINK_URL + link
}

const closeCopyLinkPrompt = () => {
  activePromptCopyLink.value = false
}

const activePromptStartCollectiveMission = ref(false)

const openSummaryCollectiveMission = mission => {
  activePromptStartCollectiveMission.value = true
  selectedMission.value = mission
}

const activePromptHighfiveDetail = ref(false)

const showHighfiveDetail = mission => {
  selectedMission.value = mission
  activePromptHighfiveDetail.value = true
}

const GET_NAME = getWhitelabelConfig('Name')

watch(subjects, () => {
  const s = subjects.value.find(s => s.id === SubjectEnum[1].value)
  subject.value = s
})

watch(
  classe,
  () => {
    handleHighfiveMissions()
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
  .icon-table {
    font-size: 28px;
  }

  .step-visualization {
    width: 100%;
    margin-bottom: 24px;
    align-items: center;

    .step-capsule {
      display: block;
      padding: 8px 16px;
      font-weight: 600;
      font-size: 15px;
      line-height: 24px;
      color: #fff;
      text-align: center;
      border-radius: 20px;
      background-color: #00cfe8;

      &:not(:first-child) {
        margin-left: -16px;
      }
    }

    .step-arrow {
      margin: 0 8px;
      width: 44px;
      height: 32px;
      display: inline-block;
      justify-content: center;
      align-items: center;
      position: relative;
      background-color: transparent !important;

      span {
        display: block;
        width: 24px;
        height: 2px;
        border-radius: 20px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }

      &::before {
        content: '';
        display: block;
        width: 16px;
        height: 16px;
        top: 50%;
        left: 50%;
        border-style: solid;
        border-width: 3px 3px 0 0;
        position: absolute;
        transform-origin: 50% 50%;
        transform: rotate(45deg);
        margin: -8px 0 0 -16px;
      }
    }

    .step-capsule:nth-of-type(1),
    .step-arrow:nth-of-type(1),
    .step-arrow:nth-of-type(1) > span {
      background-color: #ea5455;

      &::before {
        border-color: #ea5455;
      }
    }

    .step-capsule:nth-of-type(2),
    .step-arrow:nth-of-type(2),
    .step-arrow:nth-of-type(2) > span {
      background-color: #ff9f43;

      &::before {
        border-color: #ff9f43;
      }
    }

    .step-capsule:nth-of-type(3),
    .step-arrow:nth-of-type(3),
    .step-arrow:nth-of-type(3) > span {
      background-color: #28c76f;

      &::before {
        border-color: #28c76f;
      }
    }
  }

  .title-highfiveSchool {
    font-size: 21px;
    line-height: 26px;
    font-weight: 500;
    color: #5e5873;
  }
</style>