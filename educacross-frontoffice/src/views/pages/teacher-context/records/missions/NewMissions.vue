<template>
  <div>
    <b-row class="match-height">
      <b-col cols="12" md="auto">
        <b-card>
          <SelectSubject :additional-modules="MISSION_MODULE_IDS" />
        </b-card>
      </b-col>
      <b-col cols="12" md>
        <b-card body-class="d-flex flex-column align-items-start justify-content-center">
          <p class="mb-0">
            Missões são conjuntos de jogos que você pode enviar para uma turma inteira ou para
            alunos específicos.
          </p>
          <p class="mb-0">
            Você pode criar uma <span class="font-bold text-primary">missão personalizada</span> ou
            selecionar uma das missões sugeridas pelo nosso time pedagógico ou por outros
            professores.
          </p>
        </b-card>
      </b-col>
    </b-row>
    <GuidesLimitAlert v-model="disableGuidesCreation" />
    <b-skeleton-wrapper :loading="loading || internalLoading" class="w-100 px-50">
      <template v-slot:loading>
        <b-row>
          <b-col v-for="i in 4" :key="i" xs="12" sm="6" md="4" lg="3">
            <b-skeleton-img class="rounded mb-1" no-aspect height="350px" />
          </b-col>
        </b-row>
      </template>
      <b-row class="match-height">
        <b-col v-for="mission in filteredMissions" :key="mission.id" xs="12" sm="6" md="4" lg="3">
          <b-card
            body-class="d-flex flex-column align-items-center justify-content-center"
            :img-src="getImg(mission.type)"
            :img-alt="mission.title"
            img-top
          >
            <b-badge v-if="mission.isNew" pill variant="light-info" class="mb-1 position-relative">
              <img src="@/assets/images/icons/star-badge.svg" alt="new" class="star star-1" />
              <img src="@/assets/images/icons/star-badge.svg" alt="new" class="star star-2" />
              Super novo
            </b-badge>
            <b-card-title title-tag="h3">
              <span class="text-primary h3 align-middle" v-html="mission.title" />

              <img
                v-if="mission.icon"
                class="d-inline-block v-align-middle ml-50"
                :alt="mission.title"
                :src="getImg(mission.icon)"
              />
            </b-card-title>

            <b-card-text>
              {{ mission.description }}
            </b-card-text>
            <div class="d-flex justify-content-center mt-auto">
              <div
                v-b-tooltip.hover.left="
                  disableGuidesCreation
                    ? 'As missões dessa turma se esgotaram. É permitida a criação até 40 missões ao mês por turma, exclua uma missão para criar uma nova.'
                    : ''
                "
              >
                <b-button
                  class="d-flex align-items-center justify-content-center gap-1"
                  variant="primary"
                  :disabled="disableGuidesCreation"
                  @click="toCreateMission(mission.route)"
                >
                  <span class="material-symbols-outlined"> add_circle </span>
                  Nova missão
                </b-button>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-skeleton-wrapper>
  </div>
</template>

<script setup>
import GuidesLimitAlert from '@/components/missions/GuidesLimitAlert.vue'
import MissionTypeEnum from '@/consts/admin-context/enums/mission'
import { ModulesEnum } from '@/consts/admin-context/enums/modules'
import { ACTION, PERMISSION } from '@/consts/permissions'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import ability from '@/libs/acl/ability'
import router from '@/router'
import { getInstitutionModules } from '@/services/admin-context/institutions/Institutions.service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import useFilters from '@/store/filters/useFilters'
import { ref, watch } from 'vue'

// Dynamically import all SVG images from new-mission directory
const missionImages = import.meta.glob('@/assets/images/teacher-context/new-mission/*.svg', { eager: true, import: 'default' })

const { subject, loading, classe } = useFilters()
const internalLoading = ref(true)
const disableGuidesCreation = ref(false)

// Mission module IDs that should be used for fetching subjects
const MISSION_MODULE_IDS = [
  ModulesEnum.BookMissions,
  ModulesEnum.EducacrossMissions,
  ModulesEnum.InclusionGuide,
  ModulesEnum.CustomMissionsPlus,
]

