<template>
  <div class="d-flex flex-column align-items-center p-1">
    <b-img src="@/assets/images/belinha/maintenance.svg" class="mb-2" />
    <div class="d-flex flex-column align-items-center gap-2 text-center">
      <template>
        <h3>Escolha uma turma</h3>
        <p>Para ver essa missão, escolha uma de suas turmas:</p>
        <div class="mb-2">
          <ESelect v-model="selectedClass" :options="classes" :clearable="false" label="Name">
            <template v-slot:selected-option="{ Name, SerieName }">
              <span class="d-flex class-badge mr-1">
                <span>{{ Name }}</span>
                <b-badge v-if="SerieName" pill variant="light-primary" class="ml-1">{{
                  SerieName
                }}</b-badge>
              </span>
            </template>
            <template v-slot:option="{ Name, SerieName, ClassId }">
              <span class="d-flex" style="vertical-align: middle">
                {{ Name }}
                <b-badge
                  v-if="SerieName"
                  pill
                  variant="light-primary"
                  :class="selectedClass && selectedClass.id === ClassId ? 'bg-white text-primary' : ''"
                  class="ml-1"
                  >{{ SerieName }}</b-badge
                >
              </span>
            </template>
          </ESelect>
        </div>
      </template>
    </div>

    <div class="d-flex gap-2">
      <b-button variant="outline-danger" @click="emit('close')"> Cancelar </b-button>
      <b-button variant="primary" @click="sendSelected"> Continuar </b-button>
    </div>
  </div>
</template>

<script setup>
  import ESelect from '@/components/selects/ESelect.vue'
  import { emitter } from '@/eventBus'

  const props = defineProps({
    classes: { type: Array, require: true, default: () => [] },
  })

  const emit = defineEmits(['close', 'selectedClass'])

  const loadingSelect = ref(false)
  const selectedClass = ref(undefined)
  const validSelect = ref(true)

  if (props.classes && props.classes.length > 0) {
    selectedClass.value = props.classes[0]
  }

  const sendSelected = () => {
    if (selectedClass.value) {
      emitter.emit('chooseInstitutionMissionByTeacherNavigation', selectedClass.value.ClassId)
      emit('selectedClass', selectedClass.value)
    }
  }
</script>

<style lang="scss" scoped></style>