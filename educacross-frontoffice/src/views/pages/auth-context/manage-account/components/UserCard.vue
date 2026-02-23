<script setup>
import { sortString } from '@/utils/utils'
import EditProfileStudentNew from '@/views/pages/auth-context/manage-account/EditProfileStudentsNew.vue'
import { BModal } from 'bootstrap-vue'
import { computed, ref, toRef } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  loggingIn: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['login', 'edit'])

const internalUser = toRef(props, 'user')

if (!internalUser.value.classes) internalUser.value.classes = []
internalUser.value.classes = internalUser.value.classes.sort(sortString)

const studentBackground = computed(() => {
  return `background: url('${internalUser.value.imageUrl}') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, ${internalUser.value.backgroundColor} linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%)`
})

const showPassword = ref(false)
const roleConfig = {
  student: {
    roleName: 'Aluno',
  },
  Professor: {
    roleName: 'Professor',
    img: '/assets/profiles/teacher.svg',
    color: '#7F6CC3',
  },
  Auditor: {
    roleName: 'Auditor',
    img: '/assets/profiles/auditor.svg',
    color: '#006B7E',
  },
  'Gestor de Redes': {
    roleName: 'Gestor de Redes',
    img: '/assets/profiles/network-manager.svg',
    color: '#00BDB8',
  },
  Coordenador: {
    roleName: 'Coordenador',
    img: '/assets/profiles/coordinator.svg',
    color: '#F05FF3',
  },
  Diretor: {
    roleName: 'Diretor',
    img: '/assets/profiles/principal.svg',
    color: '#FE6E6E',
  },
  'Administrador Escolar': {
    roleName: 'Administrador',
    img: '/assets/profiles/admin.svg',
    color: '#FFB443',
  },
}
</script>

<template>
  <!--  ======================================================================================== -->
  <!--  Student Card -->
  <!--  ======================================================================================== -->
  <b-card
    v-if="internalUser.role === 'student'"
    no-body
    header-class="p-0"
    class="overflow-hidden cursor-pointer d-flex mb-0 transition-none"
    @click="emit('login')"
  >
    <template v-slot:header>
      <div
        style="height: 97px; width: 100%"
        :style="studentBackground"
        class="p-50 d-flex justify-content-between"
      >
        <div class="flex-1">
          <b-badge pill class="bg-white text-primary">
            {{ roleConfig[internalUser.role].roleName }}
          </b-badge>
        </div>
        <div class="flex-1 d-flex justify-content-end">
          <span
            class="material-symbols-outlined text-white cursor-pointer"
            style="height: fit-content"
            @click.prevent.stop="emit('edit', internalUser.userId)"
            >settings</span
          >
        </div>
      </div>
    </template>
    <b-card-body
      class="pt-1 text-center d-flex flex-column justify-content-between"
      style="flex: 1 1 auto"
    >
      <div>
        <h2 class="text-primary">{{ internalUser.name }}</h2>
        <p class="mb-0">{{ internalUser.schoolName }}</p>
        <div>
          <span>{{ internalUser.className }}</span>
          <b-badge variant="light-primary" pill class="ml-50">{{ internalUser.serieName }}</b-badge>
        </div>
      </div>

      <div>
        <div style="border-top: 1px solid #ebe9f1" class="my-1"></div>
        <p class="mb-0">
          Nome de usuário: <span class="text-primary font-bold">{{ internalUser.userName }}</span>
        </p>
        <p class="mb-0">
          Senha:
          <span class="text-primary font-bold">{{
            showPassword ? internalUser.password : '******'
          }}</span>
          <span
            class="material-symbols-outlined text-primary font-bold align-middle ml-50 cursor-pointer"
            @click.prevent.stop="showPassword = !showPassword"
            >visibility</span
          >
        </p>
      </div>
      <b-overlay :show="loggingIn" rounded="sm" no-wrap></b-overlay>
    </b-card-body>
  </b-card>

  <!--
      ========================================================================================
      Card dos outros usuários
      ========================================================================================
  -->
  <b-card
    v-else
    no-body
    header-class="p-0"
    class="overflow-hidden cursor-pointer mb-0"
    @click="emit('login')"
  >
    <template v-slot:header>
      <div
        style="height: 97px; width: 100%"
        :style="`background: url('${
          roleConfig[internalUser.role].img
        }') center center no-repeat, url('/assets/bg-bolinhas.svg') no-repeat, ${
          roleConfig[internalUser.role].color
        } linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%); background-size: 80px, cover cover`"
        class="p-50"
      >
        <b-badge pill class="bg-white text-primary">
          {{ roleConfig[internalUser.role].roleName }}
        </b-badge>
      </div>
    </template>
    <b-card-body class="pt-1" body-class="d-flex flex-column justify-content-between">
      <div>
        <h2 class="text-primary text-center">{{ internalUser.name }}</h2>
        <div class="d-flex flex-wrap gap-1 justify-content-center">
          <b-badge
            v-for="(classe, index) in internalUser.classes.slice(0, 4)"
            :key="`${internalUser.userId}-${index}`"
            variant="light-primary"
          >
            <span class="font-normal">{{ classe }}</span>
          </b-badge>
          <b-badge
            v-if="internalUser.classes.length > 4"
            :id="`classes-${internalUser.userId}`"
            variant="light-primary"
            @click.prevent.stop
          >
            +{{ internalUser.classes.length - 4 }}
          </b-badge>
          <b-popover
            v-if="internalUser.classes.length > 4"
            :target="`classes-${internalUser.userId}`"
            triggers="hover click"
          >
            <div class="d-flex flex-column gap-1 overflow-y-auto" style="max-height: 50vh">
              <b-badge
                v-for="(classe, index) in internalUser.classes.slice(
                  4,
                  internalUser.classes.length,
                )"
                :key="`class-${internalUser.userId}-${index}`"
                variant="light-primary"
              >
                {{ classe }}
              </b-badge>
            </div>
          </b-popover>
        </div>
      </div>
      <div>
        <div
          v-if="internalUser.students || internalUser.institutions"
          style="border-top: 1px solid #ebe9f1"
          class="my-1"
        ></div>
        <div v-if="internalUser.students" class="text-center">
          <p class="mb-0">Alunos</p>
          <span class="text-primary font-bold">{{ internalUser.students | formatNumber }}</span>
        </div>
        <div v-if="internalUser.institutions" class="text-center">
          <p class="mb-0">Escolas</p>
          <span class="text-primary font-bold">{{ internalUser.institutions | formatNumber }}</span>
        </div>
      </div>
      <b-overlay :show="loggingIn" rounded="sm" no-wrap></b-overlay>
    </b-card-body>
  </b-card>
</template>