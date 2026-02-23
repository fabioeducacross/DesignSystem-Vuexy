<script setup>
import DescriptorTag from '@/components/descriptors/DescriptorTag.vue'
import QuestionDetail from '@/components/evaluations/questionDetail/QuestionDetail.vue'
import MissionAndQuestionItem from '@/components/mission-plus/MissionAndQuestionItem.vue'
import Tab from '@/components/tab/Tab.vue'
import ListTablePagination from '@/components/table/ListTablePagination.vue'
import useFilters from '@/store/filters/useFilters'
import { getSubjectVariant } from '@/utils/utils'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import QuestionAlternative from '@/views/pages/reading-expedition/units/student/components/QuestionAlternative.vue'
import QuizDetail from '@/views/pages/teacher-context/records/missions/customMissionV2/QuizDetail.vue'
import { useCustomMissionV2 } from '@/views/pages/teacher-context/records/missions/customMissionV2/useCustomMissionV2'
import BadgeWithDescription from '@/views/pages/teacher-context/shared/components/BadgeWithDescription.vue'
import ActivityDetail from '@/views/pages/teacher-context/shared/modals/ActivityDetail.vue'
import { ref, watch } from 'vue'

const {
  activeTab,
  gamesTab,
  questionsTab,
  itemsFilters,
  openWarningDifferentSubject,
  getGames,
  getQuizes,
  updateTabContent,
  selectItem,
  removeItem,
  isItemSelected,
  resumeSelectingItem,
  cancelResumeSelectingItem,
  resumeSelectingSubject,
  cancelResumeSelectingSubject,
} = useCustomMissionV2()
const { subject } = useFilters()

const openActivityDetail = ref(false)
const showWebgl = ref(false)
const selectedActivityId = ref(null)
const openQuizDetail = ref(false)
const selectedQuiz = ref({})

const handleChangeGamesPage = page => {
  gamesTab.value.currentPage = page
  getGames()
}

const handleChangeQuestionsPage = page => {
  questionsTab.value.currentPage = page
  getQuizes()
}

watch(activeTab, () => {
  updateTabContent()
})
</script>

