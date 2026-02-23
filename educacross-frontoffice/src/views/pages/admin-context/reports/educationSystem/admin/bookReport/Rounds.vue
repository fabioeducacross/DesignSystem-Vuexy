<template>
  <section>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-card>
          <b-skeleton class="mb-0" height="150px" />
        </b-card>
      </template>
      <div v-if="rounds.length">
        <b-card v-for="round in rounds" :key="round.guideRoundId">
          <MissionAndQuestionItemByTopic
            v-if="exhibition"
            :item="round"
            :subject-id="subject.id"
            :loading-details="loadingDetails"
          >
            <template v-slot:left-content>
              <div
                class="d-flex flex-column flex-md-row align-items-center flex-grow-1 gap-8 ml-md-2 justify-content-center"
              >
                <div
                  class="ml-lg-auto progress-wrapper mt-1 d-flex flex-column gap-4 justify-content-center"
                >
                  <ProgressBarHorizontalV2
                    v-if="student && student.id"
                    :value="round.performanceStudent"
                    enum="accuracyPerformance"
                    reverse
                  >
                    <template v-slot="{ item }">
                      <div class="d-flex justify-content-between">
                        <span class="font-weight-bold">Rendimento do aluno</span>
                        <span
                          v-if="round.amountGuides"
                          class="font-bold"
                          :class="`${item.variant.textClass}`"
                          >{{ item.percent | formatNumber }}%</span
                        >
                        <span v-else>-</span>
                      </div>
                    </template>
                  </ProgressBarHorizontalV2>

                  <ProgressBarHorizontalV2
                    :value="round.performanceClass"
                    enum="accuracyPerformance"
                    reverse
                  >
                    <template v-slot="{ item }">
                      <div class="d-flex justify-content-between">
                        <span class="font-weight-bold">Rendimento médio da turma</span>
                        <span
                          v-if="round.amountGuides"
                          class="font-bold"
                          :class="`${item.variant.textClass}`"
                          >{{ item.percent | formatNumber }}%</span
                        >
                        <span v-else>-</span>
                      </div>
                    </template>
                  </ProgressBarHorizontalV2>

                  <ProgressBarHorizontalV2
                    :value="round.performanceInstitution"
                    enum="accuracyPerformance"
                    reverse
                  >
                    <template v-slot="{ item }">
                      <div class="d-flex justify-content-between">
                        <span class="font-weight-bold">Rendimento médio da escola</span>
                        <span
                          v-if="round.amountGuides"
                          class="font-bold"
                          :class="`${item.variant.textClass}`"
                          >{{ item.percent | formatNumber }}%</span
                        >
                        <span v-else>-</span>
                      </div>
                    </template>
                  </ProgressBarHorizontalV2>
                </div>
                <div>
                  <p class="d-flex align-items-center mb-50 gap-2 text-nowrap">
                    <span class="material-symbols-outlined text-primary"> mountain_flag </span
                    >{{ round.amountGuides }} missões
                  </p>
                  <p class="d-flex align-items-center mb-50 gap-2 text-nowrap">
                    <span class="material-symbols-outlined text-primary"> stadia_controller </span>
                    {{ round.amountActivities }} jogos
                  </p>
                  <p class="d-flex align-items-center mb-50 gap-2 text-nowrap">
                    <span class="material-symbols-outlined text-primary"> quiz </span>
                    {{ round.amountQuiz }} quizzes
                  </p>
                </div>
              </div>
            </template>
          </MissionAndQuestionItemByTopic>
          <MissionAndQuestionItemByAbility
            v-else
            :item="round"
            :subject-id="subject.id"
            :loading-details="loadingDetails"
          >
            <template v-slot:left-content>
              <div
                class="d-flex flex-column flex-md-row align-items-center flex-grow-1 gap-8 ml-md-2 justify-content-center"
              >
                <div
                  class="ml-lg-auto progress-wrapper mt-1 d-flex flex-column gap-4 justify-content-center"
                >
                  <ProgressBarHorizontalV2
                    v-if="student && student.id"
                    :value="round.performanceStudent"
                    enum="accuracyPerformance"
                    reverse
                  >
                    <template v-slot="{ item }">
                      <div class="d-flex justify-content-between">
                        <span class="font-weight-bold">Rendimento do aluno</span>
                        <span
                          v-if="round.amountGuides"
                          class="font-bold"
                          :class="`${item.variant.textClass}`"
                          >{{ item.percent | formatNumber }}%</span
                        >
                        <span v-else>-</span>
                      </div>
                    </template>
                  </ProgressBarHorizontalV2>

                  <ProgressBarHorizontalV2
                    :value="round.performanceClass"
                    enum="accuracyPerformance"
                    reverse
                  >
                    <template v-slot="{ item }">
                      <div class="d-flex justify-content-between">
                        <span class="font-weight-bold">Rendimento médio da turma</span>
                        <span
                          v-if="round.amountGuides"
                          class="font-bold"
                          :class="`${item.variant.textClass}`"
                          >{{ item.percent | formatNumber }}%</span
                        >
                        <span v-else>-</span>
                      </div>
                    </template>
                  </ProgressBarHorizontalV2>

                  <ProgressBarHorizontalV2
                    :value="round.performanceInstitution"
                    enum="accuracyPerformance"
                    reverse
                  >
                    <template v-slot="{ item }">
                      <div class="d-flex justify-content-between">
                        <span class="font-weight-bold">Rendimento médio da escola</span>
                        <span
                          v-if="round.amountGuides"
                          class="font-bold"
                          :class="`${item.variant.textClass}`"
                          >{{ item.percent | formatNumber }}%</span
                        >
                        <span v-else>-</span>
                      </div>
                    </template>
                  </ProgressBarHorizontalV2>
                </div>
                <div>
                  <p class="d-flex align-items-center mb-50 gap-2 text-nowrap">
                    <span class="material-symbols-outlined text-primary"> mountain_flag </span
                    >{{ round.amountGuides }} missões
                  </p>
                  <p class="d-flex align-items-center mb-50 gap-2 text-nowrap">
                    <span class="material-symbols-outlined text-primary"> stadia_controller </span>
                    {{ round.amountActivities }} jogos
                  </p>
                  <p class="d-flex align-items-center mb-50 gap-2 text-nowrap">
                    <span class="material-symbols-outlined text-primary"> quiz </span>
                    {{ round.amountQuiz }} quizzes
                  </p>
                </div>
              </div>
            </template>
          </MissionAndQuestionItemByAbility>
        </b-card>
      </div>

      <b-card v-else>
        <div class="d-flex flex-column align-items-center">
          <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
          <span class="text-center text-primary font-bold" v-html="$t('noInformationFound')"></span>
        </div>
      </b-card>
    </b-skeleton-wrapper>
    <b-card v-show="total">
      <ListTablePagination
        :value="currentPage"
        :total-data="total"
        :per-page="perPage.id"
        @input="changePage"
      />
    </b-card>
  </section>
</template>

<script setup>
import DescriptorTag from '@/components/descriptors/DescriptorTag.vue'
import MissionAndQuestionItem from '@/components/mission-plus/MissionAndQuestionItem.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import ListTablePagination from '@/components/table/ListTablePagination.vue'
import useFilters from '@/store/filters/useFilters'
import MissionAndQuestionItemByAbility from '@/views/pages/admin-context/reports/educationSystem/admin/bookReport/components/MissionAndQuestionItemByAbility.vue'
import MissionAndQuestionItemByTopic from '@/views/pages/admin-context/reports/educationSystem/admin/bookReport/components/MissionAndQuestionItemByTopic.vue'
import { useEducationSystemBookReport } from '@/views/pages/admin-context/reports/educationSystem/admin/bookReport/useEducationSystemBookReport.js'
import { ref } from 'vue'

const { rounds, loading, total, currentPage, perPage, exhibition, fetch, student } =
  useEducationSystemBookReport()
const { classe, subject } = useFilters()

const loadingDetails = ref(false)

const changePage = page => {
  currentPage.value = page
  fetch()
}
</script>

<style lang="scss" scoped>
  .progress-wrapper {
    width: 25rem;
    max-width: 100%;
  }
</style>