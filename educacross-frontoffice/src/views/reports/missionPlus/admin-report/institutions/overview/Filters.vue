<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject />
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Grupo de Escolas" label-for="network-group">
          <ESelect
            id="network-group"
            label="name"
            :value="networkGroup"
            :options="networkGroups"
            :clearable="false"
            :loading="loadingNetworkGroups"
            :disabled="loadingNetworkGroups"
            @input="setNetworkGroup"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Ano Escolar" label-for="schoolYear">
          <ESelect
            :disabled="schoolYearsLoading"
            :value="serie"
            :options="schoolYears"
            :page="schoolYearPage"
            :total-pages="schoolYearTotalpages"
            :loading="schoolYearsLoading"
            name="schoolYear"
            paginated
            placeholder="selectOneSchoolYearLabel"
            label="name"
            @nextPage="fetchSchoolYear"
            @input="setSchoolYear"
          >
            <template v-slot:no-options> {{ $t('schoolYearNotFound') }} </template>
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group label="Período" label-for="month">
          <ESelect
            id="month"
            label="name"
            :value="period"
            :options="months"
            :clearable="false"
            @input="setMonth"
          >
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
  import ESelect from '@/components/selects/ESelect.vue'
  import SelectSubject from '@/layouts/components/SelectSubject.vue'
  import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
  import { getSeries } from '@/services/shared/serie/Serie.Service.js'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters.js'
  import { getMonthList } from '@/utils/date'
  import { ref, computed, getCurrentInstance, watch } from 'vue'

  const vm = getCurrentInstance().proxy

  const { networkGroup, serie, period, classe, subject } = useFilters()

  const loadingNetworkGroups = ref(true)
  const networkGroups = ref([])

  const fetchNetworkGroups = () => {
    getNetworkGroups()
      .then(response => {
        networkGroups.value = response.data || []

        networkGroups.value.unshift({ id: null, name: 'Todos os grupos de Escolas' })
        networkGroup.value = networkGroups.value[0]
      })
      .finally(() => {
        loadingNetworkGroups.value = false
      })
  }

  const setNetworkGroup = value => {
    networkGroup.value = value
    fetch()
  }

  fetchNetworkGroups()

  // schoolYear

  classe.value = {}
  serie.value = { id: null, name: 'Todos os anos' }

  const schoolYears = ref([])
  const schoolYearsLoading = ref(true)
  const schoolYearPage = ref(1)
  const schoolYearTotalpages = ref(1)

  const subjectId = computed(() => subject.value.id)

  watch(subjectId, () => {
    store.commit('moduleMissionsPlusReportAdminInstitutionsOverview/loading', true)
    fetchSchoolYear()
  })

  const fetchSchoolYear = async (ctx = {}) => {
    schoolYearsLoading.value = true

    const { page } = ctx
    schoolYearPage.value = page || 1

    try {
      const { data } = await getSeries({
        Page: schoolYearPage.value,
        Subjects: [subject.value.id],
      })

      const options = data.data

      if (schoolYearPage.value === 1 && !options.length) {
        setNoSerie(true)
        schoolYearsLoading.value = false

        return
      }

      if (schoolYearPage.value === 1) {
        schoolYears.value = []
        options.unshift({ id: null, name: 'Todos os anos' })
        setSchoolYear(options[0])
      }

      schoolYears.value.push(...options)
      schoolYearTotalpages.value = data.totalPages
    } catch (error) {
      setNoSerie(true)
    }

    schoolYearsLoading.value = false
  }

  const setSchoolYear = value => {
    serie.value = value
    fetch()
  }

  const setNoSerie = noSchoolYear => {
    if (noSchoolYear) {
      schoolYears.value = [
        {
          id: false,
          name: 'Nenhum ano escolar encontrado',
        },
      ]

      serie.value = schoolYears.value[0]
      store.commit('moduleMissionsPlusReportAdminInstitutionsOverview/loading', false)
      store.commit('moduleMissionsPlusReportAdminInstitutionsOverview/cards', {})
      store.commit('moduleMissionsPlusReportAdminInstitutionsOverview/data', [])
      store.commit('moduleMissionsPlusReportAdminInstitutionsOverview/total', [])
    }
  }

  // Periodo

  period.value = { id: null, name: 'Todo o período' }

  const months = computed(() => {
    return [
      {
        id: null,
        name: 'Todo o período',
      },
      ...getMonthList(),
    ]
  })

  const setMonth = month => {
    period.value = month
    fetch()
  }

  // Fetch
  const fetch = () => {
    vm.$bus.emit('resetPage')
    store.commit('moduleMissionsPlusReportAdminInstitutionsOverview/setParams', {
      Page: 1,
    })
    store.dispatch('moduleMissionsPlusReportAdminInstitutionsOverview/fetch')
  }
</script>

<style lang="scss" scoped></style>