<template>
  <section>
    <Tab :current-tab.sync="activeTab" :tabs="[{ title: 'Jogos' }, { title: 'Questões' }]">
      <template v-slot:tab-content-0>
        <div>
          <b-card v-show="!gamesTab.loading && gamesTab.total === 0">
            <div class="d-flex flex-column align-items-center">
              <b-img class="mb-1" src="@/assets/images/belinha/confusion.svg" />
              <span class="text-center">Nenhum Jogo foi encontrado</span>
            </div>
          </b-card>

          <b-skeleton-wrapper :loading="gamesTab.loading">
            <template v-slot:loading>
              <div class="row d-flex">
                <div v-for="i in 10" :key="i" class="col-12 col-md-6 mb-50">
                  <b-card>
                    <b-skeleton class="mb-0" height="100px" />
                  </b-card>
                </div>
              </div>
            </template>

            <div class="row d-flex">
              <div
                v-for="game in gamesTab.games"
                :key="game.activityId"
                class="col-12 col-md-6 mb-50"
              >
                <MissionAndQuestionItem
                  :is-selected="isItemSelected(game)"
                  :item="game"
                  :subject-id="game.subjectId"
                  @open:details="
                    () => {
                      selectedActivityId = game.activityId
                      openActivityDetail = true
                    }
                  "
                >
                  <template v-slot:left-content="{ isSelected, item }">
                    <div class="d-flex align-items-center justify-content-center">
                      <b-button
                        v-if="!isSelected"
                        size="sm"
                        variant="primary"
                        class="d-flex align-items-center flex-nowrap"
                        @click="selectItem(item)"
                      >
                        <span
                          class="material-symbols-outlined align-middle mr-1"
                          style="font-size: 14px"
                        >
                          add
                        </span>
                        <span class="align-middle">Adicionar</span>
                      </b-button>
                      <b-button
                        v-if="isSelected"
                        pill
                        size="sm"
                        variant="danger"
                        class="d-flex align-items-center flex-nowrap"
                        @click="removeItem(item)"
                      >
                        <span
                          class="material-symbols-outlined align-middle mr-1"
                          style="font-size: 14px"
                        >
                          remove
                        </span>
                        <span class="align-middle">Remover</span>
                      </b-button>
                    </div>
                  </template>
                </MissionAndQuestionItem>
              </div>
            </div>
          </b-skeleton-wrapper>

          <b-card>
            <ListTablePagination
              :per-page="gamesTab.pageSize"
              :total-data="gamesTab.total"
              :value="gamesTab.currentPage"
              @input="handleChangeGamesPage"
            />
          </b-card>
        </div>
      </template>

      <template v-slot:tab-content-1>
        <div>
          <b-card v-show="!questionsTab.loading && questionsTab.total === 0">
            <div class="d-flex flex-column align-items-center">
              <b-img class="mb-1" src="@/assets/images/belinha/confusion.svg" />
              <span class="text-center">Nenhuma Questão foi encontrado</span>
            </div>
          </b-card>
          <b-skeleton-wrapper :loading="questionsTab.loading">
            <template v-slot:loading>
              <div class="row">
                <div v-for="i in 10" :key="i" class="col-12 col-md-6 mb-50">
                  <b-card>
                    <b-skeleton class="mb-0" height="100px" />
                  </b-card>
                </div>
              </div>
            </template>

            <div class="row">
              <div
                v-for="question in questionsTab.questions"
                :key="question.id"
                class="col-12 col-md-6 mb-50"
              >
                <MissionAndQuestionItem
                  :is-selected="isItemSelected(question)"
                  :item="question"
                  :subject-id="question.subjectId"
                  @removeItem="removeItem(question)"
                  @selectItem="selectItem(question)"
                  @open:details="
                    () => {
                      selectedQuiz = question
                      openQuizDetail = true
                    }
                  "
                >
                  <template v-slot:left-content="{ isSelected, item }">
                    <div class="d-flex align-items-center justify-content-center">
                      <b-button
                        v-if="!isSelected"
                        size="sm"
                        variant="primary"
                        class="d-flex align-items-center flex-nowrap"
                        @click="selectItem(item)"
                      >
                        <span
                          class="material-symbols-outlined align-middle mr-1"
                          style="font-size: 14px"
                        >
                          add
                        </span>
                        <span class="align-middle">Adicionar</span>
                      </b-button>
                      <b-button
                        v-if="isSelected"
                        pill
                        size="sm"
                        variant="danger"
                        class="d-flex align-items-center flex-nowrap"
                        @click="removeItem(item)"
                      >
                        <span
                          class="material-symbols-outlined align-middle mr-1"
                          style="font-size: 14px"
                        >
                          remove
                        </span>
                        <span class="align-middle">Remover</span>
                      </b-button>
                    </div>
                  </template>
                </MissionAndQuestionItem>
              </div>
            </div>
          </b-skeleton-wrapper>

          <b-card>
            <ListTablePagination
              :per-page="questionsTab.pageSize"
              :total-data="questionsTab.total"
              :value="questionsTab.currentPage"
              @input="handleChangeQuestionsPage"
            />
          </b-card>
        </div>
      </template>
    </Tab>

    <b-modal
      ref="activityDetail"
      v-model="openActivityDetail"
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      scrollable
      size="xl"
      static
      @close="openActivityDetail = false"
    >
      <template v-slot:modal-header>
        <h4 class="mb-0 text-body font-medium">Detalhes do jogo</h4>
        <button v-if="showWebgl" class="back" @click="showWebgl = false">
          <span class="material-symbols-outlined" style="font-size: 16px"> arrow_back </span>
        </button>
        <button class="close" @click="openActivityDetail = false">
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <ActivityDetail
        v-if="openActivityDetail"
        v-model="showWebgl"
        :activity-id="selectedActivityId"
        :educational-organization-id="itemsFilters.matrix.id"
        :subject-id="subject.id"
      />
    </b-modal>
    <ModalConfirm
      v-model="openWarningDifferentSubject"
      :callback-confirm="resumeSelectingSubject"
      :callback-cancel="cancelResumeSelectingSubject"
      label-cancel="Cancelar"
      label-confirm="Continuar e excluir turno"
      reverse
    >
      <h2>Tem certeza que deseja continuar?</h2>

      <p>
        <span class="font-bold">Atenção!</span> Os turnos devem ser compostos por atividades da
        mesma área do conhecimento.
        <span class="text-primary font-bold"
          >Ao trocar esse filtro, o conteúdo do seu turno atual será perdido.</span
        >
      </p>
    </ModalConfirm>
    <QuizDetail
      v-model="openQuizDetail"
      :descriptor-id="selectedQuiz.descriptorId"
      :topic-id="selectedQuiz.topicId"
    />
  </section>
</template>

<style lang="scss" scoped></style>