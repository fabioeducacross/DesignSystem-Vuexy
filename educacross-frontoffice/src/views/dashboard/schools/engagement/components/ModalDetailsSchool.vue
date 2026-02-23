<template>
  <b-modal
    ref="Modal"
    :visible="value"
    hide-footer
    centered
    no-close-on-backdrop
    static
    header-bg-variant="light-primary"
    @close="closeModal"
    @hide="closeModal"
  >
    <div>
      <h2 class="text-center">{{ data.institutionName }}</h2>
      <p class="mb-0 font-bold">Cidade</p>
      <p>{{ data.institutionDetail.city }}</p>
      <p class="mb-0 font-bold">Grupo de Escolas</p>
      <p>{{ data.networkGroupName }}</p>
      <p class="mb-0 font-bold">Endereço</p>
      <p v-if="data.institutionDetail">{{ data.institutionDetail.address }}</p>
      <p class="mb-0 font-bold">Telefone</p>
      <p v-if="data.institutionDetail">{{ data.institutionDetail.phone }}</p>
      <p class="mb-0 font-bold">E-mail</p>
      <p v-if="data.institutionDetail">{{ data.institutionDetail.email }}</p>
      <template
        v-if="
          $can(ACTION.READ, PERMISSION.GENERAL.BETA_FEATURES) &&
          data.institutionDetail &&
          data.institutionDetail.secretariat
        "
      >
        <p class="mb-0 font-bold">Administrador Escolar</p>
        <p class="mb-0">Nome: {{ data.institutionDetail.secretariat.name }}</p>
        <p>E-mail: {{ data.institutionDetail.secretariat.email }}</p>
      </template>
    </div>
  </b-modal>
</template>

<script setup>
  import { ACTION, PERMISSION } from '@/consts/permissions'

  const props = defineProps({
    data: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Boolean,
    },
  })

  const emit = defineEmits(['input'])

  const closeModal = () => {
    emit('input', false)
  }
</script>

<style lang="scss" scoped>
  .modal-icon {
    font-size: 80px;
  }
</style>