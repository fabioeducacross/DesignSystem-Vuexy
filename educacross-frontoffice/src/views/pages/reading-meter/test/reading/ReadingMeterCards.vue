<template>
  <section>
    <b-row class="match-height">
      <b-col cols="12">
        <b-card no-body>
          <b-card-body class="d-flex justify-content-center align-items-center gap-2">
            <div>
              <span class="align-middle">Reaplicar teste para o aluno? </span>
              <span
                v-b-tooltip="
                  `O teste ficará disponível novamente para este aluno e se seu status estiver “finalizado”, voltará a ficar “em andamento”.`
                "
                class="material-symbols-outlined align-middle"
                >info</span
              >
            </div>
            <b-button variant="primary" size="sm" @click="prepareReEnableItem">
              <span class="material-symbols-outlined align-middle">prompt_suggestion</span>
              <span class="align-middle"> Reaplicar</span>
            </b-button>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6">
        <MediaCard
          title="Palavras pronunciadas corretamente"
          tooltip-text="Acurácia da leitura: precisão dos fonemas correspondentes à pronúncia de um falante nativo. São avaliadas as palavras pronunciadas com exceção das palavras inseridas pelo aluno."
          icon="mic"
          variant="light-primary"
          right-align
          :loading="loading"
        >
          <template v-slot:description>
            <ProgressBarHorizontalV2
              :value="details.report.accuracy.correctWords"
              :max="details.report.accuracy.pronuncedWords"
              :variant-object="proficency"
            >
              <template v-slot="{ item }">
                <div class="d-flex" :class="item.variant.textClass">
                  {{ item.value | formatNumber }} de {{ item.max | formatNumber }} palavras
                </div>
              </template>
            </ProgressBarHorizontalV2>
          </template>
        </MediaCard>
      </b-col>
      <b-col cols="12" lg="6">
        <MediaCard
          title="Palavras omitidas"
          tooltip-text="Palavras não pronunciadas."
          icon="mic_off"
          variant="light-primary"
          right-align
          :loading="loading"
        >
          <template v-slot:description>
            <span class="text-primary font-bold">{{
              details.report.omittedWords | formatNumber
            }}</span>
          </template>
        </MediaCard>
      </b-col>
      <b-col cols="12" lg="6">
        <MediaCard
          title="Total de palavras pronunciadas"
          tooltip-text="Todas as palavras do teste pronunciadas pelo aluno."
          icon="record_voice_over"
          variant="light-primary"
          right-align
          :loading="loading"
        >
          <template v-slot:description>
            <span class="text-primary font-bold">{{
              details.report.accuracy.pronuncedWords | formatNumber
            }}</span>
          </template>
        </MediaCard>
      </b-col>
      <b-col cols="12" lg="6">
        <MediaCard
          title="Velocidade da leitura"
          tooltip-text="Palavras lidas por minuto."
          icon="sprint"
          variant="light-primary"
          right-align
          :loading="loading"
        >
          <template v-slot:description>
            <span class="text-primary font-bold"
              >{{ details.report.wordsPerMinutes | formatNumber }} palavras por minuto</span
            >
          </template>
        </MediaCard>
      </b-col>
    </b-row>

    <ModalConfirm
      v-model="confirmReEnableIsOpen"
      :callback-confirm="reEnableItem"
      label-confirm="Aplicar teste"
      :busy="loadingAction"
    >
      <h4>Tem certeza que deseja reaplicar?</h4>
      <p>
        O teste ficará disponível novamente para
        <span class="text-primary font-bold">{{ details.studentName }}</span
        >. Você poderá cancelar a qualquer momento.
      </p>
    </ModalConfirm>
  </section>
</template>

<script setup>
import DynamicMediaCard from '@/components/card/DynamicMediaCard.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import LegendBadgesReadingMeter from '@/components/legends/LegendBadgesReadingMeter.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import router from '@/router'
import { enableStudentReading } from '@/services/shared/readingMeter/readingMeter.service'
import store from '@/store'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { computed, getCurrentInstance, ref } from 'vue'

const vm = getCurrentInstance().proxy

const { testId, studentId, classId } = router.currentRoute.params

const details = computed(() => store.getters['ReadingMeterModule/readingDetail'])
const loading = computed(() => store.getters['ReadingMeterModule/loading'])

const proficency = computed(
  () => getVariantByRule(details.value.report.proficiency, 'proficiency') || {},
)

const loadingAction = ref(false)
const confirmReEnableIsOpen = ref(false)
const prepareReEnableItem = () => {
  confirmReEnableIsOpen.value = true
}

const reEnableItem = async () => {
  loadingAction.value = true

  try {
    const res = await enableStudentReading({
      readingFluencyTestId: testId,
      classId,
      studentId,
    })
    if (res.status === 200) {
      vm.$toast({
        component: Toast,
        props: {
          title: 'Teste aplicado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      router.push({
        name: 'readingMeterClassesOverview',
      })
    }
  } finally {
    confirmReEnableIsOpen.value = false
    loadingAction.value = false
  }
}
</script>

<style lang="scss">
  .border-primary.border-2 {
    border-width: 2px !important;
  }
</style>