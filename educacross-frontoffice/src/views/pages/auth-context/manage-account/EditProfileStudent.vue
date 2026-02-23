<template>
  <div>
    <div v-if="isEditData">
      <b-form @submit.prevent="submitEditProfileStudent()">
        <b-row>
          <div class="responsive-formEditStudent">
            <b-col class="pictureProfileStudent-container mb-2">
              <div
                class="changePictureStudent-boxBackground mb-2 mx-auto"
                :style="formEditProfileStudent.backgroundShow"
              >
                <img
                  :src="getImgProfile(formEditProfileStudent.imageId)"
                  alt="picture"
                  class="character-pictureStudent"
                />
              </div>
              <p
                class="text-center font-bold underline text-primary cursor-pointer"
                @click="buttonChangeIcon()"
              >
                Trocar ícone
              </p>
            </b-col>
            <b-col>
              <b-row>
                <b-col cols="12">
                  <b-form-group label-for="" label="Nome completo">
                    <b-form-input
                      v-model="formEditProfileStudent.name"
                      :danger="dangerInputName"
                      disabled
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group label-for="" label="Nome de usuário">
                    <b-form-input v-model="formEditProfileStudent.userName" disabled />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group label-for="" label="Senha">
                    <b-input-group class="input-group-merge">
                      <b-input-group-prepend is-text>
                        <feather-icon icon="LockIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="formEditProfileStudent.password"
                        :type="showPasswordText ? 'text' : 'password'"
                        name="password"
                        placeholder="Digite sua senha"
                        :state="dangerInputPassword ? false : null"
                      />
                      <b-input-group-append is-text>
                        <feather-icon
                          :icon="showPasswordText ? 'EyeIcon' : 'EyeOffIcon'"
                          class="cursor-pointer"
                          @click="showPassword()"
                        />
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <p
                v-for="(msgError, indexMsgError) in feedbackGeneralError.message"
                :key="indexMsgError"
                class="text-editStudent text-danger mb-1"
              >
                {{ msgError }}
              </p>
            </b-col>
          </div>
        </b-row>
        <b-row>
          <b-col cols="12" md="6" class="mb-1 mb-md-0">
            <b-button
              variant="outline-secondary"
              block
              @click="closeEditProfileStudent(), (isCancel = true)"
            >
              Cancelar
            </b-button>
          </b-col>
          <b-col cols="12" md="6">
            <b-button
              id="button-loading-editStudent"
              ref="loadableButtonEditStudent"
              variant="primary"
              block
              :disabled="!validFormEditProfileStudent || loadingButton"
              @click.prevent="submitEditProfileStudent(), (isCancel = false)"
            >
              Finalizar
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
    <div v-else>
      <b-row>
        <div class="responsive-formEditStudent">
          <b-col class="pictureProfileStudent-container mb-8 pr-8">
            <div
              class="changePictureStudent-boxBackground m-auto"
              :style="formEditProfileStudent.backgroundShow"
            >
              <img
                :src="getImgProfile(formEditProfileStudent.imageId)"
                alt="picture"
                class="character-pictureStudent"
              />
            </div>
          </b-col>
          <b-col>
            <p class="text-editStudent color-patternTwo mb-1">Templates de personagem</p>
            <div class="container-miniature-editStudent mb-6">
              <div
                v-for="(miniCharacter, indexMiniCharacter) in miniCharacters"
                :key="indexMiniCharacter"
                class="border-character-editStudent"
                :class="{
                  'boxBorderMini-primary-editStudent': miniCharacter.selected,
                  'boxBorderMini-gray-editStudent': !miniCharacter.selected,
                }"
                @click="selectMiniCharacter(miniCharacter)"
              >
                <img
                  :src="getImgProfile(miniCharacter.id)"
                  alt="mini"
                  class="miniature-box-editStudent"
                />
              </div>
            </div>
            <p class="text-editStudent color-patternTwo mb-1">Cores padrão</p>
            <div class="container-miniature-editStudent">
              <div
                v-for="(boxColor, indexBoxColor) in boxColors"
                :key="indexBoxColor"
                class="border-color-editStudent"
                :class="{
                  'boxBorderMini-primary-editStudent': boxColor.selected,
                  'boxBorderMini-transparent-editStudent': !boxColor.selected,
                }"
              >
                <div
                  class="color-box-editStudent"
                  :style="boxColor.backgroundColor"
                  @click="selectBoxColor(boxColor)"
                />
              </div>
            </div>
          </b-col>
        </div>
      </b-row>
      <b-row>
        <b-col cols="12" md="6" class="mb-1 mb-md-0">
          <b-button
            variant="outline-secondary"
            type="border"
            block
            @click="cancelPictureEdition(), (isCancel = true)"
          >
            Voltar
          </b-button>
        </b-col>
        <b-col cols="12" md="6">
          <b-button
            variant="primary"
            type="filled"
            block
            @click="finishPictureEdition(), (isCancel = false)"
          >
            Finalizar edição
          </b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script setup>
