<template>
  <section>
    <TabRouter
      :tabs="tabs"
      :current-tab.sync="currentTab"
      :tab-title="tabTitle"
      tab-title-icon="school"
    >
      <router-view />
    </TabRouter>
    <!-- PASSPORT MODAL -->
    <b-modal
      v-if="passportModal"
      :visible="passportModal"
      size="xl"
      static
      title="Passaporte do Aluno"
      title-class="text-body"
      centered
      hide-footer
      @close="passportModal = false"
      @hide="passportModal = false"
    >
      <PassportModal :student-id="studentId" />
    </b-modal>
  </section>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import ability from '@/libs/acl/ability'
import store from '@/store'
import PassportModal from '@/views/pages/reading-expedition/components/PassportModal.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { emitter } from '@/eventBus'

const currentTab = ref(0)
const tabTitle = ref('VISÃO DA TURMA')

emitter.on('setTabTitle', title => {
  tabTitle.value = title
})

const tabs = [
  {
    title: 'Visão Geral',
    route: {
      name: 'readingExpeditionOverview',
    },
  },
]

if (ability.can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
  tabs.push(
    ...[
      {
        title: 'Testes de Fluência',
        route: {
          name: 'readingExpeditionFluencyTests',
        },
      },
      {
        title: 'Unidades',
        route: {
          name: 'readingExpeditionUnits',
        },
      },
    ]
  )
} else if (!ability.can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
  tabs.push({
    title: 'Visão por aluno',
    route: {
      name: 'readingExpeditionStudentOverview',
    },
  })
}

if (!ability.can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
  tabTitle.value = store.state.access.userData.InstitutionName
}

const passportModal = ref(false)
const studentId = ref(null)

const openStudentPassportModalHandler = data => {
  store
    .dispatch('ReadingExpeditionModule/fetchStudentPassport', data)
    .then(() => {
      studentId.value = data
      passportModal.value = true
    })
}

const changeExpeditionTabTitleHandler = newTitle => {
  tabTitle.value = newTitle
}

onMounted(() => {
  emitter.on('openStudentPassportModal', openStudentPassportModalHandler)
  emitter.on('changeExpeditionTabTitle', changeExpeditionTabTitleHandler)
})

onUnmounted(() => {
  emitter.off('openStudentPassportModal', openStudentPassportModalHandler)
  emitter.off('changeExpeditionTabTitle', changeExpeditionTabTitleHandler)
})
</script>