<template>
  <section>
    <b-skeleton-wrapper :loading="isLoading">
      <template v-slot:loading>
        <b-skeleton type="text" class="w-100" height="70px" />
        <b-skeleton type="text" class="w-100" height="70px" />
        <b-skeleton type="text" class="w-100" height="70px" />
        <b-skeleton type="text" class="w-100" height="70px" />
        <b-skeleton type="text" class="w-100" height="70px" />
      </template>

      <!-- SWITCH GERAL -->
      <b-card :border-variant="allSubjectModulesAreActive ? 'primary' : null">
        <b-row>
          <b-col cols="12" sm="8">
            <span>Gerencie os módulos da Escola.</span>
          </b-col>
          <b-col cols="12" md>
            <div class="d-flex align-items-center justify-content-end gap-2">
              <b-form-checkbox
                v-model="allSubjectAreActive"
                class="custom-control-primary"
                name="check-button"
                switch
                :disabled="disabledSavingButton || savingChanges"
                @change="activeAll"
              >
                <span class="switch-icon-left">
                  <span class="material-symbols-outlined align-middle" style="font-size: 16px">
                    done
                  </span>
                </span>
                <span class="switch-icon-right">
                  <span
                    class="material-symbols-outlined align-middle text-secondary"
                    style="font-size: 16px"
                  >
                    close
                  </span>
                </span>
              </b-form-checkbox>
              <span>{{ allSubjectAreActive ? 'Desabilitar tudo' : 'Habilitar tudo' }}</span>
              <span
                v-b-tooltip.hover="
                  'Esta função habilita todos os módulos disponíveis de todas as áreas do conhecimento para todos os anos escolares.'
                "
                class="material-symbols-outlined"
                style="font-size: 16px"
                >info</span
              >
            </div>
          </b-col>
        </b-row>
      </b-card>
      <div v-for="subject in subjectsData" :key="subject.subjectId">
        <!-- MATERIA -->
        <b-card
          body-class="d-flex align-items-center justify-content-between"
          :border-variant="subject.active ? 'primary' : null"
        >
          <div>
            <div class="d-flex align-items-center gap-3">
              <div class="d-none d-sm-block" style="max-width: 36px; min-width: 36px">
                <img
                  :src="SubjectEnum[subject.subjectId].image"
                  alt=""
                  :class="!subject.active ? 'subject-image-disabled' : ''"
                />
              </div>
              <span
                class="font-bold"
                :class="
                  subject.active ? SubjectEnum[subject.subjectId].textVariant : 'text-secondary'
                "
              >
                {{ SubjectEnum[subject.subjectId].label }}
              </span>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between gap-3">
            <div v-if="!subject.available" class="d-flex align-items-center gap-1 text-muted">
              <span class="material-symbols-outlined" style="font-size: 16px"> lock </span>
              <span class="font-italic">
                Esta área do conhecimento não está disponível para a sua Escola.
              </span>
            </div>
            <div v-else-if="subject.available && !subject.active">
              <span class="font-italic text-body"> Área do conhecimento desativada </span>
            </div>
            <div class="d-flex align-items-center justify-content-end">
              <b-form-checkbox
                v-model="subject.active"
                class="custom-control-primary"
                name="check-button"
                switch
                :disabled="!subject.available || savingChanges"
                @change="activeSubject(subject.active, subject.modules, subject)"
              >
                <span class="switch-icon-left">
                  <span class="material-symbols-outlined align-middle" style="font-size: 16px">
                    done
                  </span>
                </span>
                <span class="switch-icon-right">
                  <span
                    class="material-symbols-outlined align-middle text-secondary"
                    style="font-size: 16px"
                  >
                    close
                  </span>
                </span>
              </b-form-checkbox>
              <span
                v-if="subject.available"
                :id="`subject-${subject.subjectId}`"
                v-b-toggle="
                  subjectModulesIds({
                    subjectId: subject.subjectId,
                    subjectModules: subject.modules,
                  })
                "
                class="material-symbols-outlined cursor-pointer"
              >
                <span class="when-open">expand_less</span>
                <span class="when-closed">expand_more</span>
              </span>
            </div>
          </div>
        </b-card>
        <!-- MODULOS DE UMA MATERIA -->
        <b-collapse
          v-for="(subjectModule, itemIndex) in subject.modules"
          :id="
            subjectModulesIds({ subjectId: subject.subjectId, subjectModules: subject.modules })[
              itemIndex
            ]
          "
          :key="itemIndex"
          class="mt-2"
        >
          <b-card
            :class="!subjectModule.available ? 'card-disabled' : null"
            :border-variant="subjectModule.active ? 'primary' : null"
          >
            <div class="d-flex align-items-center justify-content-between">
              <div class="flex-grow-1 d-flex align-items-center gap-1">
                <span>{{ subjectModule.moduleName }}</span>
                <span
                  v-b-tooltip.hover="
                    subjectModule.available ? $t(moduleTooltip(subjectModule.moduleId)) : ''
                  "
                  class="material-symbols-outlined"
                  style="font-size: 16px"
                >
                  info
                </span>
              </div>
              <div class="d-flex align-items-center">
                <div v-if="!subjectModule.available" class="d-flex align-items-center gap-1">
                  <span class="material-symbols-outlined" style="font-size: 16px"> lock </span>
                  <span class="font-italic mr-1">
                    Este módulo não está disponível para a sua Escola.
                  </span>
                </div>
                <b-form-checkbox
                  v-model="subjectModule.active"
                  class="custom-control-primary"
                  name="check-button"
                  switch
                  :disabled="!subjectModule.available || savingChanges"
                  @change="activeModule(subjectModule.active, subjectModule, subject)"
                >
                  <span class="switch-icon-left">
                    <span class="material-symbols-outlined align-middle" style="font-size: 16px">
                      done
                    </span>
                  </span>
                  <span class="switch-icon-right">
                    <span
                      class="material-symbols-outlined align-middle text-secondary"
                      style="font-size: 16px"
                    >
                      close
                    </span>
                  </span>
                </b-form-checkbox>
                <div v-if="subjectModule.available" class="d-flex align-items-center gap-1">
                  <span
                    :id="`module-${subject.subjectId}-${subjectModule.moduleId}`"
                    v-b-toggle="[
                      `module-to-collapse-${subject.subjectId}-${subjectModule.moduleId}`,
                    ]"
                    class="material-symbols-outlined cursor-pointer"
                  >
                    <span class="when-open">expand_less</span>
                    <span class="when-closed">expand_more</span>
                  </span>
                </div>
              </div>
            </div>
            <!-- ANOS ESCOLARES DE UM MODULO -->
            <div v-if="subjectModule.series">
              <b-collapse :id="`module-to-collapse-${subject.subjectId}-${subjectModule.moduleId}`">
                <div>
                  <hr />
                  <div class="d-flex align-items-center gap-3 flex-wrap">
                    <b-button
                      class="py-1 px-2"
                      :variant="
                        checkAllModuleSeries(subjectModule.series) === subjectModule.series.length
                          ? 'primary'
                          : 'outline-secondary'
                      "
                      @click="handleActiveAllSeries(subjectModule, subject)"
                    >
                      <span class="font-normal">Todos</span>
                    </b-button>
                    <b-button
                      v-for="serie in subjectModule.series"
                      :key="serie.serieId"
                      :variant="serie.enabled ? 'primary' : 'outline-secondary'"
                      class="py-1 px-2"
                      @click="handleActiveModuleSerie(serie, subjectModule, subject)"
                    >
                      <span class="font-normal">{{ serie.serieName }}</span>
                    </b-button>
                  </div>
                </div>
              </b-collapse>
            </div>
          </b-card>
        </b-collapse>
      </div>
      <!-- BOTÃO SALVAR ALTERAÇÕES -->
      <div class="d-flex justify-content-center">
        <b-button
          variant="primary"
          class="d-flex align-items-center justify-content-center gap-2"
          :disabled="savingChanges || disabledSavingButton"
          @click="saveChanges"
        >
          <b-spinner v-if="savingChanges" small />
          <span>{{ savingChanges ? 'Salvando alterações' : 'Salvar alterações' }}</span>
          <!-- <span>Savar alterações</span> -->
        </b-button>
      </div>
      <!-- MODAL DE CONFIRMAÇÃO -->
      <b-modal
        v-model="openConfirmationModal.status"
        centered
        hide-footer
        hide-header
        no-close-on-backdrop
        no-close-on-esc
      >
        <div class="px-1 text-center">
          <span class="material-symbols-outlined text-warning" style="font-size: 80px">info</span>
          <h3 class="font-normal">Atenção!</h3>
          <p>
            Você precisa selecionar pelo menos
            <span class="font-bold text-primary">1 ano escolar</span> para este módulo. Se seguir
            com a exclusão, o módulo será automaticamente desabilitado.
          </p>
        </div>
        <div class="p-1">
          <b-row class="match-height">
            <b-col cols="12" md="8">
              <b-button
                class="w-100"
                variant="primary"
                @click="
                  activeSerie(
                    openConfirmationModal.serie,
                    openConfirmationModal.subjectModule,
                    openConfirmationModal.subject,
                  )
                "
              >
                <span>Excluir e desabilitar módulo</span>
              </b-button>
            </b-col>
            <b-col cols="12" md>
              <b-button
                class="w-100"
                variant="outline-danger"
                @click="openConfirmationModal.status = false"
              >
                <span>Cancelar</span>
              </b-button>
            </b-col>
          </b-row>
        </div>
      </b-modal>
    </b-skeleton-wrapper>
    <!-- SWITCH GERAL -->
  </section>
