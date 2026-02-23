<template>
  <section>
    <StudentDetailMissionReportDashboard :data="studentDetail" :is-loading="loadingData" />
    <StudentDetailMissionReportList :data="studentDetail" :is-loading="loadingData" />
    <Footer />
  </section>
</template>

<script setup>
import StudentDetailMissionReportDashboard from './StudentDetailMissionReportDashboard.vue'
import StudentDetailMissionReportList from './StudentDetailMissionReportList.vue'
import router from '@/router'
import { getMissionStudentsById } from '@/services/shared/reports/Report.service'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import Footer from '@/views/pages/teacher-context/reports/missions/studentDetailMission/Footer.vue'
import { onMounted, ref, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy
const { missionId, studentId } = router.currentRoute.params
const { classe } = useFilters()

const studentDetail = ref({})
const loadingData = ref(false)

const getStudentDetailMissionReport = () => {
  loadingData.value = true
  getMissionStudentsById(missionId, studentId, classe.value.ClassId)
    .then(response => {
      studentDetail.value = response.data
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = vm.$utilTeacherService.handleFormatErrors(errors)
      errorsArray.message.forEach(elementError => {
        vm.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    })
    .finally(() => {
      loadingData.value = false
    })
}

onMounted(() => {
  getStudentDetailMissionReport()
})
</script>