const missions = [
  {
    id: '593bf0d9-e3a5-4fb7-93d8-af1eb451c507',
    type: 'customplus',
    isNew: true,
    title: 'Missão<br/>personalizada',
    description:
      'Selecione jogos específicos para compor uma missão, tendo como base seu plano de aula.',
    route: { name: 'CreateCustomPlusMission' },
    icon: 'customplus-icon',
    module: ModulesEnum.CustomMissionsPlus,
    subjects: [],
  },
  {
    id: '6ec3aa3b-ddb9-4d4d-8ac7-50195179c632',
    type: 'custom',
    title: 'Missão personalizada',
    description:
      'Selecione jogos específicos para compor uma missão, tendo como base seu plano de aula.',
    route: { name: 'CreateCustomMission', params: { type: MissionTypeEnum.Individual } },
    module: ModulesEnum.CustomMissions,
    subjects: [],
  },
  {
    id: '98c2d8ad-88eb-49e6-8702-2a36e509c91b',
    type: 'collective',
    title: 'Missão coletiva personalizada',
    description:
      'Selecione jogos específicos para compor uma missão coletiva para realizar uma aula interativa.',
    route: { name: 'CreateCustomMission', params: { type: MissionTypeEnum.Collective } },
    module: ModulesEnum.CustomMissions,
    subjects: [3],
  },
  {
    id: '17e1f050-0d18-420d-8416-a60885fb234c',
    type: 'educacross',
    title: getWhitelabelConfig('SuggestedMission'),
    description:
      'Conjuntos de jogos sugeridos pelo nosso time pedagógico e alinhados à BNCC.',
    route: { name: 'CreateEducacrossMission' },
    module: ModulesEnum.EducacrossMissions,
    subjects: [],
  },
  {
    id: '474e035c-36d7-498c-9ca8-ac09a97b2a47',
    type: 'shared',
    title: 'Missão compartilhada',
    description:
      'Conjuntos de jogos sugeridos e compartilhados por professores que utilizam a plataforma.',
    route: { name: 'CreateSharedMission' },
    hasPermission: ability.can(ACTION.READ, PERMISSION.MODULE.SHARED_MISSIONS),
    subjects: [],
  },
  {
    id: '8d982190-870e-4153-ae58-0bde75381ff7',
    type: 'inclusion',
    title: 'Missão inclusiva',
    description:
      'Conjuntos de jogos elaborados e sugeridos pelo nosso time pedagógico para atender crianças com necessidades especiais.',
    route: {
      name: 'CreateInclusionMission',
    },
    module: ModulesEnum.InclusionGuide,
    subjects: [],
  },
  {
    id: '98d7691c-b01b-4536-8127-7652939d94f1',
    type: 'books',
    title: 'Missão dos livros',
    description:
      'Conjuntos de jogos mapeados pelo time nosso pedagógico com base em materiais didáticos de sistemas de ensino.',
    route: {
      name: 'CreateBookMission',
    },
    module: ModulesEnum.BookMissions,
    subjects: [],
  },
]

const filteredMissions = ref([])

watch([subject], async () => {
  const modules = await fetchModules()

  if (!modules) return

  filteredMissions.value = missions.filter(mission => {
    if (mission.hasPermission) {
      return (
        mission.hasPermission &&
        (mission.subjects.length === 0 || mission.subjects.includes(subject.value.id))
      )
    }

    return (
      modules.includes(mission.module) &&
      (mission.subjects.length === 0 || mission.subjects.includes(subject.value.id))
    )
  })
})

const getImg = whichImg => {
  const imagePath = `/src/assets/images/teacher-context/new-mission/${whichImg}.svg`
  return missionImages[imagePath] || ''
}

const toCreateMission = route => {
  router.push(route)
}

const fetchModules = async () => {
  internalLoading.value = true
  const res = await getInstitutionModules(null, subject.value.id, classe.value.SerieId)

  internalLoading.value = false

  if (res.status === 200) {
    return res.data[0].modules || []
  }

  return []
}
</script>

<style lang="scss">
  .card-newMission {
    height: 420px !important;
    //max-width: 360px !important;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box !important;

    .card-body {
      padding: 1% 5%;
    }
  }
</style>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';

  .card-text {
    text-align: center;
    font-size: 14px;
    line-height: 24px;
  }

  .custom-button {
    max-width: 200px;
    width: 100%;
    border-radius: 5px;
    padding: 12px 16px;
    position: absolute;
    bottom: 15px;
  }

  .card-title {
    font-size: 16px;
    line-height: 32px;
    font-weight: 600;
    text-align: center;
  }

  .title-newMission {
    font-weight: 500;
    font-size: 21px;
    line-height: 26px;
  }

  .text-newMission {
    font-size: 16px;
    line-height: 2;
    font-weight: 500;
  }

  .card-info {
    min-height: 334px;
  }

  .img-missionType {
    max-width: 320px;
    height: auto;
    margin: 10px auto;
    img {
      width: 100%;
      margin: 0 auto;
    }
  }

  .back-linkText {
    top: -11.2rem;
  }

  .missions-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 0 !important;
  }

  .missions-items {
    flex: 1;
    margin: 0 5px;

    width: 100%;
  }
  @keyframes highlight {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.5);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }

  .star {
    position: absolute;
    animation: highlight 2s infinite;
  }
  .star-1 {
    width: 8px;
    height: 8px;
    bottom: 0;
    left: -3px;
  }
  .star-2 {
    width: 13px;
    height: 13px;
    right: -4px;
    top: -4px;
    animation-delay: 1s;
  }
</style>