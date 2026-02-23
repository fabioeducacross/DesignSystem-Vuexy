<template>
  <div ref="refGridTable" class="grid-table">
    <div
      v-for="(word, index) in text"
      ref="refBoxs"
      :key="index"
      class="word-box"
    >
      <div :class="`${getStatus(word)}`" class="word">
        <span ref="refWords">{{ getLabel(word) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getReadingMeterWordStatusEnum } from '@/consts/ReadingExpeditionEnum.js'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  text: { type: Array, default: () => [] },
})

const reference = computed(() => props.text)
const refBoxs = ref([])
const refWords = ref([])
const refGridTable = ref(null)
let gridTableObserver
let executeUpdateGrid = true

const updateGrid = () => {
  if (!executeUpdateGrid) {
    executeUpdateGrid = true
    return
  }
  const listOfSizes = refWords.value.map(e => e.offsetWidth)

  if (!(listOfSizes instanceof Array)) return

  const biggest = Math.max(...listOfSizes) + 38
  const containerSize = refGridTable.value.offsetWidth

  const numberOfColumns = Math.floor(containerSize / biggest)

  refGridTable.value.style.gridTemplateColumns = `repeat(${numberOfColumns}, 1fr)`

  const selectedBoxes = document.querySelectorAll(
    `.word-box:not(:nth-child(${numberOfColumns}n))`,
  )
  const counterSelectedBoxes = document.querySelectorAll(
    `.word-box:nth-child(${numberOfColumns}n)`,
  )

  counterSelectedBoxes.forEach(box => box.classList.remove('right-line'))
  selectedBoxes.forEach(box => box.classList.add('right-line'))
}

const getLabel = word => {
  if (word instanceof Object) return word.word

  return word
}

const getStatus = word => {
  if (!word.reading) return
  const status = word.reading

  const { variant, textClass } = getReadingMeterWordStatusEnum(status)

  return `${textClass} bg-light-${variant}`
}

watch(reference, () => {
  updateGrid()
})

onMounted(() => {
  gridTableObserver = new ResizeObserver(updateGrid)
  gridTableObserver.observe(refGridTable.value)
})

onUnmounted(() => {
  gridTableObserver?.disconnect()
})
</script>

<style scoped>
.grid-table {
  display: grid;
}
.word-box {
  padding: 11px 19px;
  text-align: center;
}

.word {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.word span {
  text-transform: uppercase;
}

.right-line {
  border-right: 1px solid #d8d6de;
}

.bg-light-secondary {
  background: transparent !important;
}

.text-muted {
  color: var(--1-theme-color-muted-placeholder-text, #b9b9c3) !important;
  font-weight: 400 !important;
}
</style>
