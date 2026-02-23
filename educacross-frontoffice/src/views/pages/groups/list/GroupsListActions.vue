<template>
  <b-card>
    <b-row align-v="center">
      <!-- <b-col cols="12" sm="6">
        <b-form-checkbox
          v-model="checked"
          class="custom-control-primary"
          name="check-button"
          switch
          @change="onCheckboxChange"
        > -->
      <!--  <span class="switch-icon-left">
            <span class="material-symbols-outlined"> done </span>
          </span>
          <span class="switch-icon-right">
            <span class="material-symbols-outlined"> close </span>
          </span> -->
      <!-- Exibir somente grupos sem alunos. -->
      <!-- </b-form-checkbox> -->
      <!-- </b-col> -->
      <b-col cols="12">
        <div class="d-flex justify-content-end gap-4">
          <!--  <b-dropdown
            v-b-tooltip.hover.top="
              selectedGroups.length < 2 ? 'Selecione 2 ou mais grupos para realizar essa ação.' : ''
            "
            variant="outline-primary"
            text="Ações em Lote"
            style="z-index: 500"
            right
            :disabled="selectedGroups.length < 2"
          >
            <b-dropdown-item variant="danger" @click="deleteMassGroups()">
              <div class="d-flex align-items-center">
                <span class="material-symbols-outlined cursor-pointer"> delete </span>
                <span class="ml-1"> Excluir Grupos </span>
              </div>
            </b-dropdown-item>
          </b-dropdown> -->
          <b-button v-if="canCreateGroup" variant="primary" @click="newGroup">
            <span class="material-symbols-outlined" style="font-size: 12px"> add </span> Novo Grupo
          </b-button>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import router from '@/router'
import { ref, getCurrentInstance, computed } from 'vue'

// Props
const props = defineProps({
  selectedGroups: {
    type: Array,
    required: true,
    default: () => [],
  },
})

// Emits (none specified in original code, but input used for checkbox)
const emit = defineEmits(['input'])

const checked = ref(false)
const onCheckboxChange = () => {
  emit('input', checked.value)
}

const vm = getCurrentInstance().proxy

const canCreateGroup = computed(() =>
  vm.$can(ACTION.CREATE, PERMISSION.GENERAL.BETA_FEATURES),
)

const newGroup = () => {
  router.push({
    name: 'GroupsCreate',
  })
}

const deleteMassGroups = () => {}
</script>

<style lang="scss" scoped></style>