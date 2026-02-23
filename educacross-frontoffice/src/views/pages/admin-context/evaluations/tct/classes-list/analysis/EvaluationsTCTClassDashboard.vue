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
            :value="data.students.totalStudents"
          >
            <template v-slot:description>
              <p class="h3 mt-2 mb-2" :class="dynamicCardStatusEnum.fontColor">
                <span class="font-extrabold">
                  {{ data.students.studentsStarted | formatNumber }}
                </span>
                de
                {{ data.students.totalStudents | formatNumber }}
                <span>participaram</span>
              </p>
              <span class="font-bold text-md h6" :class="dynamicCardStatusEnum.fontColor">
                {{
                  calcPercent(data.students.studentsStarted, data.students.totalStudents)
                    | formatPercentToPtBr
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
              <b-col>
                <div class="px-1 pt-1">
                  <h5 class="text-body">Participação da escola</h5>
                  <b-card-text class="text-body">Alunos participantes</b-card-text>
                </div>
                <BarChartV2
                  :key="keyCounter"
                  :series="data.serieProgress.series"
                  :categories="data.serieProgress.categories"
                  :colors="data.serieProgress.colors"
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
              <b-col>
                <div class="px-1 pt-1">
                  <h5 class="text-body">Rendimento da escola</h5>
                  <b-card-text class="text-body">Questões acertadas</b-card-text>
                </div>
                <BarChartV2
                  :key="keyCounter"
                  :series="data.serieHit.series"
                  :categories="data.serieHit.categories"
                  :colors="data.serieHit.colors"
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
  import BarChartV2 from '../../../components/BarChartV2.vue'
  import DynamicMediaCard from '@/components/card/DynamicMediaCard.vue'
  import { getDynamicCardStatusEnum } from '@/consts/evaluationsEnum.js'
  import { calcPercent } from '@/utils/number.js'
  import { ref, toRefs, watch, computed } from 'vue'

  // Props
  const props = defineProps({
    isLoading: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: false,
    },
  })

  const keyCounter = ref(0)
  const { data } = toRefs(props)

  const dynamicCardStatusEnum = computed(() => {
    return getDynamicCardStatusEnum(
      calcPercent(props.data.students.studentsStarted, props.data.students.totalStudents)
    )
  })

  watch([data], () => {
    keyCounter.value += 1
  })

  // Filters needed for formatting
  // They are probably globally registered in main.js, but may require local registration if needed.
  // No import, as per migration rules.
</script>