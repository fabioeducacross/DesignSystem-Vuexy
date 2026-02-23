<template>
  <div class="customCardPage page-break print-component">
    <div v-if="loading" class="w-100 h-100">
      <b-overlay :show="loading" opacity="1" rounded="md"></b-overlay>
    </div>
    <div
      v-for="(studentAccessLetter, studentAccessLetterIndex) in students"
      id="studentsAccessLetters"
      :key="studentAccessLetterIndex"
      class="customCardBody page-breakBefore letter-page"
      :data-fileName="studentAccessLetter.studentName"
    >
      <div class="head">
        <div class="title">CARTA DE ACESSO</div>
        <div class="text subtitle">
          Você está recebendo um acesso exclusivo para
          <span style="font-weight: 700">{{ studentAccessLetter.studentName }}</span>
          aprender de uma forma lúdica e divertida por meio de jogos digitais!<br /><br />

          O primeiro acesso em nosso aplicativo deve ser feito sob a supervisão de um adulto
          responsável pela criança.
        </div>
      </div>
      <div class="content1">
        <div class="title">
          <span style="color: #ffbe52">1- </span>Baixar o aplicativo "{{ name }}"
        </div>
        <div class="text">Em um celular, computador ou tablet</div>
      </div>
      <div class="content2">
        <div class="signIn">
          <div class="title"><span style="color: #ffbe52">2- </span>Acesse o aplicativo</div>
          <div class="text" style="width: 90%">
            Depois de baixar o aplicativo,
            <span v-if="!integration">insira o nome de usuário e a senha</span
            ><span v-else>insira o código de frutas ou escaneie o QR Code</span> abaixo e siga as
            instruções. Na próxima vez, a criança poderá fazer o acesso sozinha com esses mesmos
            dados.
          </div>
        </div>
        <card :student="studentAccessLetter" class="mr-auto ml-auto" style="margin-top: 100px" />
      </div>
      <div class="content3">
        <div class="title">Ficou com alguma dúvida?</div>
        <div class="text subtitle">
          Acesse nossa central de ajuda
          <span class="link">({{ helpLink }})</span> ou <br />
          envie-nos sua pergunta no WhatsApp: {{ phoneNumber }}.
        </div>
        <div class="logoEduca">
          <img :src="logo" width="311px" height="52px" alt="logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from '@/components/PDFs/Card.vue'
import { getStudentAccessLetter } from '@/services/admin-context/students/Students.service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { onMounted, onUnmounted, ref } from 'vue'
import store from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'

const STYLE_ID = 'access-letters-page-style'

const injectPageStyle = () => {
  const existingStyles = document.querySelectorAll('[id$="-page-style"]')
  existingStyles.forEach(style => style.remove())

  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = '@page { size: 210mm 297mm; margin: 0; }'
  document.head.appendChild(style)
}

const removePageStyle = () => {
  const style = document.getElementById(STYLE_ID)
  if (style) style.remove()
}

onMounted(() => {
  injectPageStyle()
})

onUnmounted(() => {
  removePageStyle()
})

const emit = defineEmits(['setInfos'])

const yearnow = ref(new Date().getFullYear())
const students = ref([])
const info = ref({})
const name = ref('')
const helpLink = ref('')
const phoneNumber = ref('')
const logoCard = ref('')
const logo = ref('')
const integration = ref(false)
const loading = ref(true)

const route = useRoute()
const router = useRouter()

const getWhitelabelInfos = () => {
  name.value = getWhitelabelConfig('Name')
  helpLink.value = getWhitelabelConfig('BeautifulHelpUrl')
  phoneNumber.value = getWhitelabelConfig('PhoneNumber')
  logo.value = getWhitelabelConfig('LogoStudentCard')
}

const userEducacross = () => {
  return store.getters.accessUserData?.User === 'Educacross'
}

const handleGetInfos = async () => {
  info.value = route.params
  loading.value = true

  if (info.value.batchAction === 2) {
    info.value.studentsIds = []
  }

  await getStudentAccessLetter(
    info.value.studentsIds,
    info.value.batchAction,
    info.value.searchTerm,
    info.value.classId,
    info.value.status,
  )
    .then(response => {
      students.value = response.data.students

      emit('setInfos', {
        pdfTitle: info.value.pdfTitle,
        massPdf: info.value.studentsIds.length > 1,
        students: students.value,
        selector: '.letter-page',
        cssPath: 'accessLetters.scss',
      })
    })
    .catch(() => router.push({ name: 'listStudentAdmin' }))

  loading.value = false
}

// Initialization logic
onMounted(() => {
  getWhitelabelInfos()
  handleGetInfos()
  integration.value = store.getters.accessUserData?.User !== 'Educacross'
})
</script>

<style lang="scss" scoped>
  @import './scss/accessLetters.scss';
</style>