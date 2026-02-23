<template>
  <b-skeleton-wrapper :loading="cardsLoading" class="w-100 px-1 mb-1">
    <template v-slot:loading>
      <div class="h-100">
        <b-row class="match-height h-50">
          <b-col>
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
          <b-col>
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
          <b-col>
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
        </b-row>
      </div>
    </template>

    <b-row class="match-height">
      <b-col cols="12" lg="4" sm="12">
        <MediaCard
          :title="isTeacher ? 'Participação por Turma' : 'Participação'"
          title-color="text-body"
          variant="light-primary"
        >
          <template v-slot:description>
            <p class="text-body">
              <span class="text-body font-extrabold">
                {{ cards.students | formatNumber }}
              </span>
              <span class="text-body"> alunos </span>
            </p>
            <h6
              :class="`${
                getVariantByRule(
                  calcPercent(cards.studentsStarted, cards.students),
                  'participation',
                ).textClass || ''
              }
                  font-bold`"
            >
              {{ calcPercent(cards.studentsStarted, cards.students) | formatNumber }}%
            </h6>
          </template>
        </MediaCard>
      </b-col>
      <b-col cols="12" lg="4" sm="12">
        <MediaCard
          title="Tempo Médio"
          title-color="text-body"
          icon="timelapse"
          variant="light-primary"
          right-align
        >
          <template v-slot:description>
            <h6 class="text-primary font-bold">
              {{ cards.time | formattedTime }}
            </h6>
          </template>
        </MediaCard>
      </b-col>

      <b-col cols="12" lg="4" sm="12">
        <MediaCard
          title="Rendimento Médio"
          title-color="text-body"
          icon="timeline"
          variant="light-primary"
          right-align
        >
          <template v-slot:description>
            <h6
              :class="`${
                getVariantByRule(cards.perfomance, 'eventLearningPerformance').textClass || ''
              }
                  font-bold`"
            >
              {{ cards.perfomance | formatNumber }}%
            </h6>
          </template>
        </MediaCard>
      </b-col>
    </b-row>
  </b-skeleton-wrapper>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import ProgressBarHorizontal from '@/components/progessBar/ProgressBarHorizontal.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import { getColors } from '@/consts/rangeColors'
import store from '@/store'
import { calcPercent } from '@/utils/number.js'
import { useEvents } from '@/views/events/useEvents.js'
import { computed, onMounted, watch } from 'vue'

// filters may be globally registered; if needed, import them here according to project conventions

const { classId, serieId } = useEvents()
const role = store.getters.accessRole

const isCoordinator = role === 'Coordinator'
const isTeacher = role === 'Teacher'

onMounted(() => {
  if (isTeacher || serieId.value || isCoordinator) {
    store.dispatch('individualReportStudents/fetchDashboard')
  }
})

const cardsLoading = computed(() => store.getters['individualReportStudents/cardsLoading'])
const cards = computed(() => store.getters['individualReportStudents/cards'])

watch([classId, serieId], () => {
  store.dispatch('individualReportStudents/fetchDashboard')
})
</script>