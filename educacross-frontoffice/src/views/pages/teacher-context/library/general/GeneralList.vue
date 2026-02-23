<template>
  <b-skeleton-wrapper :loading="loading">
    <template v-slot:loading>
      <template v-for="i in 3">
        <b-skeleton-img :key="`img-${i}`" no-aspect height="52px" class="mb-2" />
        <b-row :key="`row-${i}`">
          <b-col v-for="j in 4" :key="j" cols="12" md="3">
            <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
          </b-col>
        </b-row>
      </template>
    </template>
    <div>
      <b-row v-if="listData.length" class="match-height">
        <b-col v-for="(proficiencyData, index) in listData" :key="index" cols="12">
          <b-card no-body>
            <div class="d-flex p-1 text-primary font-bold gap-2 align-items-center">
              <span class="material-symbols-outlined">{{ proficiencyData.icon }}</span>
              {{ proficiencyData.title }}
            </div>
          </b-card>

          <b-row>
            <b-col
              v-for="proficiency in proficiencyData.data"
              :key="proficiency.proficiency"
              cols="12"
              md="3"
            >
              <b-card>
                <div class="text-center mb-1">
                  <span
                    :class="proficiency.students && isTeacher ? 'cursor-pointer' : ''"
                    @click="openModal(proficiency)"
                  >
                    <MediaCardIcon
                      :icon="getReadingProficiencyEnum(proficiency.proficiency).icon"
                      :variant="getReadingProficiencyEnum(proficiency.proficiency).variant"
                  /></span>
                </div>
                <div class="font-bold text-center mb-1">
                  {{ getReadingProficiencyEnum(proficiency.proficiency).text }}
                </div>
                <ProgressBarHorizontalV2
                  show-values
                  height="6px"
                  :value="proficiency.students"
                  :max="data.totalStudents"
                  :variant-object="getReadingProficiencyEnum(proficiency.proficiency)"
                >
                  <template v-slot="{ item }">
                    <div class="d-flex">
                      <span :class="item.variant.textClass" class="font-bold mr-1"
                        >{{ item.percent | formatNumber }}%</span
                      >

                      <span class="ml-auto"
                        ><span class="font-bold">{{ item.value | formatNumber }}</span> de
                        {{ item.max | formatNumber }} alunos</span
                      >
                    </div>
                  </template>
                </ProgressBarHorizontalV2>
              </b-card>
            </b-col>
          </b-row>
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

      <Modaldetails v-if="detailsIsOpen" v-model="detailsIsOpen" :data="details" />
    </div>
  </b-skeleton-wrapper>
</template>

<script setup>
import Modaldetails from './ModalDetails.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import MediaCardIcon from '@/components/card/MediaCardIcon.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getReadingProficiencyEnum } from '@/consts/ReadingMeterEnum.js'
import store from '@/store'
import { computed, ref } from 'vue'

const isTeacher = store.getters.accessRole === 'Teacher'

const data = computed(() => store.getters['moduleReadingFluencyOverview/data'])
const loading = computed(() => store.getters['moduleReadingFluencyOverview/loading'])
const proficiencies = [1, 2, 3, 4]

const listData = computed(() => {
  if (loading.value || !data.value) {
    return []
  }
  const readingFluencyProficiency = proficiencies.reduce((acc, proficiency) => {
    if (!acc.some(item => item.proficiency === proficiency)) {
      acc.push({
        proficiency,
        students: 0,
        percentage: 0,
      })
    }
    return acc
  }, data.value.readingFluencyProficiency)

  const readingChallengesProficiency = proficiencies.reduce((acc, proficiency) => {
    if (!acc.some(item => item.proficiency === proficiency)) {
      acc.push({
        proficiency,
        students: 0,
        percentage: 0,
      })
    }
    return acc
  }, data.value.readingChallengesProficiency)

  const writingChallengesProficiency = proficiencies.reduce((acc, proficiency) => {
    if (!acc.some(item => item.proficiency === proficiency)) {
      acc.push({
        proficiency,
        students: 0,
        percentage: 0,
      })
    }
    return acc
  }, data.value.writingChallengesProficiency)

  return [
    {
      icon: 'dictionary',
      title: 'Proficiência nos testes de leitura',
      data: readingFluencyProficiency.sort((a, b) => a.proficiency - b.proficiency),
    },
    {
      icon: 'mic',
      title: 'Proficiência nos desafios de leitura',
      data: readingChallengesProficiency.sort((a, b) => a.proficiency - b.proficiency),
    },
    {
      icon: 'draw',
      title: 'Proficiência nos desafios de escrita',
      data: writingChallengesProficiency.sort((a, b) => a.proficiency - b.proficiency),
    },
  ]
})

const openModal = proficiency => {
  if (proficiency.students && isTeacher) {
    openModalDetail(proficiency.studentsModal)
  }
}

const details = ref({})
const detailsIsOpen = ref(false)

const openModalDetail = dataDetail => {
  details.value = dataDetail
  detailsIsOpen.value = true
}
</script>

<style lang="scss" scoped></style>