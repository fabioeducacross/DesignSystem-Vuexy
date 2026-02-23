<script setup>
import Divider from '@/components/divider/Divider.vue'
import { getVariantByRule } from '@/consts/legends'
import { ENarrativeComplexityTitle } from '@/consts/narrativeComplexity'
import { useNarrativeComplexityStudent } from '@/views/pages/test-fluency/narrative-complexity/student/useNarrativeComplexityStudent'
import { computed, ref } from 'vue'

const { details, loading, applicationSelectedIndex } = useNarrativeComplexityStudent()

const application = computed(() => details.value.applications[applicationSelectedIndex.value])

const contentPage = ref(1)
const haveProb = computed(() => details.value.serieId === 1 || details.value.serieId === 2)
const variant = computed(() =>
  getVariantByRule(
    application.value.complexity,
    'percentileNarrativeComplexityWithNotCompleted',
  ),
)

const ApplicationsSequenceEnum = Object.values(ENarrativeComplexityTitle).map(a => ({
  label: a,
}))

const mainProps = {
  fluidGrow: true,
  center: true,
  blank: true,
  blankColor: '#bbb',
}
</script>

<template>
  <b-card>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-skeleton-img class="rounded mb-1" height="500px" />
      </template>
      <b-card
        :bg-variant="variant.variant"
        body-class="d-flex flex-col flex-md-row justify-content-between align-items-center gap-1 p-50"
        class="shadow-none border flex-1"
      >
        <h4 class="text-white mb-0">
          {{ ApplicationsSequenceEnum[applicationSelectedIndex].label }}
        </h4>
        <div :class="`bg-light-${variant.variant}`" class="rounded">
          <div class="d-flex justify-content-between gap-2">
            <b-badge
              :class="`bg-white text-${variant.variant}`"
              :variant="variant.variant"
              pill
              class="uppercase"
            >
              {{ variant.label }}
            </b-badge>
            <h5 class="mb-0 font-bold text-white">p{{ application.percentilComplexity }}</h5>
          </div>
        </div>
      </b-card>

      <!--      aplicações         -->

      <div class="d-flex flex-col flex-lg-row justify-content-between gap-2 mb-1">
        <div
          v-for="(recording, index) in application.recording"
          :key="index"
          class="border p-1 rounded flex-1"
        >
          <h6 class="text-primary font-bold text-center mb-1">NARRATIVA {{ index + 1 }}</h6>
          <audio
            :src="recording.audioUrl"
            class="mx-auto mb-2"
            controls
            preload="metadata"
            style="height: 30px; width: 100%"
          ></audio>

          <div class="w-100 border-t mb-3"></div>

          <h6 class="text-primary font-bold text-center">IMAGEM DE REFERÊNCIA*</h6>

          <b-img-lazy :src="recording.imageUrl" class="rounded border" v-bind="mainProps" />
        </div>
      </div>

      <b-alert variant="secondary" class="mb-0 p-1" show>
        <span class="text-body" style="font-weight: 400"
          >*As imagens são apenas um contexto inicial para a criança produzir a narrativa. Elas não
          têm relação direta com o resultado, que é calculado a partir da
          <b class="text-body">conectividade</b> e da
          <b class="text-body">recorrência</b>
          das palavras na narrativa produzida, independente do campo semântico das imagens e de
          outros aspectos, como coesão e coerência.</span
        >
      </b-alert>
    </b-skeleton-wrapper>
  </b-card>
</template>