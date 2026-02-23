<template>
  <div id="addAccount">
    <transition-group name="invite-transition" tag="div" class="invitation-wrapper">
      <div v-for="(invite, index) in invitationList" :key="invite.id" class="invite-item">
        <div>
          <b-badge variant="light-primary" pill class="mb-1">{{ invite.role }}</b-badge>
          <p class="mb-0">Usuário: {{ invite.name }}</p>
          <p class="mb-0">Escola: {{ invite.institutionName }}</p>
          <p v-if="invite.classes">
            Turmas: {{ invite.classes[0] }}
            <span v-if="invite.classes.length > 1" class="text-primary">
              {{ invite.classes.length - 1 }}+
            </span>
          </p>

          <div class="d-flex gap-2 flex-wrap">
            <div>
              <b-button block variant="primary" @click="openProfileDialogAccept(invite, index)">
                Aceitar
              </b-button>
            </div>

            <div>
              <b-button
                block
                variant="outline-danger"
                @click="openProfileDialogReject(invite, index)"
              >
                Recusar
              </b-button>
            </div>
          </div>
        </div>

        <div
          v-if="index + 1 < invitationList.length"
          style="border-top: 1px solid #ebe9f1"
          class="my-1"
        ></div>
      </div>
    </transition-group>

    <b-modal
      v-model="isProfileDialogOpen"
      centered
      hide-footer
      hide-header
      no-close-on-backdrop
      no-close-on-esc
      static
    >
      <accept-or-reject-access
        v-if="isProfileDialogOpen"
        :profile-data="dialogProfileData"
        @close-profile-dialog="isProfileDialogOpen = false"
        @submit-profile-action="onSubmitProfileAction"
        @submit-access-key="onSubmitAccessKey"
        @submit-add-user="onSubmitAddUser"
      />
    </b-modal>
  </div>
</template>

<script setup>
import AcceptOrRejectAccess from './AcceptOrRejectAccess.vue'
import { logoutAccount } from '@/auth/utils'
import {
  postActiveAccessKey,
  postVerifyAccessKey,
  postVerifyLinkUser,
  putInvitationsAction,
  putLinkUser,
} from '@/services/auth-context/account-manager/Account.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { computed, getCurrentInstance, reactive, ref, watch } from 'vue'

