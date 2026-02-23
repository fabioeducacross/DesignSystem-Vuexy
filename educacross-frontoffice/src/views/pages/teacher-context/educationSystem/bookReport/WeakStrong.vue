<script setup>
import DescriptorTag from '@/components/descriptors/DescriptorTag.vue'
import { SubjectEnum } from '@/consts/SubjectEnum'
import useFilters from '@/store/filters/useFilters.js'
import { useEducationSystemBookReport } from '@/views/pages/teacher-context/educationSystem/bookReport/useEducationSystemBookReport.js'
import { computed } from 'vue'

const { loading, tableStrongWeak, exhibition } = useEducationSystemBookReport()
const { subject } = useFilters()

const fieldsStrongTable = computed(() => {
  return exhibition.value
    ? [
        { key: 'name', label: 'PONTOS ADEQUADOS E FORTES', icon: 'family_star' },
        { key: 'performance', label: 'RENDIMENTO MÉDIO', thStyle: 'width: 130px' },
      ]
    : [
        { key: 'descriptor', label: 'PONTOS ADEQUADOS E FORTES', icon: 'family_star' },
        { key: 'performance', label: 'RENDIMENTO', thStyle: 'width: 130px' },
      ]
})

const fieldsWeakTable = computed(() => {
  return exhibition.value
    ? [
        { key: 'name', label: 'PONTOS A MELHORAR', icon: 'sentiment_dissatisfied' },
        { key: 'performance', label: 'RENDIMENTO MÉDIO', thStyle: 'width: 130px' },
      ]
    : [
        { key: 'descriptor', label: 'PONTOS A MELHORAR', icon: 'sentiment_dissatisfied' },
        { key: 'performance', label: 'RENDIMENTO', thStyle: 'width: 130px' },
      ]
})
</script>

<template>
  <b-skeleton-wrapper :loading="loading">
    <template v-slot:loading>
      <b-row>
        <b-col cols="12" lg="6">
          <b-card no-body>
            <b-skeleton-table :columns="2" :rows="2"></b-skeleton-table>
          </b-card>
        </b-col>
        <b-col cols="12" lg="6">
          <b-card no-body>
            <b-skeleton-table :columns="2" :rows="2"></b-skeleton-table>
          </b-card>
        </b-col>
      </b-row>
    </template>
    <b-row id="strongWeak" class="match-height">
      <b-col cols="12" lg="6">
        <b-card no-body>
          <b-table
            :fields="fieldsStrongTable"
            :items="tableStrongWeak.descriptorsStrong"
            :show-empty="tableStrongWeak.descriptorsStrong.length === 0"
            responsive
            thead-tr-class="text-success"
          >
            <template v-slot:empty>
              <div class="d-flex flex-column align-items-center">
                <b-img class="mb-1" src="@/assets/images/belinha/regua.svg" />

                <span
                  v-if="
                    !tableStrongWeak.descriptorsStrong.length &&
                    !tableStrongWeak.descriptorsToImprove.length
                  "
                  class="text-center"
                >
                  Parece que
                  <span class="font-bold text-danger">não há missões em andamento.</span>
                </span>

                <span v-else class="text-center">
                  Que pena! Parece que não há
                  <span class="font-bold text-danger">nenhum rendimento acima de 50%.</span>
                </span>
              </div>
            </template>
            <template #head()="{ label, field }">
              <span class="d-flex align-items-center gap-2">
                <span v-if="field.icon" class="material-symbols-outlined">{{ field.icon }}</span>
                <span class="font-semibold">{{ label }}</span>
              </span>
            </template>

            <template #cell(name)="{ item }">
              <span class="d-flex align-items-center gap-2">
                <b-img-lazy
                  :alt="item.name"
                  :src="item.imageUrl ? item.imageUrl : SubjectEnum[subject.id].image"
                  height="40"
                  width="40"
                />
                <span>{{ item.name }}</span>
              </span>
            </template>

            <template #cell(descriptor)="{ item, value }">
              <span class="d-flex align-items-center gap-2">
                <b-img-lazy
                  :alt="item.name"
                  :src="item.imageUrl ? item.imageUrl : SubjectEnum[subject.id].image"
                  height="40"
                  width="40"
                />
                <span>
                  <DescriptorTag v-if="value" :descriptor="value" :subject-id="subject.id" />
                </span>
              </span>
            </template>

            <template #cell(performance)="{ value }">
              <span class="text-success font-bold">{{ value | formatNumber }}%</span>
            </template>
          </b-table>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6">
        <b-card no-body>
          <b-table
            :fields="fieldsWeakTable"
            :items="tableStrongWeak.descriptorsToImprove"
            :show-empty="tableStrongWeak.descriptorsToImprove.length === 0"
            responsive
            thead-tr-class="text-danger"
          >
            <template v-slot:empty>
              <div class="d-flex flex-column align-items-center">
                <b-img class="mb-1" src="@/assets/images/belinha/mochila.svg" />
                <span
                  v-if="
                    !tableStrongWeak.descriptorsStrong.length &&
                    !tableStrongWeak.descriptorsToImprove.length
                  "
                  class="text-center"
                >
                  Parece que
                  <span class="font-bold text-success">não há missões em andamento.</span>
                </span>

                <span v-else class="text-center"
                  >Uau!
                  <span class="font-bold text-success"
                    >Todos os desempenhos estão acima de 50%.</span
                  ></span
                >
              </div>
            </template>
            <template #head()="{ label, field }">
              <span class="d-flex align-items-center gap-2">
                <span v-if="field.icon" class="material-symbols-outlined">{{ field.icon }}</span>
                <span class="font-semibold">{{ label }}</span>
              </span>
            </template>

            <template #cell(name)="{ item }">
              <span class="d-flex align-items-center gap-2">
                <b-img-lazy
                  :alt="item.name"
                  :src="item.imageUrl ? item.imageUrl : SubjectEnum[subject.id].image"
                  height="40"
                  width="40"
                />
                <span>{{ item.name }}</span>
              </span>
            </template>

            <template #cell(descriptor)="{ item, value }">
              <span class="d-flex align-items-center gap-2">
                <b-img-lazy
                  :alt="item.name"
                  :src="item.imageUrl ? item.imageUrl : SubjectEnum[subject.id].image"
                  height="40"
                  width="40"
                />
                <span>
                  <DescriptorTag v-if="value" :descriptor="value" :subject-id="subject.id" />
                </span>
              </span>
            </template>

            <template #cell(performance)="{ value }">
              <span class="text-danger font-bold">{{ value | formatNumber }}%</span>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </b-skeleton-wrapper>
</template>