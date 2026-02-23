<template>
  <b-row align-v="center" class="p-1">
    <b-col>
      <span class="text-primary cursor-pointer d-flex align-items-center" @click="back">
        <span class="material-symbols-outlined" style="font-size: 14px"> arrow_back_ios </span>
        <span class="underline">Voltar</span>
      </span>
    </b-col>
    <b-col>
      <b-skeleton-wrapper :loading="loading">
        <template v-slot:loading>
          <b-skeleton width="100%"></b-skeleton>
        </template>
        <div class="d-flex justify-content-center">
          <audio
            :src="details.report.audioFileUrl"
            controls
            preload="metadata"
            style="height: 30px"
          ></audio>
        </div>
      </b-skeleton-wrapper>
    </b-col>
    <b-col>
      <b-skeleton-wrapper :loading="loading">
        <template v-slot:loading>
          <div class="d-flex flex-column align-items-end">
            <b-skeleton width="200px"></b-skeleton>
            <b-skeleton width="180px"></b-skeleton>
          </div>
        </template>
        <div class="d-flex flex-column align-items-end gap-1">
          <div>Último acesso em: {{ details.report.readingDate | formatDate }}</div>
          <div>
            <div
              :class="`text-${proficiency.variant} `"
              class="small font-weight-bolder d-flex align-items-center gap-1"
            >
              <span
                :class="{ 'cursor-pointer': details.report.changeProficiency }"
                @click="changeProficiency"
              >
                <BadgeStatusReadingExpedition
                  v-if="details.report.proficiency"
                  :pill="!details.report.changeProficiency"
                  :value="details.report.proficiency"
                  enum="ProficiencyTestStatusEnum"
                />
              </span>
            </div>
          </div>
        </div>
      </b-skeleton-wrapper>
    </b-col>
  </b-row>
</template>

<script setup>
import {
  EExpeditionStageStatus,
  getProficiencyTestStatusEnum,
} from '@/consts/ReadingExpeditionEnum.js'
import router from '@/router'
import store from '@/store'
import CustomBadge from '@/views/pages/reading-expedition/components/CustomBadge.vue'
import BadgeStatusReadingExpedition from '@/views/pages/reading-expedition/overview/components/BadgeStatusReadingExpedition.vue'
import { computed, getCurrentInstance, ref, watch } from 'vue'

// Filters (assumed registered globally elsewhere)
const vm = getCurrentInstance().proxy

const loading = computed(() => store.getters['readingExpeditionFluencyTestModule/loading'])

const details = computed(
  () => store.getters['readingExpeditionFluencyTestModule/readingDetail'],
)

const proficiency = ref({})

watch(details, () => {
  vm.$bus.emit('setBreadcrumb', ['', details.value.name, details.value.studentName])
  proficiency.value =
    getProficiencyTestStatusEnum(details.value.report?.proficiency || '') || {}
})

const testId = computed(() => store.getters['ReadingExpeditionModule/testId'])

const back = () => {
  router
    .push({
      name: 'readingExpeditionFluencyTest',
      params: { testId: testId.value },
    })
    .catch(() => {})
}

const changeProficiency = () => {
  if (!details.value.report?.changeProficiency) return
  vm.$bus.emit(
    'changeProficiency',
    {
      status: EExpeditionStageStatus.Finished,
      level: proficiency.value.id,
      changeLevel: details.value.report?.changeProficiency,
    },
    {
      status: EExpeditionStageStatus.Finished,
      level: details.value.report?.changeProficiency,
      changeLevel: null,
    },
  )
}
</script>

<style lang="scss" scoped>
  audio {
    height: 30px;
  }
</style>