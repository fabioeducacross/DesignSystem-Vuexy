<template>
  <section>
    <b-row class="match-height">
      <b-col cols="12" lg="4">
        <b-skeleton-wrapper :loading="isLoading" class="h-100 pb-1">
          <template v-slot:loading>
            <div class="h-100">
              <b-row class="match-heigth h-100">
                <b-col cols="12">
                  <b-skeleton type="card" height="215px" class="w-100 rounded" />
                </b-col>
              </b-row>
            </div>
          </template>
          <DynamicMediaCard
            title="Alunos participantes"
            :title-color="dynamicCardStatusEnum.fontColor"
            :tooltip-text="'Iniciaram ao menos 1 prova'"
            :icon="dynamicCardStatusEnum.icon"
            variant="light-white"
            :bg-variant="dynamicCardStatusEnum.variant"
            right-align
            :icon-background="`${dynamicCardStatusEnum.backgroundColor}`"
            :value="dashboardData.students.totalStudents"
          >
            <template v-slot:description>
              <p class="h3 mt-2 mb-2" :class="dynamicCardStatusEnum.fontColor">
                <span class="font-extrabold">
                  {{ dashboardData.students.studentsStarted | formatNumber }}
                </span>
                de
                {{ dashboardData.students.totalStudents | formatNumber }}
                <span>participaram</span>
              </p>
              <span class="font-bold text-md h6" :class="dynamicCardStatusEnum.fontColor">
                {{
                  calcPercent(
                    dashboardData.students.studentsStarted,
                    dashboardData.students.totalStudents,
                  ) | formatPercentToPtBr
                }}
              </span>
            </template>
          </DynamicMediaCard>
        </b-skeleton-wrapper>
      </b-col>
      <b-col cols="12" lg="4">
        <b-skeleton-wrapper :loading="isLoading" class="h-100 pb-1">
          <template v-slot:loading>
            <div class="h-100">
              <b-row class="match-heigth h-100">
                <b-col cols="12">
                  <b-skeleton type="card" height="215px" class="w-100 rounded" />
                </b-col>
              </b-row>
            </div>
          </template>
          <b-card no-body>
            <b-row class="h-full">
              <b-col class="text-black">
                <div class="px-1 pt-1">
                  <h5 class="text-body">Participação por ano</h5>
                  <b-card-text class="text-body small">Alunos participantes</b-card-text>
                </div>

                <BarChartV2
                  :key="keyCounter"
                  :series="dashboardData.serieProgress.series"
                  :colors="dashboardData.serieProgress.colors"
                  :categories="dashboardData.serieProgress.categories"
                />
              </b-col>
            </b-row>
          </b-card>
        </b-skeleton-wrapper>
      </b-col>
      <b-col cols="12" lg="4">
        <b-skeleton-wrapper :loading="isLoading" class="h-100 pb-1">
          <template v-slot:loading>
            <div class="h-100">
              <b-row class="match-heigth h-100">
                <b-col cols="12">
                  <b-skeleton type="card" height="215px" class="w-100 rounded" />
                </b-col>
              </b-row>
            </div>
          </template>
          <b-card no-body>
            <b-row class="h-full">
              <b-col class="text-black">
                <div class="px-1 pt-1">
                  <h5 class="text-body">Rendimento por ano</h5>
                  <b-card-text class="text-body small">Questões acertadas</b-card-text>
                </div>
                <BarChartV2
                  :key="keyCounter"
                  :series="dashboardData.serieHit.series"
                  :colors="dashboardData.serieHit.colors"
                  :categories="dashboardData.serieHit.categories"
                />
              </b-col>
            </b-row>
          </b-card>
        </b-skeleton-wrapper>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import DynamicMediaCard from '@/components/card/DynamicMediaCard.vue'
import { getDynamicCardStatusEnum } from '@/consts/evaluationsEnum.js'
import { calcPercent } from '@/utils/number.js'
import BarChartV2 from '@/views/pages/admin-context/evaluations/components/BarChartV2.vue'
import { ref, toRefs, watch, computed } from 'vue'

// Props
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  dashboardData: {
    type: Object,
  },
})

const { dashboardData } = toRefs(props)

const dynamicCardStatusEnum = computed(() => {
  return getDynamicCardStatusEnum(
    calcPercent(
      dashboardData.value.students.studentsStarted,
      dashboardData.value.students.totalStudents,
    ),
  )
})

const keyCounter = ref(0)

watch(
  dashboardData,
  () => {
    keyCounter.value += 1
  },
  { deep: true },
)
</script>