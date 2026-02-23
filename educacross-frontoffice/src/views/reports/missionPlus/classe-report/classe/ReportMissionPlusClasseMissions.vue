<template>
  <div>
    <h2 class="text-primary mt-50">Turnos da missão</h2>
    <b-card v-show="!loading && rounds.length === 0">
      <div class="d-flex flex-column align-items-center">
        <b-img class="mb-1" src="@/assets/images/belinha/confusion.svg" />
        <span class="text-center">Nenhum Jogo foi encontrado</span>
      </div>
    </b-card>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-card v-for="i in 10" :key="i">
          <b-skeleton class="mb-0" height="100px" />
        </b-card>
      </template>
      <b-card v-for="round in rounds" :key="round.activityId">
        <b-row align-h="between">
          <b-col cols="12" md="8">
            <b-media>
              <template v-slot:aside>
                <b-img
                  :src="round.imageUrl"
                  alt="Imagem do jogo"
                  fluid
                  height="100px"
                  width="100px"
                />
              </template>

              <b-media-body>
                <h4 class="text-primary">{{ round.topicName }}</h4>
                <b-card-text>
                  <p class="mb-0">
                    Objeto do conhecimento:
                    <span class="text-primary font-semibold">{{
                      round.objectOfKnowledgeName
                    }}</span>
                  </p>
                  <p class="mb-0">
                    Temática:
                    <span class="text-primary font-semibold">{{ round.thematicName }}</span>
                  </p>
                  <div class="d-flex gap-1">
                    <DescriptorTag
                      v-for="descriptor in limitDescriptorsNumber(round.descriptors)"
                      :key="descriptor.id"
                      :descriptor="descriptor"
                      :subject-id="title.subjectId"
                    />
                    <b-badge
                      v-if="excessDescriptors(round.descriptors).length"
                      :id="round.id"
                      pill
                      :variant="getSubjectVariant(title.subjectId)"
                      class="cursor-help"
                    >
                      +{{ $filters.formatNumber(excessDescriptors(round.descriptors).length) }}
                    </b-badge>
                    <b-popover
                      v-if="excessDescriptors(round.descriptors).length"
                      :target="round.id"
                      triggers="hover"
                      variant="white"
                    >
                      <div class="d-flex flex-col gap-2">
                        <DescriptorTag
                          v-for="descriptor in excessDescriptors(round.descriptors)"
                          :key="descriptor.id"
                          :descriptor="descriptor"
                          :subject-id="title.subjectId"
                          :placement="null"
                        />
                      </div>
                    </b-popover>
                  </div>
                </b-card-text>
              </b-media-body>
            </b-media>
          </b-col>
          <b-col cols="12" md="4">
            <div class="d-flex flex-column gap-4">
              <ProgressBarHorizontalV2
                :get-variant="getColorsProgressEnum"
                :value="round.progress"
                height="6px"
                reverse
              >
                <template v-slot="{ item }"
                  >
                  <div class="d-flex justify-content-between gap-1 leading-none">
                    <span class="font-weight-bolder small">Progresso médio da turma</span>
                    <span :class="item.variant.textClass" class="font-bold"
                      >{{ $filters.formatNumber(item.percent) }}%</span
                    >
                  </div>
                </template>
              </ProgressBarHorizontalV2>
              <ProgressBarHorizontalV2
                :get-variant="getColorsPerformanceEnum"
                :value="round.performance"
                height="6px"
                reverse
              >
                <template v-slot="{ item }"
                  >
                  <div class="d-flex justify-content-between gap-1 leading-none">
                    <span class="font-weight-bolder small">Rendimento médio da turma</span>
                    <span :class="item.variant.textClass" class="font-bold"
                      >{{ $filters.formatNumber(item.percent) }}%</span
                    >
                  </div>
                </template>
              </ProgressBarHorizontalV2>

              <div class="d-flex justify-content-between gap-1">
                <span class="font-weight-bolder small">Tempo médio da turma</span>
                <span class="font-bold text-primary">{{ round.time | formattedTime }}</span>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </b-skeleton-wrapper>
  </div>
</template>

<script setup>
import DescriptorTag from '@/components/descriptors/DescriptorTag.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import { getSubjectVariant } from '@/utils/utils'
import { useMissionPlusReportClasse } from '@/views/reports/missionPlus/classe-report/classe/useMissionPlusReportClasse'

const { loading, rounds, title } = useMissionPlusReportClasse()
const descriptorsLimit = 5

const getColorsProgressEnum = value => {
  return getVariantByRule(value, 'progress')
}

const getColorsPerformanceEnum = value => {
  return getVariantByRule(value, 'accuracyPerformance')
}

const limitDescriptorsNumber = descriptors => {
  if (descriptors.length > descriptorsLimit) {
    return [...descriptors.slice(0, descriptorsLimit)]
  }
  return descriptors
}

const excessDescriptors = descriptors => {
  if (descriptors.length < descriptorsLimit) return []
  return descriptors.slice(descriptorsLimit)
}
</script>

<style lang="scss" scoped></style>