<template>
  <div>
    <div class="container py-2">
      <h3 class="mb-2">BootstrapVue Radio Test</h3>
      <div class="mb-2">Selected (number): {{ selected }}</div>

      <b-form-group label="Disabled group with preset value">
        <b-form-radio-group v-model="selected" :disabled="isDisabled" name="test-group">
          <b-form-radio :value="1">A</b-form-radio>
          <b-form-radio :value="2">B</b-form-radio>
          <b-form-radio :value="3">C</b-form-radio>
          <b-form-radio :value="4">D</b-form-radio>
          <b-form-radio :value="0">N/A</b-form-radio>
        </b-form-radio-group>
      </b-form-group>

      <div class="d-flex gap-1 align-items-center mt-2">
        <b-button size="sm" variant="primary" @click="selected = 1">Set A (1)</b-button>
        <b-button size="sm" variant="primary" @click="selected = 2">Set B (2)</b-button>
        <b-button size="sm" variant="primary" @click="selected = 3">Set C (3)</b-button>
        <b-button size="sm" variant="primary" @click="selected = 4">Set D (4)</b-button>
        <b-button size="sm" variant="secondary" @click="selected = 0">Set N/A (0)</b-button>
        <b-button size="sm" variant="warning" @click="isDisabled = !isDisabled">
          Toggle Disabled: {{ isDisabled ? 'ON' : 'OFF' }}
        </b-button>
        <b-button size="sm" variant="info" @click="$bvModal.show('radio-test-modal')">
          Open Modal
        </b-button>
      </div>
    </div>

    <b-modal id="radio-test-modal" title="Modal Radio Test" hide-footer>
      <div class="mb-1">Modal Selected (number): {{ modalSelected }}</div>
      <b-form-group label="Modal radio group (disabled)">
        <b-form-radio-group
          v-model="modalSelected"
          :disabled="modalDisabled"
          :name="`modal-radio-group-${modalNameSuffix}`"
        >
          <b-form-radio :value="1">A</b-form-radio>
          <b-form-radio :value="2">B</b-form-radio>
          <b-form-radio :value="3">C</b-form-radio>
          <b-form-radio :value="4">D</b-form-radio>
          <b-form-radio :value="0">N/A</b-form-radio>
        </b-form-radio-group>
      </b-form-group>

      <div class="d-flex gap-1 align-items-center mt-2">
        <b-button size="sm" variant="primary" @click="modalSelected = 1">Set A (1)</b-button>
        <b-button size="sm" variant="primary" @click="modalSelected = 2">Set B (2)</b-button>
        <b-button size="sm" variant="primary" @click="modalSelected = 3">Set C (3)</b-button>
        <b-button size="sm" variant="primary" @click="modalSelected = 4">Set D (4)</b-button>
        <b-button size="sm" variant="secondary" @click="modalSelected = 0">Set N/A (0)</b-button>
        <b-button size="sm" variant="warning" @click="modalDisabled = !modalDisabled">
          Toggle Disabled: {{ modalDisabled ? 'ON' : 'OFF' }}
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(1)
const isDisabled = ref(true)
const modalSelected = ref(1)
const modalDisabled = ref(true)
const modalNameSuffix = Math.random().toString(36).slice(2)
</script>

<style scoped>
.container {
  max-width: 640px;
}
</style>