const props = defineProps({
  hasAccessContext: {
    type: Boolean,
    default: true,
  },
  invites: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['close', 'close-addAccount', 'close-addAccount-withAtt', 'update-invitations', 'enableCloseAddAccountHeader'])

// Reactive references
const { proxy } = getCurrentInstance()

const formAddaccessKey = reactive({
  accessKey: '',
})

const isAddAccount = ref(true)
const isFeedbackSuccessAddAccess = ref(false)
const isFeedbackSuccessAddUser = ref(false)
const invitationList = ref([...props.invites])
const loadingButtonAddAccess = ref(false)
const loadingButtonAcceptInvite = ref(false)
const loadingButtonAddUser = ref(false)

const isProfileDialogOpen = ref(false)
const dialogProfileData = reactive({})

const hasInvitations = ref(false)

const feedbackGeneralErrorAddAccessKey = reactive({
  status: 0,
  message: [],
})
const feedbackGeneralErrorAddUser = reactive({
  status: 0,
  message: [],
})

const msgSuccessAddUser = ref('')
const showPasswordText = ref(false)

const formAddUser = reactive({
  userName: '',
  password: '',
})

const chanShowCloseInvitesButton = ref(false)

const tabs = ref([{ title: 'Lista de Convites' }, { title: 'Dados de Acesso' }])
const currentTab = ref(0)

// Computed-like properties
const validFormAddaccessKey = computed(() => {
  return formAddaccessKey.accessKey.length > 0
})

const validFormAddUser = computed(() => {
  return formAddUser.userName.length > 0 && formAddUser.password.length > 0
})

// Methods
const changeTab = index => {
  currentTab.value = index
}

watch(invitationList, () => {
  if (invitationList.value.length === 0) {
    emit('close')
  }
})

const verifyAccessKey = () => {
  loadingButtonAddAccess.value = true
  postVerifyAccessKey({ accessKey: formAddaccessKey.accessKey })
    .then(response => {
      dialogProfileData.isAccepting = true
      dialogProfileData.userData = response.data
      dialogProfileData.accessKey = formAddaccessKey.accessKey
      isProfileDialogOpen.value = true
      loadingButtonAddAccess.value = false
    })
    .catch(error => {
      feedbackGeneralErrorAddAccessKey.status = error.status
      feedbackGeneralErrorAddAccessKey.message = error.message
      loadingButtonAddAccess.value = false
    })
}

// Renamed from submitAccessKey
const onSubmitAccessKey = (profileData, done) => {
  postActiveAccessKey({
    accessKey: profileData.accessKey,
    explicitAcceptanceOfTermsOfUse: profileData.acceptTerms,
  })
    .then(() => {
      isAddAccount.value = false
      isFeedbackSuccessAddAccess.value = true
      isFeedbackSuccessAddUser.value = false
    })
    .catch(error => {
      feedbackGeneralErrorAddAccessKey.status = error.status
      feedbackGeneralErrorAddAccessKey.message = error.message
    })
    .finally(() => {
      if (typeof done === 'function') done()
      isProfileDialogOpen.value = false
    })
}

const closeAddAccount = () => {
  emit('close-addAccount')
  isAddAccount.value = true
  isFeedbackSuccessAddAccess.value = false
  isFeedbackSuccessAddUser.value = false
}

const closeAddAccountWithAtt = () => {
  emit('close-addAccount-withAtt')
  isAddAccount.value = true
  isFeedbackSuccessAddAccess.value = false
  isFeedbackSuccessAddUser.value = false
}

// Renamed from confirmAcceptOrRejectInviteAccess
const onSubmitProfileAction = (profileData, done) => {
  if (profileData.isAccepting) {
    acceptInvite(
      profileData.userData.id,
      profileData.indexInvite,
      profileData.acceptTerms,
      done,
    )
  } else if (profileData.isRejecting) {
    rejectInvite(
      profileData.userData.id,
      profileData.indexInvite,
      profileData.acceptTerms,
      done,
    )
  }
}

const acceptInvite = (inviteId, index, acceptTerms, done) => {
  putInvitationsAction({
    invitations: [
      {
        invitationId: inviteId,
        status: 2, // accepted
        explicitAcceptanceOfTermsOfUse: acceptTerms,
      },
    ],
  })
    .then(() => {
      invitationList.value = invitationList.value.filter(invite => invite.id !== inviteId)
      emit('update-invitations', invitationList.value)
      if (invitationList.value.length === 0) {
        chanShowCloseInvitesButton.value = true
        emit('enableCloseAddAccountHeader')
      } else {
        chanShowCloseInvitesButton.value = false
      }
    })
    .catch(error => {
      proxy.$toast({
        component: Toast,
        props: {
          title: 'Atenção',
          icon: 'AlertTriangleIcon',
          text: error,
          variant: 'danger',
        },
      })
    })
    .finally(() => {
      if (typeof done === 'function') done()
      isProfileDialogOpen.value = false
    })
}

const rejectInvite = (inviteId, index, acceptTerms, done) => {
  putInvitationsAction({
    invitations: [
      {
        invitationId: inviteId,
        status: 3, // rejected
        explicitAcceptanceOfTermsOfUse: acceptTerms,
      },
    ],
  })
    .then(() => {
      invitationList.value = invitationList.value.filter(invite => invite.id !== inviteId)
      emit('update-invitations', invitationList.value)
      if (invitationList.value.length === 0) {
        chanShowCloseInvitesButton.value = true
        emit('enableCloseAddAccountHeader')
      } else {
        chanShowCloseInvitesButton.value = false
      }
    })
    .catch(error => {
      proxy.$toast({
        component: Toast,
        props: {
          title: 'Atenção',
          icon: 'AlertTriangleIcon',
          text: error,
          variant: 'danger',
        },
      })
    })
    .finally(() => {
      if (typeof done === 'function') done()
      isProfileDialogOpen.value = false
    })
}

// Renamed from confirmAcceptInvite
const openProfileDialogAccept = (invitation, indexInvitation) => {
  isProfileDialogOpen.value = true
  dialogProfileData.tab = 'inviteList'
  dialogProfileData.userData = invitation
  dialogProfileData.indexInvite = indexInvitation
  dialogProfileData.isAccepting = true
  dialogProfileData.isRejecting = false
}

// Renamed from confirmRejectInvite
const openProfileDialogReject = (invitation, indexInvitation) => {
  isProfileDialogOpen.value = true
  dialogProfileData.tab = 'inviteList'
  dialogProfileData.userData = invitation
  dialogProfileData.indexInvite = indexInvitation
  dialogProfileData.isAccepting = false
  dialogProfileData.isRejecting = true
}

const showPassword = () => {
  showPasswordText.value = !showPasswordText.value
}

const verifyAddUser = () => {
  loadingButtonAddUser.value = true
  postVerifyLinkUser(formAddUser)
    .then(response => {
      dialogProfileData.tab = 'addUser'
      dialogProfileData.isAccepting = true
      dialogProfileData.userData = response.data
      dialogProfileData.formAddUser = formAddUser
      isProfileDialogOpen.value = true
      loadingButtonAddUser.value = false
    })
    .catch(error => {
      feedbackGeneralErrorAddUser.status = 0
      feedbackGeneralErrorAddUser.message = []
      feedbackGeneralErrorAddUser.message.push(error.response.data.message)
      loadingButtonAddUser.value = false
    })
}

// Renamed from submitAddUser
const onSubmitAddUser = (profileData, done) => {
  isProfileDialogOpen.value = false
  putLinkUser(profileData.formAddUser)
    .then(response => {
      msgSuccessAddUser.value = response.data.message
      isAddAccount.value = false
      isFeedbackSuccessAddAccess.value = false
      isFeedbackSuccessAddUser.value = true
    })
    .catch(error => {
      feedbackGeneralErrorAddUser.status = error.status
      feedbackGeneralErrorAddUser.message = error.message
    })
    .finally(() => {
      if (typeof done === 'function') done()
    })
}

const logout = () => {
  logoutAccount()
}
</script>

<style scoped>
  .invitation-wrapper {
  }

  .invite-transition-enter-active,
  .invite-transition-leave-active {
    transition: all 0.3s ease;
  }

  .invite-transition-enter {
    opacity: 0;
    transform: translateY(10px);
  }

  .invite-transition-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  .invite-item {
    margin-bottom: 1rem;
  }
</style>