</template>

<script setup>
import { SubjectEnum } from '@/consts/SubjectEnum.js'
import { ModulesEnum } from '@/consts/admin-context/enums/modules.js'
import { getInstitutionsSubjectModulesSeries, uptadeInstitutionsModules } from '@/services/shared/institution/Institutions.Service.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { getCurrentInstance, onMounted, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy
const isLoading = ref(false)
const savingChanges = ref(false)

const openConfirmationModal = ref({
  status: false,
  subjectModule: null,
  serie: null,
  subject: null,
})

const allSubjectAreActive = ref(false)
const allSubjectModulesAreActive = ref(false)
const disabledSavingButton = ref(false)

const subjectsData = ref([])
const currentAvailablesSubjects = ref([])

const checkIsAllActived = subjects => {
  const activesCount = subjects.filter(subject => subject.active).length
  return activesCount
}

const activeAll = () => {
  subjectsData.value.forEach(sub => {
    if (sub.available) {
      activeAllSubjects(allSubjectAreActive.value, sub)
    }
  })
}

const activeAllSubjects = (enable, subject) => {
  subject.modules.map(() => {
    if (enable !== subject.active) {
      subject.active = enable
    }

    activeSubject(enable, subject.modules, subject)
    return subject
  })
}

const activeSubject = (enable, subjectModules, subject) => {
  subjectModules.map(mod => {
    if (mod.available && mod.series) {
      if (enable !== mod.active) {
        mod.active = enable
      }
      activeModule(enable, mod, subject)
    }
    return mod
  })
}

