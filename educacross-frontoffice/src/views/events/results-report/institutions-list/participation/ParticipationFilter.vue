<template>
  <b-card>
    <b-row>
      <b-col>
        <b-skeleton-wrapper :loading="isLoading">
          <template v-slot:loading>
            <div>
              <b-row>
                <b-col cols="12">
                  <b-skeleton type="text" class="w-100 mb-0" height="50px"></b-skeleton>
                </b-col>
              </b-row>
            </div>
          </template>
          <div>
            <label for="network-group">Grupo de Escolas</label>
            <ESelect
              id="network-group"
              :value="networkGroup"
              :options="networkGroups"
              label="name"
              :clearable="false"
              :searchable="false"
              @input="setNetworkGroup"
            />
          </div>
        </b-skeleton-wrapper>
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
const isLoading = ref(false)
const networkGroups = ref([])

isLoading.value = true

getNetworkGroups()
  .then(response => {
    networkGroups.value = response.data
  })
  .finally(() => {
    networkGroups.value.unshift({ id: null, name: 'Todos' })
    isLoading.value = false
  })
</script>
