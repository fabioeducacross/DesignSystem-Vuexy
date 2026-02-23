<template>
  <b-row class="match-height">
    <b-col cols="auto">
      <b-card>
        <ExamesFilter v-model="params" :data="examesOptions" />
      </b-card>
    </b-col>
    <b-col col="">
      <b-card>
        <b-row>
          <b-col cols="12" :md="showSelectNetworkGroups ? 6 : 12">
            <b-form-group label="Prova" label-for="evaluation">
              <ESelect
                :value="selectedSerie"
                :options="seriesOptions"
                @change="setSelectedSeries"
              />
            </b-form-group>
          </b-col>
          <b-col v-if="showSelectNetworkGroups" cols="12" md="6">
            <b-form-group label="Grupo de Escolas" label-for="school-group">
              <ESelect
                id="school-group"
                :value="selectedSchoolGroup"
                :options="networkGroups"
                label="name"
                :clearable="false"
                :searchable="false"
                @input="setNetworkGroups"
              >
                <template #noOptions> Nenhuma opção foi encontrada. </template>
              </ESelect>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import ExamesFilter from '@/views/pages/admin-context/evaluations/components/ExamesFilter'
import { useEvaluation } from '@/views/pages/admin-context/evaluations/useEvaluation'
import { computed, ref, watch } from 'vue'

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
    default: () => [],
  },
})

const emit = defineEmits(['input'])

const { subject } = useFilters()
const { evaluationSeries, serieDefaultOption } = useEvaluation()

const params = ref([])
const selectedSchoolGroup = ref({
  id: null,
  name: 'Todos os grupos',
})
const selectedSerie = ref(serieDefaultOption)

const seriesOptions = computed(() => [serieDefaultOption, ...evaluationSeries.value])

const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])

const showSelectNetworkGroups = computed(
  () => store.getters['evaluations/networkGroups'].length > 1,
)

const emitFilter = () => {
  emit('input', {
    NetworkGroupId: selectedSchoolGroup.value?.id || null,
    SubjectId: subject.value.id,
    SerieId: selectedSerie.value.id,
  })
}

watch([params], () => {
  emitFilter()
})

const setNetworkGroups = value => {
  selectedSchoolGroup.value = value
  emitFilter()
}

const setSelectedSeries = value => {
  selectedSerie.value = value
  emitFilter()
}
</script>
