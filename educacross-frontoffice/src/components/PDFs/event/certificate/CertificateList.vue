<template>
  <div>
    <Certificate
      v-for="(student, index) in eventData.students"
      :key="index"
      :data="student"
      :school-logo="eventData.logoUrl"
    />
  </div>
</template>

<script setup>
import Certificate from '@/components/PDFs/event/certificate/Certificate.vue'
import axiosIns from '@/libs/axios'
import router from '@/router'
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive State
const eventData = ref({})

// Route Params
const params = router.currentRoute.params

// Emits
const emit = defineEmits(['setInfos'])

emit('setInfos', {
  pdfTitle: params.pdfTitle,
  massPdf: Array.isArray(params.studentsIds) ? params.studentsIds.length > 1 : false,
  students: params.students,
  selector: '.certificate',
})

// Async Data Fetch
const fetchData = async () => {
  const parameters = {
    batchAction: params.batchAction,
    classId: params.classId,
    eventId: params.eventId,
    institutionId: params.institutionId,
    serieId: params.serieId,
    studentsIds: params.studentsIds,
  }

  const { data } = await axiosIns.post(
    `/v1/events/active/${params.eventId}/student/certificates`,
    parameters
  )

  eventData.value = data
}

// Page Style Management
const STYLE_ID = 'event-certificate-page-style'

const injectPageStyle = () => {
  const existingStyles = document.querySelectorAll('[id^="event-"][id$="-page-style"]')
  existingStyles.forEach(style => style.remove())

  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = '@page { size: 1008px 713px; margin: 0; }'
  document.head.appendChild(style)
}

const removePageStyle = () => {
  const style = document.getElementById(STYLE_ID)
  if (style) style.remove()
}

// Lifecycle
onMounted(() => {
  injectPageStyle()
  fetchData()
})

onUnmounted(() => {
  removePageStyle()
})
</script>