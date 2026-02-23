<template>
  <b-card>
    <div class="d-flex align-items-center flex-column">
      <h4 class="mb-2 text-body">{{ student.name }}</h4>
      <span class="material-symbols-outlined mb-50"> timelapse </span>
      <span class="">
        Tempo de aprendizagem:
        <span class="font-bold">
          {{ student.time | formattedTime('Não jogou') }}
        </span>
      </span>
    </div>
    <hr class="mb-2" />
    <ProgressBarHorizontal
      v-if="showPerformance"
      :value="student.performance"
      label="Desempenho do aluno"
    />
    <ProgressBarHorizontal :value="student.progress" label="Progresso do aluno" />
    <div class="text-nowrap d-flex align-items-center justify-content-center gap-2">
      <b-button
        v-for="(action, index) in reportActions"
        :key="index"
        variant="link"
        @click="action.action(student)"
      >
        {{ action.label }}
      </b-button>
    </div>
  </b-card>
</template>

<script setup>
import ProgressBarHorizontal from '@/components/progessBar/ProgressBarHorizontal.vue'

const profileImages = import.meta.glob(
  '@/assets/images/teacher-context/profile-corujinhas/*.png',
  { eager: true },
)

const props = defineProps({
  student: {
    type: Object,
  },
  linkDetails: {
    type: String,
    required: false,
  },
  paramsDetails: {
    type: Object,
    required: false,
    default: () => {},
  },
  reportActions: {
    type: Array,
    required: false,
  },
  showPerformance: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const getImgProfile = (id) => {
  const key = `@/assets/images/teacher-context/profile-corujinhas/${id}.png`
  return profileImages[key]?.default || profileImages[key] || ''
}
</script>

<style lang="scss" scoped>
  .avatar {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);
    border: 4px solid #fff;
    box-sizing: content-box;
  }
  .btn-link {
    text-decoration: underline;
  }
</style>