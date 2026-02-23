<template>
  <b-card>
    <b-row>
      <b-col cols="auto">
        <SelectSubject option-all />
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
  import { StatusEnum } from '@/consts/evaluationsEnum.js'
  import SelectSubject from '@/layouts/components/SelectSubject.vue'
  import useFilters from '@/store/filters/useFilters.js'
  import { ref, watch } from 'vue'
  import vSelect from 'vue-select'

  const emit = defineEmits(['input'])

  const { subject } = useFilters()
  const status = ref([
    {
      value: null,
      label: 'Todos',
    },
    ...Object.values(StatusEnum),
  ])

  const statusFilter = ref({
    value: null,
    label: 'Todos',
  })

  const emitFilter = () => {
    emit('input', {
      status: statusFilter.value?.value !== undefined ? statusFilter.value.value : null,
    })
  }

  watch(
    [subject, statusFilter],
    () => {
      emitFilter()
    },
    { deep: true },
  )
</script>

<style lang="scss" scoped></style>