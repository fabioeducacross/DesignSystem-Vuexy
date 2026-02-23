<template>
  <b-card v-if="activityType">
    <div class="d-flex align-items-center gap-2">
      <b-avatar variant="light-primary" rounded="sm" size="md">
        <span class="material-symbols-outlined">{{ ActivityCardText[activityType].icon }}</span>
      </b-avatar>

      <h6 class="text-primary font-bold mb-0">
        {{ ActivityCardText[activityType].text }}
      </h6>
    </div>
  </b-card>
</template>

<script setup>
  // ⚠️ Import Preservation Rule: No imports in original file

  const props = defineProps({
    activityType: {
      type: Number,
      required: false,
    },
  })

  const ActivityCardText = {
    1: {
      icon: 'stadia_controller',
      text: 'Atividades jogadas na Ilha',
    },
    2: {
      icon: 'flag',
      text: 'Atividades jogadas em Missões da Escola',
    },
    3: {
      icon: 'flag',
      text: 'Atividades jogadas em Missões para Casa',
    },
    7: {
      icon: 'supervisor_account',
      text: 'Atividades jogadas em Treinos da Família',
    },
  }
</script>

<style lang="scss" scoped></style>