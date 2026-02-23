<template>
  <div class="d-flex align-items-center flex-col">
    <Certificate
      v-for="(certificate, index) in certificates"
      :key="`certificate-${index}`"
      :certificate="certificate"
      :certificate-type="certificateType"
      :school-logo="schoolLogo"
    />
  </div>
</template>

<script setup>
import Certificate from './Certificate.vue'
import router from '@/router'
import { getStudentCertificates } from '@/services/admin-context/students/Students.service'
import store from '@/store'
import { computed, ref, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({})

// Emits
const emit = defineEmits(['setInfos'])

const certificates = ref([])
const schoolLogo = ref('')
const role = computed(() => store.getters.accessRole)

const {
  subjectId,
  month,
  module,
  studentsIds,
  pdfTitle,
  batchAction,
  classId,
  searchTerm,
  status,
  certificateType,
  serieId,
} = router.currentRoute.params

const STYLE_ID = 'certificate-page-style'

const injectPageStyle = () => {
  const existingStyles = document.querySelectorAll('[id$="-page-style"]')
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

const emitInfos = () => {
  emit('setInfos', {
    pdfTitle,
    massPdf: studentsIds.length > 1,
    students: certificates.value,
    selector: '.certificate',
  })
}

onMounted(() => {
  injectPageStyle()

  getStudentCertificates(
    subjectId,
    month,
    module,
    studentsIds,
    batchAction,
    searchTerm,
    classId,
    status,
    serieId,
  )
    .then(response => {
      schoolLogo.value = response.data.logoUrl || ''
      certificates.value = response.data.students
      emitInfos()
    })
    .catch(() => {
      emitInfos()
    })
})

onUnmounted(() => {
  removePageStyle()
})
</script>