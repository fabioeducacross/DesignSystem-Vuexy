<template>
  <div>
    <PerformancePdf
      v-for="(student, index) in students"
      :key="index"
      :event-data="eventData"
      :student="student"
    />
  </div>
</template>

<script setup>
import PerformancePdf from './PerformancePDF.vue'
import axiosIns from '@/libs/axios'
import router from '@/router'
import { ref, onMounted, onUnmounted } from 'vue'

const eventData = ref({})
const students = ref([])

const eventId = router.currentRoute.params.eventId
const params = router.currentRoute.params

const emit = defineEmits(['setInfos'])

const fetchData = async () => {
  const parameters = {
    batchAction: params.batchAction,
    classId: params.classId,
    institutionId: params.institutionId,
    serieId: params.serieId,
    studentsIds: params.studentsIds,
  }

  const { data } = await axiosIns.post(
    `/v1/events/active/${eventId}/student/performance`,
    parameters,
  )

  students.value = data.students
  delete data.students

  eventData.value = data

  emit('setInfos', {
    pdfTitle: params.pdfTitle,
    massPdf: students.value.length > 1,
    students: students.value,
    selector: '.performance-report',
  })
}

const STYLE_ID = 'event-performance-page-style'

const injectPageStyle = () => {
  const existingStyles = document.querySelectorAll('[id^="event-"][id$="-page-style"]')
  existingStyles.forEach(style => style.remove())

  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = '@page { size: 713px 1008px; margin: 0; }'
  document.head.appendChild(style)
}

const removePageStyle = () => {
  const style = document.getElementById(STYLE_ID)
  if (style) style.remove()
}

onMounted(() => {
  injectPageStyle()
  fetchData()
})

onUnmounted(() => {
  removePageStyle()
})
</script>