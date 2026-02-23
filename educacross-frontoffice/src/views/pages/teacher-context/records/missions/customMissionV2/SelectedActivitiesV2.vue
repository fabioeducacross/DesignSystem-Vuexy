<template>
  <section>
    <div class="d-flex justify-content-between gap-2">
      <h2 class="text-primary">Atividades</h2>
      <div class="text-primary cursor-pointer" @click="exampleModalShow = true">
        <span class="material-symbols-outlined align-middle" style="font-size: 16px">help</span>
        <span class="align-middle">Como é exibido para o aluno?</span>
      </div>
    </div>
    <b-card body-class="select-none">
      <b-skeleton-wrapper :loading="loadingMissionPlus">
        <template v-slot:loading>
          <div class="d-flex gap-3 justify-content-between overflow-x-auto overflow-y-hidden">
            <b-skeleton-img v-for="i in 8" :key="i" class="mb-0" height="184px" width="120px" />
          </div>
        </template>
        <draggable
          v-model="selectedItems"
          v-bind="{
            animation: 200,
            group: 'description',
            disabled: unlockDrag,
            ghostClass: 'ghost',
          }"
          @end="drag = false"
          @start="drag = true"
        >
          <transition-group
            :name="!drag ? 'flip-list' : null"
            class="d-flex gap-3 justify-content-between overflow-x-auto overflow-y-hidden pb-10"
            type="transition"
          >
            <div
              v-for="(activity, index) in selectedItems"
              :key="activity.order"
              :class="{
                'shake-animation': activity.isShaking,
                'loading-animation': activity.isLoading,
              }"
              :draggable="activity.isDraggable"
              class="text-center"
              @mousedown="startPress(activity)"
              @mouseleave="endPress(activity)"
              @mouseup="endPress"
            >
              <span class="font-semibold">Turno {{ index + 1 }}</span>
              <div v-if="activity.item">
                <div class="border-primary rounded card-activitie text-center">
                  <b-img :src="activity.item.imageUrl" height="100px" rounded width="100px"></b-img>
                  <span class="text-center font-semibold">{{ activity.item.thematicName }} </span>
                </div>
                <div class="d-flex justify-content-center">
                  <span class="material-symbols-outlined cursor-move">drag_indicator</span>
                  <span
                    class="material-symbols-outlined cursor-pointer text-primary"
                    @click="openDetails(activity.item)"
                    >visibility</span
                  >
                  <span
                    class="material-symbols-outlined cursor-pointer text-danger"
                    @click.stop="removeItem(activity.item)"
                    >delete</span
                  >
                </div>
              </div>
              <div v-else @click="scrollToActivities">
                <div
                  class="d-flex align-items-center justify-content-center rounded card-activitie"
                >
                  <div>
                    <span class="material-symbols-outlined font-bold" style="font-size: 40px">
                      add_to_queue
                    </span>
                    <span class="font-12 d-block">Escolha um conteúdo para este turno.</span>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <span class="material-symbols-outlined cursor-not-allowed text-muted"
                    >drag_indicator</span
                  >
                  <span class="material-symbols-outlined cursor-not-allowed text-muted"
                    >visibility</span
                  >
                  <span class="material-symbols-outlined cursor-not-allowed text-muted"
                    >delete</span
                  >
                </div>
              </div>
            </div>
          </transition-group>
        </draggable>
      </b-skeleton-wrapper>
    </b-card>
    <b-modal
      v-model="exampleModalShow"
      body-class="text-center"
      centered
      hide-footer
      size="lg"
      title="Como é exibido para o aluno?"
    >
      <h1 class="text-primary">Turno</h1>
      <p>
        O turno é um conjunto de desafios, sejam eles de jogos, questões ou outros formatos. Para o
        aluno, um turno é exibido no mapa dentro da Missão, conforme o exemplo a seguir:
      </p>

      <div class="d-flex flex-column align-items-center gap-2">
        <b-img fluid rounded src="@/assets/images/mission-plus/image-help1.png"></b-img>
        <b-img fluid rounded src="@/assets/images/mission-plus/image-help2.png"></b-img>
      </div>
    </b-modal>
    <b-modal
      ref="activityDetail"
      v-model="showActivityDetails"
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      scrollable
      size="xl"
      static
      @close="showActivityDetails = false"
    >
      <template v-slot:modal-header>
        <h4 class="mb-0 text-body font-medium">Detalhes do jogo</h4>
        <button v-if="showWebgl" class="back" @click="showWebgl = false">
          <span class="material-symbols-outlined" style="font-size: 16px"> arrow_back </span>
        </button>
        <button class="close" @click="showActivityDetails = false">
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <ActivityDetail
        v-if="showActivityDetails"
        v-model="showWebgl"
        :activity-id="selectedActivityId"
        :educational-organization-id="itemsFilters.matrix.id"
        :subject-id="subject.id"
      />
    </b-modal>
    <QuizDetail
      v-model="showQuestionDetails"
      :descriptor-id="selectedQuiz.descriptorId"
      :topic-id="selectedQuiz.topicId"
    />
  </section>
</template>

<script setup>
import useFilters from '@/store/filters/useFilters'
import QuizDetail from '@/views/pages/teacher-context/records/missions/customMissionV2/QuizDetail.vue'
import { useCustomMissionV2 } from '@/views/pages/teacher-context/records/missions/customMissionV2/useCustomMissionV2'
import ActivityDetail from '@/views/pages/teacher-context/shared/modals/ActivityDetail.vue'
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'

// Props
const props = defineProps({
  scrollToActivities: {
    type: Function,
    required: true,
  },
})

// Data and composables
const { selectedItems, itemsFilters, loadingMissionPlus, removeItem, ROUND_TYPE } = useCustomMissionV2()
const { subject } = useFilters()

const drag = ref(false)
let pressTimer = null
const exampleModalShow = ref(false)
const showActivityDetails = ref(false)
const showQuestionDetails = ref(false)
const showWebgl = ref(false)
const selectedActivityId = ref(null)
const selectedQuiz = ref({})

// Methods
const startPress = activity => {
  activity.isLoading = true
  pressTimer = setTimeout(() => {
    activity.isLoading = false
    activity.isDraggable = true
    activity.isShaking = true
    setTimeout(() => {
      activity.isShaking = false
    }, 820)
  }, 1000)
}

const endPress = activity => {
  clearTimeout(pressTimer)
  if (activity) {
    activity.isDraggable = false
    activity.isLoading = false
  }
}

const unlockDrag = computed(() => {
  return selectedItems.value.some(activity => activity.isDraggable)
})

const openDetails = item => {
  if (item.type === ROUND_TYPE.ACTIVITY) {
    selectedActivityId.value = item.id
    showActivityDetails.value = true
    return
  }
  selectedQuiz.value = item
  showQuestionDetails.value = true
}
</script>

<style>
  .ghost {
    opacity: 0.5;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }

  .shake-animation {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes loading {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }

  .loading-animation {
    animation: loading 1s ease-in-out infinite;
  }
</style>

<style scoped>
  .card-activitie {
    width: 120px;
    height: 184px;
    padding: 10px;
    border: 1px dashed var(--primary);
  }
</style>