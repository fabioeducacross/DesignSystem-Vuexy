<script setup>
import { ref } from 'vue'
import { getSubjectVariant, uuidv4 } from '@/utils/utils'

const props = defineProps({
  descriptor: {
    type: Object,
    required: true,
  },
  subjectId: {
    type: Number,
    required: true,
  },
  placement: {
    type: String,
    default: 'bottom',
  },
})

const uid = ref(uuidv4())
</script>

<template>
  <div>
    <b-badge
      :id="uid"
      :variant="getSubjectVariant(props.subjectId)"
      pill
      class="text-wrap cursor-help"
    >
      {{ props.descriptor.tag }}
    </b-badge>
    <b-popover
      :target="uid"
      triggers="hover"
      :placement="props.placement"
      custom-class="test-z"
    >
      <template #title>
        {{ props.descriptor.tag }}
      </template>
      <div>
        <p v-if="props.descriptor.educationalOrganizationName" class="mb-0">
          <strong>Matriz:</strong> {{ props.descriptor.educationalOrganizationName }}
        </p>
        <p class="mb-0">
          <strong>Tópico:</strong> {{ props.descriptor.knowledgeAxisName }}
        </p>
        <p v-if="props.descriptor.knowledgeObject" class="mb-0">
          <strong>Objeto de Conhecimento:</strong>
          {{ props.descriptor.knowledgeObject }}
        </p>
        <p class="mb-0">
          <strong>Habilidade:</strong> {{ props.descriptor.name }}
        </p>
      </div>
    </b-popover>
  </div>
</template>

<style scoped>
.test-z {
  z-index: 99999999999;
}
</style>