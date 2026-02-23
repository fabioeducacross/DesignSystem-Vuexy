<template>
  <section>
    <b-row class="match-height">
      <b-col>
        <b-skeleton-wrapper :loading="isLoading">
          <template v-slot:loading>
            <div>
              <b-row>
                <b-col cols="12" md="6" lg="8">
                  <b-skeleton type="text" class="w-100 mb-2" height="50px" />
                </b-col>
                <b-col cols="12" md="6" lg="4">
                  <b-skeleton type="text" class="w-100 mb-2" height="50px" />
                </b-col>
              </b-row>
            </div>
          </template>
          <b-row class="match-height">
            <b-col cols="12" md="6" lg="8">
              <b-card>
                <label for="school-group">Selecione o grupo de Escolas</label>
                <ESelect
                  id="school-group"
                  v-model="selectedSchoolGroup"
                  :options="networkGroups || []"
                  label="name"
                  :clearable="false"
                  placeholder="selectAnOption"
                />
              </b-card>
            </b-col>
            <b-col cols="12" md="6" lg="4">
              <b-card>
                <EvaluationsInstutionsExamesFilter v-model="params" :data="examesOptions" />
              </b-card>
            </b-col>
          </b-row>
        </b-skeleton-wrapper>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import EvaluationsInstutionsExamesFilter from './EvaluationsInstitutionsExamesFilter.vue'
import ESelect from '@/components/selects/ESelect.vue'
import { ref, toRefs, watch } from 'vue'

// Props
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  networkGroups: {
    type: Array,
    required: false,
    default: () => [],
  },
  examesOptions: {
    type: Array,
    required: false,
    default: () => [],
  },
})

// Emits
const emit = defineEmits(['input'])

// Reactive state
const params = ref([])
const selectedSchoolGroup = ref({})

// ToRefs for props
const { networkGroups } = toRefs(props)

// Unused in template but preserved per original code
const selectedExames = ref([])

// Emit filter event with selected values
const emitFilter = () => {
  emit('input', {
    NetworkGroupId: selectedSchoolGroup.value?.id,
    SubjectId: params.value.selectedExames,
  })
}

// Watchers
watch(networkGroups, () => {
  selectedSchoolGroup.value = networkGroups.value && networkGroups.value.length > 0 ? networkGroups.value[0] : {}
})

// When selected school group changes, emit filter
watch(selectedSchoolGroup, () => {
  emitFilter()
})

// When params change, emit filter
watch(params, () => {
  emitFilter()
})

// Initial emit
emitFilter()
</script>
