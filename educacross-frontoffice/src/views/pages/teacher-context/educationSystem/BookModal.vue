<template>
  <section>
    <b-modal
      v-model="showModal"
      hide-header
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      centered
    >
      <section>
        <h2>Selecione uma Turma</h2>
        <b-form-group>
          <ESelect
            id="classSelect"
            v-model="selectedClass"
            label="Name"
            track-by="ClassId"
            :options="filteredClases"
            :clearable="false"
            placeholder="Selecione uma Turma"
          >
            <template #option="{ Name, SerieName }">
              <div>
                {{ Name }}
                <b-badge pill variant="light-primary">
                  {{ SerieName }}
                </b-badge>
              </div>
            </template>
            <template #noOptions> Nenhuma Turma Encontrada </template>
          </ESelect>
        </b-form-group>
      </section>
    </b-modal>
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import utils from '@/utils/teacher-utils/utils'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

const emit = defineEmits(['update'])

const { classe, subject, subjects } = useFilters()

const serieId = parseInt(router.currentRoute.query.serieId, 10)
const subjectId = parseInt(router.currentRoute.query.subjectId, 10)

const showModal = ref(false)
const toogleModal = value => {
  showModal.value = value
}

const selectedClass = ref(null)
const classes = computed(() => store.getters.classes)

const filteredClases = computed(() => {
  if (!classes.value.length) return []

  return classes.value
    .filter(c => c.SerieId === serieId && c.Students)
    .sort((a, b) => {
      return a.SerieId - b.SerieId
    })
})

const setClass = payload => {
  if (!payload) return

  classe.value = payload

  nextTick(() => {
    emit('update')
    toogleModal(false)
  })
}

onMounted(() => {
  if (!serieId || !subjectId) {
    emit('update')
    return
  }

  // select subject
  const subjectToSelect = subjects.value.find(s => s.id === subjectId)
  if (subjectToSelect) {
    subject.value = subjectToSelect
  }

  if (filteredClases.value.length === 1) {
    classe.value = filteredClases.value[0]
    emit('update')
    return
  }

  toogleModal(true)
})

watch(selectedClass, newVal => {
  setClass(newVal)
})
</script>
