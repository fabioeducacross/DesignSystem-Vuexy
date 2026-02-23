<template>
  <div v-if="buttonName" id="TableActions" class="pl-0 d-flex actions">
    <b-button
      v-if="userRole === 'Secretariat'"
      class="d-flex margin-button first-button"
      variant="primary"
      @click="click()"
    >
      <feather-icon style="margin-right: 10px" icon="PlusIcon" />
      {{ buttonName }}
    </b-button>
    <b-dropdown
      v-if="userRole === 'Secretariat'"
      split
      split-variant="outline-primary"
      class="second-button"
      variant="outline-primary"
      text="Ações em Lote"
    >
      <div v-for="action in massActions" :key="action.name">
        <b-dropdown-item
          :class="`item-drop-actions ${action.icon === 'TrashIcon' ? 'action-exclude' : ''}`"
          @click="action.action(selecteds)"
        >
          <div v-b-tooltip="action.label" style="display: flex; justify-content: flex-start">
            <feather-icon
              :icon="action.icon"
              :variant="action.color"
              :label="action.label"
              class="customFeather"
              size="18"
              style="margin-right: 5px"
            />
            {{ action.label }}
          </div>
        </b-dropdown-item>
      </div>
    </b-dropdown>
    <b-dropdown
      v-if="userRole !== 'Secretariat' && buttonName === 'Novo Aluno'"
      split
      split-variant="outline-primary"
      class="second-button"
      variant="outline-primary"
      text="Adicionar"
    >
      <b-dropdown-item class="item-drop-actions" @click="createUser('withEmail')">
        <div v-b-tooltip="'Usar um e-mail'" class="d-flex justify-content-start">
          <feather-icon
            icon="UserPlusIcon"
            label="Usar um e-mail"
            class="customFeather"
            size="18"
          />
          Usar um e-mail
        </div>
      </b-dropdown-item>
      <b-dropdown-item class="item-drop-actions" @click="createUser()">
        <div v-b-tooltip="'Cadastrar sem e-mail'" class="d-flex justify-content-start">
          <feather-icon icon="UserPlusIcon" class="customFeather" size="18" />
          Cadastrar sem e-mail
        </div>
      </b-dropdown-item>
    </b-dropdown>
    <b-dropdown v-else text="Adicionar" variant="outline-primary" class="second-button">
      <b-dropdown-item class="item-drop-actions" @click="click('School')">
        <div v-b-tooltip="'Escola'" class="d-flex justify-content-start">
          <feather-icon icon="HomeIcon" class="customFeather" size="18" />
          Escola
        </div>
      </b-dropdown-item>
      <b-dropdown-item class="item-drop-actions" @click="click('Teacher')">
        <div v-b-tooltip="'Professor'" class="d-flex justify-content-start">
          <feather-icon icon="UserPlusIcon" class="customFeather" size="18" />
          Professor
        </div>
      </b-dropdown-item>
      <b-dropdown-item class="item-drop-actions" @click="click('Class')">
        <div v-b-tooltip="'Turma'" class="d-flex justify-content-start">
          <feather-icon icon="UsersIcon" class="customFeather" size="18" />
          Turma
        </div>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script setup>
import { VBTooltip } from 'bootstrap-vue'

const props = defineProps({
  showAddManually: {
    type: Boolean,
    default: false,
  },
  userRole: {
    type: String,
    default: 'Secretariat',
    require: true,
  },
  massActions: {
    type: Array,
    default: () => [],
  },
  buttonName: {
    type: String,
    default: 'Adicionar',
  },
  selecteds: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['create-user', 'action'])

const createUser = (type) => {
  emit('create-user', type)
}

const click = (type) => {
  emit('action', type)
}

// Register directives
defineOptions({
  directives: {
    'b-tooltip': VBTooltip,
  },
})
</script>

<style lang="scss" scoped>
  #TableActions {
    margin: 0 0 1rem 0;

    .margin-button {
      margin-right: 12px;
      display: flex;
      align-items: center;

      span {
        display: inline-block;
      }
    }

    .second-button {
      & > button {
        padding: 0.45rem 0.6rem;
      }
    }

    .item-drop-actions {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .customFeather {
        margin-right: 12px;
      }
    }

    .actions {
      width: 100%;
    }

    .action-exclude {
      color: #ea5455;
    }
  }
</style>