const activeModule = (enable, subjectModule, subject) => {
  if (subjectModule.available && subjectModule.series) {
    subjectModule.series.forEach(serie => (serie.enabled = enable))

    const element = document.getElementById(
      `module-${subject.subjectId}-${subjectModule.moduleId}`,
    )

    if (!enable && element && element.attributes[5].value === 'true') {
      handleShowCollapseArrow(`module-${subject.subjectId}-${subjectModule.moduleId}`, 'none')
      collapseModule(subject.subjectId, subjectModule)
    } else if (!enable && element && element.attributes[5].value === 'false') {
      handleShowCollapseArrow(`module-${subject.subjectId}-${subjectModule.moduleId}`, 'none')
    } else {
      handleShowCollapseArrow(
        `module-${subject.subjectId}-${subjectModule.moduleId}`,
        'inline-block',
      )
    }

    checkActivedSubject(subject)
  }
}

const activeSerie = (serie, subjectModule, subject) => {
  serie.enabled = !serie.enabled
  const hasActivedSerie = checkAllModuleSeries(subjectModule.series)

  if (hasActivedSerie || hasActivedSerie === subjectModule.series.length) {
    subjectModule.active = true
    checkActivedSubject(subject)
  } else if (hasActivedSerie === 0) {
    subjectModule.active = false
    checkActivedSubject(subject)
    handleShowCollapseArrow(`module-${subject.subjectId}-${subjectModule.moduleId}`, 'none')
    collapseModule(subject.subjectId, subjectModule)
  }

  if (openConfirmationModal.value.status) {
    openConfirmationModal.value.status = false
  }
}

const handleActiveAllSeries = (subjectModule, subject) => {
  const hasActivedSerie = checkAllModuleSeries(subjectModule.series)

  if (subjectModule.available && subjectModule.series) {
    subjectModule.series.forEach((serie, index) => {
      if (hasActivedSerie < subjectModule.series.length) {
        serie.enabled = true
      } else if (index) {
        serie.enabled = false
      }
    })

    if (hasActivedSerie || hasActivedSerie === subjectModule.series.length) {
      subjectModule.active = true
    } else if (hasActivedSerie === 0) {
      subjectModule.active = false
    }

    if (!hasActivedSerie) {
      subjectModule.active = true
    }

    checkActivedSubject(subject)
  }
}

const handleActiveModuleSerie = (serie, subjectModule, subject) => {
  const hasActivedSerie = checkAllModuleSeries(subjectModule.series)
  if (serie.enabled) {
    if (hasActivedSerie > 1) {
      activeSerie(serie, subjectModule, subject)
    } else {
      openConfirmationModal.value.status = !openConfirmationModal.value.status
      openConfirmationModal.value.subject = subject
      openConfirmationModal.value.subjectModule = subjectModule
      openConfirmationModal.value.serie = serie
    }
  } else {
    activeSerie(serie, subjectModule, subject)
  }
}

