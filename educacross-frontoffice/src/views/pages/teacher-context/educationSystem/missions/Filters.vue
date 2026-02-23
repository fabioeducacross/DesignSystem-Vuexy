<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="6">
        <b-form-group label="Unidades do livro" label-for="unity">
          <ESelect
            id="unity"
            v-model="unity"
            :options="unitys"
            :disabled="loadingDetails"
            :loading="loadingDetails"
            @change="resetAndfetch"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6">
        <b-form-group label="Status" label-for="status">
          <ESelect
            id="status"
            v-model="status"
            label="label"
            :options="statusOptions"
            :clearable="false"
            :disabled="loadingDetails"
            :loading="loadingDetails"
            @change="resetAndfetch"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <BookModal @update="fetchDetails" />
  </b-card>
</template>

<script setup>
  import ESelect from '@/components/selects/ESelect.vue'
  import { LEGENDS } from '@/consts/legends'
  import BookModal from '@/views/pages/teacher-context/educationSystem/BookModal.vue'
  import { useEducationSystemMissions } from '@/views/pages/teacher-context/educationSystem/missions/useEducationSystemMissions.js'
  import { ref } from 'vue'

  const {
    fetchDetails,
    resetAndfetch,
    unitys,
    loadingDetails,
    unity,
    status,
    defaultStatusOption,
  } = useEducationSystemMissions()

  const statusOptions = ref([])

  statusOptions.value = [defaultStatusOption, ...LEGENDS.guideStatus]
  status.value = defaultStatusOption
</script>

<style lang="scss" scoped></style>