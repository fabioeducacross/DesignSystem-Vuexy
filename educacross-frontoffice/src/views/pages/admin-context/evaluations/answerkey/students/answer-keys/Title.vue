<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import { StatusEnum } from '@/consts/evaluationsEnum.js'
import { useAnswerKeysStudent } from '@/views/pages/admin-context/evaluations/answerkey/students/answer-keys/useAnswerKeysStudent'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

const {
  loading,
  currentStudent,
  knowledgeAreas,
  students,
  evaluationDetails,
  changeStudent,
} = useAnswerKeysStudent()

const subjectsIds = computed(() => knowledgeAreas.value?.map(item => item.subjectId))

const studentName = () => {
  return currentStudent.value ? currentStudent.value.name : ''
}

const status = computed(() => evaluationDetails.value?.status)

const router = useRouter()

const redirectBack = () => {
  router.push({
    name: 'evaluationsAnswerTeacher',
  })
}
</script>

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
              <b-link variant="primary" class="d-flex align-items-center" @click="redirectBack">
                <span class="material-symbols-outlined" style="font-size: 14px">
                  arrow_back_ios
                </span>
                <span class="underline">Voltar</span>
              </b-link>
            </div>
          </b-col>
          <b-col cols="12" sm="6">
            <div>
              <div class="d-flex flex-md-row align-items-center justify-content-center gap-2">
                <div v-if="subjectsIds" class="d-flex gap-1">
                  <Subjects
                    v-for="subject in subjectsIds"
                    :key="subject"
                    :subject-id="subject"
                    :size="24"
                  />
                </div>
                <h6 class="font-bold text-body mb-0">{{ evaluationDetails.evaluationName }}</h6>

                <b-badge v-if="status" pill :variant="`light-${StatusEnum[status].variant}`">
                  {{ StatusEnum[status].label }}
                </b-badge>
              </div>
            </div>
          </b-col>
          <b-col cols="12" sm="3">
            <div
              class="d-flex align-items-center gap-2 justify-content-center justify-content-sm-end text-primary"
            >
              <h4 class="mb-0 text-primary">
                {{ studentName() }}
              </h4>
              <div class="d-flex gap-2">
                <span
                  class="material-symbols-outlined border-primary rounded cursor-pointer"
                  @click="changeStudent('previous')"
                >
                  chevron_left
                </span>
                <span
                  class="material-symbols-outlined border-primary rounded cursor-pointer"
                  @click="changeStudent('next')"
                >
                  chevron_right
                </span>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </b-skeleton-wrapper>
  </section>
</template>

<style scoped lang="scss"></style>