const checkActivedSubject = subject => {
  const hasActiveModule = subject.modules.find(mod => mod.active)
  if (hasActiveModule) {
    subject.active = true
  } else {
    subject.active = false
  }

  const element = document.getElementById(`subject-${subject.subjectId}`)

  if (!subject.active && element && element.attributes[5].value === 'true') {
    handleShowCollapseArrow(`subject-${subject.subjectId}`, 'none')
    collapseSubject(subject)
  } else if (!subject.active && element && element.attributes[5].value === 'false') {
    handleShowCollapseArrow(`subject-${subject.subjectId}`, 'none')
  } else {
    handleShowCollapseArrow(`subject-${subject.subjectId}`, 'inline-block')
  }
}

const checkAllModuleSeries = series => {
  const activedSeriesCount = series.filter(serie => serie.enabled).length
  return activedSeriesCount
}

const checkActivedModules = subjectModules => {
  const activedModulesCount = subjectModules.filter(mod => mod.active).length
  return activedModulesCount
}

const processData = data => {
  data.map(subject => {
    if (subject.available) {
      subject.modules.map(subjectModule => {
        if (subjectModule.available && subjectModule.series) {
          const hasEnabledSerie = subjectModule.series.find(serie => serie.enabled)

          if (hasEnabledSerie) {
            subjectModule.active = true
          } else {
            subjectModule.active = false
          }
        }

        return subjectModule
      })
    }

    const hasEnabledModule = subject.modules.find(mod => mod.active)

    if (hasEnabledModule) {
      subject.active = true
    } else {
      subject.active = false
    }

    return subject
  })
  return data
}

const subjectModulesIds = data => {
  return data.subjectModules.map(mod => `${data.subjectId}-${mod.moduleId}`)
}

const collapseSubject = subject => {
  subject.modules.forEach(subjectModule => {
    vm.$root.$emit('bv::toggle::collapse', `${subject.subjectId}-${subjectModule.moduleId}`)
  })
}

const collapseModule = (subjectId, subjectModule) => {
  vm.$root.$emit(
    'bv::toggle::collapse',
    `module-to-collapse-${subjectId}-${subjectModule.moduleId}`,
  )
}

const handleShowCollapseArrow = (elementId, display) => {
  const element = document.getElementById(elementId)
  element.style.display = display
}

const fetch = () => {
  isLoading.value = true

  getInstitutionsSubjectModulesSeries()
    .then(response => {
      const availableSubjects = response.data.filter(subject => subject.available)

      currentAvailablesSubjects.value = [...availableSubjects]

      if (!availableSubjects.length) {
        disabledSavingButton.value = true
      }

      const unAvailableSubjects = response.data.filter(subject => !subject.available)

      const dataParsed = processData(availableSubjects)

      subjectsData.value = dataParsed.concat(unAvailableSubjects)

      allSubjectAreActive.value = checkIsAllActived(availableSubjects) > 0
    })
    .finally(() => {
      isLoading.value = false
    })
}

const saveChanges = () => {
  savingChanges.value = true
  disabledSavingButton.value = true

  const params = {
    subjects: subjectsData.value,
  }

  uptadeInstitutionsModules(params)
    .then(() => {
      vm.$toast({
        component: Toast,
        props: {
          title: 'Alterações salvas com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
    })
    .finally(() => {
      savingChanges.value = false
      disabledSavingButton.value = false
    })
}

const moduleTooltip = moduleId => {
  const keys = Object.keys(ModulesEnum)
  const modulePermissionName = keys.find(key => ModulesEnum[key] === moduleId)

  return `moduleTooltip.${modulePermissionName}`
}

const checkActivedSubjectModules = () => {
  let activedSubjectModulesCounter = 0
  currentAvailablesSubjects.value.forEach(subject => {
    const availabledModules = subject.modules.filter(mod => mod.available)
    const activedModulesCount = checkActivedModules(subject.modules)

    const result = {
      hasActivedModules: activedModulesCount > 0,
      allModulesAreActived:
        availabledModules.length === activedModulesCount && activedModulesCount > 0,
    }

    if (result.allModulesAreActived) {
      activedSubjectModulesCounter += 1
    }
  })

  return activedSubjectModulesCounter
}

watch(
  subjectsData,
  () => {
    const activedSubjectModulesCounter = checkActivedSubjectModules()

    allSubjectAreActive.value =
      checkIsAllActived(currentAvailablesSubjects.value) ===
      currentAvailablesSubjects.value.length

    allSubjectModulesAreActive.value =
      activedSubjectModulesCounter === currentAvailablesSubjects.value.length
  },
  { deep: true },
)

onMounted(() => {
  fetch()
})
</script>

<style lang="scss" scoped>
  .card-disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .subject-image-disabled {
    filter: grayscale(100%);
  }

  .collapsed > .when-open,
  .not-collapsed > .when-closed {
    display: none;
  }
</style>