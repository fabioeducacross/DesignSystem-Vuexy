<template>
  <b-modal
    v-model="open"
    title="Passaporte de Leitura"
    title-class="text-body"
    size="xl"
    centered
    hide-footer
    static
    @close="closeModal"
    @change="closeModal"
  >
    <div v-if="value">
      <div
        class="d-flex justify-content-between align-items-center mb-1"
        style="border: 1px solid var(--7-border-input, #d8d6de); padding: 10px 20px; border-radius: 6px;"
      >
        <span>
          Aluno:
          <span class="text-primary font-bold">{{ selectedEveluateStudent.name }}</span>
        </span>
        <span>
          Turma:
          <span class="text-primary font-bold">{{ globalClass.Name }}</span>
        </span>
      </div>
      <b-row class="match-height">
        <b-col cols="12" lg="6" xl="3">
          <MediaCard
            title="Livros"
            icon="book_5"
            variant="light-primary"
            class="bg-light-primary"
            right-align
            :loading="loading"
          >
            <template v-slot:description>
              <div>
                <span class="text-primary font-bold">
                  {{ passportData.readBooks.readBooks | formatNumber }} título(s) lidos
                </span>
                <br />
                <small class="p">
                  Tempo investido:
                  <strong class="text-primary">{{ formattedTime(passportData.readBooks.time) }}</strong>
                </small>
              </div>
            </template>
          </MediaCard>
        </b-col>
        <b-col cols="12" lg="6" xl="3">
          <MediaCard
            title="Testes de leitura"
            icon="dictionary"
            :variant="`light-${passportData.readingTests.enum.variant}`"
            :class="`bg-light-${passportData.readingTests.enum.variant}`"
            right-align
            :loading="loading"
          >
            <template v-slot:description>
              <div>
                <span class="font-bold" :class="`text-${passportData.readingTests.enum.variant}`">
                  {{ passportData.readingTests.performed | formatNumber }} de
                  {{ passportData.readingTests.total | formatNumber }} realizados
                </span>
                <br />
                <small>
                  <b-badge :variant="`light-${passportData.readingTests.enum.variant}`" pill>
                    {{ passportData.readingTests.enum.text }}
                  </b-badge>
                </small>
              </div>
            </template>
          </MediaCard>
        </b-col>
        <b-col cols="12" lg="6" xl="3">
          <MediaCard
            title="Desafios de leitura"
            icon="mic"
            :variant="`light-${passportData.readingChallenges.enum.variant}`"
            :class="`bg-light-${passportData.readingChallenges.enum.variant}`"
            right-align
            :loading="loading"
          >
            <template v-slot:description>
              <span class="font-bold" :class="`text-${passportData.readingChallenges.enum.variant}`">
                {{ passportData.readingChallenges.sent | formatNumber }} de
                {{ passportData.readingChallenges.total | formatNumber }} enviados
              </span>
              <br />
              <small>
                <b-badge :variant="`light-${passportData.readingChallenges.enum.variant}`" pill>
                  {{ passportData.readingChallenges.enum.text }}
                </b-badge>
              </small>
            </template>
          </MediaCard>
        </b-col>
        <b-col cols="12" lg="6" xl="3">
          <MediaCard
            title="Desafios de escrita"
            icon="draw"
            :variant="`light-${passportData.writingChallenges.enum.variant}`"
            :class="`bg-light-${passportData.writingChallenges.enum.variant}`"
            right-align
            :loading="loading"
          >
            <template v-slot:description>
              <div>
                <span
                  class="font-bold"
                  :class="`text-${passportData.writingChallenges.enum.variant}`"
                >
                  {{ passportData.writingChallenges.sent | formatNumber }} de
                  {{ passportData.writingChallenges.total | formatNumber }} enviados
                </span>
                <br />
                <small>
                  Proficiência:
                  <b-badge :variant="`light-${passportData.writingChallenges.enum.variant}`" pill>
                    {{ passportData.writingChallenges.enum.text }}
                  </b-badge>
                </small>
              </div>
            </template>
          </MediaCard>
        </b-col>
      </b-row>
      <b-table :fields="passaportFields" :items="passportData.table" responsive outlined>
        <template #cell(status)="{ value }">
          <div>
            <b-badge :variant="`light-${value.enum.variant}`" pill class="mb-50">
              <span
                v-if="value.enum.icon"
                class="material-symbols-outlined font-bold"
                :class="`text-${value.enum.variant}`"
                style="font-size: 12px; vertical-align: middle"
              >
                {{ value.enum.icon }}
              </span>
              {{ value.enum.prettyText }}
            </b-badge>
            <ProgressBarHorizontalV2
              :value="value.start"
              :max="value.total"
              :get-variant="getPassportStatusEnum"
              height="12px"
            >
              <div class="d-flex justify-content-between" style="width: 250px">
                <span :class="`font-bold text-${value.enum.variant}`">
                  {{ value.percentage | formatNumber }}%
                </span>
                <span>
                  <strong>{{ value.start | formatNumber }}</strong> de
                  {{ value.total | formatNumber }}
                </span>
              </div>
            </ProgressBarHorizontalV2>
          </div>
        </template>
      </b-table>
      <LegendEnum :legends="[PassportStatusEnumLegend]" />
    </div>
  </b-modal>
</template>

<script setup>
import MediaCard from '@/components/card/MediaCard.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { PassportStatusEnumLegend, getPassportStatusEnum } from '@/consts/ReadingMeterEnum.js'
import { formatDate, formattedTime } from '@/utils/utils'
import { ref, computed, watch, getCurrentInstance } from 'vue'

// Props
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
  },
  passportData: {
    type: Object,
    default: () => ({
      readBooks: {
        readBooks: undefined,
        time: undefined,
      },
      readingTests: {
        performed: undefined,
        total: undefined,
        proficiency: undefined,
        enum: {
          variant: undefined,
          teaxt: undefined,
        },
      },
      readingChallenges: {
        sent: undefined,
        total: undefined,
        proficiency: undefined,
        enum: {
          variant: undefined,
          teaxt: undefined,
        },
      },
      writingChallenges: {
        sent: undefined,
        total: undefined,
        proficiency: undefined,
        enum: {
          variant: undefined,
          teaxt: undefined,
        },
      },
      table: [],
    }),
  },
  selectedEveluateStudent: {
    type: Object,
    default: () => ({}),
  },
  globalClass: {
    type: Object,
    default: () => ({}),
  },
})

// Emits
const emit = defineEmits(['close', 'input'])

// Refs and computed
const open = ref(false)
const value = computed(() => props.value)

watch(value, v => {
  open.value = v
})

// Table fields
const passaportFields = [
  {
    key: 'goal',
    label: 'META',
    tdClass: 'font-bold',
  },
  {
    key: 'descriptive',
    label: 'DESCRITIVO',
    thStyle: { width: '350px' },
  },
  {
    key: 'status',
    label: 'STATUS',
  },
  {
    key: 'lastAccess',
    label: 'ÚLTIMO ACESSO',
    formatter: value => formatDate(value),
  },
  {
    key: 'time',
    label: 'TEMPO INVESTIDO',
    formatter: value => formattedTime(value),
  },
]

// Close modal handler
const closeModal = () => {
  emit('close')
  emit('input', false)
}

// Expose filters for use in template pipes
</script>