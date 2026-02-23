<template>
  <div v-if="!hidden" class="position-relative">
    <b-dropdown
      id="classe-dropdown"
      text="Primary"
      variant="white"
      no-caret
      size="sm"
      toggle-class="p-0"
      :disabled="disabled"
    >
      <template v-slot:button-content>
        <div class="d-flex align-items-center gap-2 select-container">
          <span class="text-primary font-14">{{ classe.Name }}</span>
          <b-badge pill variant="light-primary" class="d-none d-md-block">
            <span class="font-14">{{ classe.SerieName }}</span>
          </b-badge>
          <span class="material-symbols-outlined text-primary ml-1" style="font-size: 19px">
            keyboard_arrow_down
          </span>
        </div>
      </template>
      <b-dropdown-item
        v-for="(c, index) in classesList"
        :key="`${c.ClassId}-${index}`"
        :disabled="!c.Students || c.disabledModule.disabled"
        @click="changeClass(c)"
      >
        <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
          <div class="d-flex align-items-start flex-column text-left">
            <span>{{ c.Name }}</span>
            <span v-if="!c.Students" class="text-muted text-sm">Turma sem alunos</span>
          </div>
          <div>
            <b-badge
              v-if="c.disabledModule.disabled"
              v-b-tooltip="
                c.disabledModule.adminDisabled
                  ? 'Para ativar o módulo para este ano escolar, consulte o administrador da sua Escola.'
                  : 'Este módulo está indisponível para este ano escolar na sua Escola.'
              "
              pill
              variant="light-secondary"
              class="badge-disabled mr-1 font-weight-normal italic"
            >
              {{
                c.disabledModule.adminDisabled
                  ? 'módulo desabilitado pelo administrador'
                  : 'módulo indisponível'
              }}
            </b-badge>
            <b-badge
              pill
              :variant="
                !c.Students || c.disabledModule.disabled ? 'light-secondary' : 'light-primary'
              "
              :class="{ 'badge-disabled': !c.Students }"
            >
              {{ c.SerieName }}
            </b-badge>
          </div>
        </div>
      </b-dropdown-item>
    </b-dropdown>
    <b-tooltip v-if="disabled" target="classe-dropdown"> Função desabilitada </b-tooltip>
  </div>
</template>

<script setup>
import { ACTION } from '@/consts/permissions.js'
import { getAbilities, updateAbility } from '@/libs/acl/ability'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { Ability } from '@casl/ability'
import { computed, onMounted, toRef } from 'vue'

const props = defineProps({
  action: {
    type: String,
    required: false,
  },
  resource: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  hidden: {
    type: Boolean,
    required: false,
    default: false,
  },
  sort: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const { classe } = useFilters()
const sort = toRef(props, 'sort')

const classes = computed(() => store.getters.classes)

const sortByOrderOrName = (a, b) => {
  if (a.Order !== undefined && b.Order !== undefined && a.Order !== b.Order) {
    return a.Order - b.Order
  }
  return (a.Name || '').localeCompare(b.Name || '')
}

const isDisabledModule = c => {
  if (!props.action || !props.resource) return { disabled: false }

  const ability = new Ability([])
  const abilities = getAbilities(store.getters.abilities, c.ClassId)
  ability.update(abilities)

  const adminDisabled = ability.can(ACTION.DISABLED, props.resource)

  return {
    disabled: !ability.can(props.action, props.resource) || adminDisabled,
    adminDisabled,
  }
}

const classesList = computed(() => {
  if (!classes.value) return []

  const items = classes.value.map(c => ({
    ...c,
    disabledModule: isDisabledModule(c),
  }))

  if (!sort.value) return items

  const enabled = items
    .filter(c => !c.disabledModule.disabled && c.Students)
    .sort(sortByOrderOrName)

  const noStudents = items
    .filter(c => !c.disabledModule.disabled && !c.Students)
    .sort(sortByOrderOrName)

  const disabled = items.filter(c => c.disabledModule.disabled).sort(sortByOrderOrName)

  return [...enabled, ...noStudents, ...disabled]
})

const changeClass = value => {
  classe.value = value

  const abilities = store.getters.getAbilities

  updateAbility(abilities)
}

onMounted(() => {
  if (typeof classe.value === 'object' && Object.keys(classe.value).length === 0) {
    classe.value = classes.value?.[0]
  }
})
</script>

<style lang="scss">
  #classe-dropdown .dropdown-menu {
    max-height: calc(80vh - 150px);
    @media (min-width: 576px) {
      max-height: calc(80vh - 110px);
    }
    overflow-y: auto;
  }
</style>

<style lang="scss" scoped>
  .select-container {
    background: #ffff;
    padding: 10px 20px;
    border: 1px solid #b9b9c3;
    border-radius: 100px;
  }
</style>