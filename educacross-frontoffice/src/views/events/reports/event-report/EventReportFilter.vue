<template>
  <b-skeleton-wrapper :loading="isLoading">
    <template v-slot:loading>
      <b-row>
        <b-col cols="12">
          <b-skeleton type="text" class="w-100 mb-2" height="100px" />
        </b-col>
      </b-row>
    </template>

    <b-card>
      <b-row>
        <b-col cols="12">
          <label for="school-group">Selecione o grupo de escolas</label>
          <ESelect
            id="school-group"
            v-model="selectedSchoolGroup"
            :options="networkGroups"
            label="name"
            :clearable="false"
            :searchable="false"
          />
        </b-col>
      </b-row>
    </b-card>
  </b-skeleton-wrapper>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import { ref, onMounted, watch } from 'vue'

const emit = defineEmits(['input'])

const isLoading = ref(false)

const selectedSchoolGroup = ref({
  id: null,
  name: 'Todas',
})

const networkGroups = ref([])

const fetchNetworkGroups = () => {
  isLoading.value = true
  getNetworkGroups()
    .then(response => {
      networkGroups.value = response.data
    })
    .finally(() => {
      isLoading.value = false
      networkGroups.value.unshift({
        id: null,
        name: 'Todos',
      })
    })
}

const emitFilter = () => {
  emit('input', {
    NetworkGroupId: selectedSchoolGroup.value?.id || null,
  })
}

watch([selectedSchoolGroup], () => {
  emitFilter()
})

onMounted(() => {
  fetchNetworkGroups()
})
</script>

<style lang="scss" scoped></style>
