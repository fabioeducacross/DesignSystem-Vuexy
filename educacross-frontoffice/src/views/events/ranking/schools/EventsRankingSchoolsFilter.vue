<template>
  <b-card>
    <b-row>
      <b-col cols="12">
        <b-form-group label="Grupo de escolas" label-for="school-group-select">
          <ESelect
            id="school-group-select"
            :value="networkGroup"
            :options="networkGroups"
            label="name"
            :clearable="false"
            :searchable="false"
            @input="setNetworkGroup"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import { useEvents } from '@/views/events/useEvents.js'
import { ref } from 'vue'

const { networkGroup, setNetworkGroup } = useEvents()

const networkGroups = ref([])

getNetworkGroups()
  .then(response => {
    networkGroups.value = response.data
  })
  .finally(() => {
    networkGroups.value.unshift({
      id: null,
      name: 'Todos',
    })
  })
</script>

<style lang="scss" scoped></style>
