<template>
  <b-modal
    ref="Modal"
    :title="`${group.name} - ${group.className}`"
    :visible="value"
    hide-footer
    centered
    size="lg"
    no-close-on-backdrop
    header-bg-variant="light-primary"
    static
    @hide="closeModal"
    @close="closeModal"
  >
    <ListTableLocalSorting :loading="loading" :table-columns="tableColumns" :data-table="dataTable">
    </ListTableLocalSorting>
  </b-modal>
</template>

<script setup>
  import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
  import { getGroup } from '@/services/shared/groups/Groups.service.js'
  import { ref, watch, computed } from 'vue'

  const props = defineProps({
    value: {
      type: Boolean,
    },
    group: {},
  })
  const emit = defineEmits(['input'])

  const loading = ref(true)
  const dataTable = ref([])
  const tableColumns = computed(() => [
    {
      key: 'name',
      label: 'Aluno',
      sortable: true,
      searchable: true,
    },
  ])

  const closeModal = () => {
    emit('input', false)
  }

  const fetchData = () => {
    loading.value = true

    getGroup(props.group.id)
      .then(({ data }) => {
        dataTable.value = data.students
      })
      .finally(() => {
        loading.value = false
      })
  }

  watch(
    () => props.value,
    () => {
      if (props.value) {
        fetchData()
      }
    },
  )
</script>

<style lang="scss" scoped>
  .modal-icon {
    font-size: 80px;
  }
</style>