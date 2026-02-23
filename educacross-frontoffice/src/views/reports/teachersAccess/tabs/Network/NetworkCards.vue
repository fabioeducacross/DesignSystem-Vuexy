<template>
  <b-skeleton-wrapper :loading="loading" class="w-100 px-1 mb-1">
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
          title="Total de Escolas"
          title-color="text-body"
          icon="school"
          variant="light-primary"
          tooltip-text="Total de Escolas da rede"
        >
          <template v-slot:description>
            <p class="text-body">
              <span class="text-body font-extrabold">
                {{ dataTeacherAccess.amountInstitutions | formatNumber }}
              </span>
              {{ $tc('School', dataTeacherAccess.amountInstitutions) }}
            </p>
          </template>
        </MediaCard>
      </b-col>
      <b-col cols="12" lg="4" sm="12">
        <MediaCard
          title="Total de Professores"
          title-color="text-body"
          icon="person"
          variant="light-primary"
          tooltip-text="Total de Professores da rede"
        >
          <template v-slot:description>
            <p class="text-body">
              <span class="text-body font-extrabold">
                {{ dataTeacherAccess.amountTeachers | formatNumber }}
              </span>
              {{ $tc('Teacher', dataTeacherAccess.amountTeachers) }}
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
          tooltip-text="Média de acessos de todos os Professores da rede na plataforma do Professor."
        >
          <template v-slot:description>
            <p class="text-body">
              <span class="text-body font-extrabold">
                {{ dataTeacherAccess.teachersAccessesPercentage | formatNumber }}%
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
  () => store.getters['moduleTeacherAccessTabNetwork/dataTeacherAccess'],
)

const loading = computed(() => store.getters['moduleTeacherAccessTabNetwork/loading'])
</script>