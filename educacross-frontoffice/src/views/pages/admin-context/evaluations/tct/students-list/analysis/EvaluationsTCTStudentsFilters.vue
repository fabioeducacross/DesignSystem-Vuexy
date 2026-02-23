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
                  :options="networkGroups"
                  label="name"
                  :clearable="false"
                />
              </b-card>
            </b-col>
            <b-col cols="12" md="6" lg="4">
              <b-card>
                <ExamesFilter v-model="params" :data="examesOptions" />
              </b-card>
            </b-col>
          </b-row>
        </b-skeleton-wrapper>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import ExamesFilter from '@/views/pages/admin-context/evaluations/components/ExamesFilter'
import { ref, watch, toRefs } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  networkGroups: {
    type: Array,
    required: false,
  },
  examesOptions: {
    type: Array,
    required: false,
  },
})

const emit = defineEmits(['input'])

const params = ref([])
const selectedSchoolGroup = ref({})
const selectedExames = ref([])

const { networkGroups } = toRefs(props)

const emitFilter = () => {
  emit('input', {
    NetworkGroupId: selectedSchoolGroup.value?.id,
    SubjectId: params.value.selectedExames,
  })
}

watch(networkGroups, (newGroups) => {
  selectedSchoolGroup.value = newGroups && newGroups.length > 0 ? newGroups[0] : {}
})

watch(selectedSchoolGroup, () => {
  emitFilter()
})

watch(params, () => {
  emitFilter()
})

emitFilter()
</script>
