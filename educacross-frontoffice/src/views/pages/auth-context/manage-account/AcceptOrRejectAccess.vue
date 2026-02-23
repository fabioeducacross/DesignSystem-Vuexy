<template>
  <div class="d-flex flex-column align-items-center">
    <span class="material-symbols-outlined text-warning" style="font-size: 80px"> error </span>

    <!-- Title: Accept or Reject -->
    <h1 class="text-body text-center">
      Deseja
      <span v-if="profileData.isRejecting" class="text-danger">recusar</span>
      <span v-else class="text-success">aceitar</span>
      esse perfil?
    </h1>

    <!-- Profile Info -->
    <p class="mb-0">
      Perfil:
      <span class="text-primary font-bold">{{ profileData.userData.role }}</span>
    </p>
    <p>
      Escola:
      <span class="text-primary font-bold">{{ profileData.userData.institutionName }}</span>
    </p>

    <!-- Reject Flow -->
    <div v-if="profileData.isRejecting" class="d-flex gap-2">
      <b-button variant="outline-danger" :disabled="isLoading" @click="onCancel">Cancelar</b-button>
      <b-button variant="danger" :disabled="isLoading" @click="onSubmitProfileAction">
        <span>Recusar perfil</span>
        <b-spinner v-if="isLoading" small class="ml-50" />
      </b-button>
    </div>

    <!-- Accept Flow -->
    <div v-else>
      <div class="mb-1">
        <b-form-checkbox v-model="isAcceptingTerms">
          <span>
            Declaro que li e aceito os
            <b-link
              class="font-bold underline"
              href="https://educacross.com.br/termos-de-uso/"
              target="_blank"
            >
              termos de uso
            </b-link>
            e
            <b-link
              class="font-bold underline"
              href="https://www.educacross.com.br/politica-de-privacidade/"
              target="_blank"
            >
              política de privacidade
            </b-link>
          </span>
        </b-form-checkbox>
      </div>

      <div class="d-flex gap-2 justify-content-center">
        <b-button variant="outline-danger" :disabled="isLoading" @click="onCancel">
          Cancelar
        </b-button>
        <b-button
          variant="primary"
          :disabled="!isAllowedToAccept || isLoading"
          @click="onSubmitProfileAction"
        >
          <span>Vincular perfil</span>
          <b-spinner v-if="isLoading" small class="ml-50" />
        </b-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'

const props = defineProps({
  profileData: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits([
  'close-profile-dialog',
  'submit-profile-action',
  'submit-access-key',
  'submit-add-user'
])

const isLoading = ref(false)
const isAcceptingTerms = ref(false)
const localProfileAction = reactive({
  ...props.profileData,
})

const isAllowedToAccept = computed(() => {
  if (localProfileAction.isRejecting) return true
  return isAcceptingTerms.value
})

onMounted(() => {})

const onCancel = () => {
  emit('close-profile-dialog')
}

const onSubmitProfileAction = async () => {
  isLoading.value = true
  localProfileAction.acceptTerms = isAcceptingTerms.value
  emit('submit-profile-action', localProfileAction, () => {
    isLoading.value = false
  })
}

const onSubmitAccessKey = async () => {
  isLoading.value = true
  localProfileAction.acceptTerms = isAcceptingTerms.value
  emit('submit-access-key', localProfileAction, () => {
    isLoading.value = false
  })
}

const onSubmitAddUser = async () => {
  isLoading.value = true
  localProfileAction.acceptTerms = isAcceptingTerms.value
  emit('submit-add-user', localProfileAction, () => {
    isLoading.value = false
  })
}
</script>