import {
  getEditProfileStudent,
  putEditAccessStudent,
} from '@/services/auth-context/account-manager/Account.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton } from 'bootstrap-vue'

// Add glob import for profile images instead of runtime require
const profileImages = import.meta.glob(
  'src/assets/images/images-educa/profile-corujinhas/*.png',
  { eager: true },
)

const props = defineProps({
  studentId: {
    type: [Number, null],
  },
})

const emit = defineEmits([
  'close-editProfileStudent',
  'close-editProfileStudent-withAtt',
  'update-child-image',
])

import { ref, reactive, computed, watch, onMounted } from 'vue'

const isCancel = ref(false)
const showPasswordText = ref(false)
const isEditData = ref(true)
const loadingButton = ref(false)
const dangerInputPassword = ref(false)
const dangerInputName = ref(false)

function getInitialBoxColors() {
  return [
    {
      id: 1,
      backgroundColor: 'background: #FFD389',
      selected: false,
    },
    {
      id: 2,
      backgroundColor: 'background: #D273FF',
      selected: false,
    },
    {
      id: 3,
      backgroundColor: 'background: #5AC4FF',
      selected: false,
    },
    {
      id: 4,
      backgroundColor: 'background: #6E64E9',
      selected: false,
    },
    {
      id: 5,
      backgroundColor: 'background: #E9934C',
      selected: false,
    },
    {
      id: 6,
      backgroundColor: 'background: #FE5153',
      selected: false,
    },
    {
      id: 7,
      backgroundColor: 'background: #00BDB8',
      selected: false,
    },
    {
      id: 8,
      backgroundColor: 'background: #7F6CC3',
      selected: false,
    },
    {
      id: 9,
      backgroundColor: 'background: #FFEA93',
      selected: false,
    },
    {
      id: 10,
      backgroundColor: 'background: #A1D946',
      selected: false,
    },
  ]
}

function getInitialMiniCharacters() {
  return [
    { id: 1, selected: false },
    { id: 2, selected: false },
    { id: 3, selected: false },
    { id: 4, selected: false },
    { id: 5, selected: false },
    { id: 6, selected: false },
    { id: 7, selected: false },
    { id: 8, selected: false },
  ]
}

const formEditProfileStudent = reactive({
  name: '',
  userName: '',
  password: '',
  backgroundColor: '',
  imageId: '',
  backgroundShow: '',
})

const pictureAux = reactive({
  backgroundColor: '',
  imageId: '',
  backgroundShow: '',
})

const feedbackGeneralError = reactive({
  status: 0,
  message: [],
  errorDictionary: [],
})

const boxColors = ref(getInitialBoxColors())
const miniCharacters = ref(getInitialMiniCharacters())

const validFormEditProfileStudent = computed(() => (
  formEditProfileStudent.name.length > 0 &&
  formEditProfileStudent.userName.length > 0 &&
  formEditProfileStudent.password.length > 0
))

