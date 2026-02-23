<template ref="studentsCard">
  <div class="cardsBody page-break mt">
    <b-overlay :show="loading" no-wrap />
    <div v-if="false" class="titleBox">
      <span class="color-patternTwo">{{ students[0].className }}</span>
    </div>
    <div class="cardsContainer">
      <div
        v-for="(studentCard, studentCardIndex) in students"
        id="studentsCards"
        :key="studentCardIndex"
        class="customCardBody card-page"
        :data-fileName="studentCard.studentName"
      >
        <div class="backgroundImage">
          <div class="title">
            <div class="institutionNameBox">
              <strong>{{ studentCard.institutionName }}</strong>
            </div>
            <div class="yearBox">
              <strong>{{ yearnow }}</strong>
            </div>
          </div>
          <div class="centerContent">
            <div class="photoContainer">
              <img v-if="studentCard.imageUrl" :src="studentCard.imageUrl" class="photoCardimage" />
              <img
                v-if="!studentCard.imageUrl"
                src="@/assets/images/pdf/imagemAlunoPadrao.png"
                class="photoCardimage"
              />
            </div>
            <div v-if="true" class="allData">
              <div
                class="qrcodeContainerAndData"
                style="justify-content: space-between; align-items: center"
              >
                <div class="dataContainer">
                  <div class="studentName">
                    {{ studentCard.studentName }}
                  </div>
                  <div v-if="accessUser === 'Educacross'" class="studentUsername">
                    <span style="color: #6d6d6d; font-weight: bold">Nome de usuário</span><br />
                    <span style="text-transform: lowercase; color: #6d6d6d">
                      {{ studentCard.userName.match(/.{1,21}/g).join(' ') }}
                    </span>
                  </div>
                  <div v-if="accessUser === 'Educacross'" class="studentPassword">
                    <span style="color: #6d6d6d; font-weight: bold">Senha</span><br /><span
                      style="color: #6d6d6d"
                      >{{ studentCard.password }}</span
                    >
                  </div>
                </div>
                <div class="qrCodeContainerNormalUser">
                  <qrcode-vue :value="studentCard.qrCode" :size="100" render-as="svg" />
                </div>
                <div class="qrCodeContainerNormalUserPrint">
                  <qrcode-vue :value="studentCard.qrCode" :size="71.43" render-as="svg" />
                </div>
              </div>
            </div>
            <div
              v-else
              class="allData"
              style="display: flex; justify-content: space-between; align-items: center"
            >
              <div class="studentNameContainer" style="padding-right: 0.5rem; padding-left: 0.5rem">
                <div class="studentNameLex">
                  {{ studentCard.studentName }}
                </div>
              </div>
              <div class="qrcodeContainerAndData" style="justify-content: flex-end; width: auto">
                <div class="qrCodeContainerLexUser">
                  <qrcode-vue :value="studentCard.qrCode" :size="100" render-as="svg" />
                </div>
                <div class="qrCodeContainerLexUserPrint">
                  <qrcode-vue :value="studentCard.qrCode" :size="71.43" render-as="svg" />
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="classnameBox">
              <span>{{ studentCard.className }}</span>
            </div>
            <div class="educacrossLogoBox">
              <img
                :src="getLogoSrc(logoCard)"
                alt="logo"
                :class="true ? 'brand-logo' : 'wl-logo'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getStudentCards } from '@/services/admin-context/students/Students.service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import QrcodeVue from 'qrcode.vue'
import store from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'
import { ref, computed, onMounted } from 'vue'

const pdfLogos = import.meta.glob('@/assets/images/pdf/*', { eager: true })

const yearnow = ref(new Date().getFullYear())
const students = ref([])
const info = ref({})
const logoCard = ref('')
const accessUserName = ref('')
const loading = ref(true)

const route = useRoute()
const router = useRouter()

const emit = defineEmits(['setInfos'])

const accessUser = computed(() => {
  return store.getters.accessUserData.User
})

const getWhitelabelInfos = () => {
  logoCard.value = getWhitelabelConfig('LogoStudentCard')
}

const setAccessUserName = () => {
  accessUserName.value = store.getters.accessUserData.Name
}

const getLogoSrc = (logo) => {
  const key = Object.keys(pdfLogos).find(k => k.endsWith(`/${logo}`))
  if (key) {
    return pdfLogos[key].default || pdfLogos[key]
  }
  return ''
}

