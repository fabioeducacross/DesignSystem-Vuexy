<template>
  <b-modal
    ref="Modal"
    :visible="value"
    title="Alunos"
    hide-footer
    centered
    static
    header-bg-variant="light-primary"
    @close="closeModal"
  >
    <div>
      <b-list-group>
        <b-list-group-item v-for="(item, index) in data" :key="index">{{ item }}</b-list-group-item>
      </b-list-group>
    </div>
  </b-modal>
</template>

<script setup>
  // props
  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Boolean,
    },
  })

  // emits
  const emit = defineEmits(['input'])

  // methods
  const closeModal = () => {
    emit('input', false)
  }
</script>

<style lang="scss" scoped>
  .modal-icon {
    font-size: 80px;
  }
</style>