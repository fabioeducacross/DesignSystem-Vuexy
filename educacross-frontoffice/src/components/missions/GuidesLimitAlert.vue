<template>
  <b-alert v-if="guidesData" :variant="guidesData.variant" show>
    <div class="alert-body">
      <div class="d-flex justify-content-center align-items-center font-normal">
        <div
          v-if="guidesData.layout === 1"
          class="d-flex flex-column flex-lg-row align-items-center gap-1"
        >
          <span class="material-symbols-outlined"> edit_calendar </span>
          É permitida a criação de até 40 missões ao mês por turma. Este mês, você criou:
          <span class="font-bold">
            {{ guidesMonth }} {{ $tc('missionsCount', guidesMonth) }}.
          </span>
          <span
            v-b-tooltip="
              'Somente as missões criadas no mês atual são consideradas, canceladas não são contabilizadas.'
            "
            style="font-size: 15px"
            class="material-symbols-outlined"
          >
            info
          </span>
        </div>

        <div
          v-if="guidesData.layout === 2"
          class="d-flex flex-column flex-lg-row align-items-center gap-1"
        >
          <span class="material-symbols-outlined"> edit_calendar </span>
          Atenção: é permitida a criação de até 40 missão ao mês por turma. Este mês, você criou:
          <span class="font-bold">
            {{ guidesMonth }} missões.
          </span>
          <span
            v-b-tooltip="
              'Somente as missões criadas no mês atual são consideradas, canceladas não são contabilizadas.'
            "
            style="font-size: 15px"
            class="material-symbols-outlined"
          >
            info
          </span>
        </div>

        <div
          v-if="guidesData.layout === 3"
          class="d-flex flex-column flex-lg-row align-items-center gap-2"
        >
          <span class="material-symbols-outlined"> edit_calendar </span>
          <span>
            <span class="font-bold">As missões dessa turma se esgotaram.</span> É permitida a
            criação até 40 missões ao mês por turma, exclua uma missão para criar uma nova.
            <span
              v-b-tooltip="
                'Somente as missões criadas no mês atual são consideradas, canceladas não são contabilizadas.'
              "
              style="font-size: 15px; vertical-align: text-bottom"
              class="material-symbols-outlined"
            >
              info
            </span>
          </span>
        </div>
      </div>
    </div>
  </b-alert>
</template>

<script setup>
import { ref, computed, watch, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import { getClassesGuidesMonth } from '@/services/shared/classes/Classes.service.js'
import useFilters from '@/store/filters/useFilters'

// Emits
const emit = defineEmits(['input'])

// Classe filter from store
const { classe } = useFilters()

const guidesMonth = ref(null)

const fetchGuidesMonth = () => {
  const classId = classe.value?.ClassId
  if (!classId) return

  getClassesGuidesMonth(classId).then(({ data }) => {
    guidesMonth.value = data
    emit('input', data >= 40)
  })
}

const guidesData = computed(() => {
  if (guidesMonth.value === null) {
    return null
  }
  if (guidesMonth.value < 26) {
    return {
      variant: 'primary',
      layout: 1,
    }
  }
  if (guidesMonth.value < 40) {
    return {
      variant: 'danger',
      layout: 2,
    }
  }
  return {
    variant: 'danger',
    layout: 3,
  }
})

// Watch for classe changes
watch(classe, fetchGuidesMonth, { immediate: true })

// EventBus wiring for 'fetchGuidesMonth'
const vm = getCurrentInstance().proxy

onMounted(() => {
  vm.$bus.on('fetchGuidesMonth', fetchGuidesMonth)
})

// Cleanup EventBus on unmount
onUnmounted(() => {
  vm.$bus.off('fetchGuidesMonth', fetchGuidesMonth)
})

// Initial fetch handled by immediate watcher
</script>

<style lang="scss" scoped></style>