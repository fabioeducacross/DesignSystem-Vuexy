<template>
  <section>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-card body-class="p-1">
          <b-skeleton type="text" class="w-100 mb-0" height="50px" />
        </b-card>
      </template>
      <b-card body-class="p-1">
        <b-row>
          <b-col cols="12" sm="3">
            <div>
              <b-link variant="primary" class="d-flex align-items-center" :to="redirectBack">
                <span class="material-symbols-outlined" style="font-size: 14px">
                  arrow_back_ios
                </span>
                <span class="underline">Voltar</span>
              </b-link>
            </div>
          </b-col>
          <b-col cols="12" sm="6">
            <div>
              <div class="d-flex flex-md-row align-items-center justify-content-center gap-4">
                <div v-if="subjectsIds" class="d-flex gap-1">
                  <Subjects
                    v-for="subject in subjectsIds"
                    :key="subject"
                    :subject-id="subject"
                    :size="24"
                  />
                </div>
                <h6 class="font-bold text-body mb-0">{{ evaluationDetails.evaluationName }}</h6>

                <b-badge
                  v-if="evaluationDetails.status >= 0"
                  pill
                  :variant="`light-${StatusEnum[evaluationDetails.status].variant}`"
                >
                  {{ StatusEnum[evaluationDetails.status].label }}
                </b-badge>
              </div>
            </div>
          </b-col>
          <b-col cols="12" sm="3">
            <div
              class="d-flex align-items-center gap-2 justify-content-center justify-content-sm-end text-primary"
            >
              <span class="material-symbols-outlined"> checklist </span>
              <h4 class="mb-0 text-primary">
                <span class="font-bold">Gabarito Digital</span>
              </h4>
            </div>
          </b-col>
        </b-row>
      </b-card>
      <Message />
    </b-skeleton-wrapper>
  </section>
</template>

<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import { StatusEnum, EEvaluationActiveStatus } from '@/consts/evaluationsEnum.js'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import Message from '@/views/pages/admin-context/evaluations/answerkey/students/Message.vue'
import { computed, getCurrentInstance, ref } from 'vue'

// PAGE TITLE
const vm = getCurrentInstance().proxy
const loading = ref(true)

const { classe } = useFilters()

const classId = router.currentRoute.params.classId || classe.value.ClassId

store
  .dispatch('evaluations/setEvaluationData', {
    evaluationId: router.currentRoute.params.evaluationId,
    classId,
  })
  .then(() => {
    const breadcrumb = ['', store.getters['evaluations/evaluationName'], '']

    vm.$bus.emit('setBreadcrumb', breadcrumb)
  })
  .catch(() => {})
  .finally(() => {
    loading.value = false
  })

const evaluationDetails = computed(
  () => store.getters['evaluations/evaluationDetails'] || {},
)

const subjectsIds = computed(() =>
  evaluationDetails.value?.subjects?.map(subject => subject.id),
)

const redirectBack = computed(() => {
  return {
    name: 'evaluationsListTeacher',
    params: {
      classId,
    },
  }
})
</script>

<style lang="scss" scoped></style>