<template>
  <b-row>
    <b-col cols="12" md="12">
      <OverviewFilter />
    </b-col>
    <b-col cols="12" md="12">
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
        <div v-if="data.length">
          <app-collapse
            v-for="(proficiencyData, index) in data"
            :key="index"
            accordion
            type="margin"
          >
            <app-collapse-item
              card-class="bg-transparent shadow-none"
              card-header-class="bg-white p-1"
              body-class="p-0"
              is-visible
            >
              <template v-slot:header>
                <div class="d-flex align-items-center gap-2">
                  <div class="d-flex text-primary font-bold gap-2 align-items-center">
                    <span class="material-symbols-outlined">{{ proficiencyData.icon }}</span>
                    {{ proficiencyData.name }}
                  </div>
                  <div
                    v-if="proficiencyData.type === 3"
                    class="d-flex align-items-center gap-1 small"
                  >
                    <span class="material-symbols-outlined head-icon-info" style="font-size: 16px">
                      info </span
                    >Este desafio é avaliado manualmente pelo professor.
                  </div>
                </div>
              </template>
              <div class="">
                <b-row class="match-height">
                  <b-col v-for="stage in proficiencyData.stages" :key="stage.status" cols="12">
                    <b-alert show variant="primary" class="mb-0 mt-1">
                      <div class="alert-body">
                        <span class="font-bold"
                          >Total de {{ proficiencyData.name }} realizados e não avaliados:</span
                        >
                        {{ stage.students }}
                      </div>
                    </b-alert>
                  </b-col>
                  <b-col
                    v-for="proficiency in proficiencyData.levels"
                    :key="proficiency.level"
                    cols="12"
                    md
                  >
                    <b-card body-class="p-1" @click="openModal(proficiencyData, proficiency)">
                      <div class="text-center mb-1">
                        <span>
                          <MediaCardIcon
                            :icon="getReadingProficiencyEnum(proficiency.level).icon"
                            :variant="getReadingProficiencyEnum(proficiency.level).variant"
                        /></span>
                      </div>
                      <div class="font-bold text-center mb-1">
                        {{ getReadingProficiencyEnum(proficiency.level).text }}
                      </div>
                      <div class="text-center">
                        <span
                          :class="`text-${getReadingProficiencyEnum(proficiency.level).variant}`"
                          class="font-bold"
                          >{{
                            $filters.formatNumber(
                              calcPercent(proficiency.students, proficiencyData.totalStudents),
                            )
                          }}%</span
                        >
                      </div>
                      <ProgressBarHorizontalV2
                        show-values
                        height="6px"
                        :value="proficiency.students"
                        :max="proficiencyData.totalStudents"
                        :variant-object="getReadingProficiencyEnum(proficiency.level)"
                      >
                        <template v-slot="{ item }"
                          >
                          <div class="d-flex justify-content-center">
                            <span class=""
                              ><span class="font-bold">{{
                                $filters.formatNumber(item.value)
                              }}</span>
                              de {{ $filters.formatNumber(item.max) }} alunos</span
                            >
                          </div>
                        </template>
                      </ProgressBarHorizontalV2>
                    </b-card>
                  </b-col>
                </b-row>
              </div>
            </app-collapse-item>
          </app-collapse>
        </div>
        <b-card v-else>
          <div class="d-flex flex-column align-items-center">
            <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
            <span
              class="text-center text-primary font-bold"
              v-html="$t('noInformationFound')"
            ></span>
          </div>
        </b-card>
      </b-skeleton-wrapper>
      <Modaldetails
        v-if="detailsIsOpen"
        v-model="detailsIsOpen"
        :proficiency-data="detailsProficiencyData"
      />
    </b-col>
    <b-col cols="12" md="12">
      <div class="d-flex justify-content-end mt-1">
        <SidebarInfo />
      </div>
    </b-col>
  </b-row>
</template>

<script setup>
import Modaldetails from './ModalDetails.vue'
import AppCollapse from '@/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@/components/app-collapse/AppCollapseItem.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import MediaCardIcon from '@/components/card/MediaCardIcon.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getReadingProficiencyEnum, stageIcons } from '@/consts/ReadingExpeditionEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import ability from '@/libs/acl/ability'
import store from '@/store'
import readingExpeditionModuleOverviewAdmin from '@/store/pageModules/readingExpedition/readingExpeditionModuleOverviewAdmin.js'
import { calcPercent } from '@/utils/number.js'
import SidebarInfo from '@/views/pages/reading-expedition/components/SidebarInfo.vue'
import OverviewFilter from '@/views/pages/reading-expedition/overview/admin-overview/AdminOverviewFilter.vue'
import { computed, onUnmounted, ref } from 'vue'

const moduleName = 'readingExpeditionModuleOverviewAdmin'
store.registerModule(moduleName, readingExpeditionModuleOverviewAdmin)

onUnmounted(() => {
  store.unregisterModule(moduleName)
})

const data = computed(() => {
  const listData = store.getters['readingExpeditionModuleOverviewAdmin/data']

  if (!listData.length) return []

  return listData.map(item => {
    return {
      ...item,
      levels: item.levels.filter(level => level.level !== undefined),
      stages: item.levels.filter(level => level.status !== undefined),
      icon: stageIcons[item.type],
    }
  })
})

const loading = computed(() => store.getters['readingExpeditionModuleOverviewAdmin/loading'])

const detailsProficiencyData = ref({})
const detailsIsOpen = ref(false)

const openModal = (proficiencyData, proficiency) => {
  if (ability.can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) return
  store.dispatch('readingExpeditionModuleOverviewAdmin/fetchOverviewStudents', {
    stage: proficiencyData.stage,
    type: proficiencyData.type,
    level: proficiency.level,
  })

  detailsProficiencyData.value = { ...proficiencyData, ...proficiency }

  detailsIsOpen.value = true
}
</script>

<style lang="scss" scoped></style>