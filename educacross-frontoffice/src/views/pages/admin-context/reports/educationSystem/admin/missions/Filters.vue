<template>
  <b-card>
    <b-row>
      <b-col cols="12" md>
        <b-form-group :label="$t('Turmas')" label-for="classes">
          <ESelect
            id="classes"
            label="name"
            :value="classe"
            :options="classes"
            :clearable="false"
            :loading="classesLoading"
            :disabled="classesLoading || loadingDetails"
            :page="classesPage"
            :total-pages="classesTotalpages"
            paginated
            @input="setclasses"
            @nextPage="fetchClasses"
          >
            <template v-slot:no-options>{{ $t('classesNotFound') }}</template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Unidades do livro" label-for="unity">
          <ESelect
            id="unity"
            v-model="unity"
            :options="unitys"
            :disabled="loadingDetails"
            :loading="loadingDetails"
            @change="resetAndfetch"
          ></ESelect>
        </b-form-group>
      </b-col>
      <b-col v-if="classe.id" cols="12" md="4">
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
          ></ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { LEGENDS } from '@/consts/legends'
import useFilters from '@/store/filters/useFilters.js'
import { useEducationSystemMissions } from '@/views/pages/admin-context/reports/educationSystem/admin/missions/useEducationSystemMissions.js'
import { ref } from 'vue'

const { classe } = useFilters()
const {
  unitys,
  unity,
  status,
  defaultStatusOption,
  resetAndfetch,
  fetchDetails,
  loadingDetails,
  classesLoading,
  classes,
  classesPage,
  classesTotalpages,
  fetchClasses,
} = useEducationSystemMissions()

// Initialize classe to default value
classe.value = { name: 'Todas as turmas', id: null }

const statusOptions = ref([])

statusOptions.value = [defaultStatusOption, ...LEGENDS.guideStatus]
status.value = defaultStatusOption

const setclasses = value => {
  classe.value = value

  if (!value.id) {
    status.value = defaultStatusOption
  }

  resetAndfetch()
}

// Restore the original initialization call
fetchDetails()
</script>

<style lang="scss" scoped></style>