watch(
  () => props.studentId,
  async (id) => {
    await handleEditProfileStudent(id)
    refreshSelectedBoxColor()
    refreshSelectedMiniCharacter()
  },
)

// ---- FUNCTION IMPLEMENTATIONS ----

const showPassword = () => {
  showPasswordText.value = !showPasswordText.value
}

const closeEditProfileStudent = () => {
  emit('close-editProfileStudent')
}

const closeEditProfileStudentWithAtt = () => {
  emit('close-editProfileStudent-withAtt')
}

const refreshSelectedBoxColor = () => {
  boxColors.value.forEach(element => {
    element.selected = false
  })
}

const selectBoxColor = (boxColor) => {
  refreshSelectedBoxColor()
  boxColor.selected = true
  formEditProfileStudent.backgroundShow = boxColor.backgroundColor
  formEditProfileStudent.backgroundColor = boxColor.backgroundColor.substr(12)
}

const refreshSelectedMiniCharacter = () => {
  miniCharacters.value.forEach(element => {
    element.selected = false
  })
}

const selectMiniCharacter = (miniCharacter) => {
  refreshSelectedMiniCharacter()
  miniCharacter.selected = true
  formEditProfileStudent.imageId = miniCharacter.id
}

const handleEditProfileStudent = async (id) => {
  loadingButton.value = true
  await getEditProfileStudent(id).then(response => {
    // assign everything for reactivity 
    formEditProfileStudent.name = response.data.name
    formEditProfileStudent.userName = response.data.userName
    formEditProfileStudent.password = ''
    formEditProfileStudent.backgroundColor = response.data.backgroundColor
    formEditProfileStudent.imageId = response.data.imageId
    formEditProfileStudent.backgroundShow = `background: ${response.data.backgroundColor}`

    pictureAux.backgroundColor = formEditProfileStudent.backgroundColor
    pictureAux.backgroundShow = formEditProfileStudent.backgroundShow
    pictureAux.imageId = formEditProfileStudent.imageId
  })
  loadingButton.value = false
}

