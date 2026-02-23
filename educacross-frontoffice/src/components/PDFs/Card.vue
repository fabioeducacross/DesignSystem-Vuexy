<template>
  <div
    id="studentsCards"
    class="student-card-body print-component"
    :data-fileName="student.studentName"
  >
    <div class="background">
      <div class="card-head-container">
        <b-img :src="logo" alt="logo" class="logo" />
        <span class="font-bold text-black font-12">{{ yearNow }}</span>
      </div>
      <div class="d-flex justify-between" style="height: 100px">
        <div class="info-container">
          <div class="d-flex flex-col">
            <span class="font-bold font-16">{{ abbrStudentName(student.studentName) }}</span>
            <span class="font-bold font-12">{{ student.institutionName }}</span>
            <span class="font-bold font-10 text-danger">
              {{ student.className }} - {{ student.serieName }}
            </span>
            <div v-if="student.userName && student.password" class="d-flex flex-col">
              <span class="font-bold font-14 user-info">
                Usuário: <span>{{ student.userName }}</span>
              </span>
              <span class="font-bold font-14">
                Senha: <span>{{ student.password }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="qr-container">
          <qrcode-vue :value="student.qrCode" :size="70" render-as="svg" />
        </div>
      </div>
      <div class="fruits-container">
        <p class="font-12 font-bold mb-0 fruits-code">Código de frutas:</p>
        <div class="d-flex justify-between">
          <div
            v-for="(fruit, index) in fruits"
            :key="fruit + index"
            class="fruit-container bg-white"
          >
            <b-img class="fruit" fluid :src="getFruitImage(fruit)" />
          </div>
        </div>
      </div>
      <div
        class="d-flex justify-end align-items-center font-bold font-8 text-danger container-warning"
      >
        <span class="material-symbols-outlined cursor-pointer icon-warning"> Warning </span>
        <span class="alert-text">Uso pessoal e intransferível</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { BImg } from 'bootstrap-vue'
import QrcodeVue from 'qrcode.vue'
import store from '@/store'
import { ref, computed } from 'vue'

// Dynamically import all fruit images
const fruitImages = import.meta.glob('@/assets/images/fruits/*.svg', { eager: true, import: 'default' })

const props = defineProps({
  student: {
    type: Object,
    required: true,
    isEducacrossUser: false,
  },
})

const yearNow = ref(new Date().getFullYear())
const logo = computed(() => getWhitelabelConfig('LogoStudentCard'))

const fruits = computed(() => {
  const sequence = props.student.fruitPassword ? props.student.fruitPassword.split('') : []
  return sequence.map(fruit => fruit.toUpperCase())
})

const isEducacrossUser = ref(false)
if (store.getters.accessUserData?.User === 'Educacross') {
  isEducacrossUser.value = true
}

const getFruitImage = (fruit) => {
  const imagePath = `/src/assets/images/fruits/${fruit}.svg`
  return fruitImages[imagePath] || ''
}

const abbrStudentName = (studentName) => {
  if (!studentName) return ''
  if (studentName.length <= 21) return studentName

  const name = studentName.split(' ')
  let abbrName = ''

  name.forEach((el, index) => {
    if (index === 0) {
      abbrName += el
    } else if (index === name.length - 1) {
      abbrName += ` ${el}`
    } else {
      abbrName += ` ${el.charAt(0)}.`
    }
  })

  return abbrName
}
</script>

<style lang="scss" scoped>
* {
  text-transform: uppercase;
}

@import '@/assets/scss/variables/_variables.scss';
.student-card-body {
  border: 4px dashed #9c9c9c;

  width: 441px;
  height: 264px;
  padding: 4.28px;

  color: #000;
}

.background {
  width: 100%;
  height: 100%;

  padding: 15px 23px 27px 23px;
  position: relative;

  background: #e2f6ff;
}

.line-height-14 {
  line-height: 14px;
}

.card-head-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.logo {
  height: 23px;
}

.fruit-container {
  padding: 0.25rem;
  border-radius: 0.357rem;
  border: 1px solid #0c5257;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.fruit {
  max-width: 100%;
  max-height: 100%;
}

.info-container {
  line-height: 14px;
}

.user-info {
  margin-top: 10px;
}

.qr-container {
  align-self: center;

  padding: 6px;
  background: #fff;
  border-radius: 8px;
}

.container-warning {
  margin-top: 8px;

  .icon-warning {
    font-size: 10px;
  }
}

@media print {
  .cardsBody {
    margin: 0 !important;
    padding: 0 !important;
  }

  .student-card-body {
    page-break-before: auto;
    page-break-after: auto;
    page-break-inside: avoid;

    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }

  #app {
    background: #fff;
  }
}

.HTMLtoPdf {
  margin: auto;
  margin-top: calc(50% - 264px);

  .fruits-code {
    margin-bottom: 5px !important;
  }
}
</style>