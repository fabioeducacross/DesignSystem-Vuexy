<template>
  <section>
    <b-skeleton-wrapper :loading="loadingDashboard" class="w-100">
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
            icon-background="bg-light-primary"
            icon-class="text-primary"
            has-tooltip-icon
            tooltip-text="Cadastros são licenças atribuídas a um usuário. Os acessos são calculados sobre os usuários cadastrados e as jogadas são calculadas sobre os alunos que acessaram."
            :value="dashboard.students"
          >
            <template v-slot:description>
              <ProgressBarHorizontal
                label="Cadastrados"
                :value="
                  !can(ACTION.READ, PERMISSION.GENERAL.INTEGRATOR)
                    ? calcPercent(dashboard.students, dashboard.studentsLicenses)
                    : 100
                "
                progress-bar-container-class="mb-0 text-body font-size-md"
                position-bottom
                :progress-bar-colors="colorsEnum"
              >
                <template v-slot:right-content>
                  <div>
                    <span class="font-extrabold" style="">
                      {{ dashboard.students | formatNumber }}
                    </span>
                    <span v-if="!can(ACTION.READ, PERMISSION.GENERAL.INTEGRATOR)"> de </span>
                    <span v-if="!can(ACTION.READ, PERMISSION.GENERAL.INTEGRATOR)">
                      {{ dashboard.studentsLicenses | formatNumber }}
                    </span>
                  </div>
                </template>
              </ProgressBarHorizontal>
              <ProgressBarHorizontal
                label="Acessaram"
                :value="calcPercent(dashboard.studentsAccess, dashboard.students)"
                position-bottom
                progress-bar-container-class="mb-0 text-body font-size-md"
                :progress-bar-colors="colorsEnum"
              >
                <template v-slot:right-content>
                  <span class="font-extrabold" style="">
                    {{ dashboard.studentsAccess | formatNumber }}
                  </span>
                  <span> de </span>
                  <span>{{ dashboard.students | formatNumber }}</span>
                </template>
              </ProgressBarHorizontal>
              <ProgressBarHorizontal
                label="Jogaram"
                :value="calcPercent(dashboard.studentsPlayed, dashboard.studentsAccess)"
                position-bottom
                progress-bar-container-class="mb-0 text-body font-size-md"
                :progress-bar-colors="colorsEnum"
              >
                <template v-slot:right-content>
                  <span class="font-extrabold">{{ dashboard.studentsPlayed | formatNumber }}</span>
                  <span> de </span>
                  <span>{{ dashboard.studentsAccess | formatNumber }}</span>
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
                      <span
                        v-if="!can(ACTION.READ, PERMISSION.GENERAL.INTEGRATOR)"
                        class="text-body"
                      >
                        de {{ dashboard.teachers | formatNumber }} acessaram
                      </span>
                      <span v-else class="text-body"> acessaram </span>
                    </p>
                    <h6
                      v-if="!can(ACTION.READ, PERMISSION.GENERAL.INTEGRATOR)"
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
            <b-col cols="12" md="6">
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
                      <span
                        v-if="!can(ACTION.READ, PERMISSION.GENERAL.INTEGRATOR)"
                        class="text-body"
                      >
                        de {{ dashboard.coordinators | formatNumber }} acessaram
                      </span>
                      <span v-else class="text-body"> acessaram </span>
                    </p>
                    <h6
                      v-if="!can(ACTION.READ, PERMISSION.GENERAL.INTEGRATOR)"
                      :class="`${
                        getRangeColor(
                          calcPercent(dashboard.coordinatorsAccess, dashboard.coordinators)
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
            <b-col cols="12" md="6">
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
                          calcPercent(dashboard.secretariatsAccess, dashboard.secretariats)
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

    <ModalDetailsAccessTeacher
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
import { ACTION, PERMISSION } from '@/consts/permissions'
import store from '@/store'
import { calcPercent } from '@/utils/number.js'
import { getRangeColor } from '@/utils/report-education-system/range-color.js'
import { colorsEnum } from '@/utils/report-education-system/rangeColors.js'
import ModalDetailsAccessTeacher from '@/views/dashboard/schools/engagement/components/ModalDetailsAccessTeacher.vue'
import { computed, ref } from 'vue'

const loadingDashboard = computed(
  () => store.getters['moduleDashboardSchoolsEngagement/loadingDashboard']
)

const dashboard = computed(
  () => store.getters['moduleDashboardSchoolsEngagement/dashboard']
)

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