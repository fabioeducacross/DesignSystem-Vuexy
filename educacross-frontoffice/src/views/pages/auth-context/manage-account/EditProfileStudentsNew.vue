<template>
  <b-overlay :show="loading" opacity="1" rounded="md">
    <b-row class="gap-8">
      <b-col cols="12" md="auto" class="d-flex flex-column align-items-center">
        <div
          class="pet-img-selected-container"
          :style="`background-color: ${student.backgroundColor}`"
        >
          <b-img-lazy v-bind="selectedImageProps" :src="currentProfileImage" alt="belinha" />
        </div>

        <b-row class="list-pets mb-1">
          <b-col
            v-for="item in student.pets"
            :key="item.id"
            cols="3"
            class="d-flex justify-content-center"
          >
            <div
              class="pet-container"
              :class="{ selected: item.id === student.imageId }"
              @click="selectPet(item)"
            >
              <div
                class="pet-img-container"
                :style="`background-color: ${student.backgroundColor}`"
              >
                <b-img-lazy v-bind="miniImagesProps" :src="item.imageUrl" alt="belinha" />
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" md>
        <ValidationObserver ref="editProfileValidation">
          <b-form-group label-for="name" label="Nome completo">
            <b-form-input :value="student.name" disabled />
          </b-form-group>
          <b-form-group label-for="userName" label="Usuário">
            <b-form-input :value="student.userName" disabled />
          </b-form-group>

          <b-form-group label-for="password" label="Senha">
            <ValidationProvider v-slot="{ errors }" name="Senha" rules="required">
              <b-input-group class="input-group-merge">
                <b-form-input
                  v-model="student.password"
                  :type="showPasswordText ? 'text' : 'password'"
                  name="password"
                  placeholder="Digite sua senha"
                  :state="errors.length > 0 ? false : null"
                />

                <b-input-group-append is-text>
                  <span
                    class="material-symbols-outlined cursor-pointer"
                    style="font-size: 20px"
                    @click="showPasswordText = !showPasswordText"
                  >
                    {{ showPasswordText ? 'visibility' : 'visibility_off' }}
                  </span>
                </b-input-group-append>
              </b-input-group>
              <small v-for="(error, index) in errors" :key="index" class="text-danger">
                {{ error }}
              </small>
            </ValidationProvider>
          </b-form-group>
        </ValidationObserver>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" md="6" class="mb-1 mb-md-0">
        <b-button variant="outline-danger" block :disabled="loadingSave" @click="cancel">
          Cancelar
        </b-button>
      </b-col>

      <b-col cols="12" md="6">
        <b-button variant="primary" block :disabled="loadingSave" @click.prevent="save">
          <b-spinner v-if="loadingSave" small />
          Salvar
        </b-button>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script setup>
import {
  getEditProfileStudent,
  putEditAccessStudent,
} from '@/services/auth-context/account-manager/Account.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { required } from '@core/utils/validations/validations.js'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { ref, computed, watch, getCurrentInstance } from 'vue'

// Props
const props = defineProps({
  studentId: {
    type: [Number, null],
  },
})

// Emits
const emit = defineEmits(['cancel', 'save'])

// Instance for $toast
const vm = getCurrentInstance().proxy

// State
const loading = ref(true)
const loadingSave = ref(false)
const student = ref({})
const showPasswordText = ref(false)
const editProfileValidation = ref(null)

// Fetch
const fetchStudent = async studentId => {
  await getEditProfileStudent(studentId)
    .then(response => {
      student.value = response.data
    })
    .catch(() => {})
    .finally(() => (loading.value = false))
}

watch(
  () => props.studentId,
  () => {
    if (props.studentId) {
      fetchStudent(props.studentId)
    }
  },
)

// Initial load
fetchStudent(props.studentId)

// Methods
const selectPet = pet => {
  student.value.imageId = pet.id
}

const cancel = () => {
  emit('cancel')
}

const save = () => {
  editProfileValidation.value.validate().then(async success => {
    if (!success) return

    const data = {
      password: student.value.password,
      imageId: student.value.imageId,
    }

    loadingSave.value = true

    putEditAccessStudent(student.value.userId, data)
      .then(() => {
        vm.$toast({
          component: Toast,
          props: {
            title: 'Dados alterados com sucesso',
            icon: 'CheckCircleIcon',
            variant: 'success',
          },
        })
        emit('save')
      })
      .finally(() => {
        loadingSave.value = false
      })
  })
}

// Computed
const currentProfileImage = computed(() => {
  if (!student.value.pets) return null
  const currentPet = student.value.pets.find(pet => pet.id === student.value.imageId)
  return currentPet?.imageUrl
})

// Image props
const selectedImageProps = {
  center: true,
  blank: true,
  blankColor: '#5AC4FF',
  height: 190,
}

const miniImagesProps = {
  center: true,
  blank: true,
  blankColor: '#5AC4FF',
  height: 44,
}
</script>

<style lang="scss" scoped>
  .list-pets {
    width: 210px;
  }
  .pet-container {
    border: 2px solid transparent;
    width: 52px;
    height: 52px;
    border-radius: 6px;
    opacity: 0.7;
    &.selected {
      opacity: 1;
      border-color: var(--primary);
    }
    .pet-img-container {
      border-radius: 4px;
      width: 44px;
      height: 44px;
      margin: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 90%;
        max-height: 90%;
      }
    }
  }

  .pet-img-selected-container {
    border-radius: 4px;
    width: 202px;
    height: 202px;
    margin-bottom: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 80%;
      max-height: 80%;
    }
  }
</style>