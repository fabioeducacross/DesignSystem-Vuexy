<template>
  <b-card class="mb-0">
    <b-row>
      <b-col cols="12">
        <ListTableSelectLocal
          v-model="selectedStudents"
          :loading="loading"
          :table-columns="tableColumns"
          :data-table="filteredData"
          force-resposive
          search-placeholder="searchForStudent"
          selected-label="Alunos selecionados"
          card-class="border-arround"
        >
        </ListTableSelectLocal>
      </b-col>
      <b-col cols="12" md="6">
        <b-button variant="outline-danger" block @click="emit('close')"> Cancelar </b-button>
      </b-col>
      <b-col cols="12" md="6">
        <b-button variant="outline-primary" block @click="emit('input', selectedStudents)">
          Adicionar alunos ao grupo
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ListTableSelectLocal from '@/components/table/ListTableSelectLocal.vue'
import axiosIns from '@/libs/axios'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  classe: {
    type: [Object, null],
    default: null,
  },
  value: {
    type: Array,
  },
})

const emit = defineEmits(['input', 'close'])

const loading = ref(true)
const selectedStudents = ref([])
const tableColumns = [{ key: 'name', label: 'Aluno', sortable: true, searchable: true }]
const dataTable = ref([])

const fetchData = () => {
  loading.value = true

  if (!props.classe) {
    loading.value = false
    return
  }
  axiosIns
    .get('/v1/students/label', {
      params: {
        classId: props.classe.id,
      },
    })
    .then(({ data }) => {
      dataTable.value = data
    })
    .finally(() => {
      loading.value = false
    })
}

const filteredData = computed(() => {
  return dataTable.value.filter(data => !props.value.some(s => s.id === data.id))
})

watch(
  () => props.classe,
  () => {
    fetchData()
  },
)

fetchData()
</script>