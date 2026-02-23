<template>
  <div class="selectedAll-message">
    <h5>
      {{ capitalize(selectedRole(role)) }} selecionadas:&nbsp;
      <span v-if="!value"> {{ selectedNumber }}&nbsp;{{ selectedRole(role) }}</span>
      <span v-else> {{ usedLicenses }} &nbsp;{{ selectedRole(role) }}</span>
    </h5>
    <div class="separator" />
    <h5 v-if="!value">
      Para selecionar todos os itens
      <span
        v-if="
          (searchFilterMessage && searchFilterMessage !== 'Todas as turmas') || searchTermMessage
        "
        class="search-term"
        >&nbsp;da pesquisa</span
      >,<span class="roleSelectAll click-here" @click="massSelect(true)">Clique aqui</span>
    </h5>
    <h5 v-else>
      Para limpar a seleção,<span class="roleSelectAll click-here" @click="massSelect(false)"
        >Limpar</span
      >
    </h5>
  </div>
</template>

<script setup>
const props = defineProps({
  role: { type: String, default: null, required: true },
  usedLicenses: { type: Number, default: 0, required: true },
  selectedNumber: { type: Number, default: 0, required: true },
  searchFilterMessage: { type: String, default: null },
  searchTermMessage: { type: String, default: null },
  value: Boolean,
})

const emit = defineEmits(['input'])

const massSelect = (val) => {
  emit('input', val)
}

const selectedRole = (value) => {
  let role
  switch (value) {
    case 'sala':
      if (props.selectedNumber > 1) {
        role = 'turmas'
      } else {
        role = 'turma'
      }
      break
    case 'coordinators':
      if (props.selectedNumber > 1) {
        role = 'coordenadores'
      } else {
        role = 'coordenador'
      }
      break
    case 'Student':
      if (props.selectedNumber > 1) {
        role = 'alunos'
      } else {
        role = 'aluno'
      }
      break
    case 'Teacher':
      if (props.selectedNumber > 1) {
        role = 'professores'
      } else {
        role = 'professor'
      }
      break
    case 'managers':
      if (props.selectedNumber > 1) {
        role = 'diretores'
      } else {
        role = 'diretor'
      }
      break
    default:
      role = ''
  }
  return role
}

const capitalize = (value) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}
</script>

<style lang="scss" scoped>
.selectedAll-message {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 24px;

  width: 100%;
  height: 40px;

  background: rgba(108, 117, 125, 0.12);
  border-radius: 8px;

  flex: none;
  order: 0;
  flex-grow: 0;

  h5 {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 0px;

    display: flex;
    align-items: center;

    color: #6e6b7b;

    span.search-term {
      font-weight: 600;
    }
    span.click-here {
      font-weight: 600;
      margin-left: 10px;
      color: #7367f0;

      &.roleSelectAll {
        cursor: pointer;
        &:hover {
          filter: brightness(85%);
        }
      }
    }
  }
  .separator {
    width: 0px;
    height: 24px;
    border: 1px solid #6e6b7b;
  }
}
</style>