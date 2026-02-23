<template>
  <div style="min-height: 100vh">
    <!-- =================================================================================== -->
    <!-- START NAV BAR -->
    <!-- =================================================================================== -->
    <div
      class="navbar-container d-flex align-items-center justify-content-between gap-2 bg-white p-50"
    >
      <div class="flex-1"></div>
      <div class="navbar-column d-flex justify-content-center flex-1">
        <div class="logo-container">
          <b-img :src="mainLogo" alt="logo" />
        </div>
      </div>
      <div
        class="navbar-column d-flex justify-content-end align-items-center md:gap-3 gap-1 flex-1"
      >
        <div>
          <b-button
            size="sm"
            variant="primary"
            class="text-nowrap"
            pill
            @click="modalHowToplay = true"
          >
            <span class="material-symbols-outlined align-middle" style="font-size: 20px"
              >joystick</span
            >
            <span class="align-middle d-none d-md-inline"> Como Jogar?</span>
          </b-button>
        </div>

        <b-navbar-nav>
          <b-nav-item-dropdown
            class="dropdown-user"
            right
            toggle-class="d-flex align-items-center dropdown-user-link"
          >
            <template v-slot:button-content>
              <div class="d-xl-flex d-none user-nav">
                <p
                  class="user-name d-flex flex-column justify-content-center align-items-end mb-0 mr-50"
                  style="line-height: 1.5rem"
                >
                  <span class="text-body d-none d-lg-inline" style="font-weight: 500">{{
                    $filters.truncate(userAccountName, 32)
                  }}</span>
                </p>
              </div>
              <!--      AVATAR    -->
              <b-avatar size="40" variant="light-primary" :src="profilePicture" />
            </template>

            <b-dropdown-item
              link-class="d-flex align-items-center"
              @click="$refs.editProfileAdminModal.show()"
            >
              <feather-icon class="mr-50" icon="EditIcon" size="16" />
              <span>Editar conta</span>
            </b-dropdown-item>
            <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
              <feather-icon class="mr-50" icon="LogOutIcon" size="16" />
              <span>Sair</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </div>
    </div>
    <!-- =================================================================================== -->
    <!-- END NAV BAR -->
    <!-- =================================================================================== -->

    <b-row class="match-height" style="min-height: calc(100vh - 64px)">
      <!-- Main Content -->
      <b-col class="justify-content-between">
        <div class="p-1">
          <b-card
            class="text-center bg-white"
            style="
              background: url('/assets/bg-estrelas.svg') center center no-repeat;
              background-size: cover;
            "
          >
            <h1 class="text-primary mb-0">Seja bem-vindo(a)!</h1>
          </b-card>

          <!-- Convites Responsivo -->
          <b-card
            v-if="invitationList.length"
            bg-variant="primary"
            class="rounded-pill d-block d-xl-none"
            body-class="d-flex align-items-center flex-nowrap"
            @click="promptInvitesOpen = true"
          >
            <div
              class="bg-white p-50 rounded-circle d-flex align-items-center justify-content-center"
            >
              <span class="material-symbols-outlined text-primary font-semibold">
                markunread_mailbox
              </span>
            </div>
            <div class="text-center flex-1">
              <span class="text-uppercase text-white font-semibold">você tem novos convites! </span>
            </div>
          </b-card>
          <!-- Filtro usuários responsivo -->
          <b-dropdown
            v-if="filteredUserOrderOptions.length > 2"
            text="Primary"
            variant="white"
            no-caret
            class="rounded-pill border bg-white mb-1 d-block d-xl-none"
            menu-class="w-100"
            block
            @hide="isUserFilterDropOpen = false"
            @show="isUserFilterDropOpen = true"
          >
            <template v-slot:button-content>
              <div
                class="d-flex justify-content-between align-items-center text-primary font-semibold"
              >
                <span class="text-uppercase">
                  {{ selectedOrderByUserObject.text }}
                </span>
                <span
                  class="material-symbols-outlined transition-all"
                  :class="{ 'rotate-180': !isUserFilterDropOpen }"
                  >keyboard_arrow_up</span
                >
              </div>
            </template>
            <div v-for="(userOrderOption, index) in filteredUserOrderOptions" :key="index">
              <b-dropdown-item @click="userOrderBy = userOrderOption.value">
                <span class="text-primary text-uppercase font-semibold">
                  {{ userOrderOption.text }}
                </span>
              </b-dropdown-item>
              <b-dropdown-divider v-if="index < filteredUserOrderOptions.length - 1" />
            </div>
          </b-dropdown>

          <b-row class="gap-2">
            <b-col v-if="filteredUserOrderOptions.length > 2" cols="0" class="d-none d-xl-block">
              <div style="position: sticky; top: 15px">
                <b-button
                  v-for="(userOrderOption, index) in filteredUserOrderOptions"
                  :key="index"
                  :variant="userOrderOption.value === userOrderBy ? 'primary' : 'outline-primary'"
                  :pressed="userOrderOption.value !== userOrderBy"
                  block
                  pill
                  class="text-uppercase"
                  @click="userOrderBy = userOrderOption.value"
                >
                  {{ userOrderOption.text }}
                </b-button>
              </div>
            </b-col>
            <b-col>
              <div v-if="loading">
                <b-skeleton-img width="300px" height="400px" class="mb-0" />
              </div>
              <div v-else ref="refUsersCardsContainer" class="match-height d-flex flex-wrap gap-3">
                <UserCard
                  v-for="(user, index) in filteredAccessContext"
                  :key="index"
                  class="user-card-grid-item"
                  :user="user"
                  :style="`width: ${userCardSize}px`"
                  :logging-in="loadingAccessId === user.userId"
                  @login="loginWithUserAccess(user.userId, `overlay-school-${index}`)"
                  @edit="openPromptStudent"
                />
              </div>
            </b-col>
          </b-row>
        </div>

        <TheFooter />
      </b-col>

      <!-- Right Panel with Transition -->
      <transition v-if="showRightPanel" name="slide">
        <b-col cols="3" class="bg-light border-start p-1 d-none d-xl-block">
          <b-card
            no-body
            class="shadow-none"
            border-variant="primary"
            header-bg-variant="light-primary"
            style="position: sticky; top: 15px"
          >
            <template v-slot:header>
              <div class="d-flex align-items-center justify-content-between w-100 align-middle">
                NOVOS CONVITES
                <div
                  class="bg-white rounded-circle d-flex align-items-center justify-content-center"
                  style="width: 50px; height: 50px"
                >
                  <span class="material-symbols-outlined">markunread_mailbox</span>
                </div>
              </div>
            </template>

            <b-card-body class="pt-1" style="max-height: 75vh; overflow-y: auto">
              <add-account
                :has-access-context="hasSchoolAccess || hasFamilyAccess"
                :invites="invitationList"
                @enableCloseAddAccountHeader="cantClosePromptAddAccount = false"
                @close-addAccount="$refs.refAddAccountModal.hide()"
                @close-addAccount-withAtt="closePromptEditOrAddAccessWithAtt('addAccess')"
                @update-invitations="updateInvitationList"
                @close="
                  () => {
                    promptInvitesOpen = false
                    showRightPanel = false
                  }
                "
              />
            </b-card-body>
          </b-card>
        </b-col>
      </transition>
    </b-row>

    <!-- Modals -->
    <b-modal v-model="promptInvitesOpen" title="NOVOS CONVITES" hide-footer centered>
      <div class="overflow-y-auto" style="max-height: 75vh">
        <AddAccount
          :has-access-context="hasSchoolAccess || hasFamilyAccess"
          :invites="invitationList"
          @enableCloseAddAccountHeader="cantClosePromptAddAccount = false"
          @close-addAccount="$refs.refAddAccountModal.hide()"
          @close-addAccount-withAtt="closePromptEditOrAddAccessWithAtt('addAccess')"
          @update-invitations="updateInvitationList"
          @close="
            () => {
              promptInvitesOpen = false
              showRightPanel = false
            }
          "
        />
      </div>
    </b-modal>

    <b-modal
      v-model="activePromptEditProfileStudent"
      title="Editar usuário"
      size="lg"
      centered
      static
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      @hidden="closeEditProfileStudent"
    >
      <EditProfileStudentNew
        v-if="studentId"
        :student-id="studentId"
        @cancel="closeEditProfileStudent"
        @save="closeAndUpdateEditProfileStudent"
      />
    </b-modal>

    <b-modal
      ref="editProfileAdminModal"
      centered
      hide-footer
      no-close-on-backdrop
      hide-header-close
      title="Editar conta"
      size="lg"
    >
      <edit-profile-admin
        @close-editProfileAdmin="$refs.editProfileAdminModal.hide()"
        @update-profile-img="updateProfileImage"
        @update-user-account-name="updateUserAccountName"
      />
    </b-modal>

    <b-modal v-model="modalHowToplay" centered hide-footer size="lg">
      <HowToPlay />
    </b-modal>

    <b-modal
      v-model="activePromptWelcomeDoubt"
      centered
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      size="xl"
      static
    >
      <welcome-doubt
        v-if="activePromptWelcomeDoubt"
        :is-activated-welcome-doubt-by-user="isActivatedWelcomeDoubtByUser"
        @close-with-dont-show-prompt-welcome="dontShowPromptWelcomeDoubt"
      />
    </b-modal>
  </div>
