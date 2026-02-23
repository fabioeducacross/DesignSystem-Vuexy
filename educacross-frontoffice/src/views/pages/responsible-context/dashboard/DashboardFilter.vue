<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="3">
        <SelectSubject />
      </b-col>
      <b-col cols="12" md="3">
        <b-form-group label="Tipo de atividade" label-for="Activity-Type">
          <ESelect
            id="Activity-Type"
            v-model="selectedActivityType"
            :options="activityTypeOptions"
            label="label"
            :clearable="false"
            responsive
            :searchable="false"
            @change="emitFilter"
          >
            <template #noOptions> Nenhuma opcao foi encontrada. </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="3">
        <b-form-group label="Data de inicio da atividade" label-for="initial-month">
          <ESelect
            id="initial-month"
            v-model="MonthI"
            :options="filteredBeginMonths"
            label="name"
            placeholder="Selecione um mes"
            :clearable="false"
            :searchable="false"
            :disabled="!selectedActivityType.id"
            @change="emitFilter"
          >
            <template #noOptions> Nenhum mes encontrado </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="3">
        <b-form-group label="Data de termino da atividade" label-for="final-month">
          <ESelect
            id="final-month"
            v-model="MonthF"
            :options="filteredEndMonths"
            label="name"
            placeholder="Selecione um mes"
            :clearable="false"
            :searchable="false"
            :disabled="!selectedActivityType.id"
            @change="emitFilter"
          >
            <template #noOptions> Nenhum mes encontrado </template>
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { activityType } from '@/consts/activityType.js'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import useFilters from '@/store/filters/useFilters.js'
import { getMonthList } from '@/utils/date'
import { ref, computed, getCurrentInstance, watch } from 'vue'

const emit = defineEmits(['input', 'noActivitiesAvailable'])

const vm = getCurrentInstance().proxy
const isLoading = ref(true)
const { subject } = useFilters()

const activityTypeOptions = computed(() =>
  activityType.filter(ac => vm.$can(ac.action, ac.permission))
)
const selectedActivityType = ref({})

// Set initial selected activity type if available
if (activityTypeOptions.value.length > 0) {
  selectedActivityType.value = activityTypeOptions.value[0]
}

const monthList = getMonthList()

// MonthI e MonthF como objetos para compatibilidade com ESelect
const MonthI = ref(monthList.find(m => m.id === 1) || { id: 1, name: 'Janeiro' })
const MonthF = ref(
  monthList.find(m => m.id === new Date().getMonth() + 1) || {
    id: new Date().getMonth() + 1,
  },
)

const filteredBeginMonths = computed(() => {
  return monthList.filter(month => month.id <= MonthF.value.id)
})
const filteredEndMonths = computed(() => {
  return monthList.filter(month => month.id >= MonthI.value.id)
})

const emitFilter = () => {
  if (selectedActivityType.value && selectedActivityType.value.id) {
    emit('input', {
      subjectId: subject.value.id,
      type: selectedActivityType.value.id,
      MonthI: MonthI.value?.id,
      MonthF: MonthF.value?.id,
    })
  }
}

watch(subject, () => emitFilter(), { deep: true })

watch(
  activityTypeOptions,
  () => {
    emit('noActivitiesAvailable', activityTypeOptions.value.length > 0)
  },
  { immediate: true }
)

isLoading.value = false
</script>

<style lang="scss" scoped></style>
