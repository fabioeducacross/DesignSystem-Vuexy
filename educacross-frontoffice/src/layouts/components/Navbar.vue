<template>
  <div :class="role" class="navbar-container d-flex align-items-center justify-content-between">
    <div class="navbar-column">
      <span
        class="material-symbols-outlined text-primary cursor-pointer"
        style="vertical-align: middle"
        @click="toggleVerticalMenuActive"
      >
        menu
      </span>
    </div>
    <div class="navbar-column d-flex justify-content-center">
      <div class="logo-container">
        <b-img :src="mainLogo" alt="logo" class="d-sm-inline d-none" />
        <b-img :src="smallLogo" alt="logo" class="d-sm-none" />
      </div>
    </div>
    <div class="navbar-column d-flex justify-content-end">
      <b-navbar-nav class="nav align-items-center flex-nowrap">
        <b-button
          v-if="$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
          :disabled="loadingLoginApp"
          class="d-flex align-items-center gap-2"
          pill
          variant="outline-primary"
          @click="loginApp"
        >
          <span
            class="material-symbols-outlined text-primary"
            style="font-size: 14px; vertical-align: middle"
          >
            joystick
          </span>
          <span class="d-xl-inline d-none"> Visão aluno </span>
          <b-spinner v-show="loadingLoginApp" small></b-spinner>
        </b-button>

        <b-button
          v-if="$can(ACTION.READ, PERMISSION.GENERAL.STUDENT)"
          size="sm"
          variant="primary"
          class="text-nowrap"
          pill
          @click="modalHowToplay = true"
        >
          <span class="material-symbols-outlined align-middle" style="font-size: 20px"
            >joystick</span
          >
          <span class="align-middle d-none d-md-inline"> Como jogar?</span>
        </b-button>

        <b-nav-item-dropdown
          class="dropdown-user"
          right
          toggle-class="d-flex align-items-center dropdown-user-link"
        >
          <template v-slot:button-content>
            <div class="d-xl-flex d-none user-nav">
              <p
                class="user-name d-flex flex-column justify-content-center align-items-end mb-0"
                style="line-height: 1.5rem"
              >
                <span class="profileName d-inline-block text-truncate" style="font-weight: 500">{{
                  formatProfileName(profileName, 32)
                }}</span>
                <span class="permissionUser" style="font-weight: bold">{{ permissionUser }}</span>
              </p>
            </div>
            <b-avatar
              :badge="notificationsQtd ? notificationsQtd.toString() : null"
              :src="profilePicture"
              badge-offset="-0.5em"
              badge-top
              badge-variant="danger"
              size="40"
              variant="light-primary"
            />
          </template>

          <b-dropdown-item
            v-if="hasAccount"
            :disabled="loadingLogout"
            link-class="d-flex align-items-center"
            @click="goToAccount"
          >
            <span class="material-symbols-outlined mr-50"> account_circle </span>
            <span>Ir para a conta</span>
          </b-dropdown-item>

          <NotificationDropdown
            @notificationsQtd="v => (notificationsQtd = v)"
            @click.stop.prevent
          />

          <SelectLocaleNavbar v-if="$can(ACTION.READ, PERMISSION.GENERAL.TRANSLATE)" @click.stop />

          <b-dropdown-item
            v-if="backToNetworkManager"
            link-class="d-flex align-items-center"
            @click="logOutImpersonateAdmin"
          >
            <span class="material-symbols-outlined mr-50"> swap_horiz </span>
            <span>Retornar para o Gestor</span>
          </b-dropdown-item>

          <b-dropdown-item
            v-if="$can(ACTION.READ, PERMISSION.GENERAL.CHANGE_INSTITUTION_LOGO)"
            link-class="d-flex align-items-center"
            @click="goToConfig"
          >
            <span class="material-symbols-outlined mr-50"> manufacturing </span>
            <span>Configurações</span>
          </b-dropdown-item>

          <b-dropdown-item
            :disabled="loadingLogout"
            link-class="d-flex align-items-center"
            @click="logout"
          >
            <b-spinner v-show="loadingLogout" class="mr-50" small></b-spinner>
            <span v-if="!loadingLogout" class="material-symbols-outlined mr-50"> logout </span>
            <span>Sair</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </div>
    <b-modal v-model="modalHowToplay" centered hide-footer size="lg">
      <HowToPlay />
    </b-modal>
  </div>
</template>

