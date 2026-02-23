<template>
  <div>
    <b-modal
      v-model="modalOpen"
      centered
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      hide-header
      static
      size="lg"
    >
      <div class="d-flex flex-column align-items-center p-1">
        <b-img src="@/assets/images/belinha/maintenance.svg" class="mb-2" />
        <div class="d-flex flex-column align-items-center gap-2 text-center">
          <template v-if="hasClassesWithModule">
            <h3>Atenção para mudança de contexto.</h3>
            <p>
              No momento, o módulo <span class="text-primary font-bold">{{ moduleName }}</span> não
              está habilitado para o
              <span class="text-primary font-bold">{{ currentClass.SerieName }}</span
              >.<br />
              Vamos visualizar outra turma?
            </p>
            <div class="mb-2">
              <SelectClass
                v-if="$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
                :action="action"
                :resource="resource"
                :sort="true"
              />
            </div>
          </template>
          <template v-else-if="seriesEnabled.length">
            <p>
              Opa! Você está tentando acessar o módulo
              <span class="text-primary font-bold">{{ moduleName }}</span
              >.<br />
              No momento, este módulo só está habilitado para turmas do
              <span class="text-primary font-bold">{{ seriesEnabledLabel }}</span
              >.
            </p>
            <h3 class="mb-2">O que deseja fazer?</h3>
          </template>
        </div>

        <div class="d-flex gap-2">
          <b-button variant="outline-primary" @click="backNavigate">
            Voltar à tela anterior
          </b-button>
          <b-button
            v-if="hasClassesWithModule"
            :disabled="!classeChanged"
            variant="primary"
            @click="continueNavigate"
          >
            Sim, seguir com essa turma
          </b-button>
          <b-button v-else variant="primary" @click="continueHome">
            Seguir para o painel inicial
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script setup>
import { ACTION, PERMISSION } from '@/consts/permissions'
import SelectClass from '@/layouts/components/SelectClass.vue'
import { getAbilities, abilityInstitution, updateAbility } from '@/libs/acl/ability'
import router from '@/router'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { Ability } from '@casl/ability'
import { ref, computed, watch } from 'vue'

// router.currentRoute.params isn't reactive - but preserving pattern per project convention
const { action, resource, toRoute, fromRoute } = router.currentRoute.params
const isTeacher = store.getters.accessRole === 'Teacher'

if (!isTeacher || !action || !resource || !toRoute || !fromRoute) {
  router.push({ name: 'home' }).catch(() => {})
}

const seriesEnabledLabel = ref('')
const seriesEnabled = ref([])
const modalOpen = ref(false)

const requestSeries = (page = 1) => {
  getSeries({
    Ids: seriesEnabled.value,
    PageSize: 100,
    Page: page,
  }).then(({ data }) => {
    if (seriesEnabledLabel.value) {
      seriesEnabledLabel.value = `${seriesEnabledLabel.value}, `
    }
    seriesEnabledLabel.value = `${seriesEnabledLabel.value} ${data.data
      .map(item => item.name)
      .join(', ')}`
    if (page < data.totalPages) requestSeries(page + 1)
  })
}

const { classes, classe } = useFilters()

// Verifica se alguma turma possui o modulo habilitado
const hasClassesWithModule = computed(() =>
  classes.value.some(c => {
    const ability = new Ability([])
    const abilities = getAbilities(store.getters.abilities, c.ClassId)
    ability.update(abilities)
    return ability.can(action, resource)
  })
).value

// Verifica sem alguma outra serie da escola possui o modulo habilitados
if (!hasClassesWithModule) {
  if (abilityInstitution.can(action, resource)) {
    const abilities = store.getters.abilities

    // Busca quais as series estão habilitadas para o modulo
    seriesEnabled.value = Object.keys(abilities.modulePermissions).filter(key => {
      return abilities.modulePermissions[key].some(item => {
        return item.action === action && item.subject === resource
      })
    })

    // Verifica se tem alguma serie habilitada e busca o nome das Series
    if (seriesEnabled.value.length) {
      requestSeries()
    }
  }
}

if (hasClassesWithModule || seriesEnabled.value.length) {
  modalOpen.value = true
} else {
  router.push({ name: 'error-403' })
}

const currentClass = classe.value

const moduleName = computed(() => {
  const instituionAbilities = store.getters.getInstituionAbilities
  const module = instituionAbilities.find(item => {
    return item.subject === resource
  })
  return module?.name || ''
})

const backNavigate = () => {
  classe.value = currentClass
  const abilities = store.getters.getAbilities
  updateAbility(abilities)
  router.go(-1)
}
const continueNavigate = () => {
  router.push(toRoute).catch(() => {})
}
const continueHome = () => {
  router.push({ name: 'home' }).catch(() => {})
}

const classeChanged = ref(false)

watch(classe, () => {
  classeChanged.value = true
})
</script>

<style lang="scss" scoped></style>