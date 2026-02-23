<template>
  <section>
    <b-row>
      <b-col cols="auto">
        <SelectSubject />
      </b-col>
      <b-col>
        <b-form-group label="Status" label-for="status">
          <v-select
            id="status"
            v-model="statusFilter"
            :options="status"
            :reduce="s => s.value"
            :clearable="false"
            :searchable="false"
            responsive
          >
            <template v-slot:no-options> Nenhum status foi encontrado </template>
          </v-select>
        </b-form-group>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
  import InfinityScroll from '@/components/selects/InfinityScroll.vue'
  import SelectSubject from '@/layouts/components/SelectSubject.vue'
  import { ref, watch } from 'vue'
  import vSelect from 'vue-select'

  const props = defineProps({
    statusEnum: {
      type: Object,
      required: true,
    },
  })

  const emit = defineEmits(['input'])

  const statusFilter = ref(null)

  const status = Object.values(props.statusEnum).map(s => ({
    label: s.label,
    value: s.value,
  }))
  status.unshift({
    label: 'Todos',
    value: null,
  })

  const emitFilter = () => {
    emit('input', {
      status: statusFilter.value,
    })
  }

  watch([statusFilter], () => {
    emitFilter()
  })
</script>