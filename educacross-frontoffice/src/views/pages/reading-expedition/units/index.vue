<template>
  <div>
    <TabCards
      :items="units"
      :loading="loading"
      :current-item="unitId"
      key-id="stage"
      @click="onCardClick"
    >
      <template v-slot:item="{ item }">
        <div
          v-b-tooltip="
            item.studentStart === false
              ? 'Acesso indisponivel. O aluno ainda nao iniciou esta unidade.'
              : ''
          "
        >
          <div class="d-flex align-items-start gap-2">
            <div
              class="text-break font-bold text-primary mb-1 flex-grow-1"
              :class="{ 'opacity-50': item.studentStart === false }"
            >
              {{ item.unitName }}
            </div>
          </div>
          <div
            class="d-flex align-items-start gap-2"
            :class="{ 'opacity-50': item.studentStart === false }"
          >
            <div @click.stop="open(item.bookId)">
              <b-img-lazy
                :src="item.bookCoverImageUrl"
                v-bind="bookImgConfig"
                :alt="item.bookName"
              />
            </div>
            <div class="flex-grow-1">
              <div
                class="font-bold hover:underline"
                :class="{ 'text-primary': item.studentStart !== false }"
                @click.stop="open(item.bookId)"
              >
                {{ item.bookName }}
              </div>
              <div>
                {{ item.bookAuthor }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </TabCards>
    <b-modal
      ref="Modal"
      :visible="openDetails"
      hide-footer
      centered
      title="Detalhes do livro"
      size="xl"
      no-close-on-backdrop
      static
      header-bg-variant="light-primary"
      @close="
        () => {
          openDetails = false
        }
      "
    >
      <div v-if="openDetails">
        <BookDetails :book-details="bookToShow" />
      </div>
    </b-modal>
  </div>
</template>

<script setup>
import TabCards from '@/components/tab/TabCards.vue'
import router from '@/router'
import {
  TestStatusEnum,
  putReadingExpeditionClassStage,
} from '@/services/shared/reading-expedition/reading-expedition.service.js'
import { getBookDetails } from '@/services/teacher-context/books/BookLibrary.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed, onUnmounted, watch, ref, defineAsyncComponent } from 'vue'

const { classe } = useFilters()
const bookImgConfig = {
  blank: true,
  blankColor: '#bbb',
  width: 48,
  height: 65,
}

// BookDetails async import for modal
const BookDetails = defineAsyncComponent(() =>
  import('@/views/pages/teacher-context/library/meet-books/components/BookDetails.vue'),
)

const studentId = computed(() => router.currentRoute.params.studentId || null)
store.dispatch('ReadingExpeditionModule/fetchUnits', studentId.value)

const loading = computed(() => store.getters['ReadingExpeditionModule/loading'])
const units = computed(() => store.getters['ReadingExpeditionModule/units'])
const unitId = computed(() => store.getters['ReadingExpeditionModule/unitId'])

const routeParams = computed(() => router.currentRoute.params)

watch([routeParams], () => {
  if (!routeParams.value.unitId && units.value.length) {
    store.commit('ReadingExpeditionModule/unitId', units.value[0].stage)
    redirectUnitId()
  }
})

const classeId = computed(() => classe.value.ClassId)

watch([classeId, studentId], () => {
  store.dispatch('ReadingExpeditionModule/fetchUnits', studentId.value)
})

watch([units], () => {
  if (!units.value.length) {
    redirectNotFound()
    store.commit('ReadingExpeditionModule/unitId', null)
    return
  }

  const id = parseInt(router.currentRoute.params.unitId)
  const selectedUnit = units.value.find(unit => unit.stage === id)

  store.commit(
    'ReadingExpeditionModule/unitId',
    selectedUnit ? selectedUnit.stage : units.value[0]?.stage,
  )
  redirectUnitId()
})

const onCardClick = item => {
  if (item.studentStart === false) return
  store.commit('ReadingExpeditionModule/unitId', item.stage)
  redirectUnitId()
}

const unlock = item => {
  putReadingExpeditionClassStage(classe.value.ClassId, {
    stage: item.stage,
  }).then(() => {
    store.dispatch('ReadingExpeditionModule/fetchUnits', studentId.value)
  })
}

const redirectUnitId = () => {
  const routeName =
    router.currentRoute.name !== 'readingExpeditionUnits' &&
    router.currentRoute.name !== 'readingExpeditionUnitsNotFound'
      ? router.currentRoute.name
      : 'readingExpeditionUnit'

  router
    .push({
      name: routeName,
      params: { unitId: unitId.value, studentId: studentId.value },
    })
    .catch(() => {})
}

const redirectNotFound = () => {
  router.push({ name: 'readingExpeditionUnitsNotFound' })
}

onUnmounted(() => {
  store.dispatch('ReadingExpeditionModule/reset')
})

const bookToShow = ref(null)
const openDetails = ref(false)
const loadingOpenBookDetailsId = ref(null)

const open = async id => {
  if (loadingOpenBookDetailsId.value) return
  loadingOpenBookDetailsId.value = id
  const response = await getBookDetails(id)
  bookToShow.value = response.data
  openDetails.value = true
  loadingOpenBookDetailsId.value = null
}
</script>

<style lang="scss" scoped></style>
