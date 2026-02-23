<template>
  <b-skeleton-wrapper :loading="cardLoading" class="w-100 px-1 mb-1">
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
          title="Total de Professores"
          title-color="text-body"
          icon="person"
          variant="light-primary"
          tooltip-text="Total de Professores da Escola"
        >
          <template v-slot:description>
            <p class="text-body">
              <span class="text-body font-extrabold">
                {{ $filters.formatNumber(dataTeacherAccess.teachers) }}
              </span>
              {{ $tc('Teacher', dataTeacherAccess.teachers) }}
            </p>
          </template>
        </MediaCard>
      </b-col>
      <b-col cols="12" lg="4" sm="12">
        <MediaCard
          title="Percentual de Acessos Professores"
          title-color="text-body"
          icon="timeline"
          variant="light-primary"
          tooltip-text="Média de acessos de todos os Professores da Escola à plataforma do Professor."
        >
          <template v-slot:description>
            <p class="text-body">
              <span class="text-body font-extrabold">
                {{ $filters.formatNumber(dataTeacherAccess.teacherAccessPercentage) }}%
              </span>
            </p>
          </template>
        </MediaCard>
      </b-col>

      <b-col cols="12" lg="4" sm="12">
        <MediaCard
          title="Missões Iniciadas"
          title-color="text-body"
          icon="send"
          variant="light-primary"
          tooltip-text="Total de missões disponibilizadas para os Alunos pelo Professor."
        >
          <template v-slot:description>
            <p class="text-body">
              <span class="text-body font-extrabold">
                {{ $filters.formatNumber(dataTeacherAccess.guidesEnabled) }}
              </span>
            </p>
          </template>
        </MediaCard>
      </b-col>
    </b-row>
  </b-skeleton-wrapper>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import { formatNumber } from '@/filters/filters'
import store from '@/store'
import { computed } from 'vue'

const dataTeacherAccess = computed(
  () => store.getters['moduleTeacherAccessTabTeacher/dataTeacherAccess'],
)

const cardLoading = computed(() => store.getters['moduleTeacherAccessTabTeacher/cardLoading'])
</script>