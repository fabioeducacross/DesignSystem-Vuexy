<template>
  <b-modal
    v-if="value"
    id="student-detail-modal"
    ref="student-detail-modal"
    :visible="value"
    content-class="shadow "
    modal-class="d-flex flex-column justify-content-center"
    title="Detalhes do jogo"
    hide-footer
    scrollable
    static
    size="xl"
    @close="closeModal"
    @hide="closeModal"
  >
    <template #modal-header>
      <button v-if="renderWebgl" class="back" @click="renderWebgl = false">
        <span class="material-symbols-outlined" style="font-size: 16px">arrow_back</span>
      </button>
      <button class="close" @click="closeModal">
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <activity-detail
      v-if="value"
      v-model="renderWebgl"
      :activity-id="selectedActivityId"
      :subject-id="subject.id"
      @close-activityDetail="closeModal"
    />
  </b-modal>
</template>

<script setup>
import { ref } from 'vue'
import useFilters from '@/store/filters/useFilters'
import ActivityDetail from '@/views/pages/teacher-context/shared/modals/ActivityDetail.vue'

// Props
const props = defineProps({
  value: {
    type: Boolean,
  },
  selectedActivityId: {
    type: Number,
  },
})

// Emits
const emit = defineEmits(['input'])

// Store state
const { subject } = useFilters()

// Modal state
const renderWebgl = ref(false)

// Methods
const closeModal = () => {
  emit('input', false)
}
</script>

<style lang="scss" scoped>
.modal-game-image {
  width: 95px;
  height: 95px;
}

.dot-list {
  height: 3px;
  width: 3px;
  border-radius: 50%;
  background-color: #6e6b7b;
}
.title-activity {
  word-break: break-word;
  color: #6b6b6b;
}
.firstActivityColumn-image {
  min-width: 100px;
}
.secondActivityColumn-description {
  flex: 1;
}
.text-activityCard {
  font-weight: normal;
}

.back {
  position: absolute;
  top: -2px;
  right: 30px;

  padding: 0.7rem 0.7rem;
  box-shadow: 0 5px 20px 0 rgb(34 41 47 / 10%);
  border-radius: 0.357rem;
  background: #fff;

  color: #5e5873;

  opacity: 1;
  transition: all 0.23s ease 0.1s;

  &:hover {
    transform: translate(-3px, 5px);
  }
}

.left-arrow-icon {
  stroke-width: 3;
  transform: scale(1.2);
}
.ActivityImage {
  max-width: 100px;
  max-height: 100px;
  height: auto;
}
</style>

<style lang="scss">
.carousel-indicators > li {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #6e63e8 !important;
}
</style>