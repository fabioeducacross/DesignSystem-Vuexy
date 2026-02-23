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
                <b-form-group :label="$t('schoolYear')" label-for="school-year">
                  <ESelect
                    v-model="selectedSerie"
                    :options="seriesOptions"
                    label="name"
                    track-by="id"
                    :clearable="false"
                    :loading="isLoading"
                    :disabled="isLoading"
                    placeholder="selectSchoolYearLabel"
                  />
                </b-form-group>
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
  import EvaluationsInstutionsExamesFilter from './EvaluationsInstitutionsClassesExamesFilter.vue'
  import ESelect from '@/components/selects/ESelect.vue'
  import { ref, toRefs, watch } from 'vue'

  const props = defineProps({
    isLoading: {
      type: Boolean,
      required: true,
    },
    seriesOptions: {
      type: Array,
      required: false,
    },
    examesOptions: {
      type: Array,
      required: false,
    },
  })

  const emit = defineEmits(['input'])

  const selectedSerie = ref({})
  const params = ref([])
  const selectedExames = ref([])

  const { seriesOptions } = toRefs(props)

  const emitFilter = () => {
    emit('input', {
      SerieId: selectedSerie.value && selectedSerie.value.id,
      SubjectId: params.value && params.value.selectedExames,
    })
  }

  watch(seriesOptions, () => {
    selectedSerie.value = seriesOptions.value && seriesOptions.value.length > 0 ? seriesOptions.value[0] : {}
  })

  watch(selectedSerie, () => {
    emitFilter()
  })

  watch(params, () => {
    emitFilter()
  })

  emitFilter()
</script>
