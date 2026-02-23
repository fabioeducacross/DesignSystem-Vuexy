<template>
  <section>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-row>
          <b-col v-for="j in 5" :key="j" cols="12" md>
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
        </b-row>
      </template>
      <div>
        <b-row v-if="listData.length" class="match-height">
          <b-col v-for="proficiency in listData" :key="proficiency.proficiency" cols="12" md>
            <b-card
              :border-variant="proficiency.isGreater ? proficiency.variant.variant : ''"
              :class="`${
                proficiency.isGreater ? `card-focus shadow-${proficiency.variant.variant}` : ''
              } ${isNetworkManager ? '' : 'cursor-pointer'}`"
              class="position-relative"
              @click="openProficiencyDetails(proficiency.proficiency)"
            >
              <span
                v-if="proficiency.isGreater"
                v-b-tooltip.hover.top="
                  'O maior percentual de alunos se encontra nesta faixa de proficiência. '
                "
                class="material-symbols-outlined position-absolute is-greater-icon cursor-pointer"
                :class="`text-${proficiency.variant.variant}`"
                >info</span
              >

              <div class="text-center mb-1">
                <span>
                  <MediaCardIcon
                    :icon="proficiency.variant.icon"
                    :variant="proficiency.variant.variant"
                  />
                </span>
              </div>
              <div class="font-bold text-center mb-1">
                {{ proficiency.variant.label }}
              </div>

              <ProgressBarHorizontalV2
                show-values
                height="6px"
                :value="proficiency.students"
                :max="data.totalStudents"
                :variant-object="proficiency.variant"
                reverse
              >
                <template v-slot="{ item }">
                  <div class="d-flex justify-content-center">
                    <span :class="item.variant.textClass" class="font-bold mr-1"
                      >{{ $filters.formatNumber(item.percent) }}%</span
                    >
                  </div>
                </template>
              </ProgressBarHorizontalV2>
              <div class="d-flex justify-content-center mt-50">
                <span class="">
                  <span class="font-bold">{{ $filters.formatNumber(proficiency.students) }}</span>
                  de {{ $filters.formatNumber(data.totalStudents) }} alunos</span
                >
              </div>
            </b-card>
          </b-col>
        </b-row>
        <b-row v-else>
          <b-col class="text-center mb-2">
            <div class="d-flex flex-column align-items-center">
              <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
              <span
                class="text-center text-primary font-bold"
                v-html="$t('noInformationFound')"
              ></span>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-skeleton-wrapper>
    <ReadingFluencyClassesProficiencyDetails
      v-model="openProficiency"
      :proficiency="selectedProficiency"
    />
  </section>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import MediaCardIcon from '@/components/card/MediaCardIcon.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import store from '@/store'
import ReadingFluencyClassesProficiencyDetails from '@/views/pages/test-fluency/reading-fluency/classes/ReadingFluencyClassesProficiencyDetails.vue'
import { computed, ref } from 'vue'

const isNetworkManager = store.getters.accessRole === 'NetworkManager'

const data = computed(() => store.getters['moduleReadingFluencyClasses/cards'])
const loading = computed(() => store.getters['moduleReadingFluencyClasses/loadingCards'])

const proficiencies = [0, 1, 2, 3, 4]

const listData = computed(() => {
  if (loading.value || !data.value) {
    return []
  }
  const readingProficiency = proficiencies.reduce((acc, proficiency) => {
    if (!acc.some(item => item.proficiency === proficiency)) {
      acc.push({
        proficiency,
        students: 0,
        percentage: 0,
        isGreater: false,
      })
    }
    return acc
  }, data.value.proficiencies || [])

  const maxPercentage = Math.max(...readingProficiency.map(item => item.percentage))
  const countMax = readingProficiency.filter(item => item.percentage === maxPercentage).length

  return readingProficiency
    .sort((a, b) => a.proficiency - b.proficiency)
    .map(item => {
      return {
        ...item,
        variant: getVariantByRule(item.proficiency, 'proficiencyWithNotCompleted'),
        isGreater: item.percentage === maxPercentage && countMax === 1,
      }
    })
})

const openProficiency = ref(false)
const selectedProficiency = ref(null)

const openProficiencyDetails = proficiency => {
  if (!isNetworkManager) {
    selectedProficiency.value = proficiency
    openProficiency.value = true
  }
}
</script>

<style lang="scss" scoped>
.card-focus {
  border-width: 1px !important;
  border-style: solid !important;
}
.is-greater-icon {
  top: 7px;
  right: 7px;
  font-size: 16px;
}
</style>