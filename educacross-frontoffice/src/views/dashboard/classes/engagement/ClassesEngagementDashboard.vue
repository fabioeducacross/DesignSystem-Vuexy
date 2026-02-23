<template>
  <section>
    <b-skeleton-wrapper v-if="isCoordinator" :loading="loadingDashboard" class="w-100">
      <template v-slot:loading>
        <b-row>
          <b-col cols="12" md="6">
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
          <b-col cols="12" md="6">
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
        </b-row>
      </template>
      <b-row class="match-height h-full" align-v="stretch">
        <b-col cols="12" md="6">
          <MediaCard
            title="Alunos que acessaram"
            title-color="text-body"
            icon="sentiment_satisfied"
            variant="light-primary"
            right-align
            tooltip-text="Alunos que fizeram ao menos 1 acesso. O percentual é calculado sobre os alunos cadastrados."
          >
            <template v-slot:description>
              <ConditionalValueDisplay :value="dashboard.studentsAccess" layout="badge">
                <div class="font-14 text-body">
                  <ProgressBarHorizontalV2
                    show-values
                    height="6px"
                    :value="dashboard.studentsAccess"
                    :max="dashboard.students"
                    :get-variant="getColorsEnum"
                  >
                  </ProgressBarHorizontalV2>
                </div>
              </ConditionalValueDisplay>
            </template>
          </MediaCard>
        </b-col>

        <b-col cols="12" md="6">
          <MediaCard
            title="Alunos que jogaram"
            title-color="text-body"
            icon="sentiment_satisfied"
            variant="light-primary"
            right-align
            tooltip-text="Alunos que jogaram ao menos 1 vez. O percentual é calculado sobre os alunos que acessaram."
          >
            <template v-slot:description>
              <ConditionalValueDisplay :value="dashboard.studentsPlayed" layout="badge">
                <div class="font-14 text-body">
                  <ProgressBarHorizontalV2
                    show-values
                    height="6px"
                    :value="dashboard.studentsPlayed"
                    :max="dashboard.studentsAccess"
                    :get-variant="getColorsEnum"
                  >
                  </ProgressBarHorizontalV2>
                </div>
              </ConditionalValueDisplay>
            </template>
          </MediaCard>
        </b-col>
      </b-row>
    </b-skeleton-wrapper>

    <b-skeleton-wrapper v-else :loading="loadingDashboard" class="w-100">
      <template v-slot:loading>
        <b-row class="match-height">
          <b-col cols="12" lg="4">
            <b-skeleton type="card" height="215px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
          <b-col cols="12" lg="8">
            <b-row>
              <b-col cols="12">
                <b-row>
                  <b-col cols="12" md="6">
                    <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
                  </b-col>
                  <b-col cols="12" md="6">
                    <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12">
                <b-row>
                  <b-col cols="12" md="6">
                    <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
                  </b-col>
                  <b-col cols="12" md="6">
                    <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </template>
      <b-row class="match-height h-full" align-v="stretch">
        <b-col cols="12" lg="4">
          <DynamicMediaCard
            title="Alunos"
            icon="sentiment_satisfied"
            bg-variant="bg-light-primary"
            right-align
            has-tooltip-icon
            icon-background="bg-light-primary"
            icon-class="text-primary"
            tooltip-text="Cadastros são licenças atribuídas a um usuário. Os acessos são calculados sobre os usuários cadastrados e as jogadas são calculadas sobre os alunos que acessaram."
            :value="dashboard.studentsAccess"
          >
            <template v-slot:description>
              <ProgressBarHorizontal
                label="Acessaram"
                label-class="text-body"
                :value="calcPercent(dashboard.studentsAccess, dashboard.students)"
                progress-bar-container-class="mb-0 font-size-md"
                position-bottom
                :progress-bar-colors="colorsEnum"
              >
                <template v-slot:right-content>
                  <div class="text-body">
                    <span class="font-extrabold" style="">{{
                      dashboard.studentsAccess | formatNumber
                    }}</span>
                    <span> de </span>
                    <span>{{ dashboard.students | formatNumber }}</span>
                  </div>
                </template>
              </ProgressBarHorizontal>
              <ProgressBarHorizontal
                label="Jogaram"
                label-class="text-body"
                :value="calcPercent(dashboard.studentsPlayed, dashboard.studentsAccess)"
                position-bottom
                progress-bar-container-class="mb-0 font-size-md"
                :progress-bar-colors="colorsEnum"
              >
                <template v-slot:right-content>
                  <div class="text-body">
                    <span class="font-extrabold" style="">{{
                      dashboard.studentsPlayed || 0 | formatNumber
                    }}</span>
                    <span> de </span>
                    <span>{{ dashboard.studentsAccess | formatNumber }}</span>
                  </div>
                </template>
              </ProgressBarHorizontal>
            </template>
            <template v-slot:empty>
              <p class="text-center text-body">
                Realize uma nova filtragem ou aguarde até alguma atividade ser realizada.
              </p>
            </template>
          </DynamicMediaCard>
        </b-col>
        <b-col>
          <b-row class="match-height h-full">
            <b-col v-if="!isNetworkManager" cols="12" md="6">
              <MediaCard
                title="Turmas"
                title-color="text-body"
                icon="menu_book"
                variant="light-primary"
                right-align
              >
                <template v-slot:description>
                  <ConditionalValueDisplay :value="dashboard.classesAccess" layout="badge">
                    <p>
                      <span class="text-body font-extrabold">
                        {{ dashboard.classesAccess | formatNumber }}
                      </span>

                      <span class="text-body">
                        de {{ dashboard.classes | formatNumber }} acessaram
                      </span>
                    </p>
                    <h6
                      :class="`${
                        getRangeColor(calcPercent(dashboard.classesAccess, dashboard.classes))
                          .textVariant || ''
                      } font-bold`"
                    >
                      {{ calcPercent(dashboard.classesAccess, dashboard.classes) | formatNumber }}%
                    </h6>
                  </ConditionalValueDisplay>
                </template>
              </MediaCard>
            </b-col>

            <b-col cols="12" md="6">
              <MediaCard
                title="Professores"
                title-color="text-body"
                icon="person"
                variant="light-primary"
                right-align
                :event-click="openModalDetailAccessTeacher"
              >
                <template v-slot:description>
                  <ConditionalValueDisplay :value="dashboard.teachersAccess" layout="badge">
                    <p>
                      <span class="text-body font-extrabold">
                        {{ dashboard.teachersAccess | formatNumber }}
                      </span>

                      <span class="text-body">
                        de {{ dashboard.teachers | formatNumber }} acessaram
                      </span>
                    </p>
                    <h6
                      :class="`${
                        getRangeColor(calcPercent(dashboard.teachersAccess, dashboard.teachers))
                          .textVariant || ''
                      } font-bold`"
                    >
                      {{
                        calcPercent(dashboard.teachersAccess, dashboard.teachers) | formatNumber
                      }}%
                    </h6>
                  </ConditionalValueDisplay>
                </template>
              </MediaCard>
            </b-col>

            <b-col v-if="isNetworkManager" cols="12" md="6">
              <MediaCard
                title="Diretores"
                title-color="text-body"
                icon="business_center"
                variant="light-primary"
                right-align
                :event-click="openModalDetailAccessManager"
              >
                <template v-slot:description>
                  <ConditionalValueDisplay :value="dashboard.managersAccess" layout="badge">
                    <p>
                      <span class="text-body font-extrabold">
                        {{ dashboard.managersAccess | formatNumber }}
                      </span>

                      <span class="text-body">
                        de {{ dashboard.managers | formatNumber }} acessaram
                      </span>
                    </p>
                    <h6
                      :class="`${
                        getRangeColor(calcPercent(dashboard.managersAccess, dashboard.managers))
                          .textVariant || ''
                      } font-bold`"
                    >
                      {{
                        calcPercent(dashboard.managersAccess, dashboard.managers) | formatNumber
                      }}%
                    </h6>
                  </ConditionalValueDisplay>
                </template>
              </MediaCard>
            </b-col>

            <b-col cols="12" md="6">
              <MediaCard
                title="Coordenadores"
                title-color="text-body"
                icon="groups"
                variant="light-primary"
                right-align
                :event-click="openModalDetailAccessCoordinator"
              >
                <template v-slot:description>
                  <ConditionalValueDisplay :value="dashboard.coordinatorsAccess" layout="badge">
                    <p>
                      <span class="text-body font-extrabold">
                        {{ dashboard.coordinatorsAccess | formatNumber }}
                      </span>

                      <span class="text-body">
                        de {{ dashboard.coordinators | formatNumber }} acessaram
                      </span>
                    </p>
                    <h6
                      :class="`${
                        getRangeColor(
                          calcPercent(dashboard.coordinatorsAccess, dashboard.coordinators),
                        ).textVariant || ''
                      } font-bold`"
                    >
                      {{
                        calcPercent(dashboard.coordinatorsAccess, dashboard.coordinators)
                          | formatNumber
                      }}%
                    </h6>
                  </ConditionalValueDisplay>
                </template>
              </MediaCard>
            </b-col>

            <b-col v-if="!isNetworkManager" cols="12" md="6">
              <MediaCard
                title="Diretores"
                title-color="text-body"
                icon="business_center"
                variant="light-primary"
                right-align
                :event-click="openModalDetailAccessManager"
              >
                <template v-slot:description>
                  <ConditionalValueDisplay :value="dashboard.managersAccess" layout="badge">
                    <p>
                      <span class="text-body font-extrabold">
                        {{ dashboard.managersAccess | formatNumber }}
                      </span>
                      <span
                        v-if="!can(ACTION.READ, PERMISSION.GENERAL.INTEGRATOR)"
                        class="text-body"
                      >
                        de {{ dashboard.managers | formatNumber }} acessaram
                      </span>
                      <span v-else class="text-body"> acessaram </span>
                    </p>
                    <h6
                      v-if="!can(ACTION.READ, PERMISSION.GENERAL.INTEGRATOR)"
                      :class="`${
                        getRangeColor(calcPercent(dashboard.managersAccess, dashboard.managers))
                          .textVariant || ''
                      } font-bold`"
                    >
                      {{
                        calcPercent(dashboard.managersAccess, dashboard.managers) | formatNumber
                      }}%
                    </h6>
                  </ConditionalValueDisplay>
                </template>
              </MediaCard>
            </b-col>

            <b-col v-if="isNetworkManager" cols="12" md="6">
              <MediaCard
                title="Administradores"
                title-color="text-body"
                icon="manage_accounts"
                variant="light-primary"
                right-align
                :event-click="openModalDetailAccessSecretariats"
              >
                <template v-slot:description>
                  <ConditionalValueDisplay :value="dashboard.secretariatsAccess" layout="badge">
                    <p>
                      <span class="text-body font-extrabold">
                        {{ dashboard.secretariatsAccess | formatNumber }}
                      </span>
                      <span
                        v-if="!can(ACTION.READ, PERMISSION.GENERAL.INTEGRATOR)"
                        class="text-body"
                      >
                        de {{ dashboard.secretariats | formatNumber }} acessaram
                      </span>
                      <span v-else class="text-body"> acessaram </span>
                    </p>
                    <h6
                      v-if="!can(ACTION.READ, PERMISSION.GENERAL.INTEGRATOR)"
                      :class="`${
                        getRangeColor(
                          calcPercent(dashboard.secretariatsAccess, dashboard.secretariats),
                        ).textVariant || ''
                      } font-bold`"
                    >
                      {{
                        calcPercent(dashboard.secretariatsAccess, dashboard.secretariats)
                          | formatNumber
                      }}%
                    </h6>
                  </ConditionalValueDisplay>
                </template>
              </MediaCard>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-skeleton-wrapper>
    <ModalDetailsAccessClasses
      v-model="detailsAccessTeacherIsOpen"
      :context="detailsAccessContext"
    />
  </section>
</template>

<script setup>
import { can } from '@/@core/libs/acl/utils'
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import DynamicMediaCard from '@/components/card/DynamicMediaCard.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontal from '@/components/progessBar/ProgressBarHorizontal.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { getColors } from '@/consts/rangeColors'
import store from '@/store'
import { calcPercent } from '@/utils/number.js'
import { getRangeColor } from '@/utils/report-education-system/range-color.js'
import { colorsEnum } from '@/utils/report-education-system/rangeColors.js'
import ModalDetailsAccessClasses from '@/views/dashboard/classes/engagement/components/ModalDetailsAccessClasses.vue'
import { computed, ref } from 'vue'

const isNetworkManager = store.getters.accessRole === 'NetworkManager'
const isCoordinator = store.getters.accessRole === 'Coordinator'

const loadingDashboard = computed(
  () => store.getters['moduleDashboardClassesEngagement/loadingDashboard'],
)
const dashboard = computed(() => store.getters['moduleDashboardClassesEngagement/dashboard'])

const getColorsEnum = value => {
  return getColors(value, colorsEnum)
}

const detailsAccessTeacherIsOpen = ref(false)
const detailsAccessContext = ref(null)

const openModalDetailAccess = context => {
  detailsAccessTeacherIsOpen.value = true
  detailsAccessContext.value = context
}

const openModalDetailAccessTeacher = () => {
  openModalDetailAccess('Teachers')
}

const openModalDetailAccessCoordinator = () => {
  openModalDetailAccess('Coordinators')
}
const openModalDetailAccessManager = () => {
  openModalDetailAccess('Managers')
}
const openModalDetailAccessSecretariats = () => {
  openModalDetailAccess('Secretariats')
}
</script>