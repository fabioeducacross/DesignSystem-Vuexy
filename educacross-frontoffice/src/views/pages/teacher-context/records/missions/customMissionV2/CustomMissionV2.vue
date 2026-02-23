<template>
  <section>
    <h2 class="text-primary">Dados da Missão</h2>
    <CustomMissionDataV2 />

    <SelectedActivitiesV2 :scroll-to-activities="scrollToActivitiesFunction" />

    <CustomMissionFilterV2 />

    <CustomMissionListActivitiesV2 ref="refCustomMissionListActivitiesV2" />
  </section>
</template>

<script setup>
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import create_mission_module from '@/store/pageModules/missions/create-mission-module.js'
import { scrollToElement } from '@/utils/utils'
import CustomMissionDataV2 from '@/views/pages/teacher-context/records/missions/customMissionV2/CustomMissionDataV2.vue'
import CustomMissionFilterV2 from '@/views/pages/teacher-context/records/missions/customMissionV2/CustomMissionFilterV2.vue'
import CustomMissionListActivitiesV2 from '@/views/pages/teacher-context/records/missions/customMissionV2/CustomMissionListActivitiesV2.vue'
import SelectedActivitiesV2 from '@/views/pages/teacher-context/records/missions/customMissionV2/SelectedActivitiesV2.vue'
import { useCustomMissionV2 } from '@/views/pages/teacher-context/records/missions/customMissionV2/useCustomMissionV2'
import { getCurrentInstance, nextTick, onMounted, onUnmounted, ref } from 'vue'

const {
  module_name,
  missionPlusEditData,
  preparingToEdit,
  missionInfo,
  selectedItems,
  ACTIVITIES_MAX_QTD,
  ACTIVITY_EMPTY,
  filtersItems,
  loadingMissionPlus,
  getGuidePlusDetails,
  selectItem,
  getClasses,
} = useCustomMissionV2()

const vm = getCurrentInstance().proxy
vm.$bus.emit('showConfirmExit', true)
const { classe, subject, subjects } = useFilters()
const { id } = router.currentRoute.params

const refCustomMissionListActivitiesV2 = ref(null)

if (!store.hasModule(module_name)) {
  store.registerModule(module_name, create_mission_module)
}

store.commit(`${module_name}/resetStore`, true)

if (id) {
  preparingToEdit.value = true
}

if (selectedItems.value?.length === 0) {
  for (let i = 0; i < ACTIVITIES_MAX_QTD; i++) {
    selectedItems.value.push({
      ...ACTIVITY_EMPTY,
      order: selectedItems.value.length + 1,
    })
  }
}

onMounted(async () => {
  await getClasses()
  await nextTick()

  if (id) {
    loadingMissionPlus.value = true
    const { data } = await getGuidePlusDetails(id, classe.value.ClassId)

    let startTime = new Date(data.startTime)
    let expirationTime = new Date(data.expirationTime)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (startTime < today) {
      startTime = today
      expirationTime = new Date(new Date().setDate(startTime.getDate() + 7))
    }

    missionInfo.value.start = startTime
    missionInfo.value.end = expirationTime
    missionInfo.value.enabled = data.enabled
    missionInfo.value.rankingEnabled = data.rankingEnabled
    missionInfo.value.application = data.application
    missionInfo.value.messageToStudent = data.messageToStudent

    subject.value = subjects.value.find(subject => subject.id === data.subjectId)

    missionPlusEditData.value = {}
    const sClasses = data.classes
    const sStudents = data.students

    missionInfo.value.classe = filtersItems.value.classes.filter(c =>
      sClasses.includes(c.classId),
    )

    if (sStudents.length > 0) {
      missionInfo.value.students = filtersItems.value.students.filter(s =>
        sStudents.includes(s.studentId),
      )
    }

    missionInfo.value.name = data.name
    missionInfo.value.flux = data.sequential ? 2 : 1

    const rounds = data.rounds.sort((a, b) => a.round - b.round)

    rounds.forEach(round => {
      selectItem({
        ...round,
        subjectId: data.subjectId,
        id: round.topicId || round.activityId,
      })
    })

    loadingMissionPlus.value = false
    return
  }

  if (filtersItems.value.classes.length > 0) {
    const selectedClass = filtersItems.value.classes.find(
      item => item.classId === classe.value.ClassId,
    )

    missionInfo.value.classe = [selectedClass]
    filtersItems.value.students = selectedClass.students
  }
})

const scrollToActivitiesFunction = () => {
  scrollToElement(refCustomMissionListActivitiesV2.value)
}

onUnmounted(() => {
  store.unregisterModule(module_name)
})
</script>