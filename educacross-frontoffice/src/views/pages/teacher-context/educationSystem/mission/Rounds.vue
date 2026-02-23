<template>
  <section>
    <h2 class="text-primary my-1">Desempenho por jogo</h2>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-card>
          <b-skeleton class="mb-0" height="150px" />
        </b-card>
      </template>
      <div v-if="rounds.length">
        <MissionAndQuestionItem
          v-for="round in rounds"
          :key="round.id"
          :item="round"
          :subject-id="subject.id"
          :show-view-details="!student.id || !!round.timeStudent"
          @open:details="openDetails(round)"
        >
          <template v-slot:left-content>
            <div class="d-flex flex-column gap-4 justify-content-center" style="min-width: 350px">
              <ProgressBarHorizontalV2
                v-if="student.id"
                :value="round.performanceStudent"
                enum="accuracyPerformance"
                height="6px"
                reverse
              >
                <template v-slot="{ item }">
                  <div class="d-flex justify-content-between gap-1 leading-none">
                    <span class="font-weight-bolder small">Rendimento do aluno</span>
                    <span :class="item.variant.textClass" class="font-bold"
                      >{{ item.percent | formatNumber }}%</span
                    >
                  </div>
                </template>
              </ProgressBarHorizontalV2>

              <ProgressBarHorizontalV2
                :value="round.performanceClass"
                enum="accuracyPerformance"
                height="6px"
                reverse
              >
                <template v-slot="{ item }">
                  <div class="d-flex justify-content-between gap-1 leading-none">
                    <span class="font-weight-bolder small">Rendimento médio da turma</span>
                    <span :class="item.variant.textClass" class="font-bold"
                      >{{ item.percent | formatNumber }}%</span
                    >
                  </div>
                </template>
              </ProgressBarHorizontalV2>

              <div v-if="student.id" class="d-flex justify-content-between">
                <span class="font-weight-bolder small">Tempo do aluno</span>
                <span class="text-primary font-bold">{{ round.timeStudent | formattedTime }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="font-weight-bolder small">Tempo médio da turma</span>
                <span class="text-primary font-bold">{{ round.timeClass | formattedTime }}</span>
              </div>
            </div>
          </template>
        </MissionAndQuestionItem>
      </div>

      <b-card v-else>
        <div class="d-flex flex-column align-items-center">
          <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
          <span class="text-center text-primary font-bold" v-html="$t('noInformationFound')"></span>
        </div>
      </b-card>
    </b-skeleton-wrapper>

    <ModalStudentActivityDetails
      v-model="detailsIsOpen"
      :guide-id="mission.id"
      :activity="selectedActivity"
      :student-id="student.id"
      :student-name="student.name"
    />
  </section>
</template>

<script setup>
import DescriptorTag from '@/components/descriptors/DescriptorTag.vue'
import MissionAndQuestionItem from '@/components/mission-plus/MissionAndQuestionItem.vue'
import ModalStudentActivityDetails from '@/components/mission-plus/ModalStudentActivityDetails.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import ListTablePagination from '@/components/table/ListTablePagination.vue'
import useFilters from '@/store/filters/useFilters'
import { useEducationSystemMission } from '@/views/pages/teacher-context/educationSystem/mission/useEducationSystemMission.js'
import { ref } from 'vue'

const { rounds, loading, student } = useEducationSystemMission()
const { subject, mission } = useFilters()

const loadingDetails = ref(false)
const detailsIsOpen = ref(false)
const selectedActivity = ref(null)

const openDetails = item => {
  selectedActivity.value = item
  detailsIsOpen.value = true
}
</script>

<style lang="scss" scoped>
  .progress-wrapper {
    width: 375px;
    max-width: 100%;
  }
</style>