const handleGetInfos = async () => {
  info.value = route.params
  loading.value = true
  try {
    const response = await getStudentCards(info.value.studentsId)
    students.value = response.data

    for (let i = 0; i < students.value.length; i += 1) {
      if (students.value[i].studentName.length > 20) {
        students.value[i].studentName = students.value[i].studentName
          .split(' ')
          .map(el => el[0])
          .join(' ')
      }
    }

    emit('setInfos', {
      pdfTitle: info.value.pdfTitle,
      massPdf: info.value.studentsId.length > 1,
      students: students.value,
      selector: '.card-page',
      cssPath: 'studentCard.scss',
    })
  } catch (e) {
    router.push({ name: 'teacherStudents' })
  }
  loading.value = false
}

onMounted(() => {
  getWhitelabelInfos()
  handleGetInfos()
  setAccessUserName()
})
</script>

<style lang="scss" scoped>
  .titleBox {
    font-weight: 600;
    font-size: 25px;
    line-height: 27.5px;
    width: 100%;
    margin-bottom: 3.75rem;
    margin-left: 5.875rem;

    span {
      border-bottom: 2px solid;
    }
  }

  .backgroundImage {
    background: url('@/assets/images/pdf/cardBackground.png');
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #edf9f9;
  }

  .cardsBody {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .cardsContainer {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .customCardBody {
    border: 2px dashed #9c9c9c;
    width: 393.75px;
    height: 236.607125px;
    padding: 5.3500000000000005px;
    margin-bottom: 1.75rem;
    background-color: transparent;
    letter-spacing: 0.875px;
    font-family: Roboto !important;

    .title {
      display: flex;
      justify-content: space-between;
      background-color: transparent;
      height: 51.509875px;
      border-radius: 3.57px 3.57px 0 0;

      .institutionNameBox {
        width: 65%;
        height: 100%;
        display: flex;
        align-items: center;
        background-color: transparent;
        color: #0c5257;
        padding-left: 1.3375000000000001rem;
        font-weight: bold;
        font-size: 14.285px;
      }

      .yearBox {
        width: 35%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        color: #424242;
        padding: 0.44625rem;
        font-weight: 900;
        font-size: 17.849999999999998px;
      }
    }

    .centerContent {
      display: flex;
      justify-content: space-between;
      height: 121.43px;
      align-items: center;
      padding: 0 0.928rem;

      .photoContainer {
        display: flex;
        align-items: center;
        height: 100%;
        padding-left: 0.2675rem;

        .photoCardimage {
          width: 80.35px !important;
          height: 80.35px !important;

          position: absolute;
          z-index: 9999;
        }
      }

      .allData {
        width: calc(100% - 74.28px);

        .qrcodeContainerAndData {
          display: flex;
          align-items: flex-start;
          width: 100%;
          height: 6.16rem;
          padding-right: 0.2675rem;

          .dataContainer {
            line-height: 1.5625;

            .studentName {
              font-weight: bold;
              font-size: 14.285px;
              font-style: normal;
              color: #0c5257;
              line-height: 1.25 0.25;
              padding-bottom: 1.785px;
            }

            .studentUsername {
              font-size: 12.5px;
              padding-bottom: 1.785px;
            }

            .studentPassword {
              font-size: 12.5px;
            }

            font-size: 1.25rem;
            color: black;
            font-weight: 500;
          }

          .qrCodeContainerNormalUser {
            display: none;
          }

          .qrCodeContainerNormalUserPrint {
            width: 89.28750000000001px;
            height: 89.28750000000001px;
            display: block;
          }

          .qrCodeContainerLexUser {
            display: none;
          }

          .qrCodeContainerLexUserPrint {
            width: 98.21249999999999px;
            height: 98.21249999999999px;
            display: block;
          }
        }

        .studentNameLex {
          font-size: 1.3375000000000001rem;
          color: #222b45;
          font-weight: 400;
        }
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: transparent;
      height: 31.419999999999998px;
      border-radius: 0 0 3.57px 3.57px;
      padding: 0 1.07rem;

      .classnameBox {
        font-style: normal;
        font-weight: bold;
        font-size: 14.285px;
        height: 100%;
        align-items: center;
        display: flex;
        width: 52%;
        color: #0c5257;
      }

      .educacrossLogoBox {
        background-color: transparent;

        .brand-logo {
          width: 143.75px;
          height: 23.580000000000002px;
        }

        .wl-logo {
          height: 31.25px;
        }
      }
    }
  }

  .mt {
    margin-top: 2.5rem;
  }

  @media print {
    .customCardBody {
      -webkit-print-color-adjust: exact;
      page-break-inside: avoid;
    }

    @page {
      size: A4;
    }
  }

  .HTMLtoPdf {
    margin: 100px;
  }
</style>