</template>

<script setup>
  import AddAccount from './AddAccount.vue'
  import EditProfileAdmin from './EditProfileAdmin.vue'
  import WelcomeDoubt from './WelcomeDoubt.vue'
  import TheFooter from './components/TheFooter.vue'
  import { loginUser, logoutAccount } from '@/auth/utils'
  import router from '@/router'
  import {
    getAccessContexts,
    getAccessContextsByUserId,
    getAllInvitations,
  } from '@/services/auth-context/account-manager/Account.service'
  import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
  import store from '@/store'
  import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
  import EditProfileStudentNew from '@/views/pages/auth-context/manage-account/EditProfileStudentsNew.vue'
  import UserCard from '@/views/pages/auth-context/manage-account/components/UserCard.vue'
  import HowToPlay from '@/views/pages/responsible-context/HowToPlay.vue'
  import { BAvatar, BNavItemDropdown } from 'bootstrap-vue'
  import { debounce } from 'lodash'
  import Vue, {
    computed,
    getCurrentInstance,
    onBeforeUnmount,
    onMounted,
    ref,
  } from 'vue'
  import Ripple from 'vue-ripple-directive'

  const vm = getCurrentInstance().proxy

  const activePromptEditProfileStudent = ref(false)
  const cantClosePromptAddAccount = ref(false)
  const accessContext = ref([])
  const studentId = ref(null)
  const hasFamilyAccess = ref(false)
  const hasSchoolAccess = ref(false)
  const activePromptWelcomeDoubt = ref(false)
  const isActivatedWelcomeDoubtByUser = ref(false)
  const profilePicture = ref('')
  const invitationList = ref([])
  const loading = ref(true)
  const loadingAccessId = ref(null)
  const modalHowToplay = ref(false)
  const showRightPanel = ref(false)
  const refUsersCardsContainer = ref(null)
  const userCardSize = ref(0)
  const mainLogo = getWhitelabelConfig('MainLogo')

  const userOrderOptions = ref([
    { text: 'Todos os usuários', value: null },
    { text: 'Aluno', value: 'student' },
    { text: 'Professor', value: 'Professor' },
    { text: 'Auditor', value: 'Auditor' },
    { text: 'Coordenador', value: 'Coordenador' },
    { text: 'Administrador', value: 'Administrador Escolar' },
    { text: 'Diretor', value: 'Diretor' },
    { text: 'Gestor de rede', value: 'Gestor de Redes' },
  ])
  const userOrderBy = ref(null)
  const isUserFilterDropOpen = ref(false)
  const promptInvitesOpen = ref(false)

  const cookieName = ref('')
  const cookieVersion = ref(0)

  const selectedOrderByUserObject = computed(() => {
    return filteredUserOrderOptions.value.find(i => i.value === userOrderBy.value) || {}
  })

  const filteredUserOrderOptions = computed(() => {
    return (
      userOrderOptions.value.filter(
        option =>
          accessContext.value.some(item => item.role === option.value) || option.value === null,
      ) || []
    )
  })

  const accountUserData = computed(() => store.getters.accountUserData)

  const userAccountName = computed(() => {
    const { Name } = store.state.account.userData
    if (Name) return Name
    return store.state.access.userData?.Name
  })

  const filteredAccessContext = computed(() => {
    if (!userOrderBy.value) return accessContext.value
    return accessContext.value.filter(i => i.role === userOrderBy.value)
  })

  const showNotification = computed(() => router.currentRoute.fullPath === '/manage-account')

  async function handleAccessContexts() {
    loading.value = true
    try {
      const response = await getAccessContexts()
      store.commit('accessContext', response.data)
      const processedStudents = response.data.familyContext.map(item => ({
        ...item,
        role: 'student',
      }))
      accessContext.value = [...processedStudents, ...response.data.schoolContext]
      loading.value = false
    } catch (error) {
      loading.value = false
      vm.$toast({
        component: Toast,
        props: {
          title: 'Atenção',
          icon: 'AlertTriangleIcon',
          text: error.message,
          variant: 'danger',
        },
      })
      logoutAccount()
    }
  }

  async function logout() {
    document.getElementById('loading-bg')?.setAttribute('style', 'display: block')
    await logoutAccount()
  }

  async function closePromptEditOrAddAccessWithAtt(origin) {
    if (origin === 'addAccess') {
      vm.$bvModal.hide('AddAccountModal')
      await handleAccessContexts()
      vm.$bus.emit('attQtdNotification')
    } else if (origin === 'student') {
      activePromptEditProfileStudent.value = false
      await getAccessContexts()
    }
  }

  function openPromptStudent(id) {
    activePromptEditProfileStudent.value = true
    studentId.value = id
  }

  function openAddAccount() {
    vm.$refs.refAddAccountModal.show()
  }

  function closeModalHowToplay() {
    modalHowToplay.value = false
  }

  async function loginWithUser(selectedUser) {
    try {
      const response = await loginUser(selectedUser.AccessToken, selectedUser.RefreshToken)
      navigateTo(response?.message || 'home')
    } catch (error) {
      if (error?.message === 'noClassesError') {
        navigateTo('noClassesError')
      } else {
        await loginWithUserId(selectedUser.Id)
      }
    }
  }

  async function loginWithUserId(userId) {
    try {
      const { data } = await getAccessContextsByUserId(userId)
      if (data.token) {
        const response = await loginUser(data.token, data.refreshToken)
        navigateTo(response?.message || 'home')
      }
    } catch (error) {
      navigateTo(error?.message || 'error')
    }
  }

  async function loginWithUserAccess(userId) {
    if (loadingAccessId.value) return
    loadingAccessId.value = userId
    const selectedUser = store.state.loggedAccess?.loggedAccess?.users[userId]
    if (selectedUser) {
      await loginWithUser(selectedUser)
    } else {
      await loginWithUserId(userId)
    }
    loadingAccessId.value = null
  }

  function navigateTo(routeName) {
    router.push({ name: routeName })
  }

  async function getInvitationList() {
    try {
      const response = await getAllInvitations()
      invitationList.value = response.data
      showRightPanel.value = invitationList.value.length > 0
      setUserCardSize()
    } catch (error) {
      const { errors } = error.response.data
      const errorsArray = vm.$utilTeacherService.handleFormatErrors(errors)
      errorsArray.message.forEach(elementError => {
        vm.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    }
  }

  function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    const expires = `expires=${d.toGMTString()}`
    document.cookie = `${cname}=${cvalue}; ${expires}`
  }

  function dontShowPromptWelcomeDoubt(dontShowAgain) {
    activePromptWelcomeDoubt.value = false
    if (dontShowAgain) {
      setCookie(cookieName.value, cookieVersion.value, 600)
    }
  }

  function updateProfileImage(imageUrl) {
    profilePicture.value = imageUrl
    const userData = accountUserData.value
    userData.ImageUrl = imageUrl
    store.commit('accountUserData', userData)
  }

  function updateUserAccountName(name) {
    store.dispatch('setUserAccountNameAction', { userAccountName: name })
  }

  function closeEditProfileStudent() {
    activePromptEditProfileStudent.value = false
    studentId.value = null
  }

  function closeAndUpdateEditProfileStudent() {
    activePromptEditProfileStudent.value = false
    studentId.value = null
    handleAccessContexts()
  }

  const updateInvitationList = newInvites => {
    Vue.set(invitationList, 'value', newInvites)
    handleAccessContexts()
  }

  const setUserCardSize = debounce(() => {
    const minW = 292
    const maxW = 400
    const gap = 12

    if (!refUsersCardsContainer.value) return

    const containerWidth = refUsersCardsContainer.value.clientWidth
    if (containerWidth <= 0) return

    const totalCards = accessContext.value.length
    let possibleNs = []

    for (let n = 1; n <= totalCards; n++) {
      const totalGap = (n - 1) * gap
      const usableWidth = containerWidth - totalGap
      const w = usableWidth / n

      if (w >= minW && w <= maxW) {
        possibleNs.push(n)
      }
    }

    if (possibleNs.length === 0) {
      possibleNs = [1]
    }

    const chosenN = possibleNs[possibleNs.length - 1]

    const totalGap = (chosenN - 1) * gap
    let finalWidth = (containerWidth - totalGap) / chosenN

    finalWidth = Math.min(Math.max(finalWidth, minW), maxW)

    Vue.set(userCardSize, 'value', finalWidth)
  }, 300)

  onMounted(async () => {
    window.addEventListener('resize', setUserCardSize)
    profilePicture.value = store.state.account.userData?.ImageUrl

    if (!store.state.account.userAccountName) {
      store.dispatch('setUserAccountNameAction', {
        userAccountName: store.state.account.userData?.Name,
      })
    }
    store.commit('UPDATE_IS_EDUCACROSS_USER', true)

    vm.$bus.on('showManageAccountInvitList', data => {
      cantClosePromptAddAccount.value = data === 'addAccessShowingAutomatic'
      openAddAccount()
    })
    vm.$bus.on('openEditProfileAdmin', () => {
      vm.$refs.editProfileAdminModal.show()
    })
    vm.$bus.on('attQtdNotification', () => {
      getInvitationList()
    })
    await handleAccessContexts()
    if (showNotification.value) {
      await getInvitationList()
    }
  })

  onBeforeUnmount(() => {
    vm.$bus.off('showManageAccountInvitList')
    vm.$bus.off('openEditProfileAdmin')
    vm.$bus.off('attQtdNotification')
    window.removeEventListener('resize', setUserCardSize)
  })
</script>

<style>
  /* Transition effect for sliding in/out */
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

  // Card match height
  .match-height {
    > [class*='col'] {
      display: flex;
      flex-flow: column;

      > .card {
        flex: 1 1 auto;
      }
    }
  }
</style>

<style scoped lang="scss">
  .logo-container {
    max-width: 100%;

    img {
      height: 100%;
      max-height: 38px;
      max-width: 100%;
    }
  }
</style>