<template>
  <section>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-card>
          <b-skeleton class="mb-0" height="40px" />
        </b-card>
      </template>

      <b-card
        ref="alertRef"
        v-b-visible="observer"
        :bg-variant="proficency.variant"
        body-class="py-1"
        text-variant="white"
      >
        <b-row class="align-items-center">
          <b-col cols="12" md="4">
            <span class="font-weight-bolder"
              >Realizado em: {{ details.report.readingDate | formatDate }}</span
            >
          </b-col>
          <b-col cols="12" md="4">
            <div class="d-flex align-items-center justify-content-md-center py-1 py-md-0">
              <audio :src="details.report.audioFileUrl" controls preload="metadata"></audio>
            </div>
          </b-col>
          <b-col cols="12" md="4">
            <div class="d-flex align-items-center justify-content-md-end gap-1">
              Proficiência leitora:
              <b-badge
                :class="`bg-white text-${proficency.variant} d-flex align-items-center justify-content-center gap-1`"
                :pill="!details.report.changeProficiency"
              >
                <span
                  v-if="details.report.changeProficiency"
                  :class="`material-symbols-outlined text-${proficency.variant}`"
                  style="font-size: 12px"
                >
                  person_edit </span
                >{{ proficency.label }}
              </b-badge>
              <div
                class="text-white cursor-pointer d-flex align-items-center gap-1 text-nowrap"
                @click="changeSidebar()"
              >
                <span class="material-symbols-outlined" style="font-size: 12px"> info </span>
                <u class="underline">Saber Mais</u>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-card>
      <b-button
        :class="{ visible: showButton }"
        variant="primary"
        class="fixed-button"
        @click="changeSidebar()"
      >
        <span class="material-symbols-outlined"> emoji_objects </span>
      </b-button>
      <b-alert v-if="!details.isLastTest" show variant="primary">
        <div class="alert-body font-normal d-flex align-items-center gap-1">
          <span class="material-symbols-outlined" style="font-size: 16px"> info </span>
          <span>
            Atenção: essa não é a última tentativa feita pelo aluno. Volte à listagem principal para
            ver o último teste realizado.</span
          >
        </div>
      </b-alert>
    </b-skeleton-wrapper>
    <SidebarInfo :show-text-more="false" />
  </section>
</template>

<script setup>
import { getVariantByRule } from '@/consts/legends/index.js'
import store from '@/store'
import formatDate from '@/utils/date'
import SidebarInfo from '@/views/pages/reading-expedition/components/SidebarInfo.vue'
import {
  computed,
  getCurrentInstance,
  watch,
  ref,
  onMounted,
  onUnmounted,
} from 'vue'

// Filters
// Vue 2.7 does not support global filters in <script setup>,
// so we re-register filter for template usage (for IDE/linting).
// Otherwise, the original | formatDate remains for legacy support.
// (No code needed here.)

const vm = getCurrentInstance().proxy

const details = computed(() => store.getters['ReadingMeterModule/readingDetail'])
const loading = computed(() => store.getters['ReadingMeterModule/loading'])

const proficency = computed(
  () => getVariantByRule(details.value.report.proficiency, 'proficiency') || {},
)

watch(details, () => {
  vm.$bus.emit('setBreadcrumb', ['', '', details.value.name, details.value.studentName])
})

const changeSidebar = () => {
  vm.$bus.emit('changeSidebar')
}

const alertRef = ref(null)

const isVisible = ref(true)
const isObscured = ref(false)

const observer = value => {
  isVisible.value = value
}

const isElementObscured = el => {
  const rect = el.getBoundingClientRect()

  const bottomY = rect.bottom
  const topElement = document.elementFromPoint(rect.left + rect.width / 2, bottomY - 1)

  return topElement !== el && !el.contains(topElement)
}

const handleScroll = () => {
  if (isVisible.value) {
    isObscured.value = isElementObscured(alertRef.value)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const showButton = computed(() => {
  return !isVisible.value || isObscured.value
})
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';
  @import '@/@core/scss/base/bootstrap-extended/_variables.scss';
  audio {
    height: 30px;
  }
  .fixed-button {
    z-index: 9;
    position: fixed;
    top: calc(#{$navbar-height} + #{$content-padding});
    right: calc(#{$content-padding});
    width: 44px;
    height: 48px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;

    &.visible {
      transition: opacity 0.5s ease-in-out;
      opacity: 1;
    }
  }
</style>