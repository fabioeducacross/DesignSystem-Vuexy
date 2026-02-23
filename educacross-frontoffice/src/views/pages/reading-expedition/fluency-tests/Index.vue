<template>
  <div>
    <TabCards :items="tests" :loading="loading" :current-item="testId" @click="onCardClick">
      <template v-slot:item="{ item }">
        <div class="d-flex align-items-start gap-2">
          <div
            class="text-break font-bold text-primary mb-1 flex-grow-1"
            :class="{ 'opacity-50': item.studentFinish === false }"
          >
            {{ item.test }}
          </div>
        </div>
        <div
          class="d-flex align-items-start gap-2"
          :class="{ 'opacity-50': item.studentFinish === false }"
        >
          <b-img-lazy :src="item.bookImageUrl" v-bind="bookImgConfig" :alt="item.name" />
          <div class="flex-grow-1">
            <div class="font-bold">
              {{ item.testName }}
            </div>
            <div>
              {{ item.serieName }}
            </div>
          </div>
        </div>
      </template>
    </TabCards>
  </div>
</template>

<script setup>
import TabCards from '@/components/tab/TabCards.vue'
import router from '@/router'
import { putReadingExpeditionClassStage } from '@/services/shared/reading-expedition/reading-expedition.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import readingExpeditionFluencyTestModule from '@/store/pageModules/readingExpedition/readingExpeditionFluencyTestModule.js'
import { computed, onUnmounted, watch, getCurrentInstance } from 'vue'

const { classe } = useFilters()

const bookImgConfig = {
  blank: true,
  blankColor: '#bbb',
  width: 48,
  height: 65,
}

const { proxy } = getCurrentInstance()
const studentId = computed(() => proxy.$route.params.studentId)

const moduleName = 'readingExpeditionFluencyTestModule'
store.registerModule(moduleName, readingExpeditionFluencyTestModule)

onUnmounted(() => {
  store.dispatch('readingExpeditionFluencyTestModule/reset')
  store.unregisterModule(moduleName)
})

store.dispatch('ReadingExpeditionModule/fetchTests')

const loading = computed(() => store.getters['ReadingExpeditionModule/loading'])
const tests = computed(() => store.getters['ReadingExpeditionModule/tests'])
const testId = computed(() => store.getters['ReadingExpeditionModule/testId'])

const routeParams = computed(() => {
  return proxy.$route.params
})

watch([routeParams], () => {
  if (!routeParams.value.testId && tests.value.length) {
    store.commit('ReadingExpeditionModule/testId', tests.value[0].id)
    redirectTestId()
  }
})

const classeId = computed(() => classe.value.ClassId)

watch([classeId, studentId], () => {
  store.dispatch('ReadingExpeditionModule/fetchTests', studentId.value)
}, { immediate: true })

watch([tests], () => {
  if (!tests.value.length) {
    redirectNotFound()
    store.commit('ReadingExpeditionModule/testId', null)
    return
  }
  const id = parseInt(proxy.$route.params.testId)
  const selectedTest = tests.value.find(test => {
    return test.id === id
  })
  store.commit(
    'ReadingExpeditionModule/testId',
    selectedTest ? selectedTest.id : tests.value[0]?.id,
  )
  redirectTestId()
})

const onCardClick = item => {
  if (item.studentFinish === false) return
  store.commit('ReadingExpeditionModule/testId', item.id)
  redirectTestId()
}

const unlock = item => {
  putReadingExpeditionClassStage(classe.value.ClassId, {
    stage: item.id,
  }).then(() => {
    store.dispatch('ReadingExpeditionModule/fetchTests')
  })
}

const redirectTestId = () => {
  if (testId.value) {
    const routeName =
      proxy.$route.name !== 'readingExpeditionFluencyTests' &&
      proxy.$route.name !== 'readingExpeditionFluencyTestsNotFound'
        ? proxy.$route.name
        : 'readingExpeditionFluencyTest'
    router
      .push({
        name: routeName,
        params: { testId: testId.value, studentId: proxy.$route.params.studentId },
      })
      .catch(() => {})
  }
}

const redirectNotFound = () => {
  if (proxy.$route.name !== 'readingExpeditionFluencyTestsNotFound') {
    router.push({ name: 'readingExpeditionFluencyTestsNotFound' }).catch(() => {})
  }
}
</script>

<style lang="scss" scoped></style>
