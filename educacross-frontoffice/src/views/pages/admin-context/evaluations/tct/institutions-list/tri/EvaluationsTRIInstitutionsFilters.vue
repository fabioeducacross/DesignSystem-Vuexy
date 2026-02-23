<template>
  <b-row class="match-height">
    <b-col cols="auto">
      <b-card>
        <ExamesFilter :data="examesOptions" />
      </b-card>
    </b-col>
    <b-col col="">
      <b-card>
        <label for="school-group">Grupo de Escolas</label>
        <ESelect
          id="school-group"
          label="name"
          :value="networkGroup"
          :options="networkGroups"
          :clearable="false"
          @input="setNetworkGroups"
        >
        </ESelect>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import router from '@/router'
import { getNetworkGroupsEvaluationNetworkManager } from '@/services/shared/network-groups/NetworkGroups.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import ExamesFilter from '@/views/pages/admin-context/evaluations/components/ExamesFilter'
import { computed, ref } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
})

const evaluationId = router.currentRoute.params.evaluationId

const networkGroups = ref([])
const examesOptions = computed(() => store.getters['evaluations/exames'])
const { networkGroup } = useFilters()

getNetworkGroupsEvaluationNetworkManager(evaluationId).then(response => {
  networkGroups.value = response.data
  networkGroups.value.unshift({
    id: null,
    name: 'Todos os grupos',
  })
  networkGroup.value = networkGroups.value[0]
})

const setNetworkGroups = value => {
  networkGroup.value = value
}
</script>