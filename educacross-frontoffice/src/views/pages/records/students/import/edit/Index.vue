<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { useImportStudents } from '@/views/pages/records/students/import/useImportStudents'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from 'vue'

const emit = defineEmits(['save'])

const { classes, editingUser, cancelEdit, saveEditedUser } = useImportStudents()
const editFormObserver = ref(null)
</script>

<template>
  <section>
    <div class="px-1 pb-1">
      <validation-observer ref="editFormObserver">
        <b-form v-if="editingUser" @submit.prevent>
          <b-form-group label="Nome">
            <validation-provider v-slot="{ errors }" name="Nome" rules="required|max:50">
              <b-form-input
                v-model="editingUser.name"
                :state="errors.length > 0 ? false : null"
                placeholder="Nome do aluno"
              ></b-form-input>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group label="Turma">
            <validation-provider v-slot="{ errors }" name="Turma" rules="required">
              <ESelect
                v-model="editingUser.class"
                :options="classes"
                :state="errors.length > 0 ? false : null"
                placeholder="Turma do aluno"
              ></ESelect>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group label="E-mail do responsável (Opcional) ">
            <validation-provider v-slot="{ errors }" name="E-mail" rules="email|max:100">
              <b-form-input
                v-model="editingUser.sponsorEmail"
                :state="errors.length > 0 ? false : null"
                placeholder="Digite o e-mail do responsável"
              ></b-form-input>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-form>
        <div v-else class="text-center">
          <p>Nenhum aluno selecionado para edição.</p>
        </div>
      </validation-observer>
    </div>

    <Portal to="footer-mass-import">
      <hr class="mb-0" />
      <div class="d-flex align-items-center justify-content-center gap-2 px-2 py-1">
        <b-button variant="outline-danger" @click="cancelEdit">Cancelar</b-button>
        <b-button
          variant="primary"
          :disabled="!editingUser"
          @click="editFormObserver.validate().then(success => success && saveEditedUser())"
        >
          Salvar
        </b-button>
      </div>
    </Portal>
  </section>
</template>