const submitEditProfileStudent = () => {
  const data = {
    name: formEditProfileStudent.name,
    password: formEditProfileStudent.password,
    imageId: formEditProfileStudent.imageId,
    backgroundColor: formEditProfileStudent.backgroundColor,
  }
  loadingButton.value = true
  putEditAccessStudent(props.studentId, data)
    .then(() => {
      closeEditProfileStudentWithAtt()
      if (!isCancel.value) {
        // If $toast is globally available (as prototype in Vue 2), call via window
        if (typeof window.$toast === 'function') {
          window.$toast({
            component: Toast,
            props: {
              text: 'Dados alterados com sucesso',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          })
        }
      }
      loadingButton.value = false
      emit('update-child-image', {
        imageId: data.imageId,
        userId: props.studentId,
      })
    })
    .catch(error => {
      feedbackGeneralError.status = error.status || 0
      feedbackGeneralError.message = error.message || []
      feedbackGeneralError.errorDictionary = Array.isArray(error.errorDictionary) ? error.errorDictionary : []
      dangerInputPassword.value = false
      dangerInputName.value = false
      feedbackGeneralError.errorDictionary.forEach(element => {
        if (element === 'Name') {
          dangerInputName.value = true
        } else if (element === 'Password') {
          dangerInputPassword.value = true
        }
      })
      loadingButton.value = false
    })
}

const getImgProfile = (id) => {
  const key = `src/assets/images/images-educa/profile-corujinhas/${id}.png`
  return profileImages[key]
}

const cancelPictureEdition = () => {
  isEditData.value = true
  formEditProfileStudent.backgroundColor = pictureAux.backgroundColor
  formEditProfileStudent.backgroundShow = pictureAux.backgroundShow
  formEditProfileStudent.imageId = pictureAux.imageId
  refreshSelectedBoxColor()
  refreshSelectedMiniCharacter()
}

const finishPictureEdition = () => {
  isEditData.value = true
  pictureAux.backgroundColor = formEditProfileStudent.backgroundColor
  pictureAux.backgroundShow = formEditProfileStudent.backgroundShow
  pictureAux.imageId = formEditProfileStudent.imageId
  refreshSelectedBoxColor()
  refreshSelectedMiniCharacter()
}

const buttonChangeIcon = () => {
  isEditData.value = false
  miniCharacters.value.forEach(element => {
    if (element.id === formEditProfileStudent.imageId) element.selected = true
  })
  boxColors.value.forEach(element => {
    if (element.backgroundColor === formEditProfileStudent.backgroundShow)
      element.selected = true
  })
}

// ---- INIT ON MOUNT ----

onMounted(async () => {
  formEditProfileStudent.imageId = 1
  await handleEditProfileStudent(props.studentId)
  refreshSelectedBoxColor()
  refreshSelectedMiniCharacter()
})

</script>

<style lang="scss" scoped>
  .container-editProfileStudent {
    padding: 1.75rem;
  }

  .title-editStudent {
    font-weight: 600;
    font-size: 34px;
    line-height: 38px;
  }

  .text-editStudent {
    font-size: 16px;
    line-height: 21px;
  }

  .picture-profile-student,
  .changePictureStudent-boxBackground {
    width: 200px;
    height: 200px;
  }

  .changePictureStudent-boxBackground {
    border-radius: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .character-pictureStudent {
    width: 82%;
    height: 82%;
  }

  .textLink-editStudent {
    text-decoration: underline;
    cursor: pointer;
    text-align: center;
  }

  .icon-password-editStudent {
    align-self: center;
    position: relative;
    top: 2.45rem;
    right: 1.95rem;
    cursor: pointer;
    height: min-content;
  }

  .container-miniature-editStudent {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .color-box-editStudent {
    width: 32px;
    height: 32px;
  }

  .color-box-editStudent,
  .boxBorderMini-primary-editStudent,
  .boxBorderMini-transparent-editStudent,
  .miniature-box-editStudent,
  .boxBorderMini-gray-editStudent {
    border-radius: 8px;
    cursor: pointer;
  }

  .miniature-box-editStudent {
    width: 80%;
    height: 80%;
  }

  .border-color-editStudent,
  .border-character-editStudent {
    margin-right: 5px;
    margin-bottom: 10px;
    width: fit-content;
  }

  .border-color-editStudent {
    padding: 2px;
  }

  .border-character-editStudent {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    max-width: 48px;
    max-height: 48px;
  }

  .boxBorderMini-primary-editStudent {
    border: 1px solid #00bdb8;
    animation-duration: 1s;
    animation-name: borderMini-show;
  }

  //voltar2
  /*@keyframes borderMini-show {
  from {
    border: 1px solid transparent;
  }

  to {
    border: 1px solid #00bdb8;
  }
}*/

  .boxBorderMini-transparent-editStudent {
    border: 1px solid transparent;
  }

  .boxBorderMini-gray-editStudent {
    border: 1px solid #d9d9d9;
  }

  .button-box-editStudent {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .button-right-editStudent,
  .button-left-editStudent {
    width: 15rem;
  }

  .button-left-editStudent {
    margin-right: 2%;
  }

  .button-right-editStudent {
    margin-left: 2%;
  }

  @media (max-width: 1024px) {
    .button-left-editStudent {
      margin-right: 0;
      margin-bottom: 4%;
    }

    .button-right-editStudent {
      margin-left: 0;
    }

    .button-right-editStudent,
    .button-left-editStudent {
      width: 100%;
    }

    .container-editProfileStudent {
      padding: 0;
    }

    .responsive-formEditStudent {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .pictureProfileStudent-container {
    width: auto !important;
  }

  .responsive-formEditStudent {
    display: flex;
    width: 100%;
  }
</style>