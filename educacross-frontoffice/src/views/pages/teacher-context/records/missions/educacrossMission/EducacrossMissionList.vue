<template>
  <div class="mt-12">
    <div>
      <div class="d-none d-lg-flex" style="padding: 1rem 2.8rem 1rem 1rem">
        <b-row class="full-width flex-grow-1 mr-2">
          <b-col cols="6" lg="4" class="flex align-items-center">
            <h5 class="color-patternTwo">Nome da missão</h5>
          </b-col>

          <b-col cols="6" lg="4" class="align-items-center d-none d-lg-flex">
            <h5 class="color-patternTwo">Anotações internas</h5>
          </b-col>
        </b-row>
      </div>
      <app-collapse accordion type="margin" class="mb-2">
        <b-skeleton-wrapper :loading="loading">
          <template v-slot:loading>
            <b-card no-body class="px-2">
              <b-row>
                <b-col cols="12" lg="4">
                  <b-skeleton type="text" class="w-100 my-1" height="50px" />
                </b-col>
                <b-col cols="12" lg="4">
                  <b-skeleton type="text" class="w-100 my-1" height="50px" />
                </b-col>
                <b-col cols="12" lg="4">
                  <b-skeleton type="text" class="w-100 my-1" height="50px" />
                </b-col>
              </b-row>
            </b-card>
            <b-card no-body class="px-2">
              <b-row>
                <b-col cols="12" lg="4">
                  <b-skeleton type="text" class="w-100 my-1" height="50px" />
                </b-col>
                <b-col cols="12" lg="4">
                  <b-skeleton type="text" class="w-100 my-1" height="50px" />
                </b-col>
                <b-col cols="12" lg="4">
                  <b-skeleton type="text" class="w-100 my-1" height="50px" />
                </b-col>
              </b-row>
            </b-card>
            <b-card no-body class="px-2">
              <b-row>
                <b-col cols="12" lg="4">
                  <b-skeleton type="text" class="w-100 my-1" height="50px" />
                </b-col>
                <b-col cols="12" lg="4">
                  <b-skeleton type="text" class="w-100 my-1" height="50px" />
                </b-col>
                <b-col cols="12" lg="4">
                  <b-skeleton type="text" class="w-100 my-1" height="50px" />
                </b-col>
              </b-row>
            </b-card>
          </template>
          <app-collapse-item
            v-for="guide in guides"
            :key="guide.id"
            :title="guide.name"
            body-class="p-0"
          >
            <template v-slot:header>
              <b-row class="full-width flex-grow-1 mr-2">
                <b-col cols="12" lg="4" class="flex align-items-center">
                  <h5 class="color-patternTwo mb-lg-0 lg:font-semibold mr-2">
                    <span class="d-inline d-lg-none font-semibold">Nome da missão: </span>
                    <span class="font-normal lg:font-semibold"> {{ guide.name }} </span>
                  </h5>
                </b-col>

                <b-col cols="12" lg="5" class="align-items-center">
                  <span class="d-inline d-lg-none font-semibold color-patternTwo"
                    >Anotações internas:
                  </span>
                  {{ guide.annotation }}
                </b-col>

                <b-col
                  cols="12"
                  lg="3"
                  class="flex flex-column flex-lg-row justify-content-lg-end mt-1 mt-lg-0"
                >
                  <div class="actions flex align-items-center">
                    <b-button
                      variant="primary"
                      type="filled"
                      class="float-right button-guides"
                      @click.stop="createBookGuide(guide)"
                    >
                      Usar missão
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </template>
            <div class="grayBackground">
              <activity-card :data="guide.activities" />
            </div>
          </app-collapse-item>
          <b-card v-if="!guides.length">
            <div class="d-flex flex-column align-items-center">
              <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
              <span class="text-center"> Nenhum dado encontrado </span>
            </div>
          </b-card>
        </b-skeleton-wrapper>
      </app-collapse>
      <b-card>
        <ListTablePagination
          :total-data="totalData"
          :value="currentPage"
          :per-page="perPage"
          @input="changePage"
        />
      </b-card>
    </div>
    <b-modal
      v-model="activePromptGuideFeedbackConfirmation"
      centered
      size="lg"
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      hide-header
      static
      @close="activePromptGuideFeedbackConfirmation = false"
    >
      <guide-feedback-confirmation
        v-if="activePromptGuideFeedbackConfirmation"
        :guide-obj="selectedGuideToCreate"
        @close-guideFeedbackConfirmation="activePromptGuideFeedbackConfirmation = false"
      />
    </b-modal>
  </div>
</template>

<script setup>
import AppCollapse from '@/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@/components/app-collapse/AppCollapseItem.vue'
import ListTablePagination from '@/components/table/ListTablePagination.vue'
import store from '@/store'
import ActivityCard from '@/views/pages/teacher-context/shared/components/ActivityCard.vue'
import GuideFeedbackConfirmation from '@/views/pages/teacher-context/shared/modals/GuideFeedbackConfirmation.vue'
import { computed, ref } from 'vue'

const guides = computed(() => store.getters['EducacrossMissionsModule/missions'])
const loading = computed(() => store.getters['EducacrossMissionsModule/loading'])
const currentPage = computed(() => store.getters['EducacrossMissionsModule/page'])
const perPage = computed(() => store.getters['EducacrossMissionsModule/pageSize'])
const totalData = computed(() => store.getters['EducacrossMissionsModule/total'])

const selectedGuideToCreate = ref(null)
const activePromptGuideFeedbackConfirmation = ref(false)

const guideStatus = {
  1: {
    label: 'Não aplicado',
    tooltip: 'Missão ainda não foi aplicada para esta turma.',
  },
  2: {
    label: 'Criado',
    tooltip: 'Missão criada, mas não foi habilitada.',
  },
  3: {
    label: 'Em progresso',
    tooltip: 'Missão habilitada e em progresso.',
  },
  4: {
    label: 'Finalizado',
    tooltip: 'Missão já finalizada.',
  },
}

const createBookGuide = guide => {
  selectedGuideToCreate.value = guide
  activePromptGuideFeedbackConfirmation.value = true
}

const changePage = page => {
  store.commit('EducacrossMissionsModule/page', page)
  store.dispatch('EducacrossMissionsModule/fetchData')
}
</script>