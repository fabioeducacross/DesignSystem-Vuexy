<template>
  <b-skeleton-wrapper :loading="loading" class="h-100 pb-1">
    <template v-slot:loading>
      <div class="h-100">
        <b-row class="match-heigth h-100">
          <b-col v-for="index in 6" :key="index" cols="12" md="6" lg="4">
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-50" />
          </b-col>
        </b-row>
      </div>
    </template>
    <b-row class="match-height">
      <b-col v-for="(item, index) in data" :key="index" cols="12" md="6" lg="4">
        <MediaCard
          :title="item.name"
          :icon="stageIcons[item.stage || item.type]"
          variant="light-primary"
          right-align
          :loading="loading"
        >
          <template v-slot:description>
            <ProgressBarHorizontalV2
              :value="item.students"
              :max="item.totalStudents"
              :show-values="true"
              :get-variant="getExpeditionStudentProgress"
            >
              <template v-slot="{ item }">
                <span class="d-flex font-14 text-body">
                  <span
                    :class="`${getExpeditionStudentProgress(item.percent).textClass}`"
                    class="font-bold mr-1"
                    >{{ $filters.formatNumber(item.percent) }}%</span
                  >
                  <span class="ml-auto"
                    ><span class="font-bold">{{ $filters.formatNumber(item.value) }}</span> de
                    {{ $filters.formatNumber(item.max) }} alunos</span
                  >
                </span>
              </template>
            </ProgressBarHorizontalV2>
          </template>
        </MediaCard>
      </b-col>
    </b-row>
  </b-skeleton-wrapper>
</template>

<script setup>
  import MediaCard from '@/components/card/MediaCard.vue'
  import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
  import { getExpeditionStudentProgress, stageIcons } from '@/consts/ReadingExpeditionEnum.js'
  import store from '@/store'
  import { computed } from 'vue'

  const loading = computed(
    () => store.getters['readingExpeditionModuleOverviewStudentDetails/loadingDashboard'],
  )
  const data = computed(
    () => store.getters['readingExpeditionModuleOverviewStudentDetails/dashboard'],
  )
</script>