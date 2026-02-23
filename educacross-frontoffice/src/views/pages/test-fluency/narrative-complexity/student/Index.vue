<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { percentileNarrativeComplexityLegend } from '@/consts/legends/percentileNarrativeComplexityEnum'
import router from '@/router'
import store from '@/store'
import narrativeComplexityStudent from '@/store/pageModules/narrativeComplexity/module-narrative-complexity-student'
import AlertMoreInfo from '@/views/pages/test-fluency/narrative-complexity/components/AlertMoreInfo.vue'
import Title from '@/views/pages/test-fluency/narrative-complexity/components/Title.vue'
import NarrativeComplexityStudentContent from '@/views/pages/test-fluency/narrative-complexity/student/Content.vue'
import NarrativeComplexityStudentGraph from '@/views/pages/test-fluency/narrative-complexity/student/Graph.vue'
import { useNarrativeComplexityStudent } from '@/views/pages/test-fluency/narrative-complexity/student/useNarrativeComplexityStudent'
import { getCurrentInstance, onUnmounted } from 'vue'

const vm = getCurrentInstance().proxy
const { module_name } = useNarrativeComplexityStudent()

const { studentId } = router.currentRoute.params

if (!store.hasModule(module_name)) {
  store.registerModule(module_name, narrativeComplexityStudent)
  store.commit(`${module_name}/reset`)
}

const { details, loading, getStudentData } = useNarrativeComplexityStudent()

const back = () => {
  router.push({ name: 'narrativeComplexityStudents' })
}

onUnmounted(() => {
  if (store.hasModule(module_name)) {
    store.commit(`${module_name}/reset`)
    store.unregisterModule(module_name)
  }
})

getStudentData(studentId).then(() => {
  vm.$bus.emit('setBreadcrumb', ['', '', details.value.name])
})

const legends = [percentileNarrativeComplexityLegend]
</script>

<template>
  <b-row>
    <b-col cols="12">
      <AlertMoreInfo />
    </b-col>
    <b-col cols="12">
      <b-skeleton-wrapper :loading="loading">
        <template v-slot:loading>
          <b-skeleton class="mb-1" type="input" />
        </template>
        <Title :back-func="back">
          <h4 class="mb-0 font-bold text-body">{{ details.name }}</h4>
        </Title>
      </b-skeleton-wrapper>
    </b-col>
    <b-col cols="12">
      <NarrativeComplexityStudentGraph />
    </b-col>
    <b-col cols="12">
      <NarrativeComplexityStudentContent />
    </b-col>
    <b-col cols="12">
      <LegendEnum :legends="legends" />
    </b-col>
  </b-row>
</template>