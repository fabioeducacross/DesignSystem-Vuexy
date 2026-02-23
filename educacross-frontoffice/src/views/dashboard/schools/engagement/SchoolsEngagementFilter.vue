<template>
  <b-card>
    <b-row>
      <b-col>
        <b-form-group label="Grupo de Escolas" label-for="network-group">
          <ESelect
            id="network-group"
            v-model="networkGroup"
            label="name"
            :options="networkGroups"
            :clearable="false"
            :loading="loading"
            :disabled="loading"
            multiple
            @change="changeFilter"
          />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Ano Escolar" label-for="schoolYear">
          <ESelect
            id="schoolYear"
            v-model="schoolYear"
            label="name"
            :options="schoolYears"
            :clearable="false"
            :loading="loading"
            :disabled="loading"
            @change="changeFilter"
          />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Período" label-for="month">
          <ESelect
            id="month"
            v-model="month"
            label="name"
            :options="months"
            :clearable="false"
            :disabled="loading"
            @change="changeFilter"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import { getSeries } from '@/services/shared/serie/Serie.Service'
import { getMonthList } from '@/utils/date'
import {useSchoolEngagement} from '@/views/dashboard/schools/engagement/useSchoolEngagement'
import { computed, ref } from 'vue'

const { networkGroup, schoolYear, month, fetchPageInfo } = useSchoolEngagement()

const networkGroups = ref([])
const schoolYears = ref([])
const months = computed(() => [{ id: null, name: 'Todo o período' }, ...getMonthList()])
const loading = ref(true)

const fetchNetworkGroups = async () => {
  try {
    const { data } = await getNetworkGroups()
    networkGroups.value = data
  } catch (_error) {
    loading.value = false
  }
}

const fetchSeries = async () => {
  try {
    const { data } = await getSeries()
    schoolYears.value = data.data
    schoolYears.value.unshift({ id: null, name: 'Todos os anos' })
    schoolYear.value = schoolYears.value[0]
  } catch (_error) {
    loading.value = false
  }
}

const changeFilter = () => {
  fetchPageInfo()
}

fetchPageInfo()

Promise.all([fetchNetworkGroups(), fetchSeries()]).finally(() => {
  loading.value = false
})
</script>

<style lang="scss" scoped></style>