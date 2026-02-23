<template>
  <div v-if="isCard" class="cardMode">
    <div>
      <InitialsRed :name="content.name" />
      <Status :content="content" />
    </div>
    {{ content.name }}
  </div>
  <div v-else class="table">
    <InitialsRed :name="content.name" />
    {{ content.name }}
  </div>
</template>

<script setup>
  import InitialsRed from '@/views/pages/admin-context/shared/table-columns-components/InitialsRed.vue'
  import Status from '@/views/pages/admin-context/shared/table-columns-components/Status.vue'

  const props = defineProps({
    content: {
      type: Object,
      required: true,
    },
    isCard: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';
  .cardMode {
    width: 100%;
    display: flex;
    flex-direction: column;
    color: #6e6b7b;
    font-weight: 600;

    img {
      margin: 0 0.75rem;
    }
  }

  .table {
    display: flex;
    flex-direction: row;
    align-items: center;

    font-weight: 600;

    margin-bottom: 0;

    img {
      margin: 0 0.75rem;
    }
  }
</style>