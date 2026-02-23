<template>
  <div>
    <b-overlay class="text-primary h-100" no-wrap :show="loading" />
    <div v-if="false" class="titleBox">
      <span class="color-patternTwo">{{ students[0].className }}</span>
    </div>
    <div class="cardsContainer">
      <Card v-for="(student, index) in students" :key="index" :student="student" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Card from './Card.vue'
import { getStudentCards } from '@/services/admin-context/students/Students.service'
import { getStudentsCards } from '@/services/teacher-context/students/Students.service'
import store from '@/store'
import router from '@/router'

const emit = defineEmits(['setInfos'])

const students = ref([])
const loading = ref(true)

const STYLE_ID = 'student-cards-page-style'

const injectPageStyle = () => {
  const existingStyles = document.querySelectorAll('[id$="-page-style"]')
  existingStyles.forEach(style => style.remove())

  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = '@page { size: A4; margin: 0; }'
  document.head.appendChild(style)
}

const removePageStyle = () => {
  const style = document.getElementById(STYLE_ID)
  if (style) style.remove()
}

const getStudentsForAdmin = async params => {
  loading.value = true

  if (params.batchAction === 2) {
    params.studentsIds = []
  }

  try {
    const response = await getStudentCards(
      params.studentsIds,
      params.batchAction,
      params.searchTerm,
      params.classId,
      params.status,
      params.serieId,
    )
    const massPdf = params.studentsIds.length > 1 || params.batchAction === 2
    students.value = response.data

    emit('setInfos', {
      pdfTitle: params.pdfTitle,
      massPdf,
      students: students.value,
      selector: '.student-card-body',
    })
  } finally {
    loading.value = false
  }
}

const getStudentsForTeacher = async params => {
  const massPdf = params.studentsIds.length > 1 || params.batchAction === 2

  loading.value = true

  try {
    const response = await getStudentsCards(params)
    students.value = response.data

    emit('setInfos', {
      pdfTitle: params.pdfTitle,
      massPdf,
      students: students.value,
      selector: '.student-card-body',
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  injectPageStyle()

  const role = store.getters.accessUserData?.Role
  const params = { ...router.currentRoute.query }

  if (typeof params.studentsIds === 'string') {
    params.studentsIds = [params.studentsIds]
  }

  params.studentsIds = (params.studentsIds || []).map(id => parseInt(id, 10))

  if (role === 'Teacher') {
    getStudentsForTeacher(params)
  } else {
    getStudentsForAdmin(params)
  }
})

onUnmounted(() => {
  removePageStyle()
})
</script>

<style lang="scss" scoped>
.titleBox {
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  width: 100%;
  margin-bottom: 3rem;
  margin-left: 4.7rem;

  span {
    border-bottom: 2px solid;
  }
}

.cardsContainer {
  display: flex;
  justify-content: center;
  column-gap: 1rem;
  row-gap: 1rem;
  flex-wrap: wrap;

  padding: 1rem 0;

  width: 100%;
}
</style>