<script setup>
import NotificationDropdown from './NotificationDropdown.vue'
import { logoutAccount, logoutImpersonatedAdmin, logoutUser } from '@/auth/utils'
import SelectLocaleNavbar from '@/components/locale/SelectLocaleNavbar.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import axiosIns from '@/libs/axios'
import { getRoleHomeRouteName } from '@/router/home-route.js'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import store from '@/store'
import HowToPlay from '@/views/pages/responsible-context/HowToPlay.vue'
import {
  BAvatar,
  BButton,
  BDropdownDivider,
  BDropdownItem,
  BLink,
  BModal,
  BNavbarNav,
  BNavItem,
  BNavItemDropdown,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'

// Props
const props = defineProps({
  toggleVerticalMenuActive: {
    type: Function,
    default: () => {},
  },
})

// State
import { ref, computed, onMounted } from 'vue'

const userType = ref('')
const profilePicture = ref(null)
const loadingLogout = ref(false)
const loadingLoginApp = ref(false)
const notificationsQtd = ref(0)
const modalHowToplay = ref(false)
const userData = ref(getUserData())

// Whitelabel
const mainLogo = getWhitelabelConfig('MainLogo')
const name = getWhitelabelConfig('Name')
const youtubeUrl = getWhitelabelConfig('YouTubeUrl')
const facebookUrl = getWhitelabelConfig('FacebookUrl')
const instagramUrl = getWhitelabelConfig('InstagramUrl')
const smallLogo = getWhitelabelConfig('SmallLogo')

// Methods
const loginApp = () => {
  loadingLoginApp.value = true
  axiosIns
    .get('v1/app/login')
    .then(response => {
      const { token, refreshToken } = response.data
      const redirect = store._vm.$router.resolve({
        name: 'loginDeepLink',
        query: { accessToken: token, refreshToken },
      })
      window.open(redirect.href, '_blank')
    })
    .finally(() => {
      loadingLoginApp.value = false
    })
}

const goToAccount = () => {
  logoutUser()
}

const goToConfig = () => {
  store._vm.$router.push({ name: 'schoolLogo' })
}

const logout = () => {
  loadingLogout.value = true
  document.getElementById('loading-bg').setAttribute('style', 'display: block')
  logoutAccount()
}

function getTeacherInfos() {
  userType.value = store.getters.accessUserData?.User
}

function getUserData() {
  return {
    Name:
      store.getters.accessUserData?.Name || store.state.account.userData?.Name,
    UserId: store.getters.accessUserData?.UserId,
  }
}

const logOutImpersonateAdmin = () => {
  logoutImpersonatedAdmin()
  store._vm.$nextTick(() => {
    store._vm.$router.push({ name: getRoleHomeRouteName() })
  })
}

// formatProfileName can use store directly for accessRole
const formatProfileName = (string, len) => {
  const roleValue = store.getters.accessRole
  if (roleValue === 'Teacher') {
    const newString = string.split('').slice(0, len).join('')
    return string.length >= 30 ? `${newString}...` : string
  }
  return string
}

// Computed
const schoolName = computed(() => store.getters.accessUserData?.InstitutionName)

const accessContext = computed(() => store.getters.accessContext)
const GET_GLOBAL_SUBJECT_ID = computed(() => store.getters.GET_GLOBAL_SUBJECT_ID)

const familyContext = computed(() => {
  const id = userData.value.UserId
  if (!id) return null
  const context = accessContext.value?.familyContext
  if (context) {
    const user = context.find(user => user.id === id)
    return user
  }
  return null
})

const hasAccount = computed(() => store.getters.accessUserData?.HasAccount)

const role = computed(() => store.getters.accessRole)

const isAdmin = computed(() =>
  !!(
    role.value === 'Manager' ||
    role.value === 'Secretariat' ||
    role.value === 'Coordinator' ||
    role.value === 'NetworkManager'
  )
)

const FAQModalSchoolName = computed(() => getWhitelabelConfig('name'))

const hasPermisions = computed(
  () => role.value === 'Teacher' && userType.value === 'Educacross'
)

const profileName = computed(() => {
  const Name = store.state.account.userData?.Name
  if (Name) return Name
  return store.state.access.userData?.Name
})

const backToNetworkManager = computed(
  () => store.getters.accessUserData?.BackToNetworkManager
)

const permissionUser = computed(() => {
  const roleVal = store.getters.accessRole
  switch (roleVal) {
    case 'Student':
      return 'Aluno'
    case 'Responsible':
      return 'Responsável'
    case 'Secretariat':
      return 'Administrador'
    case 'Manager':
      return 'Diretor'
    case 'Coordinator':
      return 'Coordenador'
    case 'NetworkManager':
      return 'Gestor de Redes'
    case 'Teacher':
      return 'Professor'
    case 'Auditor':
      return 'Auditor'
    default:
      return '-'
  }
})

// Lifecycle
onMounted(() => {
  profilePicture.value = store.state.account.userData?.ImageUrl
  if (role.value === 'Teacher') {
    getTeacherInfos()
  } else {
    userType.value = store.getters.accessUserData?.User
  }
})
</script>

<style lang="scss" scoped>
  .verticalLine {
    border: 1px solid #ebe9f1;
    height: 3rem;
    margin: 0 0.8rem;
  }

  @media (max-width: 932px) {
    .verticalLine {
      display: none;
    }
  }

  .student-info {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;

    .avatar {
      margin-right: 20px;
      border-radius: 8px;
      width: 42px;
      height: 42px;
      padding: 4px;
    }

    .infos {
      display: flex;
      flex-direction: column;
      color: #6e6b7b;
      font-size: 14px;
      line-height: 23px;
      margin: 0;

      span {
        color: #5e5873;
        font-size: 15px;
        line-height: 24px;
      }
    }
  }
</style>
<style lang="scss">
  .navbar-column {
    flex: 1 1 0px;
  }

  .logo-container {
    max-width: 100%;

    img {
      height: 100%;
      max-height: 38px;
      max-width: 100%;
    }
  }

  @media (max-width: 768px) {
    .schoolName,
    .school-icon,
    .modal-container,
    .modal-content-infos,
    .modal-header-text,
    .verticalLine,
    .span-doubt {
      display: none;
    }
  }

  .schoolName,
  .school-icon,
  .permissionUser {
    color: var(--primary);
  }

  .initialsNavbar {
    background: rgba(115, 103, 240, 0.12);

    border-radius: 100px;
    margin-right: 0.7rem;

    width: 3rem;
    height: 3rem;

    .initials__initialsNavbar {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;

      span {
        font: Montserrat, sans-serif;
        font-size: 1rem;
        font-weight: 700;
        color: #7367f0;
        text-transform: uppercase;
      }
    }
  }
</style>